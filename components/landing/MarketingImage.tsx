import Image, { type ImageProps } from "next/image";


const UFS_HOST = "v7cc5qla9j.ufs.sh";

function defaultUnoptimized(src: ImageProps["src"]): boolean {
  return typeof src === "string" && src.includes(UFS_HOST);
}

export function MarketingImage(props: ImageProps) {
  const unoptimized = props.unoptimized ?? defaultUnoptimized(props.src);
  return <Image {...props} unoptimized={unoptimized} />;
}
