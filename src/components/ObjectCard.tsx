import { Link } from "react-router-dom";
import Placeholder from "./Placeholder";
import type { ArchiveObject, ObjectImage } from "../types";

interface Props {
  obj: ArchiveObject;
  compact?: boolean;
}

export default function ObjectCard({ obj, compact = false }: Props) {
  const cover: ObjectImage | undefined = obj.images?.[0];

  return (
    <Link className={"obj-card" + (compact ? " compact" : "")} to={"/nesneler/" + obj.id}>
      <div className="obj-thumb">
        {cover?.src ? (
          <img src={cover.src} alt={cover.alt} className="obj-thumb-img" />
        ) : (
          <Placeholder category={obj.category} title={obj.title} />
        )}
      </div>
      <div className="obj-body">
        <div className="obj-cat small-caps">{obj.category}</div>
        <div className="obj-title">{obj.title}</div>
        <dl className="obj-meta">
          <dt>Köken</dt>
          <dd>{obj.origin}</dd>
          <dt>Malzeme</dt>
          <dd>{obj.material}</dd>
          <dt>Dönem</dt>
          <dd>{obj.period}</dd>
        </dl>
        {!compact ? <p className="obj-note">{obj.shortDescription}</p> : null}
        <div className="obj-status">
          <span>
            {obj.statusLabel} <span className="plus">+</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
