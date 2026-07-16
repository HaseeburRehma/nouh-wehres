"use client";

import { useRef, useState, type FormEvent } from "react";

type Field = "name" | "email" | "tel" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const topics = [
  "Heizung / Wärmepumpe",
  "Badsanierung",
  "Lüftung / Klima",
  "Gebäudetechnik / PV",
  "Gewerbe",
  "Sonstiges",
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const telRe = /^[+(]?[\d][\d\s()/-]{5,19}$/;

function validateField(field: Field, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case "name":
      if (!v) return "Bitte geben Sie Ihren Namen ein.";
      if (v.length < 2) return "Der Name ist zu kurz.";
      return;
    case "email":
      if (!v) return "Bitte geben Sie Ihre E-Mail-Adresse ein.";
      if (!emailRe.test(v)) return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      return;
    case "tel":
      if (v && !telRe.test(v))
        return "Bitte geben Sie eine gültige Telefonnummer ein.";
      return;
    case "message":
      if (!v) return "Bitte beschreiben Sie kurz Ihr Anliegen.";
      if (v.length < 10) return "Bitte etwas ausführlicher (mind. 10 Zeichen).";
      return;
  }
}

export default function AnfrageForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    tel: "",
    message: "",
  });
  const [topic, setTopic] = useState(topics[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function setField(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
    }
  }

  function handleBlur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }));
  }

  function validateAll(): boolean {
    const next: Errors = {};
    (Object.keys(values) as Field[]).forEach((f) => {
      const err = validateField(f, values[f]);
      if (err) next[f] = err;
    });
    setErrors(next);
    setTouched({ name: true, email: true, tel: true, message: true });
    if (Object.keys(next).length) {
      const first = (["name", "email", "tel", "message"] as Field[]).find(
        (f) => next[f]
      );
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    if (!validateAll()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          topic,
          company: (formRef.current?.elements.namedItem("company") as
            | HTMLInputElement
            | null)?.value,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(json?.error || "Die Anfrage konnte nicht gesendet werden.");
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

  if (status === "sent") {
    return (
      <div
        translate="no"
        className="notranslate flex h-full min-h-80 flex-col items-center justify-center py-6 text-center"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">
          Vielen Dank{values.name ? `, ${values.name.trim().split(" ")[0]}` : ""}!
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von
          24&nbsp;Stunden bei Ihnen – meist schon deutlich früher.
        </p>
        <p className="mt-4 text-sm text-muted">
          Dringend? Rufen Sie uns direkt an:{" "}
          <a href="tel:+49215487670" className="font-semibold text-brand">
            02154 87670
          </a>
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", tel: "", message: "" });
            setTopic(topics[0]);
            setErrors({});
            setTouched({});
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      translate="no"
      className="notranslate space-y-5"
    >
      <h3 className="text-xl font-bold text-ink">Anfrageformular</h3>

      {/* Honeypot – hidden from users, catches bots */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Firma (nicht ausfüllen)</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id="name"
        label="Name"
        error={touched.name ? errors.name : undefined}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ihr Name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={!!(touched.name && errors.name)}
          className={inputClass(touched.name && errors.name)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label="E-Mail"
          error={touched.email ? errors.email : undefined}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ihre@email.de"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!(touched.email && errors.email)}
            className={inputClass(touched.email && errors.email)}
          />
        </Field>
        <Field
          id="tel"
          label="Telefon"
          optional
          error={touched.tel ? errors.tel : undefined}
        >
          <input
            id="tel"
            name="tel"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Ihre Telefonnummer"
            value={values.tel}
            onChange={(e) => setField("tel", e.target.value)}
            onBlur={() => handleBlur("tel")}
            aria-invalid={!!(touched.tel && errors.tel)}
            className={inputClass(touched.tel && errors.tel)}
          />
        </Field>
      </div>

      <Field id="topic" label="Anliegen">
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={inputClass(false)}
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label="Nachricht"
        error={touched.message ? errors.message : undefined}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Worum geht es? (z. B. neue Heizung, Bad sanieren …)"
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={!!(touched.message && errors.message)}
          className={`${inputClass(touched.message && errors.message)} resize-none`}
        />
      </Field>

      {status === "error" && serverError && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
          <span>
            {serverError} Alternativ erreichen Sie uns unter{" "}
            <a href="tel:+49215487670" className="font-semibold underline">
              02154 87670
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <svg viewBox="0 0 24 24" width="18" height="18" className="animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-6.22-8.56" />
            </svg>
            Wird gesendet …
          </>
        ) : (
          <>
            Anfrage senden <span aria-hidden>→</span>
          </>
        )}
      </button>
      <p className="text-center text-xs text-muted">
        Wir melden uns innerhalb von 24 Stunden bei Ihnen.
      </p>
    </form>
  );
}

function inputClass(hasError: string | boolean | undefined) {
  return `w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-line focus:border-brand focus:ring-brand/20"
  }`;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
