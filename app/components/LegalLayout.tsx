import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Shared layout for the three legal pages (Impressum, Datenschutz, AGB).
// Keeps a minimal header/footer so visitors don't get lost, but no landing-page
// hero — just clean, readable long-form text.
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string; // ISO date, e.g. "2026-08-13"
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
          <header className="border-b border-line pb-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
              Rechtliches
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted">Stand: {formatDate(updated)}</p>
          </header>
          <article className="legal mt-8">{children}</article>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
