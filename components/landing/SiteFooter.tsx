"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { brand } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function SiteFooter() {
  function onNewsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="bg-black py-16 text-white">
      <div className={sectionInner}>
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Request a consultation session
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Our teams will help with you with your enquiries regarding your
              power, cooling, or IT needs and help you achieve best practice in
              your infrastructure
            </p>
          </div>
          <form
            onSubmit={onNewsletter}
            className="flex w-full max-w-md items-stretch gap-0 overflow-hidden rounded-full border border-white/15 bg-[#0a0a0a] pl-4"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="shrink-0 bg-green-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-300"
              aria-label="Submit email"
            >
              →
            </button>
          </form>
        </div>
        <div className="grid gap-10 py-12 sm:grid-cols-3">
          <div>
            <p className="text-sm text-white/55">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Contact Us</p>
            <p className="mt-2 text-sm text-white/70">{brand.phone}</p>
            <p className="text-sm text-white/70">{brand.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Location</p>
            <p className="mt-2 text-sm text-white/70">{brand.address}</p>
          </div>
        </div>
        <div className="flex justify-end gap-4 pb-4 text-sm">
          <Link
            href="https://twitter.com"
            className="text-white/50 hover:text-white"
            aria-label="Twitter"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="4"
                stroke="#64748B"
                strokeWidth="2"
              />
              <path
                d="M7 10V17"
                stroke="#64748B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="7" cy="7" r="1.5" fill="#64748B" />
              <path
                d="M11 17V13.5C11 12.12 12.12 11 13.5 11C14.88 11 16 12.12 16 13.5V17"
                stroke="#64748B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            className="text-white/50 hover:text-white"
            aria-label="LinkedIn"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4.55705C23.117 4.94905 22.168 5.21305 21.172 5.33205C22.189 4.72305 22.97 3.75805 23.337 2.60805C22.386 3.17205 21.332 3.58205 20.21 3.80305C19.313 2.84605 18.032 2.24805 16.616 2.24805C13.437 2.24805 11.101 5.21405 11.819 8.29305C7.728 8.08805 4.1 6.12805 1.671 3.14905C0.381 5.36205 1.002 8.25705 3.194 9.72305C2.388 9.69705 1.628 9.47605 0.965 9.10705C0.911 11.388 2.546 13.522 4.914 13.997C4.221 14.185 3.462 14.229 2.69 14.081C3.316 16.037 5.134 17.46 7.29 17.5C5.22 19.123 2.612 19.848 0 19.54C2.179 20.937 4.768 21.752 7.548 21.752C16.69 21.752 21.855 14.031 21.543 7.10605C22.505 6.41105 23.34 5.54405 24 4.55705Z"
                fill="#64748B"
              />
            </svg>
          </Link>
          <Link
            href="https://instagram.com"
            className="text-white/50 hover:text-white"
            aria-label="Instagram"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="6"
                stroke="#64748B"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="4" stroke="#64748B" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#64748B" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
