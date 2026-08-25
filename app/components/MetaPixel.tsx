"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Meta Pixel client loader.
//
// DSGVO gate: the pixel only initialises after the user opts in via the
// consent banner, which sets `localStorage['meta-consent'] = 'granted'`
// and dispatches a `meta-consent-changed` event.
//
// Once loaded, it fires PageView on every client-side navigation.
// Lead / Contact events are fired from the form components on success,
// using an eventID that matches the server-side CAPI event_id (dedup).
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || typeof window === "undefined") return;
    const consent = () =>
      window.localStorage.getItem("meta-consent") === "granted";

    // Fire PageView on route change once fbq is loaded and consent given.
    const firePageView = () => {
      if (window.fbq && consent()) window.fbq("track", "PageView");
    };

    firePageView();
    const onConsent = () => firePageView();
    window.addEventListener("meta-consent-changed", onConsent);
    return () =>
      window.removeEventListener("meta-consent-changed", onConsent);
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      {/* Loader script: registers window.fbq but does not init() until consent. */}
      <Script id="meta-pixel-loader" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
          n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
          t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          (function () {
            var PIXEL_ID = '${PIXEL_ID}';
            var inited = false;
            function boot() {
              if (inited) return;
              if (localStorage.getItem('meta-consent') !== 'granted') return;
              inited = true;
              try {
                fbq('init', PIXEL_ID);
                fbq('track', 'PageView');
              } catch (e) {}
            }
            boot();
            window.addEventListener('meta-consent-changed', boot);
          })();
        `}
      </Script>
      {/* Noscript fallback fires only if the user has already opted in via a
          previous session; we cannot check localStorage here, so keep it
          disabled for privacy. Left commented for reference. */}
    </>
  );
}
