"use client";

import Image from "next/image";
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
    <section id="services" className="scroll-mt-24 bg-[#023048] py-16 sm:py-24">
      <div className={`${sectionInner} flex flex-col gap-12 lg:gap-16`}>
        {/* Row 1 — full width: label + title | intro + CTA (Figma: items-end justify-between) */}
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[520px] space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.1em] bg-gradient-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
              {servicesSection.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[48px]">
              {servicesSection.title}
            </h2>
          </div>
          <div className="flex w-full max-w-[377px] flex-col gap-4 lg:ml-auto lg:items-end lg:text-right">
            <p className="text-base leading-6 text-white">
              {servicesSection.intro}
            </p>
            <Link
              href="#contact"
              className="inline-flex w-fit shrink-0 rounded-full bg-gradient-to-r from-[#30EAA9] to-[#0798E7] px-8 py-3 text-base font-bold text-white shadow-lg transition hover:opacity-95"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* Row 2 — image | accordion (~38% / ~55% + gap, Figma 485px / 699px) */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-[#001428] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:col-span-5 lg:min-h-[500px]">
            <Image
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
                        ? 'relative overflow-hidden bg-gradient-to-br from-[#30EAA9] to-[#0798E7] p-8 text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]'
                        : 'border border-[#f1f5f9] bg-white p-[25px] text-[#023048] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-6">
                        <span
                          className={`shrink-0 text-xl font-bold tabular-nums leading-7 ${
                            isOpen ? 'text-white' : 'text-[#cbd5e1]'
                          }`}
                        >
                          {n}
                        </span>
                        <span
                          className={`min-w-0 text-xl font-bold leading-7 ${
                            isOpen ? 'text-white' : 'text-[#023048]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
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
                      <p className="mt-4 max-w-lg pl-10 text-sm font-normal leading-5 text-white/95">
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
