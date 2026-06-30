import { useState } from "react";
import Placeholder from "./Placeholder";
import type { ArchiveObject } from "../types";

export default function ImageGallery({ obj }: { obj: ArchiveObject }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <div className="gallery-main">
        <Placeholder category={obj.category} title={obj.title} />
      </div>
      <div className="gallery-thumbs">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={"gt" + (i === active ? " active" : "")}
            onClick={() => setActive(i)}
            role="button"
            aria-label={"Görsel " + (i + 1)}
          >
            <Placeholder category={obj.category} />
          </div>
        ))}
      </div>
    </div>
  );
}
