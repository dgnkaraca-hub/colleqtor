import { useState } from "react";
import Placeholder from "./Placeholder";
import type { ArchiveObject, ObjectImage } from "../types";

export default function ImageGallery({ obj }: { obj: ArchiveObject }) {
  // Always have at least one frame so the layout (and fallback) stays stable.
  const images: ObjectImage[] =
    obj.images && obj.images.length ? obj.images : [{ alt: obj.title }];

  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="gallery">
      <figure className="gallery-main">
        {current.src ? (
          <img src={current.src} alt={current.alt} className="gallery-img" />
        ) : (
          <Placeholder category={obj.category} title={obj.title} />
        )}
      </figure>

      {current.caption ? (
        <figcaption className="gallery-caption">{current.caption}</figcaption>
      ) : null}

      {images.length > 1 ? (
        <div className="gallery-thumbs" role="group" aria-label="Nesne görselleri">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={"gt" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}
              aria-label={img.alt || `Görsel ${i + 1}`}
              aria-pressed={i === active}
            >
              {img.src ? (
                <img src={img.src} alt="" />
              ) : (
                <Placeholder category={obj.category} />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
