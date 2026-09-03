"use client";

import { useState } from "react";

type Props = {
  topic: string;
  submitLabel: string; // e.g. "Beratungsgespräch anfordern"
  question?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const telRe = /^[+(]?[\d][\d\s()/-]{5,19}$/;

export default function QualifyForm({
  topic,
  submitLabel,
  question = "Sind Sie Eigentümer der Immobilie?",
}: Props) {
  const [owner, setOwner] = useState<"ja" | "nein" | null>(null);
  const [c, setC] = useState({ name: "", email: "", tel: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!owner) e.owner = "Bitte wählen Sie eine Option.";
    if (c.name.trim().length < 2) e.name = "Bitte geben Sie Ihren Namen ein.";
    if (!emailRe.test(c.email.trim()))
      e.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (!telRe.test(c.tel.trim()))
      e.tel = "Bitte geben Sie eine gültige Telefonnummer ein.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    setServerError(null);
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: c.name.trim(),
          email: c.email.trim(),
          tel: c.tel.trim(),
          topic,
          message: `${question} → ${owner === "ja" ? "Ja" : "Nein"}\nAnfrage über: ${topic}`,
          answers: [{ q: question, a: owner === "ja" ? "Ja" : "Nein" }],
        }),
      });
      const json = await res.json().catch(
        () => ({} as { error?: string; eventId?: string })
      );
      if (!res.ok)
        throw new Error(json?.error || "Die Anfrage konnte nicht gesendet werden.");
      if (json?.eventId) {
        const { fireLeadEvent } = await import("../../../lib/analytics-client");
        fireLeadEvent({ eventId: json.eventId, topic });
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen."
      );
    }
  }

  if (status === "sent") {
    return (
      <div translate="no" className="notranslate rounded-2xl bg-white p-7 text-center shadow-xl ring-1 ring-black/5">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <h3 className="mt-4 text-lg font-bold text-ink">
          Vielen Dank{c.name ? `, ${c.name.trim().split(" ")[0]}` : ""}!
        </h3>
        <p className="mt-2 text-[15px] text-muted">
          Wir prüfen Ihre Angaben und melden uns innerhalb von 24&nbsp;Stunden
          persönlich bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <div translate="no" className="notranslate rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-7">
      <p className="text-[15px] font-bold text-ink">{question}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["ja", "nein"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setOwner(v)}
            className={`rounded-xl border px-4 py-3 text-[15px] font-semibold capitalize transition-colors ${
              owner === v
                ? "border-brand bg-brand-50 text-ink"
                : "border-line bg-white text-ink hover:border-brand/50"
            }`}
          >
            {v === "ja" ? "Ja" : "Nein"}
          </button>
        ))}
      </div>
      {errors.owner && (
        <p className="mt-1.5 text-[12px] font-medium text-red-600">{errors.owner}</p>
      )}

      <div className="mt-4 space-y-3">
        <QInput label="Name" value={c.name} placeholder="Ihr Name" autoComplete="name" error={errors.name} onChange={(v) => setC((s) => ({ ...s, name: v }))} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <QInput label="E-Mail" type="email" value={c.email} placeholder="ihre@email.de" autoComplete="email" error={errors.email} onChange={(v) => setC((s) => ({ ...s, email: v }))} />
          <QInput label="Telefon" type="tel" value={c.tel} placeholder="Telefonnummer" autoComplete="tel" error={errors.tel} onChange={(v) => setC((s) => ({ ...s, tel: v }))} />
        </div>
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
          {serverError} Oder rufen Sie an:{" "}
          <a href="tel:+49215487670" className="font-semibold underline">02154 87670</a>
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="btn-cta mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Wird gesendet …" : `${submitLabel} →`}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-muted">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Ihre Daten werden vertraulich behandelt. Keine Weitergabe an Dritte.
      </p>
    </div>
  );
}

function QInput({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-200" : "border-line focus:border-brand focus:ring-brand/20"
        }`}
      />
      {error && <span className="mt-1 block text-[12px] font-medium text-red-600">{error}</span>}
    </label>
  );
}
