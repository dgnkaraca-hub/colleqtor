import Placeholder from "./Placeholder";

interface Props {
  title: string;
  desc: string;
  use: string;
}

export default function SocialTemplateCard({ title, desc, use }: Props) {
  return (
    <div className="tpl">
      <div className="tpl-head">
        <Placeholder category="Antika & Dekoratif Sanatlar" />
      </div>
      <div className="tpl-body">
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="use">
          <b>Kullanım:</b> {use}
        </div>
      </div>
    </div>
  );
}
