import type { Metadata } from "next";
import {
  deleteGalleryImage,
  saveGalleryImage,
} from "@/app/admin/(dashboard)/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { PageHeader } from "@/components/admin/PageHeader";

export const metadata: Metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, src, alt, sort_order, created_at")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Manage images shown on the /projects page."
      />

      {error ? (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </p>
      ) : null}

      <GalleryManager
        images={data ?? []}
        saveAction={saveGalleryImage}
        deleteAction={deleteGalleryImage}
      />
    </div>
  );
}
