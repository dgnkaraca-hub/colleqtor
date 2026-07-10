import { useState } from "react";
import ObjectImage from "./ObjectImage";
import Placeholder from "./Placeholder";
import Lightbox from "./Lightbox";
import { getObjectImages } from "../lib/images";
import type { ArchiveObject } from "../types";

export default function ImageGallery({ obj }: { obj: ArchiveObject }) {
  const images = getObjectImages(obj);
  const hasReal = images.length > 0;

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = images[active];

  return (
    <div className="gallery">
      <figure className="gallery-main">
        {hasReal ? (
          <button
            type="button"
            className="gallery-zoom"
            onClick={() => setLightboxOpen(true)}
            aria-label="Görseli büyüt"
          >
            <ObjectImage
              image={current}
              category={obj.category}
              title={obj.title}
              sizes="(max-width: 860px) 92vw, 44vw"
              eager
              className="gallery-img"
            />
          </button>
        ) : (
          <Placeholder category={obj.category} title={obj.title} />
        )}
      </figure>

      {current?.caption ? (
        <figcaption className="gallery-caption">{current.caption}</figcaption>
      ) : null}

      {images.length > 1 ? (
        <div className="gallery-thumbs" role="group" aria-label="Nesne görselleri">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={"gt" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}
              aria-label={img.alt || `Görsel ${i + 1}`}
              aria-pressed={i === active}
            >
              <ObjectImage image={img} category={obj.category} sizes="110px" />
            </button>
          ))}
        </div>
      ) : null}

      {lightboxOpen && hasReal ? (
        <Lightbox
          images={images}
          index={active}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActive}
        />
      ) : null}
    </div>
  );
}
