"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { IconMenu, IconPhone, IconX } from "@/components/landing/icons";
import { brand, images, nav } from "@/content/landing";
import { sectionInner } from "@/lib/section";

type SiteHeaderProps = {
  /** dark = white text on navy/hero; light = navy text on white pages */
  variant?: "dark" | "light";
  /** Prefix hash links with this path (e.g. "/" on /projects) */
  homePath?: string;
};

function navHref(href: string, homePath: string) {
  if (href.startsWith("#")) {
    return homePath === "/" ? `/${href}` : `${homePath}${href}`;
  }
  return href;
}

export function SiteHeader({
  variant = "dark",
  homePath = "/",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const light = variant === "light";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function closeIfDesktop() {
      if (mq.matches) setMenuOpen(false);
    }
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  const text = light ? "text-[#023048]" : "text-white";
  const navShellMobile = light
    ? "border-[#023048]/15 bg-white"
    : "border-white/20 bg-[#001428]/95";
  const navShellDesktop = light
    ? "lg:border-[#023048]/15 lg:bg-[#023048]/5"
    : "lg:border-white/20 lg:bg-white/10";
  const navHover = light ? "hover:bg-[#023048]/10" : "hover:bg-white/10";
  const iconBtn = light
    ? "text-[#023048] hover:bg-[#023048]/10"
    : "text-white hover:bg-white/10";

  return (
    <header className="relative z-30 pt-[env(safe-area-inset-top)]">
      <div
        className={`${sectionInner} flex flex-col gap-3 py-4 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6`}
      >
        <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:justify-start">
          <Link
            href={homePath === "/" ? "/#home" : homePath}
            className={`shrink-0 text-lg font-semibold tracking-tight lg:w-[120px] ${text}`}
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
              className={`flex h-11 w-11 items-center justify-center rounded-full transition ${iconBtn}`}
              aria-label={`Call ${brand.phone}`}
            >
              <IconPhone className="shrink-0 text-cyan-500" />
            </a>
            <button
              type="button"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition ${iconBtn}`}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
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

        {menuOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        ) : null}

        <nav
          id="site-nav"
          aria-label="Primary"
          className={`inset-x-0 top-full z-40 justify-center lg:static lg:z-auto lg:flex lg:min-w-0 lg:flex-1 lg:px-0 ${
            menuOpen ? "absolute flex" : "hidden"
          }`}
        >
          <div className="w-full px-4 pt-3 sm:px-6 lg:w-auto lg:px-0 lg:pt-0">
            <ul
              className={`flex w-full max-w-full flex-col gap-1 rounded-2xl border p-2 shadow-2xl backdrop-blur-md sm:p-3 lg:w-auto lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-2 lg:gap-y-1 lg:rounded-full lg:px-4 lg:py-2 lg:shadow-none xl:gap-x-8 xl:px-6 ${navShellMobile} ${navShellDesktop}`}
            >
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={navHref(item.href, homePath)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition hover:underline lg:inline-block lg:rounded-none lg:px-3 lg:py-1 lg:text-xs xl:px-4 xl:text-sm ${text} ${navHover}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <a
          href={`tel:${brand.phone.replace(/\s/g, "")}`}
          className={`hidden shrink-0 items-center justify-end gap-2 text-sm font-medium lg:flex lg:min-w-[159px] ${text}`}
        >
          <IconPhone className="shrink-0 text-cyan-500" />
          <span>{brand.phone}</span>
        </a>
      </div>
    </header>
  );
}
