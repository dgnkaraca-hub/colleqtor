import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { JOURNAL } from "../lib/data";

export default function JournalPage() {
  return (
    <div className="wrap">
      <div className="lede" style={{ padding: "clamp(2.4rem,6vw,4rem) 0 2rem" }}>
        <div className="small-caps bronze" style={{ marginBottom: "1rem" }}>
          Günlük / Notlar
        </div>
        <h1>Nesnelerin Sessiz Kayıtları</h1>
        <p>
          Kısa düşünceler, malzeme notları, arşivleme süreci ve nesnelerin hikâyeleri. Her yazı,
          bir nesnenin ya da bir dönemin izini sürmenin küçük bir denemesidir.
        </p>
      </div>
      <section style={{ paddingTop: 0 }}>
        <div className="journal-list">
          {JOURNAL.map((j) => (
            <Link key={j.id} className="journal-card" to="/gunluk">
              <div className="jc-thumb">
                <Placeholder category="Resim & Çizim" />
              </div>
              <div>
                <div className="journal-date">{j.date}</div>
                <h3>{j.title}</h3>
                <p className="muted" style={{ fontSize: ".9rem" }}>
                  {j.excerpt}
                </p>
                <span
                  className="link-arrow"
                  style={{ fontSize: ".68rem", marginTop: ".6rem" }}
                >
                  Devamını oku →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
