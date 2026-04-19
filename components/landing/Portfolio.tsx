import Image from "next/image";
import Link from "next/link";
import { images, portfolioSection, projects } from "@/content/landing";
import { sectionInner } from "@/lib/section";

const img = (key: keyof typeof images) => images[key];

export function Portfolio() {
  const [main, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-24 bg-[#023048] py-16 sm:py-20">
      <div className={sectionInner}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
              {portfolioSection.eyebrow}
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl lg:leading-tight">
              {portfolioSection.title}
            </h2>
          </div>
          <div className="flex max-w-[377px] flex-col items-start gap-4 lg:items-end lg:text-right">
            <p className="text-base leading-6 text-white/90">
              {portfolioSection.intro}
            </p>
            <Link
              href="#contact"
              className="inline-flex rounded-full bg-linear-to-r from-[#30EAA9] to-[#0798E7] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
            >
              {portfolioSection.ctaLabel}
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-7">
            <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-[#001428]">
              <Image
                src={img(main.imageKey)}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 58vw"
              />
            </div>
            <p className="mt-4 text-sm text-white/65">{main.year}</p>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {main.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              {main.description}
            </p>
          </article>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((p) => (
              <article key={p.title}>
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-[#001428]">
                  <Image 
                    src={img(p.imageKey)}
                    alt=""
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 42vw"
                  />  
                </div>
                <p className="mt-2 text-sm text-white/65">{p.year}</p>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {p.title}
                </h3>
                {p.large && (
                  <p className="mt-1 text-sm text-white/65">{p.description}</p>
                )}
                
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
