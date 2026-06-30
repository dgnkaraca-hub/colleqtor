import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";

/** When `objectId` is given, the CTA deep-links to the inquiry form with that
 *  object preselected (e.g. from a detail page). */
export default function QuietInquiryPanel({ objectId }: { objectId?: string }) {
  const to = objectId ? `/yazisma?object=${encodeURIComponent(objectId)}` : "/yazisma";
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
      <Link className="inquiry-cta" to={to}>
        Yazışmaya Açılan Kapı <span>→</span>
      </Link>
      <div className="inquiry-logo">
        <LogoSymbol />
        <span className="word">colleqtor</span>
      </div>
    </aside>
  );
}
