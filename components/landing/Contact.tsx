"use client";

import { FormEvent } from "react";
import { IconEnvelope, IconMapPin, IconPhone } from "@/components/landing/icons";
import { brand, contactSection } from "@/content/landing";
import { sectionInner } from "@/lib/section";

const projectTypes = [
  "Residential solar / backup",
  "Commercial / office",
  "Industrial",
  "UPS / critical load",
  "Training / consultancy",
  "Other",
] as const;

export function Contact() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-[#001f3f] py-16 sm:py-20">
      <div className={`${sectionInner} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to Upgrade Your Power Experience?
          </h2>
          <p className="mt-4 text-base leading-6 text-white/75">
            {contactSection.intro}
          </p>
          <ul className="mt-10 space-y-5 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <IconPhone className="mt-0.5 shrink-0 text-cyan-300" />
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="hover:underline"
              >
                {brand.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IconEnvelope className="mt-0.5 shrink-0 text-cyan-300" />
              <a href={`mailto:${brand.email}`} className="hover:underline">
                {brand.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IconMapPin className="mt-0.5 shrink-0 text-cyan-300" />
              <span className="text-white/80">{brand.address}</span>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-cyan-400 via-teal-400 to-green-400 p-[2px] shadow-xl">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 rounded-[22px] bg-[#001428] p-6 sm:p-8"
          >
            <label className="flex flex-col gap-2 text-sm font-medium text-white/90">
              Full Name
              <input
                required
                name="name"
                autoComplete="name"
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-[#001f3f] outline-none ring-cyan-400/50 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-white/90">
              Email Address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-[#001f3f] outline-none ring-cyan-400/50 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-white/90">
              Phone Number
              <input
                required
                type="tel"
                name="phone"
                autoComplete="tel"
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-[#001f3f] outline-none ring-cyan-400/50 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-white/90">
              Project Type
              <select
                name="projectType"
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-[#001f3f] outline-none ring-cyan-400/50 focus:ring-2"
                defaultValue={projectTypes[0]}
              >
                {projectTypes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-white/90">
              Your Message
              <textarea
                required
                name="message"
                rows={4}
                className="resize-y rounded-xl border border-white/10 bg-white px-4 py-3 text-[#001f3f] outline-none ring-cyan-400/50 focus:ring-2"
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-xl bg-[#001f3f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#002a52]"
            >
              Submit Consultation Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
