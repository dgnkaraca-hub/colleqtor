import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";

/** When `objectId` is given, the CTA deep-links to the inquiry form with that
 *  object preselected (e.g. from a detail page). */
export default function QuietInquiryPanel({ objectId }: { objectId?: string }) {
  const to = objectId ? `/iletisim?object=${encodeURIComponent(objectId)}` : "/iletisim";
  return (
    <aside className="inquiry">
      <p className="inquiry-poem">
        Bir nesne ya da koleksiyon hakkında
        <br />
        merak ettikleriniz için bize yazın.
      </p>
      <Link className="inquiry-cta" to={to}>
        İletişime Geç <span>→</span>
      </Link>
      <div className="inquiry-logo">
        <LogoSymbol />
        <span className="word">colleqtor</span>
      </div>
    </aside>
  );
}
