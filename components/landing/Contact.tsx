"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { IconEnvelope, IconMapPin, IconPhone } from "@/components/landing/icons";
import { brand, contactSection } from "@/content/landing";
import { sectionInner } from "@/lib/section";

const projectTypes = [
  "Residential Solar",
  "Commercial / Office",
  "Industrial",
  "UPS / Critical Load",
  "Training / Consultancy",
  "Other",
] as const;

const fieldClass =
  "w-full rounded-xl border-0 bg-white px-4 py-3.5 text-sm text-[#023048] outline-none placeholder:text-[#94A3B8] ring-0 transition focus:ring-2 focus:ring-[#023048]/25 disabled:opacity-70";

const labelClass =
  "text-xs font-bold uppercase tracking-wide text-[#023048]";

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-[#0798E7] to-[#30EAA9] text-white shadow-sm">
      {children}
    </span>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          projectType: data.get("projectType"),
          message: data.get("message"),
        }),
      });

      const payload = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(payload.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  const busy = status === "loading";

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#023048] py-12 sm:py-16 md:py-20 lg:flex lg:h-174.25 lg:min-h-174.25 lg:items-center lg:py-0"
    >
      <div
        className={`${sectionInner} grid w-full min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16`}
      >
        <div className="min-w-0">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl lg:leading-[1.15]">
            Ready to Upgrade Your Power Experience?
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/85">
            {contactSection.intro}
          </p>
          <ul className="mt-10 space-y-5 text-sm text-white sm:text-base">
            <li>
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 transition hover:opacity-90"
              >
                <ContactIcon>
                  <IconPhone className="h-5 w-5" />
                </ContactIcon>
                <span>{brand.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-4 transition hover:opacity-90"
              >
                <ContactIcon>
                  <IconEnvelope className="h-5 w-5" />
                </ContactIcon>
                <span className="break-all">{brand.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <ContactIcon>
                <IconMapPin className="h-5 w-5" />
              </ContactIcon>
              <span>{brand.address}</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex min-w-0 flex-col gap-5 rounded-3xl bg-[linear-gradient(to_top_right,#0798E7_0%,#30EAA9_100%)] p-5 shadow-2xl sm:gap-6 sm:p-8 md:p-10"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Full Name</span>
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="John Doe"
                disabled={busy}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Email Address</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="john@example.com"
                disabled={busy}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Phone Number</span>
              <input
                required
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+234 0000 000"
                disabled={busy}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Project Type</span>
              <select
                name="projectType"
                disabled={busy}
                className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22 fill=%22none%22%3E%3Cpath d=%22M1 1.5L6 6.5L11 1.5%22 stroke=%22%23023048%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E')] bg-size-[12px] bg-position-[right_1rem_center] bg-no-repeat pr-10`}
                defaultValue={projectTypes[0]}
              >
                {projectTypes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>How Can We Help?</span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Tell us about your energy needs..."
              disabled={busy}
              className={`${fieldClass} min-h-[120px] resize-y`}
            />
          </label>

          {status === "success" ? (
            <p className="rounded-xl bg-white/90 px-4 py-3 text-sm font-medium text-[#023048]">
              Thanks — we received your request and will get back to you soon.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl bg-[#023048]/90 px-4 py-3 text-sm font-medium text-white">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 w-full cursor-pointer rounded-xl bg-[#023048] px-4 py-4 text-sm font-semibold text-white transition hover:bg-[#01253a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? "Sending…" : "Submit Consultation Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
