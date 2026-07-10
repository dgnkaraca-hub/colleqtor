import { useCallback, useEffect } from "react";
import { buildSrcSet } from "../lib/images";
import type { ResolvedImage } from "../lib/images";

interface Props {
  images: ResolvedImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Minimal archive lightbox — dark overlay, one image, caption, prev/next.
 * No dependencies; closes on Esc, backdrop click or the close button.
 */
export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const count = images.length;
  const current = images[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate]
  );
  const next = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && count > 1) prev();
      else if (e.key === "ArrowRight" && count > 1) next();
    };
    document.addEventListener("keydown", onKey);
    // Keep the page from scrolling behind the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, prev, next, count]);

  if (!current) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="lb-close" aria-label="Kapat" onClick={onClose}>
        ×
      </button>

      {count > 1 ? (
        <button type="button" className="lb-nav lb-prev" aria-label="Önceki görsel" onClick={prev}>
          ←
        </button>
      ) : null}

      <figure className="lb-figure">
        <img
          src={current.src}
          srcSet={buildSrcSet(current)}
          sizes="92vw"
          alt={current.alt}
          className="lb-img"
        />
        {current.caption ? <figcaption className="lb-caption">{current.caption}</figcaption> : null}
        {count > 1 ? (
          <span className="lb-count">
            {index + 1} / {count}
          </span>
        ) : null}
      </figure>

      {count > 1 ? (
        <button type="button" className="lb-nav lb-next" aria-label="Sonraki görsel" onClick={next}>
          →
        </button>
      ) : null}
    </div>
  );
}
