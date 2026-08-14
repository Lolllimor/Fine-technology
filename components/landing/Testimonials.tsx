"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/content/landing";
import { sectionInner } from "@/lib/section";
import { MarketingImage } from "@/components/landing/MarketingImage";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];
  const next = testimonials[(i + 1) % testimonials.length];

  function prev() {
    setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  }

  function nextSlide() {
    setI((v) => (v + 1) % testimonials.length);
  }

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-[linear-gradient(to_top_right,#0798E7_0%,#30EAA9_100%)] py-12 sm:py-16 md:py-20 lg:flex lg:h-[912px] lg:min-h-[912px] lg:items-center lg:py-0">
      <div className={sectionInner}>
        <div className="mx-auto w-full text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-white/90">
            Testimonials
          </p>
          <h2 className="mx-auto mt-3 max-w-[720px] px-1 text-xl font-bold text-[#023048] sm:text-3xl lg:text-5xl">
            Hear From Those Who Power the Future With Us
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {testimonials.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={idx === i}
                className={`relative h-11 w-11 overflow-hidden rounded-full border-2 transition ${
                  idx === i
                    ? "border-[#C5F015]"
                    : "border-white/80 opacity-90 hover:opacity-100"
                }`}
              >
                <MarketingImage
                  src={item.avatar}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </button>
            ))}
          </div>

          <div
            className="relative mt-10 w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-stretch gap-4 sm:gap-6 lg:gap-4">
              <div className="relative mr-8 h-64 w-full shrink-0 overflow-hidden rounded-3xl sm:h-80 md:h-auto md:w-[280px] lg:h-[332px] lg:w-[309px]">
                <MarketingImage
                  key={t.image}
                  src={t.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 309px"
                />
              </div>

              <figure className="relative flex h-auto min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-3xl bg-white p-6 text-left shadow-xl sm:p-8 md:p-10 lg:h-[332px] lg:min-h-[332px]">
                <svg
                  aria-hidden
                  className="pointer-events-none absolute left-5 top-4 z-0 h-10 w-12 text-[#94A3B8]/20 sm:left-7 sm:top-5 sm:h-12 sm:w-14 md:left-8"
                  viewBox="0 0 80 64"
                  fill="currentColor"
                >
                  <path d="M0 36.8C0 22.4 7.5 12.3 22.4 6.4L28.8 16C20.3 19.7 16 25.1 16 32H30.4V64H0V36.8ZM49.6 36.8C49.6 22.4 57.1 12.3 72 6.4L78.4 16C69.9 19.7 65.6 25.1 65.6 32H80V64H49.6V36.8Z" />
                </svg>
                <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                  <blockquote className="text-base leading-relaxed text-[#002D4C] sm:text-lg md:text-xl md:leading-8">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <MarketingImage
                        src={t.avatar}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="font-bold text-[#002D4C]">{t.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </div>
              </figure>

              <div className="relative hidden h-64 w-30 shrink-0 overflow-hidden rounded-l-3xl sm:block sm:h-80 md:w-[180px] lg:h-[332px] lg:w-[220px]">
                <MarketingImage
                  key={next.image}
                  src={next.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-white/15"
                aria-label="Previous testimonial"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#023048] text-white transition hover:bg-[#01253a]"
                aria-label="Next testimonial"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
