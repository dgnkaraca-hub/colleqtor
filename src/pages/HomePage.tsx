import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CategoryStrip from "../components/CategoryStrip";
import ObjectGrid from "../components/ObjectGrid";
import JournalPreview from "../components/JournalPreview";
import QuietInquiryPanel from "../components/QuietInquiryPanel";
import { OBJECTS } from "../lib/data";
import { useReveal } from "../lib/useReveal";

export default function HomePage() {
  useReveal();
  return (
    <>
      <Hero />
      <CategoryStrip />

      <section className="wrap">
        <div className="section-head" data-reveal>
          <h2 className="section-title">Seçili Nesneler</h2>
          <Link className="link-arrow" to="/koleksiyon">
            Tüm Nesneleri Gör →
          </Link>
        </div>
        <ObjectGrid objects={OBJECTS.slice(0, 6)} />
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="split" data-reveal>
          <div className="journal-block">
            <div className="section-head" style={{ marginBottom: "1.2rem" }}>
              <h2 className="section-title" style={{ fontSize: ".95rem" }}>
                Günlük / Notlar
              </h2>
              <Link className="link-arrow" to="/gunluk" style={{ fontSize: ".68rem" }}>
                Tüm Yazılar →
              </Link>
            </div>
            <JournalPreview />
          </div>
          <QuietInquiryPanel />
        </div>
      </section>
    </>
  );
}
