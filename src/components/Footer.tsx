import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";
import { NAV } from "../lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Link to="/" className="footer-brand">
          <LogoSymbol />
          <span className="word">colleqtor</span>
        </Link>
        <span className="footer-sep">|</span>
        <span>© 2026 colleqtor &nbsp; TÜM HAKLARI SAKLIDIR.</span>
        <nav className="footer-nav">
          {NAV.map((n) => (
            <Link key={n.key} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="footer-right">
          <Link to="/styleguide">INSTAGRAM</Link>
          <span className="footer-sep">|</span>
          <Link to="/yazisma">E-POSTA BÜLTENİ</Link>
        </div>
      </div>
    </footer>
  );
}
