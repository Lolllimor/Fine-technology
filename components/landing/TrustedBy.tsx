import { createSupabaseClient } from "@/lib/supabase";
import {
  TrustedByCarousel,
  type TrustedLogo,
} from "@/components/landing/TrustedByCarousel";
import { sectionInner, textGradient } from "@/lib/section";

async function loadLogos(): Promise<TrustedLogo[]> {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("client_logos")
      .select("id, src, alt")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return [];
    return data as TrustedLogo[];
  } catch {
    return [];
  }
}

export async function TrustedBy() {
  const logos = await loadLogos();
  if (logos.length === 0) return null;

  return (
    <section
      aria-label="Trusted by"
      className="overflow-hidden border-y-[10px] border-[#023048] bg-white sm:border-y-[12px]"
    >
      <div
        className={`${sectionInner} flex flex-col gap-6 py-7 sm:gap-8 sm:py-9 lg:flex-row lg:items-center lg:gap-10 lg:py-10 xl:gap-14`}
      >
        <div className="hidden shrink-0 lg:block">
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs md:text-sm ${textGradient}`}
          >
            We are
          </p>
          <p className="mt-0.5 text-base font-bold text-[#023048] sm:text-xl lg:text-2xl">
            Trusted by:
          </p>
        </div>

        <TrustedByCarousel logos={logos} />
      </div>
    </section>
  );
}
