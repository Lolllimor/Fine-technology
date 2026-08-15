"use server";

import { revalidatePath } from "next/cache";
import { isCloudinaryUrl } from "@/lib/cloudinary-upload";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export async function setTestimonialApproved(id: string, approved: boolean) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ approved })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(input: {
  fullName: string;
  role: string;
  quote: string;
  avatarUrl: string;
  approved: boolean;
}) {
  const fullName = input.fullName.trim();
  const role = input.role.trim();
  const quote = input.quote.trim();
  const avatarUrl = input.avatarUrl.trim();

  if (!fullName || !role || !quote) {
    throw new Error("Please fill in name, role, and quote.");
  }
  if (avatarUrl && !isCloudinaryUrl(avatarUrl)) {
    throw new Error("Please provide a valid photo.");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("testimonials").insert({
    full_name: fullName,
    role,
    quote,
    avatar_url: avatarUrl,
    approved: input.approved,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(
  id: string,
  input: { fullName: string; role: string; quote: string; avatarUrl: string },
) {
  const fullName = input.fullName.trim();
  const role = input.role.trim();
  const quote = input.quote.trim();
  const avatarUrl = input.avatarUrl.trim();

  if (!fullName || !role || !quote) {
    throw new Error("Please fill in name, role, and quote.");
  }
  if (avatarUrl && !isCloudinaryUrl(avatarUrl)) {
    throw new Error("Please provide a valid photo.");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("testimonials")
    .update({
      full_name: fullName,
      role,
      quote,
      avatar_url: avatarUrl,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function saveGalleryImage(src: string, alt: string) {
  const url = src.trim();
  if (!url || !isCloudinaryUrl(url)) {
    throw new Error("Invalid Cloudinary image URL.");
  }

  const supabase = await createServerSupabaseClient();

  const { data: maxRow } = await supabase
    .from("gallery_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = ((maxRow?.sort_order as number | undefined) ?? 0) + 1;

  const { error: insertError } = await supabase.from("gallery_images").insert({
    src: url,
    alt: alt.trim() || "Project photo",
    sort_order: nextOrder,
  });

  if (insertError) throw new Error(insertError.message);

  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/projects");
}

export async function updateGallerySortOrder(id: string, sortOrder: number) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("gallery_images")
    .update({ sort_order: sortOrder })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/projects");
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/projects");
}

export async function saveClientLogo(src: string, alt: string) {
  const url = src.trim();
  if (!url || !isCloudinaryUrl(url)) {
    throw new Error("Invalid Cloudinary image URL.");
  }

  const supabase = await createServerSupabaseClient();

  const { data: maxRow } = await supabase
    .from("client_logos")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = ((maxRow?.sort_order as number | undefined) ?? 0) + 1;

  const { error: insertError } = await supabase.from("client_logos").insert({
    src: url,
    alt: alt.trim() || "Client logo",
    sort_order: nextOrder,
  });

  if (insertError) throw new Error(insertError.message);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath("/");
}

export async function deleteClientLogo(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("client_logos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath("/");
}

export async function markLeadRead(id: string) {
  const supabase = createServiceSupabaseClient();
  const { error } = await supabase
    .from("consultation_requests")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id)
    .is("read_at", null);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

export async function markAllLeadsRead() {
  const supabase = createServiceSupabaseClient();
  const { error } = await supabase
    .from("consultation_requests")
    .update({ read_at: new Date().toISOString() })
    .is("read_at", null);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}
