import { MarketingImage } from "@/components/landing/MarketingImage";
import Link from "next/link";
import { IconArrowRight } from "@/components/landing/icons";
import { HeroHeader } from "@/components/landing/HeroHeader";
import { images } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[min(80vh,920px)] overflow-hidden bg-[#001428] min-[1440px]:h-225 min-[1440px]:min-h-225"
    >
      <div className="absolute inset-0 overflow-hidden">
        <MarketingImage
          src={images.heroHouse}
          alt=""
          fill
          priority
          className="object-cover object-top "
          sizes="100vw"
        />
      </div>

      <HeroHeader />

      <div className="relative z-10 pb-24 pt-6 sm:pb-36 sm:pt-10">
        <div
          className={`${sectionInner} flex flex-col items-center text-center`}
        >
          <h1 className="max-w-4xl font-technovier text-3xl font-normal leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            <span className="block">The Future of </span>
            <span className="block">
              Energy, <span className="text-[#023048]">Refined</span>
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-5xl px-1 font-sans text-sm leading-6 text-white/85 sm:mt-6 sm:text-base sm:leading-7 md:text-xl md:leading-8">
            Experience the best power backup solutions, lighting, earthing
            system and grounding solutions, environmental monitoring solutions .
          </p>

          <div className="mt-8 flex w-full max-w-5xl flex-col items-center gap-6 sm:mt-10 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
     
              <div className="flex w-full lg:max-w-63 items-center gap-4 rounded-3xl bg-white/40 p-3 sm:max-w-none">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] text-base font-normal text-white">
                  24/7
                </div>
                <div className="min-w-0 text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#023048]/60">
                    Energy Storage
                  </span>
                  <span className="block text-lg font-bold text-[#023048]">
                    Continuous Power
                  </span>
                </div>
              </div>
     

            <div className="flex shrink-0 justify-center">
              <Link
                href="#about"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#001f3f] shadow-lg transition hover:bg-white/90"
              >
                Learn more
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7]"
                >
                  <IconArrowRight />
                </span>
              </Link>
            </div>

              <div className="flex w-full lg:max-w-63 items-center gap-4 rounded-3xl bg-white/40 p-3 sm:max-w-none">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] text-xs font-bold text-white">
                  7.6kW
                </div>
                <div className="min-w-0 text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-[#023048]/60">
                    Inverter Power
                  </span>
                  <span className="block text-lg font-bold text-[#023048]">
                    High Efficiency
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
