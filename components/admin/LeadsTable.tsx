"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CloseIcon,
  DownloadIcon,
  InboxIcon,
  SearchIcon,
} from "@/components/admin/icons";

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  created_at: string;
  read_at: string | null;
};

type Props = {
  leads: Lead[];
  markReadAction: (id: string) => Promise<void>;
  markAllReadAction: () => Promise<void>;
};

const LEAD_TIME_ZONE = "Africa/Lagos";

function formatLeadTimestamp(value: string) {
  const created = new Date(value);
  return {
    dateLabel: created.toLocaleDateString("en-US", {
      timeZone: LEAD_TIME_ZONE,
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    timeLabel: created.toLocaleTimeString("en-US", {
      timeZone: LEAD_TIME_ZONE,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

export function LeadsTable({
  leads,
  markReadAction,
  markAllReadAction,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = leads.find((row) => row.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  const unreadCount = useMemo(
    () => leads.filter((row) => !row.read_at).length,
    [leads],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((row) =>
      [row.full_name, row.email, row.phone, row.project_type, row.message]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [leads, query]);

  function run(fn: () => Promise<void>) {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  }

  function exportCsv() {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Project",
      "Message",
      "Date",
      "Status",
    ];
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const rows = filtered.map((row) =>
      [
        row.full_name,
        row.email,
        row.phone,
        row.project_type,
        row.message,
        new Date(row.created_at).toISOString(),
        row.read_at ? "Read" : "New",
      ]
        .map(escape)
        .join(","),
    );
    const csv = [headers.map(escape).join(","), ...rows].join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  if (leads.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
          <InboxIcon className="h-6 w-6" />
        </div>
        <p className="text-sm text-[#64748B]">No leads yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="relative max-w-sm flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads…"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-3 text-sm text-[#023048] outline-none focus:ring-2 focus:ring-[#0798E7]/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {unreadCount > 0 ? (
            <button
              type="button"
              disabled={pending}
              onClick={() => run(() => markAllReadAction())}
              className="cursor-pointer rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9] disabled:opacity-60"
            >
              Mark all read ({unreadCount})
            </button>
          ) : null}
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DownloadIcon className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-[#64748B]">
          No leads match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <>
          <div className="mt-4 hidden max-h-[min(65vh,36rem)] overflow-auto rounded-2xl bg-white shadow-sm ring-1 ring-[#E2E8F0] md:block">
            <table className="min-w-max w-full text-left text-sm">
              <thead className="sticky top-0 z-10 border-b border-[#E2E8F0] bg-[#F8FAFC] text-xs uppercase tracking-wide text-[#64748B]">
                <tr>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    #
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    Contact
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    Project
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    Message
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 font-semibold"> </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => {
                  const isNew = !row.read_at;
                  const messagePreview =
                    row.message.length > 24
                      ? `${row.message.slice(0, 24)}…`
                      : row.message;
                  const { dateLabel, timeLabel } = formatLeadTimestamp(
                    row.created_at,
                  );

                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={`cursor-pointer border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] ${
                        isNew ? "bg-[#ECFDF5]/60" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-xs text-[#94A3B8]">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[#023048]">
                        {row.full_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-[#023048]">
                            {row.email}
                          </span>
                          <span className="text-xs text-[#94A3B8]">
                            {row.phone}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[#334155]">
                        {row.project_type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {isNew ? (
                          <span className="rounded-full bg-[#30EAA9] px-2 py-0.5 text-xs font-bold text-[#023048]">
                            New
                          </span>
                        ) : (
                          <span className="text-xs text-[#94A3B8]">Read</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-[#334155]">
                        <span title={row.message} className="cursor-default">
                          {messagePreview}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-[#023048]">
                            {timeLabel}
                          </span>
                          <span className="text-xs text-[#94A3B8]">
                            {dateLabel}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {isNew ? (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={(e) => {
                              e.stopPropagation();
                              run(() => markReadAction(row.id));
                            }}
                            className="cursor-pointer text-xs font-semibold text-[#0798E7] hover:underline disabled:opacity-60"
                          >
                            Mark read
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 max-h-[min(65vh,36rem)] space-y-4 overflow-y-auto md:hidden">
            {filtered.map((row, index) => {
              const isNew = !row.read_at;
              const messagePreview =
                row.message.length > 24
                  ? `${row.message.slice(0, 24)}…`
                  : row.message;
              const { dateLabel, timeLabel } = formatLeadTimestamp(
                row.created_at,
              );

              return (
                <li
                  key={row.id}
                  onClick={() => setSelectedId(row.id)}
                  className={`cursor-pointer rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E2E8F0] transition hover:ring-[#0798E7]/40 ${
                    isNew ? "ring-[#30EAA9]/50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="text-xs text-[#94A3B8]">
                        #{index + 1}
                      </span>
                      <p className="font-semibold text-[#023048]">
                        {row.full_name}
                      </p>
                      {isNew ? (
                        <span className="rounded-full bg-[#30EAA9] px-2 py-0.5 text-xs font-bold text-[#023048]">
                          New
                        </span>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-medium text-[#023048]">
                        {timeLabel}
                      </p>
                      <p className="text-xs text-[#94A3B8]">{dateLabel}</p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    {row.project_type}
                  </p>
                  <p className="mt-2 text-sm text-[#334155]">{row.email}</p>
                  <p className="text-sm text-[#334155]">{row.phone}</p>
                  <p
                    className="mt-3 text-sm leading-6 text-[#334155]"
                    title={row.message}
                  >
                    {messagePreview}
                  </p>
                  {isNew ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={(e) => {
                        e.stopPropagation();
                        run(() => markReadAction(row.id));
                      }}
                      className="mt-3 cursor-pointer text-xs font-semibold text-[#0798E7] hover:underline disabled:opacity-60"
                    >
                      Mark read
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {selected ? (
        <LeadModal
          lead={selected}
          pending={pending}
          onClose={() => setSelectedId(null)}
          onMarkRead={() => run(() => markReadAction(selected.id))}
        />
      ) : null}
    </div>
  );
}

function LeadModal({
  lead,
  pending,
  onClose,
  onMarkRead,
}: {
  lead: Lead;
  pending: boolean;
  onClose: () => void;
  onMarkRead: () => void;
}) {
  const isNew = !lead.read_at;
  const { dateLabel, timeLabel } = formatLeadTimestamp(lead.created_at);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {isNew ? (
              <span className="rounded-full bg-[#30EAA9] px-2 py-0.5 text-xs font-bold text-[#023048]">
                New
              </span>
            ) : (
              <span className="text-xs text-[#94A3B8]">Read</span>
            )}
            <h2 className="text-lg font-bold text-[#023048]">
              {lead.full_name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-lg p-1.5 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#023048]"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
              Email
            </dt>
            <dd className="mt-1 text-sm text-[#334155]">{lead.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
              Phone
            </dt>
            <dd className="mt-1 text-sm text-[#334155]">{lead.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
              Project
            </dt>
            <dd className="mt-1 text-sm text-[#334155]">
              {lead.project_type}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
              Submitted
            </dt>
            <dd className="mt-1 text-sm text-[#334155]">
              {timeLabel} · {dateLabel}
            </dd>
          </div>
        </dl>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
            Message
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#334155]">
            {lead.message}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {isNew ? (
            <button
              type="button"
              disabled={pending}
              onClick={onMarkRead}
              className="cursor-pointer rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a] disabled:opacity-60"
            >
              Mark read
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
