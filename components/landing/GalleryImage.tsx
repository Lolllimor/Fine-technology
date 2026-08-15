"use client";

import { MarketingImage } from "@/components/landing/MarketingImage";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function GalleryImage({ src, alt, priority = false }: Props) {
  return (
    <div
      className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#F1F5F9] select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <MarketingImage
        src={src}
        alt={alt}
        fill
        loading={priority ? "eager" : undefined}
        draggable={false}
        className="pointer-events-none object-cover [-webkit-user-drag:none]"
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
