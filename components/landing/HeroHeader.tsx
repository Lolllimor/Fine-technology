"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { IconMenu, IconPhone, IconX } from "@/components/landing/icons";
import { brand, images, nav } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function HeroHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function closeIfDesktop() {
      if (mq.matches) setMenuOpen(false);
    }
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  return (
    <header className="relative z-30 pt-[env(safe-area-inset-top)]">
      <div
        className={`${sectionInner} flex flex-col gap-3 py-4 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6`}
      >
        <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:justify-start">
          <Link
            href="#home"
            className="shrink-0 text-lg font-semibold tracking-tight text-white lg:w-[120px]"
            onClick={() => setMenuOpen(false)}
          >
            <MarketingImage
              src={images.logo}
              alt={brand.name}
              width={100}
              height={40}
              className="h-9 w-auto sm:h-10"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
              aria-label={`Call ${brand.phone}`}
            >
              <IconPhone className="shrink-0 text-cyan-300" />
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
              aria-expanded={menuOpen}
              aria-controls="hero-site-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <nav
          id="hero-site-nav"
          aria-label="Primary"
          className={`min-w-0 flex-1 justify-center px-0 sm:px-1 ${
            menuOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          <ul className="flex w-full max-w-full flex-col gap-1 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:p-3 lg:w-auto lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-2 lg:gap-y-1 lg:rounded-full lg:px-4 lg:py-2 xl:gap-x-8 xl:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:underline lg:inline-block lg:rounded-none lg:px-3 lg:py-1 lg:text-xs xl:px-4 xl:text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`tel:${brand.phone.replace(/\s/g, "")}`}
          className="hidden shrink-0 items-center justify-end gap-2 text-sm font-medium text-white lg:flex lg:min-w-[159px]"
        >
          <IconPhone className="shrink-0 text-cyan-300" />
          <span>{brand.phone}</span>
        </a>
      </div>
    </header>
  );
}
