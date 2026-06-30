import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";
import { CATEGORIES } from "../lib/data";

export default function CategoryStrip() {
  return (
    <div className="cat-strip">
      <div className="wrap">
        <div className="cat-strip-inner">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} className="cat-item" to="/koleksiyon">
              <LogoSymbol />
              <div>
                <div className="cat-label">{c.label}</div>
                <div className="cat-count">{c.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
