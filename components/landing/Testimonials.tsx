import { createSupabaseClient } from "@/lib/supabase";
import { images, testimonials as seededTestimonials } from "@/content/landing";
import { TestimonialsCarousel, type CarouselTestimonial } from "@/components/landing/TestimonialsCarousel";

const fallbackImages = [
  images.batteryRack,
  images.industrialRoom,
  images.projectMain,
  images.batteryUnit,
] as const;

function seededItems(): CarouselTestimonial[] {
  return seededTestimonials.map((t, i) => ({
    id: `seed-${i}`,
    quote: t.quote,
    name: t.name,
    role: t.role,
    image: t.image,
    avatar: t.avatar,
  }));
}

async function loadApproved(): Promise<CarouselTestimonial[] | null> {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, full_name, role, quote, avatar_url, image_url")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error || !data?.length) return null;

    return data.map((row, i) => ({
      id: row.id as string,
      quote: row.quote as string,
      name: row.full_name as string,
      role: row.role as string,
      avatar: row.avatar_url as string,
      image:
        (row.image_url as string | null) ??
        fallbackImages[i % fallbackImages.length],
    }));
  } catch {
    return null;
  }
}

export async function Testimonials() {
  const fromDb = await loadApproved();
  const items = fromDb ?? seededItems();
  return <TestimonialsCarousel items={items} />;
}
