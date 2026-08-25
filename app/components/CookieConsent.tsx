"use client";

import { useEffect, useState } from "react";

// Minimal DSGVO-compliant consent banner covering the Meta Pixel.
// Choice is persisted in localStorage under "meta-consent" as either
// "granted" or "denied". A `meta-consent-changed` event is dispatched so
// MetaPixel can initialise the pixel the moment consent is granted.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only prompt the user if we haven't stored a decision yet.
    const choice = window.localStorage.getItem("meta-consent");
    if (choice !== "granted" && choice !== "denied") {
      // Small delay so the banner doesn't flash before the page paints.
      const t = window.setTimeout(() => setVisible(true), 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  function decide(v: "granted" | "denied") {
    window.localStorage.setItem("meta-consent", v);
    window.dispatchEvent(new CustomEvent("meta-consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-2xl sm:flex-row sm:items-start sm:p-6">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-ink">
            Cookies &amp; Marketing
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            Wir setzen technisch notwendige Cookies. Zusätzlich möchten wir
            mit Ihrer Einwilligung den Meta-Pixel für Reichweitenmessung und
            Werbe-Erfolgsmessung nutzen. Sie können Ihre Auswahl jederzeit in
            unserer{" "}
            <a
              href="/datenschutz"
              className="font-semibold text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Datenschutzerklärung
            </a>{" "}
            widerrufen.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="btn-cta rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
