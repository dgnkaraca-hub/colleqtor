import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { OBJECTS } from "../lib/data";

/**
 * Netlify Forms submission. The form is declared statically in index.html
 * (name="iletisim", honeypot "bot-field") so Netlify's deploy-time parser can
 * register it; here we POST url-encoded data to "/" as Netlify expects.
 * In local dev there is no Netlify endpoint, so we simulate the round trip.
 */
const FORM_NAME = "iletisim";

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
  const [botField, setBotField] = useState(""); // honeypot — humans never see it
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
    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": botField,
      name: name.trim(),
      email: email.trim(),
      object: selected ? selected.title : "",
      objectId: object || "",
      message: message.trim(),
    });

    setStatus("sending");
    try {
      if (import.meta.env.DEV) {
        // Local dev has no Netlify endpoint; simulate the round trip.
        await new Promise((r) => setTimeout(r, 600));
      } else {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
        if (!res.ok) throw new Error("Netlify form submission failed");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setObject("");
      setMessage("");
      setBotField("");
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
            Kapımız her zaman aralık. Birkaç satır bırakmanız yeterli; en kısa sürede size dönüş
            yaparız.
          </p>
        </div>

        <form
          className="inquiry-form"
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Netlify needs the form name inside the payload as well. */}
          <input type="hidden" name="form-name" value={FORM_NAME} />

          {/* Honeypot — visually hidden; bots that fill it are discarded. */}
          <p className="hp-field" aria-hidden="true">
            <label>
              Bu alanı boş bırakın:{" "}
              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </label>
          </p>

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
