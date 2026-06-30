import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";

export default function Hero() {
  return (
    <section className="hero" style={{ padding: 0 }}>
      <div className="hero-cluster">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="blob b4" />
      </div>
      <div className="hero-watermark">
        <LogoSymbol />
      </div>
      <div className="wrap hero-inner">
        <div className="hero-eyebrow small-caps">Nesnelerin Taşıdığı Hafıza</div>
        <h1>
          Ustalığın İzinde,
          <br />
          Zamanın Ötesinde.
        </h1>
        <p className="hero-lead">
          Geçmişin izlerini taşıyan her nesne, bir hayatın sessiz tanığıdır. Ahşabın sıcak
          dokusu, el işçiliğinin inceliği ve zamanın meydan okuyan formu ile koleksiyonumuz;
          kültürümüzün zengin mirasını yaşatır ve geleceğe aktarır.
        </p>
        <Link className="link-arrow" to="/koleksiyon">
          Koleksiyonu Keşfet →
        </Link>
      </div>
    </section>
  );
}
