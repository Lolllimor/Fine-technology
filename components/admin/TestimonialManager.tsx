"use client";

import {
  FormEvent,
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import {
  CheckIcon,
  CloseIcon,
  PencilIcon,
  PersonIcon,
  PlusIcon,
  QuoteIcon,
  TrashIcon,
} from "@/components/admin/icons";

type Testimonial = {
  id: string;
  full_name: string;
  role: string;
  quote: string;
  avatar_url: string;
  image_url: string | null;
  approved: boolean;
  created_at: string;
};

type Props = {
  testimonials: Testimonial[];
  createAction: (input: {
    fullName: string;
    role: string;
    quote: string;
    avatarUrl: string;
    approved: boolean;
  }) => Promise<void>;
  updateAction: (
    id: string,
    input: {
      fullName: string;
      role: string;
      quote: string;
      avatarUrl: string;
    },
  ) => Promise<void>;
  approveAction: (id: string, approved: boolean) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
};

const fieldClass =
  "rounded-xl border border-[#E2E8F0] px-3 py-2.5 text-sm text-[#023048] outline-none focus:ring-2 focus:ring-[#0798E7]/30";
const labelClass =
  "text-xs font-bold uppercase tracking-wide text-[#64748B]";
const fileInputClass =
  "text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#023048] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white";

type Draft = {
  key: string;
  file: File | null;
  previewUrl: string | null;
  fullName: string;
  role: string;
  quote: string;
  approved: boolean;
};

function createDraft(): Draft {
  return {
    key: crypto.randomUUID(),
    file: null,
    previewUrl: null,
    fullName: "",
    role: "",
    quote: "",
    approved: false,
  };
}

export function TestimonialManager({
  testimonials,
  createAction,
  updateAction,
  approveAction,
  deleteAction,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  useEffect(() => {
    if (!modalOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  function openModal() {
    setDrafts([createDraft()]);
    setModalOpen(true);
  }

  function closeModal() {
    drafts.forEach((d) => {
      if (d.previewUrl) URL.revokeObjectURL(d.previewUrl);
    });
    setDrafts([]);
    setModalOpen(false);
  }

  function addDraft() {
    setDrafts((prev) => [...prev, createDraft()]);
  }

  function removeDraft(key: string) {
    setDrafts((prev) => {
      const target = prev.find((d) => d.key === key);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((d) => d.key !== key);
    });
  }

  function updateDraft(key: string, patch: Partial<Draft>) {
    setDrafts((prev) =>
      prev.map((d) => (d.key === key ? { ...d, ...patch } : d)),
    );
  }

  function onDraftFileChange(key: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    const draft = drafts.find((d) => d.key === key);
    if (draft?.previewUrl) URL.revokeObjectURL(draft.previewUrl);
    updateDraft(key, {
      file,
      previewUrl:
        file && file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
    });
  }

  function onSubmitDrafts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    for (let i = 0; i < drafts.length; i++) {
      const d = drafts[i];
      if (!d.fullName.trim() || !d.role.trim() || !d.quote.trim()) {
        setError(`Testimonial ${i + 1}: please fill in name, role, and quote.`);
        return;
      }
    }

    const batch = drafts;
    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        for (let i = 0; i < batch.length; i++) {
          setUploadProgress(
            batch.length > 1
              ? `Adding ${i + 1} of ${batch.length}…`
              : "Adding…",
          );
          const d = batch[i];
          const avatarUrl = d.file
            ? await uploadToCloudinary(d.file, "fine-technology/testimonials")
            : "";
          await createAction({
            fullName: d.fullName.trim(),
            role: d.role.trim(),
            quote: d.quote.trim(),
            avatarUrl,
            approved: d.approved,
          });
        }
        setUploadProgress(null);
        setMessage(
          batch.length === 1
            ? "Testimonial added."
            : `${batch.length} testimonials added.`,
        );
        closeModal();
        router.refresh();
      } catch (err) {
        setUploadProgress(null);
        setError(err instanceof Error ? err.message : "Could not save.");
      }
    });
  }

  function run(fn: () => Promise<void>, successMsg?: string) {
    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        await fn();
        if (successMsg) setMessage(successMsg);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Action failed");
      }
    });
  }

  function onSaveEdit(
    e: FormEvent<HTMLFormElement>,
    testimonial: Testimonial,
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");
    const fullName = String(formData.get("fullName") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const quote = String(formData.get("quote") ?? "").trim();

    run(async () => {
      let avatarUrl = testimonial.avatar_url;
      if (file instanceof File && file.size > 0) {
        avatarUrl = await uploadToCloudinary(
          file,
          "fine-technology/testimonials",
        );
      }
      await updateAction(testimonial.id, {
        fullName,
        role,
        quote,
        avatarUrl,
      });
      setEditingId(null);
    }, "Testimonial updated.");
  }

  function renderRow(row: Testimonial) {
    if (editingId === row.id) {
      return (
        <li
          key={row.id}
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#E2E8F0]"
        >
          <form onSubmit={(e) => onSaveEdit(e, row)}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>Replace photo (optional)</span>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  disabled={pending}
                  className={fileInputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>Name</span>
                <input
                  required
                  name="fullName"
                  defaultValue={row.full_name}
                  disabled={pending}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>Role</span>
                <input
                  required
                  name="role"
                  defaultValue={row.role}
                  disabled={pending}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={labelClass}>Quote</span>
                <textarea
                  required
                  name="quote"
                  rows={3}
                  defaultValue={row.quote}
                  disabled={pending}
                  className={fieldClass}
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={pending}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#023048] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#01253a] disabled:opacity-60"
              >
                <CheckIcon className="h-3.5 w-3.5" />
                Save
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => setEditingId(null)}
                className="cursor-pointer rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#334155] transition hover:bg-[#F1F5F9] disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </form>
        </li>
      );
    }

    return (
      <li
        key={row.id}
        className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#E2E8F0]"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F1F5F9] text-[#94A3B8]">
            {row.avatar_url ? (
              <MarketingImage
                src={row.avatar_url}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <PersonIcon className="h-7 w-7" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-[#023048]">{row.full_name}</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  row.approved
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {row.approved ? "Approved" : "Pending"}
              </span>
            </div>
            <p className="text-xs uppercase tracking-wide text-[#94A3B8]">
              {row.role}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#334155]">
              {row.quote}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => run(() => approveAction(row.id, !row.approved))}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#023048] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#01253a] disabled:opacity-60"
              >
                <CheckIcon className="h-3.5 w-3.5" />
                {row.approved ? "Unapprove" : "Approve"}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  setError("");
                  setMessage("");
                  setEditingId(row.id);
                }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#334155] transition hover:bg-[#F1F5F9] disabled:opacity-60"
              >
                <PencilIcon className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => setDeleteId(row.id)}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
              >
                <TrashIcon className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }

  const pendingRows = testimonials.filter((row) => !row.approved);
  const approvedRows = testimonials.filter((row) => row.approved);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#64748B]">
          {testimonials.length} testimonial
          {testimonials.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={openModal}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a]"
        >
          <PlusIcon className="h-4 w-4" />
          Add testimonials
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}

      {testimonials.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
            <QuoteIcon className="h-6 w-6" />
          </div>
          <p className="text-sm text-[#64748B]">No testimonials yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {pendingRows.length > 0 ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                Pending ({pendingRows.length})
              </p>
              <ul className="mt-3 space-y-4">{pendingRows.map(renderRow)}</ul>
            </div>
          ) : null}

          {approvedRows.length > 0 ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                Approved ({approvedRows.length})
              </p>
              <ul className="mt-3 space-y-4">
                {approvedRows.map(renderRow)}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 p-4"
          onClick={() => {
            if (!pending) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#023048]">
                  Add testimonials
                </h2>
                <p className="mt-1 text-xs text-[#64748B]">
                  Add one or more testimonials in a single batch.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={pending}
                aria-label="Close"
                className="cursor-pointer rounded-lg p-1.5 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#023048] disabled:opacity-60"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSubmitDrafts} className="mt-5 space-y-4">
              {drafts.map((d, index) => (
                <div
                  key={d.key}
                  className="rounded-xl border border-[#E2E8F0] p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                      Testimonial {index + 1}
                    </p>
                    {drafts.length > 1 ? (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => removeDraft(d.key)}
                        aria-label={`Remove testimonial ${index + 1}`}
                        className="cursor-pointer rounded-lg p-1 text-[#94A3B8] transition hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className={labelClass}>Photo (optional)</span>
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F1F5F9] text-[#94A3B8] ring-1 ring-[#E2E8F0]">
                          {d.previewUrl ? (
                            // Local blob URL — not a remote asset
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={d.previewUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <PersonIcon className="h-6 w-6" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={pending}
                          onChange={(e) => onDraftFileChange(d.key, e)}
                          className={fileInputClass}
                        />
                      </div>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className={labelClass}>Name</span>
                      <input
                        required
                        value={d.fullName}
                        onChange={(e) =>
                          updateDraft(d.key, { fullName: e.target.value })
                        }
                        disabled={pending}
                        className={fieldClass}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className={labelClass}>Role</span>
                      <input
                        required
                        value={d.role}
                        onChange={(e) =>
                          updateDraft(d.key, { role: e.target.value })
                        }
                        disabled={pending}
                        className={fieldClass}
                      />
                    </label>
                    <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-[#64748B]">
                      <input
                        type="checkbox"
                        checked={d.approved}
                        onChange={(e) =>
                          updateDraft(d.key, { approved: e.target.checked })
                        }
                        disabled={pending}
                        className="h-4 w-4 rounded border-[#E2E8F0]"
                      />
                      Publish immediately
                    </label>
                    <label className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className={labelClass}>Quote</span>
                      <textarea
                        required
                        value={d.quote}
                        onChange={(e) =>
                          updateDraft(d.key, { quote: e.target.value })
                        }
                        rows={3}
                        disabled={pending}
                        className={fieldClass}
                      />
                    </label>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addDraft}
                disabled={pending}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9] disabled:opacity-60"
              >
                <PlusIcon className="h-4 w-4" />
                Add another
              </button>

              {uploadProgress ? (
                <p className="text-xs font-medium text-[#0798E7]">
                  {uploadProgress}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="submit"
                  disabled={pending}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlusIcon className="h-4 w-4" />
                  {pending
                    ? "Working…"
                    : `Add ${drafts.length} testimonial${
                        drafts.length === 1 ? "" : "s"
                      }`}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={pending}
                  className="cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9] disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete this testimonial?"
        description="This can't be undone."
        pending={pending}
        onConfirm={() => {
          if (deleteId) run(() => deleteAction(deleteId));
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
