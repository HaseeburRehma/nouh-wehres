"use client";

import { useState, type FormEvent } from "react";

export default function AnfrageForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          tel: fd.get("tel"),
          message: fd.get("message"),
          company: fd.get("company"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          json?.error || "Die Anfrage konnte nicht gesendet werden."
        );
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand">
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">
          Vielen Dank für Ihre Anfrage!
        </h3>
        <p className="mt-2 text-muted">
          Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-bold text-ink">Anfrageformular</h3>

      {/* Honeypot – hidden from users, catches bots */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Firma (nicht ausfüllen)</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="name" label="Name">
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Ihr Name"
          className={inputClass}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="E-Mail">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ihre@email.de"
            className={inputClass}
          />
        </Field>
        <Field id="tel" label="Telefon">
          <input
            id="tel"
            name="tel"
            type="tel"
            placeholder="Ihre Telefonnummer"
            className={inputClass}
          />
        </Field>
      </div>
      <Field id="message" label="Nachricht">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Worum geht es? (z. B. neue Heizung, Bad sanieren …)"
          className={`${inputClass} resize-none`}
        />
      </Field>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          "Wird gesendet …"
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

const inputClass =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
