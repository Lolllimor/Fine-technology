"use client";

import { MarketingImage } from "@/components/landing/MarketingImage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { about, images } from "@/content/landing";
import { sectionInner, textGradient } from "@/lib/section";

const gallery = [
  images.batteryRack,
  images.industrialRoom,
  images.projectMain,
] as const;

const THUMB_LAYOUT = [
  "relative h-20 w-full max-w-[152px] overflow-hidden rounded-2xl border sm:h-24 sm:rounded-[30px]",
  "relative h-20 w-full max-w-full overflow-hidden rounded-2xl border sm:h-24 sm:max-w-[276px] sm:rounded-[30px]",
] as const;

const ease = "duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function About() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const thumbIndexes = [
    (active + 1) % gallery.length,
    (active + 2) % gallery.length,
  ];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % gallery.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-hidden bg-[#023048] py-12 font-sans sm:py-16 md:py-24"
    >
      <div className={sectionInner}>
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:rounded-2xl">
              {gallery.map((src, index) => {
                const isActive = index === active;
                return (
                  <MarketingImage
                    key={src}
                    src={src}
                    alt=""
                    fill
                    className={`object-cover transition-[opacity,transform,filter] ${ease} motion-reduce:transition-none ${
                      isActive
                        ? "z-10 translate-y-0 scale-100 opacity-100 blur-0"
                        : "z-0 translate-y-3 scale-[1.02] opacity-0 blur-[2px]"
                    }`}
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                );
              })}
            </div>
            <div
              className="absolute -bottom-6 -right-6 h-28 w-28 rounded-xl bg-[linear-gradient(219.99deg,#30EAA9_17.055%,#0798E7_81.132%)] sm:-bottom-10 sm:-right-10 sm:h-48 sm:w-48 sm:rounded-2xl"
              aria-hidden
            />
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <p
              className={`text-xs font-bold uppercase tracking-widest sm:text-sm ${textGradient}`}
            >
              {about.eyebrow}
            </p>
            <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl sm:leading-tight md:text-3xl lg:text-[2.75rem] lg:leading-[1.15]">
              <span>{about.headlineBefore}</span>
              <span className={textGradient}>{about.headlineAccent}</span>
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

            <p className="max-w-lg text-sm leading-relaxed text-white/80 sm:text-base sm:leading-6">
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

            <div
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {thumbIndexes.map((thumbIndex, slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setActive(thumbIndex)}
                  aria-label={`Show image ${thumbIndex + 1}`}
                  className={`mx-auto border-white/10 transition-[border-color] ${ease} hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mx-0 ${THUMB_LAYOUT[slot]}`}
                >
                  {gallery.map((src, index) => (
                    <MarketingImage
                      key={src}
                      src={src}
                      alt=""
                      fill
                      className={`object-cover transition-opacity ${ease} motion-reduce:transition-none ${
                        index === thumbIndex ? "opacity-100" : "opacity-0"
                      }`}
                      sizes={
                        slot === 0
                          ? "(max-width:640px) 152px, 152px"
                          : "(max-width:640px) 100vw, 276px"
                      }
                    />
                  ))}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
