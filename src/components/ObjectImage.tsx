import { useState } from "react";
import Placeholder from "./Placeholder";
import { buildSrcSet } from "../lib/images";
import type { ResolvedImage } from "../lib/images";

interface Props {
  /** Real image to render; when undefined the branded placeholder is shown. */
  image?: ResolvedImage;
  category: string;
  /** Placeholder title (italic serif caption inside the placeholder tile). */
  title?: string;
  /** Passed to the <img> sizes attribute when optimized variants exist. */
  sizes?: string;
  /** Above-the-fold images (e.g. gallery main) should not lazy-load. */
  eager?: boolean;
  className?: string;
}

/**
 * Archive image frame: renders real photography when the build-time manifest
 * says it exists, with lazy loading, webp srcset and a quiet fade-in;
 * otherwise falls back to the branded Placeholder.
 */
export default function ObjectImage({
  image,
  category,
  title,
  sizes,
  eager = false,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!image) {
    return <Placeholder category={category} title={title} />;
  }

  const srcSet = buildSrcSet(image);

  return (
    <img
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes ?? "(max-width: 620px) 50vw, 25vw" : undefined}
      alt={image.alt}
      width={image.width ?? undefined}
      height={image.height ?? undefined}
      loading={eager ? undefined : "lazy"}
      decoding="async"
      className={"img-fade" + (loaded ? " is-loaded" : "") + (className ? " " + className : "")}
      onLoad={() => setLoaded(true)}
    />
  );
}
