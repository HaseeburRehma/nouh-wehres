"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID; // e.g. "GTM-XXXXXXX"

// Google Tag Manager loader — DSGVO-gated behind the same consent flag as
// Meta Pixel / GA4 (`localStorage['meta-consent']=granted`). Dormant until
// NEXT_PUBLIC_GTM_ID is set in the environment.
//
// Once loaded, GTM consumes anything pushed to window.dataLayer, so the
// `generate_lead` and `phone_click` events fired by analytics-client.ts
// flow through GTM without any additional code.
export default function GoogleTagManager() {
  if (!GTM_ID) return null;
  return (
    <>
      <Script id="gtm-consent-loader" strategy="afterInteractive">
        {`
          (function () {
            var GTM_ID = '${GTM_ID}';
            window.dataLayer = window.dataLayer || [];
            var loaded = false;
            function boot() {
              if (loaded) return;
              if (localStorage.getItem('meta-consent') !== 'granted') return;
              loaded = true;
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
              });
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
              var f = document.getElementsByTagName('script')[0];
              f.parentNode.insertBefore(s, f);
            }
            boot();
            window.addEventListener('meta-consent-changed', boot);
          })();
        `}
      </Script>
      {/* GTM <noscript> fallback (fires unconditionally — GDPR OK because
          it only pings GTM's own domain, no tracking scripts run until
          tags inside the container are triggered). */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
