"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Analytics 4 (GA4) loader.
//
// DSGVO gate — matches the MetaPixel pattern: gtag() is available as a
// stub immediately (so calls queue), but the network script only loads
// after the user opts in via the consent banner
// (`localStorage['meta-consent'] = 'granted'`, event `meta-consent-changed`).
//
// After load, we set `send_page_view: false` on the initial config so we
// can fire our own page_view on Next.js client-side route changes without
// duplicating the automatic one.
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;
    const granted =
      window.localStorage.getItem("meta-consent") === "granted";
    if (!granted || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      {/* gtag.js loaded only after the user grants consent. */}
      <Script id="ga4-consent-loader" strategy="afterInteractive">
        {`
          (function () {
            var GA_ID = '${GA_ID}';
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); };
            var loaded = false;
            function boot() {
              if (loaded) return;
              if (localStorage.getItem('meta-consent') !== 'granted') return;
              loaded = true;
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
              document.head.appendChild(s);
              window.gtag('js', new Date());
              // send_page_view:false → we fire page_view ourselves on route
              // changes so client-side navigations count.
              window.gtag('config', GA_ID, { send_page_view: false });
              window.gtag('event', 'page_view', {
                page_path: location.pathname + location.search,
                page_location: location.href,
                page_title: document.title,
              });
            }
            boot();
            window.addEventListener('meta-consent-changed', boot);
          })();
        `}
      </Script>
    </>
  );
}
