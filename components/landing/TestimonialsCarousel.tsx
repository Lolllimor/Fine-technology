"use client";

import {
  FormEvent,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import { sectionInner } from "@/lib/section";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { IconAvatar } from "@/components/landing/icons";

export type CarouselTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  avatar: string;
};

const fieldClass =
  "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#023048] outline-none placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#023048]/25 disabled:opacity-70";

export function TestimonialsCarousel({
  items,
}: {
  items: CarouselTestimonial[];
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  function clearAvatarPreview() {
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }

  function onAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    clearAvatarPreview();
    if (file && file.type.startsWith("image/")) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  const len = items.length;
  const safeI = len > 0 ? Math.min(i, len - 1) : 0;
  const t = items[safeI];
  const next = items[(safeI + 1) % len];

  function prev() {
    setI((v) => (v - 1 + len) % len);
  }

  function nextSlide() {
    setI((v) => (v + 1) % len);
  }

  useEffect(() => {
    if (paused || len < 2) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % len);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, len]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const avatar = data.get("avatar");

    setStatus("loading");
    setErrorMessage("");

    try {
      if (!(avatar instanceof File) || avatar.size === 0) {
        setStatus("error");
        setErrorMessage("Please upload a photo.");
        return;
      }

      const { uploadToCloudinary } = await import("@/lib/cloudinary-upload");
      const avatarUrl = await uploadToCloudinary(
        avatar,
        "fine-technology/testimonials",
      );

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          role: data.get("role"),
          quote: data.get("quote"),
          avatarUrl,
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
      clearAvatarPreview();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
    }
  }

  if (!t) return null;

  const busy = status === "loading";

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
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={idx === safeI}
                className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 bg-white/20 text-white transition ${
                  idx === safeI
                    ? "border-[#C5F015]"
                    : "border-white/80 opacity-90 hover:opacity-100"
                }`}
              >
                {item.avatar ? (
                  <MarketingImage
                    src={item.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                ) : (
                  <IconAvatar className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>

          <div
            className="relative mt-10 w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-stretch gap-4 sm:gap-6 lg:gap-4">
              <div className="relative h-auto w-full shrink-0 overflow-hidden rounded-3xl md:w-[280px] lg:h-[332px] lg:w-[309px]">
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
                  <blockquote
                    title={t.quote}
                    className="line-clamp-5 text-base leading-relaxed text-[#002D4C] sm:text-lg md:text-xl md:leading-8"
                  >
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F1F5F9] text-[#94A3B8]">
                      {t.avatar ? (
                        <MarketingImage
                          src={t.avatar}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <IconAvatar className="h-6 w-6" />
                      )}
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

              <div className="relative hidden shrink-0 overflow-hidden rounded-l-3xl lg:block lg:h-[332px] lg:w-[220px]">
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

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
              <button
                type="button"
                onClick={() => {
                  setFormOpen(true);
                  setStatus("idle");
                  setErrorMessage("");
                  clearAvatarPreview();
                }}
                className="ml-2 cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#023048] shadow transition hover:bg-white/95"
              >
                Share your experience
              </button>
            </div>
          </div>
        </div>
      </div>

      {formOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-form-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFormOpen(false);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="testimonial-form-title"
                  className="text-lg font-bold text-[#023048]"
                >
                  Share your experience
                </h3>
                <p className="mt-1 text-sm text-[#64748B]">
                  Submissions are reviewed before appearing on the site.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-full p-2 text-[#64748B] transition hover:bg-[#F1F5F9]"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-left">
                <span className="text-xs font-bold uppercase tracking-wide text-[#023048]">
                  Full name
                </span>
                <input
                  required
                  name="fullName"
                  disabled={busy}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-left">
                <span className="text-xs font-bold uppercase tracking-wide text-[#023048]">
                  Role
                </span>
                <input
                  required
                  name="role"
                  disabled={busy}
                  className={fieldClass}
                  placeholder="e.g. Facilities Manager"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-left">
                <span className="text-xs font-bold uppercase tracking-wide text-[#023048]">
                  Your experience
                </span>
                <textarea
                  required
                  name="quote"
                  rows={4}
                  disabled={busy}
                  className={`${fieldClass} resize-y`}
                  placeholder="Tell others about working with Fine Technology…"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-left">
                <span className="text-xs font-bold uppercase tracking-wide text-[#023048]">
                  Photo
                </span>
                <input
                  required
                  type="file"
                  name="avatar"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={busy}
                  onChange={onAvatarChange}
                  className="text-sm text-[#023048] file:mr-3 file:rounded-lg file:border-0 file:bg-[#023048] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </label>

              {avatarPreview ? (
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#F1F5F9] ring-1 ring-[#E2E8F0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarPreview}
                      alt="Photo preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-[#64748B]">Photo preview</p>
                </div>
              ) : null}

              {status === "success" ? (
                <p className="rounded-xl bg-[#ECFDF5] px-4 py-3 text-sm font-medium text-[#065F46]">
                  Thanks — we received your story and will review it soon.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="rounded-xl bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#991B1B]">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={busy || status === "success"}
                className="mt-1 w-full cursor-pointer rounded-xl bg-[#023048] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#01253a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {busy ? "Submitting…" : "Submit testimonial"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
