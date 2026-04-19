import Image from "next/image";
import Link from "next/link";
import { about, images } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#023048] py-16 font-sans sm:py-24"
    >
      <div className={sectionInner}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <Image
                src={images.batteryRack}
                alt=""
                fill
                className="object-cover z-10"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute -bottom-10 -right-10 h-48 w-48 rounded-2xl bg-[linear-gradient(219.99deg,#30EAA9_17.055%,#0798E7_81.132%)]"
              aria-hidden
            />
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <p className="text-sm font-bold uppercase tracking-[0.1em] bg-gradient-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
              {about.eyebrow}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.75rem] lg:leading-[1.15]">
              <span>{about.headlineBefore}</span>
              <span className="bg-gradient-to-r from-[#30EAA9] to-[#0798E7] bg-clip-text text-transparent">
                {about.headlineAccent}
              </span>
            </h2>

            <div className="grid w-full max-w-md grid-cols-2 gap-8 sm:gap-12">
              <div>
                <p className="text-3xl font-bold text-white sm:text-4xl">12+</p>
                <p className="mt-1 text-sm text-white/70">Years of Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white sm:text-4xl">
                  140+
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Power Backup Solutions
                </p>
              </div>
            </div>

            <p className="max-w-[512px] text-base leading-6 text-white/80">
              {about.body}
            </p>

            <div>
              <Link
                href="#contact"
                className="inline-flex rounded-full bg-gradient-to-r from-[#30EAA9] to-[#0798E7] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
              >
                Read Our Story
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="relative h-24 w-[152px] shrink-0 overflow-hidden rounded-[30px] border border-white/10">
                <Image
                  src={images.industrialRoom}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="152px"
                />
              </div>
              <div className="relative h-24 w-[276px] shrink-0 overflow-hidden rounded-[30px] border border-white/10">
                <Image
                  src={images.projectMain}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="276px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
