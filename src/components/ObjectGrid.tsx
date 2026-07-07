import type { CSSProperties } from "react";
import ObjectCard from "./ObjectCard";
import type { ArchiveObject } from "../types";

interface Props {
  objects: ArchiveObject[];
  cols5?: boolean;
  compact?: boolean;
  style?: CSSProperties;
}

export default function ObjectGrid({ objects, cols5 = false, compact = false, style }: Props) {
  return (
    <div className={"obj-grid" + (cols5 ? " cols-5" : "")} style={style}>
      {objects.map((o, i) => (
        <ObjectCard key={o.id} obj={o} compact={compact} revealIndex={i % 5} />
      ))}
    </div>
  );
}
