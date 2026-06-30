import LogoSymbol from "./LogoSymbol";
import { CAT_TONE } from "../lib/data";

interface Props {
  category: string;
  title?: string;
}

export default function Placeholder({ category, title }: Props) {
  const tone = CAT_TONE[category] ?? "ph-walnut";
  return (
    <div className={"ph " + tone}>
      <div className="ph-mark">
        <LogoSymbol />
      </div>
      {title ? <span className="ph-name">{title}</span> : null}
    </div>
  );
}
