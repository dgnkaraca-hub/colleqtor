import LogoSymbol from "../components/LogoSymbol";
import LogoLockup from "../components/LogoLockup";
import StyleguideSection from "../components/StyleguideSection";
import SocialTemplateCard from "../components/SocialTemplateCard";

const TOKENS: [string, string][] = [
  ["--cq-ivory", "#f6efe4"],
  ["--cq-parchment", "#efe4d2"],
  ["--cq-sand", "#d9c7ac"],
  ["--cq-walnut", "#6f4b2e"],
  ["--cq-bronze", "#a67c52"],
  ["--cq-bronze-dark", "#7f5b38"],
  ["--cq-charcoal", "#171410"],
  ["--cq-ink", "#221d18"],
  ["--cq-muted", "#776a5c"],
];

const TEMPLATES: [string, string, string][] = [
  ["1. Seçili Nesne", "Koleksiyondaki nesneleri öne çıkaran sade ve zarif bir sunum.", "Objektif fotoğraf + isim, köken, dönem bilgisi."],
  ["2. Günlük", "Günlük notlar, düşünceler ve koleksiyon sürecinden kesitler.", "El yazısı etkisi, tarih, doğal kâğıt dokusu."],
  ["3. Malzeme", "Koleksiyondaki malzemeleri ve dokuları inceleyen analiz içerikleri.", "Doku fotoğrafı + kısa açıklama."],
  ["4. Resim / Çizim", "Arşivdeki resim, çizim ve baskı çalışmalarının paylaşıldığı alan.", "Eser görseli + teknik ve dönem bilgisi."],
  ["5. Özel Koleksiyon", "Özel koleksiyonlar, araştırmalar ve iş birlikleri için iletişim odaklı içerikler.", "Davetkâr metin + yönlendirme."],
];

const PRINCIPLES: [string, string][] = [
  ["Sıcak Nötr Tonlar", "Krem, bej, sıcak gri, bronz ve koyu kahve paletiyle doğal ve zamansız bir his."],
  ["Doğal Işık", "Nesneler doğal ışıkla fotoğraflanır; doku ve hacim ön plandadır."],
  ["Arşiv Hissi", "Kâğıt dokusu, el yazısı ve yaşanmış izler arşiv duygusunu destekler."],
  ["Sade Tipografi", "Zarif serif başlıklar ve okunaklı metinler ile sessiz bir anlatım dili."],
  ["Zamanın Ötesinde", "Geçici trendler değil; kalıcı estetik ve anlamlı içeriğe odaklanır."],
];

export default function StyleguidePage() {
  return (
    <div className="wrap">
      <div className="lede" style={{ padding: "clamp(2.4rem,6vw,4rem) 0 1rem" }}>
        <div className="small-caps bronze" style={{ marginBottom: "1rem" }}>
          Stil Rehberi
        </div>
        <h1>{"Görsel Sistem & Şablonlar"}</h1>
        <p>
          Marka kuralları, logo kullanımı, renk paleti, tipografi ve sosyal medya şablon sistemi
          tek bir referansta.
        </p>
      </div>

      <StyleguideSection title="Logo Kullanımı">
        <div className="logo-board">
          <div className="logo-tile">
            <LogoLockup />
          </div>
          <div className="logo-tile dark">
            <LogoSymbol />
          </div>
        </div>
        <p className="muted" style={{ fontSize: ".82rem", marginTop: ".9rem" }}>
          Tek ve aynı sembol her yerde kullanılır. Farklı kıvrım, nokta, dönüş veya çizgi
          kalınlığıyla varyasyon üretilmez. Açık zeminde bronz; koyu zeminde krem/bronz.
        </p>
      </StyleguideSection>

      <StyleguideSection title="Renk Paleti">
        <div className="swatches">
          {TOKENS.map(([name, hex]) => (
            <div className="swatch" key={name}>
              <div className="chip" style={{ background: hex }} />
              <div className="lab">
                <b>{hex}</b>
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>
      </StyleguideSection>

      <StyleguideSection title="Tipografi">
        <div className="type-rows">
          <div>
            <div className="small-caps muted">Cormorant Garamond — Başlık</div>
            <div className="cq-display" style={{ fontSize: "2.6rem" }}>
              Nesnelerin Taşıdığı Hafıza
            </div>
          </div>
          <div>
            <div className="small-caps muted">Cormorant Garamond Italic — Vurgu</div>
            <div className="cq-display" style={{ fontStyle: "italic", fontSize: "1.8rem" }}>
              patina, dönem, köken, zanaat
            </div>
          </div>
          <div>
            <div className="small-caps muted">Manrope — Gövde / Arayüz</div>
            <div style={{ fontSize: "1rem", maxWidth: "40rem" }}>
              Sade, okunaklı bir gövde metni. Arayüz etiketleri, açıklamalar ve uzun metinler bu
              aile ile sessiz ve dengeli bir ritim kurar.
            </div>
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection title="Sosyal Şablon Sistemi">
        <div className="tpl-grid">
          <div className="quote-card">
            <LogoSymbol />
            <p>
              Nesneler konuşmaz,
              <br />
              ama hikâyeleri
              <br />
              hiç susmaz.
            </p>
            <span className="word">colleqtor</span>
          </div>
          {TEMPLATES.map(([t, d, u]) => (
            <SocialTemplateCard key={t} title={t} desc={d} use={u} />
          ))}
          <div className="quote-card">
            <LogoSymbol />
            <p>
              Zaman iz bırakır,
              <br />
              biz yalnızca
              <br />
              koruruz.
            </p>
            <span className="word">colleqtor</span>
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection title="Kullanım İlkeleri" style={{ paddingBottom: "3rem" }}>
        <div className="principles">
          {PRINCIPLES.map(([t, d]) => (
            <div className="principle" key={t}>
              <LogoSymbol />
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </StyleguideSection>
    </div>
  );
}
