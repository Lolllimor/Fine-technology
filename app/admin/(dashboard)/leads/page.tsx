import type { Metadata } from "next";
import {
  markAllLeadsRead,
  markLeadRead,
} from "@/app/admin/(dashboard)/actions";
import { PageHeader } from "@/components/admin/PageHeader";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export const metadata: Metadata = { title: "Leads" };

export default async function AdminLeadsPage() {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from("consultation_requests")
    .select(
      "id, full_name, email, phone, project_type, message, created_at, read_at",
    )
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Consultation requests from the contact form. New leads stay highlighted until you mark them read."
      />

      {error ? (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
          {error.message.includes("read_at") ? (
            <span className="mt-2 block text-xs">
              Run supabase/leads_read_at.sql in the Supabase SQL Editor, then
              refresh.
            </span>
          ) : null}
        </p>
      ) : (
        <LeadsTable
          leads={data ?? []}
          markReadAction={markLeadRead}
          markAllReadAction={markAllLeadsRead}
        />
      )}
    </div>
  );
}
