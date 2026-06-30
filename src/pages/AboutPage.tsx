import LogoSymbol from "../components/LogoSymbol";

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="lede" style={{ padding: "clamp(2.4rem,6vw,4rem) 0 0" }}>
        <div className="small-caps bronze" style={{ marginBottom: "1rem" }}>
          Hakkımızda
        </div>
        <h1>{"Yaşayan Koleksiyon & Dijital Arşiv"}</h1>
        <p>
          colleqtor; maddi hafıza taşıyan nesneler için yaşayan bir koleksiyon arşivi ve dijital
          galeridir. Antika değerli parçalar, oyma ahşap figürler, heykelsel işler, dekoratif
          sanatlar, resimler, çizimler, tekstiller ve seçili özel koleksiyonlar burada bir araya
          gelir.
        </p>
        <p>
          Amacımız satmak değil; nesneleri keşfetmek, kaydetmek ve geleceğe aktarmaktır. Bu yüzden
          colleqtor bir mağaza gibi değil; sessiz bir galeri, bir küratör–koleksiyoner buluşma
          noktası ve maddi kültür için bir platform gibi düşünülmüştür.
        </p>
      </div>
      <section>
        <div className="about-grid">
          <div className="about-card">
            <LogoSymbol />
            <h3>Dijital Arşiv</h3>
            <p>
              Her nesne; malzeme, dönem, köken ve provenans bilgileriyle özenle kaydedilir. Arşiv,
              zamanla büyüyen yaşayan bir bellektir.
            </p>
          </div>
          <div className="about-card">
            <LogoSymbol />
            <h3>Sessiz Galeri</h3>
            <p>
              Doğal ışık, dokunun ve patinanın görünür kaldığı bir sunum. Aceleci satış dili yerine
              dikkatli bir bakış.
            </p>
          </div>
          <div className="about-card">
            <LogoSymbol />
            <h3>Yazışmaya Açık</h3>
            <p>
              İlgilendiğiniz nesneler için inceleme talebi bırakabilir, koleksiyon hakkında bizimle
              yazışabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
