import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconPhone } from "@/components/landing/icons";
import { brand, images, nav } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[min(100vh,920px)] overflow-hidden bg-[#001428]"
    >
      <div className="absolute inset-0">
        <Image
          src={images.heroHouse}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

      </div>

      <header className="relative z-20">
        <div
          className={`${sectionInner} flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6`}
        >
          <Link
            href="#home"
            className="shrink-0 text-lg font-semibold tracking-tight text-white lg:w-[120px]"
          >
            <Image
              src={images.logo}
              alt={brand.name}
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex flex-1 justify-center px-1">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md sm:gap-x-8 sm:px-6 sm:py-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs font-medium text-white transition hover:opacity-90 hover:underline sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="flex shrink-0 items-center justify-end gap-2 text-xs font-medium text-white sm:text-sm lg:min-w-[159px]"
          >
            <IconPhone className="shrink-0 text-cyan-300" />
            <span className="hidden sm:inline">{brand.phone}</span>
          </a>
        </div>
      </header>

      <div className="relative z-10 pb-28 pt-8 sm:pb-36 sm:pt-10">
        <div
          className={`${sectionInner} flex flex-col items-center text-center`}
        >
          <h1 className="max-w-[896px] font-technovier text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            <span className="block">The Future of </span>
            <span className="block">
              Energy, <span className="text-[#023048]">Refined</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[672px] font-sans text-base leading-7 text-white/85 sm:text-xl sm:leading-8">
            Experience the best power backup solutions, lighting, earthing system
            and grounding solutions, environmental monitoring solutions .
          </p>

          <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex w-full flex-1 justify-center md:justify-end">
              <div className="flex w-full max-w-[280px] items-center gap-4 rounded-3xl bg-white/40 p-3 sm:max-w-none">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] text-sm font-medium text-white">
                  24/7
                </div>
                <div className="min-w-0 text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-[#023048]/60">
                    Energy Storage
                  </span>
                  <span className="block text-lg font-bold text-[#023048]">
                    Continuous Power
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-center">
              <Link
                href="#about"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#001f3f] shadow-lg transition hover:bg-white/90"
              >
                Learn more
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7]"
                >
                  <IconArrowRight />
                </span>
              </Link>
            </div>

            <div className="flex w-full flex-1 justify-center md:justify-start">
              <div className="flex w-full max-w-[280px] items-center gap-4 rounded-3xl bg-white/40 p-3 sm:max-w-none">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] text-xs font-bold text-white">
                  7.6kW
                </div>
                <div className="min-w-0 text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-[#023048]/60">
                    Inverter Power
                  </span>
                  <span className="block text-lg font-bold text-[#023048]">
                    High Efficiency
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
