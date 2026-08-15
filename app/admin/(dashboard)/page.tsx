import type { Metadata } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageIcon, InboxIcon, QuoteIcon } from "@/components/admin/icons";

export const metadata: Metadata = {
  title: "Dashboard · Admin — Fine Technology",
};

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();
  const admin = createServiceSupabaseClient();

  const [pending, gallery, clients, leads, recentLeads] = await Promise.all([
    supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("approved", false),
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("client_logos").select("id", { count: "exact", head: true }),
    admin
      .from("consultation_requests")
      .select("id", { count: "exact", head: true }),
    admin
      .from("consultation_requests")
      .select("id, full_name, project_type, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const cards = [
    {
      label: "Pending testimonials",
      value: pending.count ?? 0,
      href: "/admin/testimonials",
      icon: QuoteIcon,
    },
    {
      label: "Gallery images",
      value: gallery.count ?? 0,
      href: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      label: "Client logos",
      value: clients.count ?? 0,
      href: "/admin/clients",
      icon: ImageIcon,
    },
    {
      label: "Consultation leads",
      value: leads.count ?? 0,
      href: "/admin/leads",
      icon: InboxIcon,
    },
  ];

  const recentRows = recentLeads.data ?? [];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of content awaiting attention."
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="flex items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E2E8F0] transition hover:ring-[#0798E7]/40"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">
                  {card.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-[#023048]">
                  {card.value}
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0798E7]/10 text-[#0798E7]">
                <card.icon className="h-5 w-5" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#023048]">Recent leads</p>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-[#0798E7] hover:underline"
          >
            View all
          </Link>
        </div>

        {recentRows.length === 0 ? (
          <p className="mt-4 text-sm text-[#64748B]">No leads yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-[#E2E8F0]">
            {recentRows.map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between gap-4 py-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#023048]">
                    {row.full_name}
                  </p>
                  <p className="truncate text-xs text-[#64748B]">
                    {row.project_type}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-[#94A3B8]">
                  {new Date(row.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
