"use client";

import { MarketingImage } from "@/components/landing/MarketingImage";
import Link from "next/link";
import { useState } from "react";
import {
  IconMinusAccordion,
  IconPlusAccordion,
} from "@/components/landing/icons";
import { images, servicesAccordion, servicesSection } from "@/content/landing";
import { sectionInner, textGradient } from "@/lib/section";

export function ServicesAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[#023048] py-12 sm:py-16 md:py-24"
    >
      <div className={`${sectionInner} flex flex-col gap-12 lg:gap-16`}>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-130 space-y-4">
            <p
              className={`text-sm font-bold uppercase tracking-widest ${textGradient}`}
            >
              {servicesSection.eyebrow}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-12">
              {servicesSection.title}
            </h2>
          </div>
          <div className="flex w-full max-w-94.25 flex-col gap-4 lg:ml-auto lg:items-end lg:text-right">
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

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="relative min-h-60 overflow-hidden rounded-2xl bg-[#001428] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:min-h-80 sm:rounded-3xl lg:col-span-5 lg:h-146 lg:min-h-146">
            <MarketingImage
              src={images.bigSol}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 42vw"
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap gap-2 p-4 sm:gap-2.5 sm:p-5">
              {servicesSection.imageTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#023048] shadow-sm sm:px-4 sm:py-1 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
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
                    aria-expanded={isOpen}
                    className={`group relative w-full cursor-pointer overflow-hidden rounded-xl border bg-white p-5 text-left shadow-sm outline-none transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-6 ${
                      isOpen
                        ? "border-0 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                        : "border-[#f1f5f9] hover:border-[#e2e8f0] hover:shadow-md"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 bg-[#023048]/[0.04] transition-opacity duration-300 ease-out ${
                        isOpen
                          ? "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 bg-linear-to-tr from-[#0798E7] to-[#30EAA9] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
                          <span
                            className={`shrink-0 text-lg font-bold tabular-nums leading-7 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xl ${
                              isOpen ? "text-white" : "text-[#94a3b8]"
                            }`}
                          >
                            {n}
                          </span>
                          <span
                            className={`min-w-0 text-base font-bold leading-snug transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xl sm:leading-7 ${
                              isOpen ? "text-white" : "text-[#023048]"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <span
                          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white transition-[border-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-10 sm:w-10 ${
                            isOpen
                              ? "border-transparent text-[#023048] shadow-sm"
                              : "border-[#e2e8f0] text-[#94a3b8]"
                          }`}
                          aria-hidden
                        >
                          <IconPlusAccordion
                            className={`absolute h-5 w-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isOpen
                                ? "scale-75 opacity-0"
                                : "scale-100 opacity-100"
                            }`}
                          />
                          <IconMinusAccordion
                            className={`absolute h-5 w-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isOpen
                                ? "scale-100 opacity-100"
                                : "scale-75 opacity-0"
                            }`}
                          />
                        </span>
                      </div>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="mt-3 max-w-lg pl-0 text-sm font-normal leading-relaxed text-white/95 sm:mt-4 sm:pl-11 sm:leading-5">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
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
