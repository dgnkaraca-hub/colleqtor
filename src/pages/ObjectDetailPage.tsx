import { useParams, Link } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import MetadataTable from "../components/MetadataTable";
import RelatedObjects from "../components/RelatedObjects";
import QuietInquiryPanel from "../components/QuietInquiryPanel";
import { OBJECTS } from "../lib/data";
import { buildMeta, buildDescription, buildNote } from "../lib/objectMeta";

export default function ObjectDetailPage() {
  const { id } = useParams();
  const obj = OBJECTS.find((o) => o.id === id);

  if (!obj) {
    return (
      <div className="wrap" style={{ padding: "4rem 0" }}>
        <h1>Nesne bulunamadı</h1>
        <p className="muted">
          Aradığınız arşiv kaydı mevcut değil.{" "}
          <Link className="bronze" to="/koleksiyon">
            Koleksiyon Arşivi'ne dön →
          </Link>
        </p>
      </div>
    );
  }

  const rows = buildMeta(obj);
  const paragraphs = buildDescription(obj);
  const note = buildNote(obj);

  // Related: same category first, then top up with other objects.
  const sameCategory = OBJECTS.filter((o) => o.id !== obj.id && o.category === obj.category);
  const others = OBJECTS.filter((o) => o.id !== obj.id && o.category !== obj.category);
  const related = [...sameCategory, ...others].slice(0, 4);

  return (
    <>
      <div className="wrap">
        <div className="breadcrumb">
          <Link to="/">Anasayfa</Link>
          <span className="sep">/</span>
          <Link to="/koleksiyon">Nesneler</Link>
          <span className="sep">/</span>
          <span>{obj.title}</span>
        </div>

        <div className="detail-grid">
          <ImageGallery obj={obj} />
          <div>
            <div className="detail-status">
              <span className="status-badge">{obj.statusLabel}</span>
              <span className="detail-cat">{obj.category}</span>
            </div>
            <h1 className="detail-title">{obj.title}</h1>
            <MetadataTable rows={rows} />
            <div className="detail-desc">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="notes-box">
              <span className="ni">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                >
                  <path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 0-2 2V5zM20 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 1 2 2V5z" />
                </svg>
              </span>
              <div>
                <h4>Nesne Notları</h4>
                <p>{note}</p>
              </div>
            </div>

            {obj.tags?.length ? (
              <ul className="tag-list" aria-label="Etiketler">
                {obj.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <section className="wrap">
        <div className="related-split">
          <RelatedObjects objects={related} />
          <QuietInquiryPanel objectId={obj.availableForInquiry === false ? undefined : obj.id} />
        </div>
      </section>
    </>
  );
}
