"use client";

import { useEffect } from "react";
import { firePhoneClickEvent } from "../lib/analytics-client";

// Site-wide capture-phase listener that fires a GA4 `phone_click` event
// (and dataLayer push for GTM) whenever any `<a href="tel:…">` is clicked
// — Header, Footer, Impressum, form CTA, wherever. One listener, all links.
// Uses closest('a[href^="tel:"]') so nested spans/icons inside the anchor
// still count.
export default function PhoneClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!a) return;
      // Best-effort location tag: nearest section/header/footer/main
      const scope =
        a.closest("header")?.tagName.toLowerCase() ||
        a.closest("footer")?.tagName.toLowerCase() ||
        a.closest("form")?.tagName.toLowerCase() ||
        a.closest("main")?.tagName.toLowerCase() ||
        "body";
      firePhoneClickEvent(scope);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
