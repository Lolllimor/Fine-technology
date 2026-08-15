import type { Metadata } from "next";
import {
  createTestimonial,
  deleteTestimonial,
  setTestimonialApproved,
  updateTestimonial,
} from "@/app/admin/(dashboard)/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { TestimonialManager } from "@/components/admin/TestimonialManager";
import { PageHeader } from "@/components/admin/PageHeader";

export const metadata: Metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select(
      "id, full_name, role, quote, avatar_url, image_url, approved, created_at",
    )
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Add, edit, and approve testimonials shown on the homepage."
      />

      {error ? (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </p>
      ) : null}

      <TestimonialManager
        testimonials={data ?? []}
        createAction={createTestimonial}
        updateAction={updateTestimonial}
        approveAction={setTestimonialApproved}
        deleteAction={deleteTestimonial}
      />
    </div>
  );
}
