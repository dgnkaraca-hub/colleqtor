import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";

const FOOTER_NAV = [
  { label: "KOLEKSİYON", to: "/koleksiyon" },
  { label: "GÜNLÜK", to: "/gunluk" },
  { label: "HAKKIMIZDA", to: "/hakkimizda" },
  { label: "İLETİŞİM", to: "/iletisim" },
];

// Placeholder destinations — replace with the real handle / inbox before launch.
const INSTAGRAM_URL = "https://instagram.com/colleqtor";
const EMAIL = "merhaba@colleqtor.com";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Link to="/" className="footer-brand">
          <LogoSymbol />
          <span className="word">colleqtor</span>
        </Link>
        <span className="footer-tagline">Yaşayan Koleksiyon &amp; Dijital Arşiv</span>

        <nav className="footer-nav" aria-label="Alt menü">
          {FOOTER_NAV.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="footer-right">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            INSTAGRAM
          </a>
          <span className="footer-sep">|</span>
          <a href={`mailto:${EMAIL}`}>E-POSTA</a>
        </div>

        <div className="footer-copy">© 2026 colleqtor — Tüm hakları saklıdır.</div>
      </div>
    </footer>
  );
}
