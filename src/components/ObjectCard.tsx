import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import ObjectImage from "./ObjectImage";
import { getObjectImages } from "../lib/images";
import type { ArchiveObject } from "../types";

interface Props {
  obj: ArchiveObject;
  compact?: boolean;
  revealIndex?: number;
}

export default function ObjectCard({ obj, compact = false, revealIndex }: Props) {
  const cover = getObjectImages(obj)[0];
  const revealProps =
    revealIndex === undefined
      ? {}
      : { "data-reveal": "", style: { "--reveal-i": revealIndex } as CSSProperties };

  return (
    <Link
      className={"obj-card" + (compact ? " compact" : "")}
      to={"/nesneler/" + obj.id}
      {...revealProps}
    >
      <div className="obj-thumb">
        <ObjectImage
          image={cover}
          category={obj.category}
          title={obj.title}
          sizes="(max-width: 620px) 50vw, (max-width: 1100px) 33vw, 20vw"
          className="obj-thumb-img"
        />
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
