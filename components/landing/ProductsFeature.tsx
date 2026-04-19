import { MarketingImage } from "@/components/landing/MarketingImage";
import Link from "next/link";
import { IconCheck } from "@/components/landing/icons";
import { images, productChecklist, productsSection } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function ProductsFeature() {
  return (
    <section className="relative min-h-[520px] lg:min-h-[788px] overflow-hidden bg-[#001428]">
      <div className="absolute inset-0">
        <MarketingImage
          src={images.solarFarm}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      
      </div>
      <div
        className={`${sectionInner} relative z-10 grid items-center gap-8 py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-24 lg:grid-cols-2`}
      >
        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
            {productsSection.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#001f3f] sm:text-3xl lg:text-4xl">
            {productsSection.title}
          </h2>
          <ul className="mt-8 space-y-4">
            {productChecklist.map((line) => (
              <li key={line} className="flex gap-3 text-sm font-semibold text-[#023048]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#30EAA9] to-[#0798E7] text-white"
                  aria-hidden
                >
                  <IconCheck className="text-white" />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 sm:mt-10">
            <Link
              href="#contact"
              className="inline-flex w-full justify-center rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 sm:w-auto sm:px-8"
            >
              {productsSection.ctaLabel}
            </Link>
          </div>
        </div>
        <div className="relative mt-0 hidden min-h-[380px] overflow-hidden rounded-3xl lg:mt-0 lg:block lg:aspect-auto">
          <MarketingImage
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
