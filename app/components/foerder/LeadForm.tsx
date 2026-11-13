"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, Check } from "./icons";

// Gleiche Regeln wie /api/kontakt (Server prüft nochmals).
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const telRe = /^[+(]?[\d][\d\s()/-]{5,19}$/;
const plzRe = /^\d{5}$/;

const ANLIEGEN = ["Wärmepumpe", "Gastherme", "Beratung"] as const;
type Anliegen = (typeof ANLIEGEN)[number];

const TOPIC = "Förder-LP Wärmepumpe";

type Fields = { plz: string; name: string; tel: string; email: string };
type Errors = Partial<Record<keyof Fields, string>>;

export default function LeadForm({ className = "" }: { className?: string }) {
  const uid = useId();
  const [anliegen, setAnliegen] = useState<Anliegen>("Wärmepumpe");
  const [f, setF] = useState<Fields>({ plz: "", name: "", tel: "", email: "" });
  const [hp, setHp] = useState(""); // Honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(): boolean {
    const e: Errors = {};
    if (!plzRe.test(f.plz.trim())) e.plz = "Bitte 5-stellige PLZ angeben.";
    if (f.name.trim().length < 2) e.name = "Bitte Ihren Namen angeben.";
    if (!telRe.test(f.tel.trim())) e.tel = "Bitte gültige Telefonnummer angeben.";
    if (!emailRe.test(f.email.trim())) e.email = "Bitte gültige E-Mail angeben.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "sending") return;
    setServerError(null);
    if (!validate()) return;
    setStatus("sending");
    try {
      const plz = f.plz.trim();
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name.trim(),
          email: f.email.trim(),
          tel: f.tel.trim(),
          topic: `${TOPIC} · ${anliegen}`,
          message: `Anliegen: ${anliegen}\nPLZ: ${plz}\nAnfrage über: ${TOPIC}`,
          answers: [
            { q: "Ihr Anliegen", a: anliegen },
            { q: "PLZ", a: plz },
          ],
          company: hp,
          landingPage: window.location.pathname,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; eventId?: string };
      if (!res.ok) throw new Error(json.error || "Die Anfrage konnte nicht gesendet werden.");
      if (json.eventId) {
        const { fireLeadEvent } = await import("../../lib/analytics-client");
        fireLeadEvent({ eventId: json.eventId, topic: TOPIC });
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    }
  }

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setF((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  if (status === "sent") {
    return (
      <div translate="no" className={`notranslate fl-card-form text-center ${className}`} role="status">
        <span className="fl-success-ring mx-auto grid h-16 w-16 place-items-center rounded-full bg-fl-brand-50 text-fl-brand">
          <Check size={30} />
        </span>
        <h3 className="mt-5 text-[22px] font-bold tracking-tight text-fl-ink">
          Vielen Dank{f.name ? `, ${f.name.trim().split(/\s+/)[0]}` : ""}!
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-fl-muted">
          Ihre Anfrage ist eingegangen. Wir melden uns persönlich bei Ihnen – in der Regel innerhalb von 24&nbsp;Stunden.
        </p>
      </div>
    );
  }

  return (
    <form
      translate="no"
      noValidate
      onSubmit={onSubmit}
      className={`notranslate fl-card-form ${className}`}
      aria-label="Kostenlose Förder-Beratung anfragen"
    >
      <p className="flex items-center gap-2.5 rounded-lg bg-[#FFF6D9] px-3.5 py-2.5 text-[13px] font-semibold text-[#6B5200]">
        <span className="fl-pulse-dot" aria-hidden />
        Nur begrenzte Beratungstermine diesen Monat.
      </p>

      <h3 className="mt-5 text-[22px] font-bold leading-tight tracking-[-0.01em] text-fl-ink sm:text-[24px]">
        Kostenlose Förder-Beratung
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-fl-muted">
        In 60 Sekunden anfragen – wir melden uns persönlich bei Ihnen.
      </p>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[13px] font-semibold text-fl-ink">Ihr Anliegen</legend>
        <div className="grid grid-cols-3 gap-2">
          {ANLIEGEN.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={anliegen === a}
              onClick={() => setAnliegen(a)}
              className={`fl-chip ${anliegen === a ? "is-active" : ""}`}
            >
              {a}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
        <Field id={`${uid}-plz`} label="PLZ" error={errors.plz}>
          <input id={`${uid}-plz`} inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="z. B. 47877" value={f.plz} onChange={set("plz")} aria-invalid={!!errors.plz} className="fl-input" />
        </Field>
        <Field id={`${uid}-name`} label="Name" error={errors.name}>
          <input id={`${uid}-name`} autoComplete="name" maxLength={120} placeholder="Vor- und Nachname" value={f.name} onChange={set("name")} aria-invalid={!!errors.name} className="fl-input" />
        </Field>
        <Field id={`${uid}-tel`} label="Telefon" error={errors.tel}>
          <input id={`${uid}-tel`} type="tel" autoComplete="tel" maxLength={40} placeholder="Für den Rückruf" value={f.tel} onChange={set("tel")} aria-invalid={!!errors.tel} className="fl-input" />
        </Field>
        <Field id={`${uid}-email`} label="E-Mail" error={errors.email}>
          <input id={`${uid}-email`} type="email" autoComplete="email" maxLength={160} placeholder="name@beispiel.de" value={f.email} onChange={set("email")} aria-invalid={!!errors.email} className="fl-input" />
        </Field>
      </div>

      {/* Honeypot – für Menschen unsichtbar */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

      {status === "error" && serverError && (
        <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
          {serverError} Oder rufen Sie uns an:{" "}
          <a href="tel:+49215487670" className="font-semibold underline">02154 87670</a>
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="fl-btn btn-cta mt-5 w-full">
        <span className="btn-label" data-text={status === "sending" ? "Wird gesendet …" : "Kostenlose Förder-Beratung sichern"}>
          {status === "sending" ? "Wird gesendet …" : "Kostenlose Förder-Beratung sichern"}
        </span>
        <ArrowRight className="fl-btn-arrow" />
      </button>

      <ul className="mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-fl-muted">
        {["100 % kostenlos", "Unverbindlich", "DSGVO-konform"].map((t) => (
          <li key={t} className="flex items-center gap-1.5">
            <Check size={11} className="text-fl-brand" />
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-center text-[11px] leading-snug text-fl-silver">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß unserer{" "}
        <Link href="/datenschutz" className="underline underline-offset-2 hover:text-fl-brand">Datenschutzerklärung</Link> zu.
      </p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-fl-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11.5px] font-medium leading-tight text-red-600">{error}</p>}
    </div>
  );
}
