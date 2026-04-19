import { MarketingImage } from "@/components/landing/MarketingImage";
import Link from "next/link";
import { about, images } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-hidden bg-[#023048] py-12 font-sans sm:py-16 md:py-24"
    >
      <div className={sectionInner}>
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:rounded-2xl">
              <MarketingImage
                src={images.batteryRack}
                alt=""
                fill
                className="z-10 object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 h-28 w-28 rounded-xl bg-[linear-gradient(219.99deg,#30EAA9_17.055%,#0798E7_81.132%)] sm:-bottom-10 sm:-right-10 sm:h-48 sm:w-48 sm:rounded-2xl"
              aria-hidden
            />
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <p className="text-xs font-bold uppercase tracking-widest bg-linear-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent sm:text-sm">
              {about.eyebrow}
            </p>
            <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl sm:leading-tight md:text-3xl lg:text-[2.75rem] lg:leading-[1.15]">
              <span>{about.headlineBefore}</span>
              <span className="bg-linear-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
                {about.headlineAccent}
              </span>
            </h2>

            <div className="grid w-full max-w-md grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 md:gap-12">
              <div className="min-w-0">
                <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl md:text-4xl">
                  12+
                </p>
                <p className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                  Years of Experience
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl md:text-4xl">
                  140+
                </p>
                <p className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                  Power Backup Solutions
                </p>
              </div>
            </div>

            <p className="max-w-[512px] text-sm leading-relaxed text-white/80 sm:text-base sm:leading-6">
              {about.body}
            </p>

            <div>
              <Link
                href="#contact"
                className="inline-flex w-full justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 sm:w-auto"
              >
                Read Our Story
              </Link>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <div className="relative mx-auto h-20 w-full max-w-[152px] overflow-hidden rounded-2xl border border-white/10 sm:mx-0 sm:h-24 sm:rounded-[30px]">
                <MarketingImage
                  src={images.industrialRoom}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 152px, 152px"
                />
              </div>
              <div className="relative mx-auto h-20 w-full max-w-full overflow-hidden rounded-2xl border border-white/10 sm:mx-0 sm:h-24 sm:max-w-[276px] sm:rounded-[30px]">
                <MarketingImage
                  src={images.projectMain}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 276px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
