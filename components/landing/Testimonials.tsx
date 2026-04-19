"use client";

import { useState } from "react";
import { images, testimonials } from "@/content/landing";
import { sectionInner } from "@/lib/section";
import { MarketingImage } from "@/components/landing/MarketingImage";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="bg-linear-to-bl from-[#30EAA9] to-[#0798E7] py-12 sm:py-16 md:py-20">
      <div className={sectionInner}>
        <div className="mx-auto w-full max-w-8xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-white/90">
            Testimonials
          </p>
          <h2 className="mx-auto mt-3 max-w-[680px] px-1 text-xl font-bold text-[#023048] sm:text-3xl lg:text-5xl">
            <span className="block sm:inline">Hear From Those Who Power </span>
            <span className="block sm:inline">the Future With Us</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {testimonials.map((item) => (
              <span
                key={item.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#001428]/20 bg-white text-xs font-semibold text-[#001428]"
                aria-hidden
              >
                {item.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
            ))}
          </div>
          <div className="relative mt-10 w-full">
            <div className="flex flex-col gap-8 md:flex-row md:items-stretch w-full">
              <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-3xl md:h-auto md:min-h-0 md:w-[309px]">
                <MarketingImage
                  src={images.batteryRack}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 309px"
                />
              </div>
              <figure className="flex w-full min-w-0 max-w-2xl flex-1 flex-col rounded-2xl bg-white p-6 text-left shadow-xl sm:rounded-3xl sm:p-10 md:mx-0">
                <blockquote className="text-left text-base leading-relaxed text-slate-700 sm:text-lg">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-left">
                  <p className="font-semibold text-[#001f3f]">{t.name}</p>
                  <p className="text-sm text-slate-600">{t.role}</p>
                </figcaption>
              </figure>
              <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-3xl md:h-auto md:min-h-0 md:w-[309px]">
                <MarketingImage
                  src={images.batteryRack}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 309px"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setI(
                    (v) => (v - 1 + testimonials.length) % testimonials.length,
                  )
                }
                className="rounded-full border border-[#001428]/30 bg-white/80 px-3 py-2 text-sm font-medium text-[#001428] transition hover:bg-white"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      idx === i ? 'bg-[#001428]' : 'bg-[#001428]/25'
                    }`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setI((v) => (v + 1) % testimonials.length)}
                className="rounded-full border border-[#001428]/30 bg-white/80 px-3 py-2 text-sm font-medium text-[#001428] transition hover:bg-white"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
