"use client";

import { useMemo, useState } from "react";
import type { WizardStep } from "../../lib/landing";

type Props = {
  name: string; // e.g. "Ihr Festpreis-Rechner"
  topic: string;
  steps: WizardStep[];
  note?: string; // subtitle after the step counter (default: "dauert nur 2 Minuten" on step 1)
  submitLabel?: string; // final button label
  countContact?: boolean; // include the contact step in the "Schritt X von N" count (default true)
};

type Contact = { name: string; email: string; tel: string; plz: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const telRe = /^[+(]?[\d][\d\s()/-]{5,19}$/;

export default function CheckWizard({
  name,
  topic,
  steps,
  note,
  submitLabel = "Ergebnis anfordern",
  countContact = true,
}: Props) {
  const total = steps.length;
  const questionCount = steps.filter((s) => s.kind !== "contact").length;
  const displayTotal = countContact ? total : questionCount;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    tel: "",
    plz: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const current = steps[step];
  const progress = ((step + 1) / total) * 100;

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [step]: value }));
    // Auto-advance after a short beat so the selection is visible.
    window.setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 180);
  }

  function validateContact(): boolean {
    const next: Partial<Record<keyof Contact, string>> = {};
    if (contact.name.trim().length < 2)
      next.name = "Bitte geben Sie Ihren Namen ein.";
    if (!emailRe.test(contact.email.trim()))
      next.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (!telRe.test(contact.tel.trim()))
      next.tel = "Bitte geben Sie eine gültige Telefonnummer ein.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const message = useMemo(() => {
    const lines = steps
      .map((s, i) =>
        s.kind === "choice" || s.kind === "text"
          ? `${s.question} → ${answers[i] ?? "—"}`
          : null
      )
      .filter(Boolean) as string[];
    if (contact.plz.trim()) lines.push(`PLZ / Ort: ${contact.plz.trim()}`);
    return `Anfrage über ${name}:\n\n${lines.join("\n")}`;
  }, [steps, answers, contact.plz, name]);

  async function submit() {
    setServerError(null);
    if (!validateContact()) return;
    setStatus("sending");

    // Structured answers → one column per question in the Google Sheet.
    const answerList = steps
      .map((s, i) =>
        s.kind === "choice" || s.kind === "text"
          ? { q: s.question, a: (answers[i] ?? "").toString() }
          : null
      )
      .filter(Boolean) as { q: string; a: string }[];
    if (contact.plz.trim())
      answerList.push({ q: "PLZ / Ort", a: contact.plz.trim() });

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          tel: contact.tel.trim(),
          topic,
          message,
          answers: answerList,
        }),
      });
      const json = await res.json().catch(
        () => ({} as { error?: string; eventId?: string })
      );
      if (!res.ok)
        throw new Error(
          json?.error || "Die Anfrage konnte nicht gesendet werden."
        );
      if (json?.eventId) {
        const { firePixelLead } = await import("../../lib/meta-pixel-client");
        firePixelLead(json.eventId, { content_name: topic });
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
      );
    }
  }

  /* ── Success ── */
  if (status === "sent") {
    return (
      <div
        translate="no"
        className="notranslate flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">
          Vielen Dank
          {contact.name ? `, ${contact.name.trim().split(" ")[0]}` : ""}!
        </h3>
        <p className="mt-2 max-w-xs text-[15px] text-muted">
          Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von
          24&nbsp;Stunden bei Ihnen – meist schon deutlich früher.
        </p>
        <p className="mt-4 text-sm text-muted">
          Dringend? Rufen Sie an:{" "}
          <a href="tel:+49215487670" className="font-semibold text-brand">
            02154 87670
          </a>
        </p>
      </div>
    );
  }

  /* ── Wizard card ── */
  return (
    <div translate="no" className="notranslate flex flex-col">
      {/* Header */}
      <div className="border-b border-line px-6 pb-4 pt-6 sm:px-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
          {name}
        </p>
        <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
          <span>
            {current.kind === "contact" && !countContact ? (
              "Fast geschafft – nur noch Ihre Kontaktdaten"
            ) : (
              <>
                Schritt <strong className="text-ink">{step + 1}</strong> von{" "}
                {displayTotal}
                {note
                  ? ` · ${note}`
                  : current.kind !== "contact" && step === 0
                    ? " · dauert nur 2 Minuten"
                    : ""}
              </>
            )}
          </span>
          <span className="font-semibold text-ink">
            {Math.round(progress)} %
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 sm:px-7">
        {current.kind === "choice" ? (
          <>
            <h3 className="text-lg font-bold text-ink">{current.question}</h3>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {current.options.map((opt) => {
                const active = answers[step] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose(opt)}
                    className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all ${
                      active
                        ? "border-brand bg-brand-50 text-ink"
                        : "border-line bg-white text-ink hover:border-brand/50 hover:bg-brand-50/40"
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                        active
                          ? "border-brand bg-brand text-white"
                          : "border-line group-hover:border-brand/60"
                      }`}
                      aria-hidden
                    >
                      {active && (
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : current.kind === "text" ? (
          <>
            <h3 className="text-lg font-bold text-ink">{current.question}</h3>
            {current.help && (
              <p className="mt-1 text-[13px] text-muted">{current.help}</p>
            )}
            <input
              type="text"
              value={answers[step] ?? ""}
              placeholder={current.placeholder}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [step]: e.target.value }))
              }
              className="mt-4 w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-ink">{current.question}</h3>
            <p className="mt-1 text-[13px] text-muted">
              Wir senden Ihnen Ihr Ergebnis und melden uns persönlich.
            </p>
            <div className="mt-4 space-y-3">
              <WizardInput
                label="Name"
                name="name"
                autoComplete="name"
                placeholder="Ihr Name"
                value={contact.name}
                onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                error={errors.name}
              />
              <WizardInput
                label="E-Mail"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ihre@email.de"
                value={contact.email}
                onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                error={errors.email}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <WizardInput
                  label="Telefon"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Telefonnummer"
                  value={contact.tel}
                  onChange={(v) => setContact((c) => ({ ...c, tel: v }))}
                  error={errors.tel}
                />
                <WizardInput
                  label="PLZ / Ort"
                  name="plz"
                  autoComplete="postal-code"
                  placeholder="z. B. 47877 Willich"
                  optional
                  value={contact.plz}
                  onChange={(v) => setContact((c) => ({ ...c, plz: v }))}
                />
              </div>
            </div>

            {status === "error" && serverError && (
              <p
                role="alert"
                className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12" y2="16" />
                </svg>
                <span>
                  {serverError} Oder rufen Sie an:{" "}
                  <a href="tel:+49215487670" className="font-semibold underline">
                    02154 87670
                  </a>
                </span>
              </p>
            )}
          </>
        )}
      </div>

      {/* Footer / navigation */}
      <div className="mt-auto px-6 pb-6 sm:px-7">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={status === "sending"}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
            >
              <span aria-hidden>←</span> Zurück
            </button>
          )}

          {current.kind !== "contact" ? (
            <button
              type="button"
              onClick={() => {
                const v = answers[step];
                const ok =
                  current.kind === "text"
                    ? current.optional || (!!v && v.trim().length > 0)
                    : !!v;
                if (ok) setStep((s) => Math.min(s + 1, total - 1));
              }}
              disabled={
                current.kind === "choice"
                  ? !answers[step]
                  : !(current.optional || (answers[step] && answers[step].trim()))
              }
              className="btn-cta inline-flex flex-1 items-center justify-center rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="btn-label" data-text="Weiter →">
                Weiter →
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending"}
              className="btn-cta inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <svg viewBox="0 0 24 24" width="18" height="18" className="animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                  </svg>
                  Wird gesendet …
                </>
              ) : (
                `${submitLabel} →`
              )}
            </button>
          )}
        </div>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-muted">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Ihre Daten werden vertraulich behandelt. Keine Weitergabe an Dritte.
        </p>
      </div>
    </div>
  );
}

function WizardInput({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  optional,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "border-line focus:border-brand focus:ring-brand/20"
        }`}
      />
      {error && <span className="mt-1 block text-[12px] font-medium text-red-600">{error}</span>}
    </label>
  );
}
