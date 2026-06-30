import { useState } from "react";
import { OBJECTS } from "../lib/data";

export default function InquiryPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="wrap">
      <div className="inquiry-page" style={{ paddingTop: "clamp(2.4rem,6vw,4rem)" }}>
        <div className="inquiry-intro">
          <div className="small-caps bronze" style={{ marginBottom: "1rem" }}>
            Yazışma
          </div>
          <h1>Yazışmaya Açılan Kapı</h1>
          <p className="poem">
            Bazı nesneler sessizdir;
            <br />
            ama hikâyeleri, dinlemeye niyet edenle buluşur.
            <br />
            Niyetinizi bir satıra dönüştürün,
            <br />
            söyleyecekleri elbet vardır.
          </p>
          <p className="muted">
            Bu bir satış sayfası değil; düşünceli bir temas noktasıdır. Bir nesne, bir dönem ya da
            koleksiyon hakkında merak ettikleriniz için birkaç satır bırakmanız yeterli.
          </p>
        </div>
        <div>
          <div className="form-field">
            <label htmlFor="f-name">Ad / Kurum</label>
            <input id="f-name" type="text" placeholder="Adınız veya kurumunuz" />
          </div>
          <div className="form-field">
            <label htmlFor="f-email">E-posta</label>
            <input id="f-email" type="email" placeholder="ornek@eposta.com" />
          </div>
          <div className="form-field">
            <label htmlFor="f-object">İlgilendiğiniz Nesne</label>
            <select id="f-object" defaultValue="">
              <option value="">Seçiniz (opsiyonel)</option>
              {OBJECTS.map((o) => (
                <option key={o.id} value={o.title}>
                  {o.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="f-msg">Notunuz</label>
            <textarea id="f-msg" placeholder="Niyetinizi bir satıra dönüştürün…" />
          </div>
          <button className="submit-btn" type="button" onClick={() => setSent(true)}>
            Bir Not Bırakın <span>→</span>
          </button>
          <div className={"form-ok" + (sent ? " show" : "")}>
            Notunuz alındı. En kısa sürede sizinle yazışmaya açılan kapıdan iletişime geçeceğiz.
          </div>
        </div>
      </div>
    </div>
  );
}
