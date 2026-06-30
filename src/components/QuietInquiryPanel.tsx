import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";

export default function QuietInquiryPanel() {
  return (
    <aside className="inquiry">
      <p className="inquiry-poem">
        Bazı nesneler sessizdir;
        <br />
        ama hikâyeleri, dinlemeye niyet edenle buluşur.
        <br />
        Niyetinizi bir satıra dönüştürün,
        <br />
        söyleyecekleri elbet vardır.
      </p>
      <Link className="inquiry-cta" to="/yazisma">
        Yazışmaya Açılan Kapı <span>→</span>
      </Link>
      <div className="inquiry-logo">
        <LogoSymbol />
        <span className="word">colleqtor</span>
      </div>
    </aside>
  );
}
