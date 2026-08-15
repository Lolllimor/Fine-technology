import type { Metadata } from "next";
import {
  deleteClientLogo,
  saveClientLogo,
} from "@/app/admin/(dashboard)/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ClientLogosManager } from "@/components/admin/ClientLogosManager";
import { PageHeader } from "@/components/admin/PageHeader";

export const metadata: Metadata = { title: "Clients" };

export default async function AdminClientsPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("client_logos")
    .select("id, src, alt, sort_order, created_at")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Manage logos shown in the Trusted by section on the homepage."
      />

      {error ? (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </p>
      ) : null}

      <ClientLogosManager
        logos={data ?? []}
        saveAction={saveClientLogo}
        deleteAction={deleteClientLogo}
      />
    </div>
  );
}
