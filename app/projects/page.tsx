import type { Metadata } from "next";
import { GalleryImage } from "@/components/landing/GalleryImage";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { images } from "@/content/landing";
import { sectionInner, textGradient } from "@/lib/section";
import { createSupabaseClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Portfolio of solar energy and backup power projects across Nigeria.",
};

type GalleryRow = {
  id: string;
  src: string;
  alt: string;
  sort_order: number;
};

const fallbackGallery: GalleryRow[] = [
  {
    id: "fb-1",
    src: images.projectMain,
    alt: "PremiumTrust Bank critical power installation",
    sort_order: 1,
  },
  {
    id: "fb-2",
    src: images.projectLagos,
    alt: "Residential solar installation in Lagos",
    sort_order: 2,
  },
  {
    id: "fb-3",
    src: images.heroHouse,
    alt: "Commercial rooftop solar project",
    sort_order: 3,
  },
  {
    id: "fb-4",
    src: images.batteryRack,
    alt: "Battery rack power backup system",
    sort_order: 4,
  },
  {
    id: "fb-5",
    src: images.industrialRoom,
    alt: "Industrial power room installation",
    sort_order: 5,
  },
  {
    id: "fb-6",
    src: images.bigSol,
    alt: "Large-scale solar array",
    sort_order: 6,
  },
  {
    id: "fb-7",
    src: images.solarFarm,
    alt: "Solar farm installation",
    sort_order: 7,
  },
  {
    id: "fb-8",
    src: images.homesPowered,
    alt: "Homes powered by Fine Technology",
    sort_order: 8,
  },
  {
    id: "fb-9",
    src: images.clientSatisfaction,
    alt: "Client project site",
    sort_order: 9,
  },
];

async function loadGallery(): Promise<GalleryRow[]> {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("id, src, alt, sort_order")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return fallbackGallery;
    return data as GalleryRow[];
  } catch {
    return fallbackGallery;
  }
}

export default async function ProjectsPage() {
  const gallery = await loadGallery();

  return (
    <div className="flex min-h-full min-w-0 flex-col bg-white font-sans pb-[env(safe-area-inset-bottom)]">
      <SiteHeader variant="light" homePath="/" />

      <main className="flex-1">
        <section className="border-b border-[#E2E8F0] bg-white py-10 sm:py-14">
          <div className={`${sectionInner} text-center`}>
            <p
              className={`text-sm font-bold uppercase tracking-widest ${textGradient}`}
            >
              Portfolio
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#023048] sm:text-4xl lg:text-5xl">
              Our Project
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
              Explore installations across Nigeria — solar, backup power, and
              integrated critical infrastructure delivered by Fine Technology.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-14 md:py-16">
          <div className={sectionInner}>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {gallery.map((item, index) => (
                <li key={item.id}>
                  <GalleryImage
                    src={item.src}
                    alt={item.alt}
                    priority={index === 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
