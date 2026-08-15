"use client";

import type { CSSProperties } from "react";
import { MarketingImage } from "@/components/landing/MarketingImage";

export type TrustedLogo = {
  id: string;
  src: string;
  alt: string;
};

export function TrustedByCarousel({ logos }: { logos: TrustedLogo[] }) {
  // Enough copies for a seamless loop on wide screens with few logos
  const copies = logos.length < 4 ? 4 : logos.length < 6 ? 3 : 2;
  const track = Array.from({ length: copies }, () => logos).flat();
  const loopPercent = 100 / copies;

  return (
    <div
      className="group relative min-w-0 w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      style={
        {
          "--trusted-loop": `-${loopPercent}%`,
        } as CSSProperties
      }
    >
      <ul
        className="animate-trusted-marquee flex w-max items-center gap-6 py-1 sm:gap-12 md:gap-14 lg:gap-16 motion-safe:group-hover:[animation-play-state:paused]"
        aria-label="Client logos"
      >
        {track.map((logo, index) => (
          <li
            key={`${logo.id}-${index}`}
            className="flex h-8 w-24 shrink-0 items-center justify-center sm:h-10 sm:w-28 md:h-12 md:w-36"
            aria-hidden={index >= logos.length}
          >
            <MarketingImage
              src={logo.src}
              alt={index < logos.length ? logo.alt || "Client logo" : ""}
              width={144}
              height={48}
              className="max-h-8 max-w-full object-contain opacity-70 grayscale sm:max-h-10 md:max-h-12"
              style={{ width: "auto", height: "auto" }}
              sizes="(max-width:640px) 96px, (max-width:768px) 112px, 144px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
