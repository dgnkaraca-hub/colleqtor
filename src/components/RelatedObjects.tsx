import ObjectCard from "./ObjectCard";
import type { ArchiveObject } from "../types";

export default function RelatedObjects({ objects }: { objects: ArchiveObject[] }) {
  return (
    <div>
      <div className="section-head">
        <h2 className="section-title" style={{ fontSize: ".95rem" }}>
          İlginizi Çekebilir
        </h2>
      </div>
      <div className="obj-grid cols-5" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {objects.map((o, i) => (
          <ObjectCard key={o.id} obj={o} compact revealIndex={i} />
        ))}
      </div>
    </div>
  );
}
