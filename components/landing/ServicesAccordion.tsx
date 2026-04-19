"use client";

import { MarketingImage } from "@/components/landing/MarketingImage";
import Link from "next/link";
import { useState } from "react";
import {
  IconMinusAccordion,
  IconPlusAccordion,
} from "@/components/landing/icons";
import { images, servicesAccordion, servicesSection } from "@/content/landing";
import { sectionInner } from "@/lib/section";

const defaultOpen = servicesAccordion.findIndex((s) =>
  s.title.includes("UPS")
);

export function ServicesAccordion() {
  const [open, setOpen] = useState(defaultOpen >= 0 ? defaultOpen : 0);

  return (
    <section id="services" className="scroll-mt-24 bg-[#023048] py-12 sm:py-16 md:py-24">
      <div className={`${sectionInner} flex flex-col gap-12 lg:gap-16`}>
        {/* Row 1 — full width: label + title | intro + CTA (Figma: items-end justify-between) */}
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[520px] space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
              {servicesSection.eyebrow}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[48px]">
              {servicesSection.title}
            </h2>
          </div>
          <div className="flex w-full max-w-[377px] flex-col gap-4 lg:ml-auto lg:items-end lg:text-right">
            <p className="text-sm leading-6 text-white sm:text-base">
              {servicesSection.intro}
            </p>
            <Link
              href="#contact"
              className="inline-flex w-full shrink-0 justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95 sm:w-fit sm:px-8 sm:text-base"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* Row 2 — image | accordion (~38% / ~55% + gap, Figma 485px / 699px) */}
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl bg-[#001428] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:min-h-[320px] sm:rounded-3xl lg:col-span-5 lg:min-h-[500px]">
            <MarketingImage
              src={images.bigSol}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 42vw"
            />
          </div>

          <ul className="flex min-w-0 flex-col gap-4 lg:col-span-7">
            {servicesAccordion.map((item, i) => {
              const isOpen = open === i;
              const n = i + 1;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`w-full rounded-xl text-left transition ${
                      isOpen
                        ? 'relative overflow-hidden bg-linear-to-br from-[#30EAA9] to-[#0798E7] p-5 text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] sm:p-8'
                        : 'border border-[#f1f5f9] bg-white p-4 text-[#023048] hover:bg-slate-50 sm:p-[25px]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
                      <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-6">
                        <span
                          className={`shrink-0 text-lg font-bold tabular-nums leading-7 sm:text-xl ${
                            isOpen ? 'text-white' : 'text-[#cbd5e1]'
                          }`}
                        >
                          {n}
                        </span>
                        <span
                          className={`min-w-0 text-base font-bold leading-snug sm:text-xl sm:leading-7 ${
                            isOpen ? 'text-white' : 'text-[#023048]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:h-10 sm:w-10 ${
                          isOpen
                            ? 'border-white/30 bg-white text-[#023048]'
                            : 'border-[#e2e8f0] bg-white text-[#64748b]'
                        }`}
                        aria-hidden
                      >
                        {isOpen ? (
                          <IconMinusAccordion className="h-5 w-5" />
                        ) : (
                          <IconPlusAccordion className="h-5 w-5" />
                        )}
                      </span>
                    </div>
                    {isOpen ? (
                      <p className="mt-3 max-w-lg pl-0 text-sm font-normal leading-relaxed text-white/95 sm:mt-4 sm:pl-10 sm:leading-5">
                        {item.body}
                      </p>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
