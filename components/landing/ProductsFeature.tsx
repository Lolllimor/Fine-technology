import Image from "next/image";
import Link from "next/link";
import { IconCheck } from "@/components/landing/icons";
import { images, productChecklist, productsSection } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function ProductsFeature() {
  return (
    <section className="relative min-h-[520px] lg:min-h-[788px] overflow-hidden bg-[#001428]">
      <div className="absolute inset-0">
        <Image
          src={images.solarFarm}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
      
      </div>
      <div
        className={`${sectionInner} relative z-10 grid items-center gap-10 py-16 sm:gap-12 sm:py-24 lg:grid-cols-2`}
      >
        <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.1em] bg-gradient-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
            {productsSection.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#001f3f] sm:text-3xl lg:text-4xl">
            {productsSection.title}
          </h2>
          <ul className="mt-8 space-y-4">
            {productChecklist.map((line) => (
              <li key={line} className="flex gap-3 text-sm font-semibold text-[#023048]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#30EAA9] to-[#0798E7] text-white"
                  aria-hidden
                >
                  <IconCheck className="text-white" />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="#contact"
              className="inline-flex rounded-full bg-gradient-to-r from-[#30EAA9] to-[#0798E7] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
              {productsSection.ctaLabel}
            </Link>
          </div>
        </div>
        <div className="relative mt-2 aspect-[4/3] min-h-[280px] overflow-hidden rounded-3xl sm:min-h-[320px] lg:mt-0 lg:aspect-auto lg:min-h-[380px]">
          <Image
            src={images.technician}
            alt=""
            fill
            className="object-cover object-top hidden"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
