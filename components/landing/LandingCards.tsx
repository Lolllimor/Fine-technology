import { MarketingImage } from "@/components/landing/MarketingImage";
import { images } from "@/content/landing";
import { sectionInner } from "@/lib/section";

export function LandingCards() {
  return (
    <div className="relative z-20 -mt-12 sm:-mt-20">
      <div className={sectionInner}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-stretch">
          <div className="relative flex min-h-[112px] rounded-lg bg-linear-to-b from-[#30EAA9] to-[#0798E7] p-[2px] shadow-xl">
            <div className="flex min-h-0 flex-1 items-center gap-4 rounded-[6px] bg-white/95 p-6">
              <MarketingImage
                src={images.clientSatisfaction}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-[#023048]">
                  99.9% client satisfaction
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                  Trusted by homes and businesses across Nigeria
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[112px] flex-col justify-center rounded-lg bg-linear-to-br from-[#30EAA9] to-[#0798E7] px-6 py-8 text-center text-white shadow-xl">
            <p className="text-3xl font-extrabold sm:text-4xl">140+</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide">
              Projects NATIONWIDE
            </p>
          </div>

          <div className="relative flex min-h-[112px] rounded-lg bg-linear-to-b from-[#30EAA9] to-[#0798E7] p-[2px] shadow-xl">
            <div className="flex min-h-0 flex-1 items-center gap-4 rounded-[8px] bg-white/95 p-6">
              <MarketingImage
                src={images.homesPowered}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-[#023048]">3,000+</p>
                <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                  Nigerian Homes Powered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
