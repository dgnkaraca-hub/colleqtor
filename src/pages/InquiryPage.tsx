import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { OBJECTS } from "../lib/data";

/**
 * Optional submission endpoint. Leave empty to run in "demo" mode (the form
 * validates and shows a success state without a network call). To go live,
 * set VITE_INQUIRY_ENDPOINT to a Formspree / Netlify Forms / custom URL that
 * accepts a JSON POST. No other code change needed.
 */
const FORM_ENDPOINT: string = import.meta.env.VITE_INQUIRY_ENDPOINT ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export default function InquiryPage() {
  const [params] = useSearchParams();
  const presetObject = params.get("object") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState(presetObject);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (name.trim().length < 2) e.name = "Lütfen adınızı veya kurumunuzu yazın.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Geçerli bir e-posta adresi girin.";
    if (message.trim().length < 10)
      e.message = "Birkaç satır bırakın (en az 10 karakter).";
    return e;
  }

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    const selected = OBJECTS.find((o) => o.id === object);
    const payload = {
      name: name.trim(),
      email: email.trim(),
      object: selected ? selected.title : "",
      objectId: object || "",
      message: message.trim(),
    };

    setStatus("sending");
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Network response was not ok");
      } else {
        // Demo mode: no endpoint configured.
        await new Promise((r) => setTimeout(r, 600));
      }
      setStatus("success");
      setName("");
      setEmail("");
      setObject("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="wrap">
      <div className="inquiry-page" style={{ paddingTop: "clamp(2.4rem,6vw,4rem)" }}>
        <div className="inquiry-intro">
          <div className="small-caps bronze" style={{ marginBottom: "1rem" }}>
            İletişim
          </div>
          <h1>İletişim</h1>
          <p className="poem">
            Bir nesne, bir dönem ya da koleksiyon hakkında
            <br />
            merak ettikleriniz için bize yazın.
          </p>
          <p className="muted">
            Bu bir satış sayfası değil; sakin bir temas noktasıdır. Birkaç satır bırakmanız
            yeterli; en kısa sürede size dönüş yaparız.
          </p>
        </div>

        <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
          <div className={"form-field" + (errors.name ? " invalid" : "")}>
            <label htmlFor="f-name">Ad / Kurum</label>
            <input
              id="f-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Adınız veya kurumunuz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required="true"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name ? (
              <p className="field-error" id="err-name" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={"form-field" + (errors.email ? " invalid" : "")}>
            <label htmlFor="f-email">E-posta</label>
            <input
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ornek@eposta.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email ? (
              <p className="field-error" id="err-email" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="f-object">İlgilendiğiniz Nesne</label>
            <select
              id="f-object"
              name="object"
              value={object}
              onChange={(e) => setObject(e.target.value)}
            >
              <option value="">Seçiniz (opsiyonel)</option>
              {OBJECTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title}
                </option>
              ))}
            </select>
          </div>

          <div className={"form-field" + (errors.message ? " invalid" : "")}>
            <label htmlFor="f-msg">Notunuz</label>
            <textarea
              id="f-msg"
              name="message"
              placeholder="Mesajınızı buraya yazın…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-required="true"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "err-msg" : undefined}
            />
            {errors.message ? (
              <p className="field-error" id="err-msg" role="alert">
                {errors.message}
              </p>
            ) : null}
          </div>

          <button className="submit-btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Gönderiliyor…" : "Gönder"} <span>→</span>
          </button>

          {status === "success" ? (
            <div className="form-ok show" role="status">
              Mesajınız alındı. En kısa sürede size dönüş yapacağız.
            </div>
          ) : null}
          {status === "error" ? (
            <div className="form-err show" role="alert">
              Not şu an iletilemedi. Lütfen biraz sonra tekrar deneyin ya da doğrudan e-posta yazın.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
