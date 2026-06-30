import type { CSSProperties, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
}

export default function StyleguideSection({ title, children, style }: Props) {
  return (
    <section className="sg-section" style={style}>
      <div className="sg-h">{title}</div>
      {children}
    </section>
  );
}
