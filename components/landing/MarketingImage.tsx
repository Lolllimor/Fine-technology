import Image, { type ImageProps } from "next/image";

function defaultUnoptimized(src: ImageProps["src"]): boolean {
  if (typeof src !== "string") return false;
  return (
    src.includes("v7cc5qla9j.ufs.sh") ||
    src.includes("res.cloudinary.com") ||
    src.includes(".supabase.co/storage/")
  );
}

export function MarketingImage(props: ImageProps) {
  const unoptimized = props.unoptimized ?? defaultUnoptimized(props.src);
  return <Image {...props} unoptimized={unoptimized} />;
}
