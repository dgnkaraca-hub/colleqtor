import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoLockup from "./LogoLockup";
import { SearchIcon, MenuIcon } from "./Icons";
import { NAV } from "../lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const renderLinks = () =>
    NAV.map((n) => (
      <Link
        key={n.key}
        to={n.to}
        className={pathname === n.to ? "active" : ""}
        onClick={() => setOpen(false)}
      >
        {n.label}
      </Link>
    ));

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to="/" className="header-lockup" aria-label="colleqtor — anasayfa">
          <LogoLockup />
        </Link>
        <nav className="main-nav">{renderLinks()}</nav>
        <div className="header-tools">
          <Link to="/koleksiyon" className="icon-btn" aria-label="Ara">
            <SearchIcon />
          </Link>
          <button
            className="icon-btn hamburger"
            aria-label="Menü"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        <div className="wrap">
          <nav>{renderLinks()}</nav>
        </div>
      </div>
    </header>
  );
}
