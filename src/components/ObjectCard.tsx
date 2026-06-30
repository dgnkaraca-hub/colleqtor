import { Link } from "react-router-dom";
import Placeholder from "./Placeholder";
import type { ArchiveObject } from "../types";

interface Props {
  obj: ArchiveObject;
  compact?: boolean;
}

export default function ObjectCard({ obj, compact = false }: Props) {
  return (
    <Link className={"obj-card" + (compact ? " compact" : "")} to={"/nesneler/" + obj.id}>
      <div className="obj-thumb">
        <Placeholder category={obj.category} title={obj.title} />
      </div>
      <div className="obj-body">
        <div className="obj-title">{obj.title}</div>
        <dl className="obj-meta">
          <dt>Köken</dt>
          <dd>{obj.origin}</dd>
          <dt>Malzeme</dt>
          <dd>{obj.material}</dd>
          <dt>Dönem</dt>
          <dd>{obj.period}</dd>
        </dl>
        <div className="obj-status">
          <span>
            {obj.statusLabel} <span className="plus">+</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
