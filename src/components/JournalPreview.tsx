import { Link } from "react-router-dom";
import Placeholder from "./Placeholder";
import { JOURNAL } from "../lib/data";

export default function JournalPreview() {
  return (
    <>
      {JOURNAL.slice(0, 3).map((j) => (
        <Link key={j.id} className="journal-row" to="/gunluk">
          <div className="journal-thumb">
            <Placeholder category="Resim & Çizim" />
          </div>
          <div className="journal-meta">
            <h4>{j.title}</h4>
            <div className="journal-date">{j.date}</div>
            <span className="link-arrow" style={{ fontSize: ".68rem" }}>
              Devamını oku →
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}
