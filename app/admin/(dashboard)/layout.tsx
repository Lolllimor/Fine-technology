import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export const metadata: Metadata = {
  title: {
    template: "%s · Admin — Fine Technology",
    default: "Admin — Fine Technology",
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const admin = createServiceSupabaseClient();

  const [pendingTestimonials, unreadLeads] = await Promise.all([
    supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("approved", false),
    admin
      .from("consultation_requests")
      .select("id", { count: "exact", head: true })
      .is("read_at", null),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9] lg:flex-row">
      <AdminSidebar
        pendingTestimonials={pendingTestimonials.count ?? 0}
        unreadLeads={unreadLeads.count ?? 0}
      />
      <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
