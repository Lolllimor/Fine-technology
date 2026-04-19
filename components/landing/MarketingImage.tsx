import Image, { type ImageProps } from "next/image";

/** Host that often times out when proxied through the default image optimizer. */
const UFS_HOST = "v7cc5qla9j.ufs.sh";

function defaultUnoptimized(src: ImageProps["src"]): boolean {
  return typeof src === "string" && src.includes(UFS_HOST);
}

/** Same as `next/image`, but skips server-side optimization for UFS URLs so dev/prod don’t 500 on fetch timeouts. */
export function MarketingImage(props: ImageProps) {
  const unoptimized = props.unoptimized ?? defaultUnoptimized(props.src);
  return <Image {...props} unoptimized={unoptimized} />;
}
