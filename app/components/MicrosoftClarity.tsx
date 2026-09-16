"use client";

import Script from "next/script";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID; // e.g. "yj95b3etzr"

// Microsoft Clarity — session recordings + heatmaps + Smart Events.
//
// DSGVO-gated the same way as MetaPixel / GA4 / GTM: the network tag is
// only loaded after the user has clicked "Akzeptieren" in the cookie
// banner (`localStorage['meta-consent'] = 'granted'`, event
// `meta-consent-changed`). Dormant unless NEXT_PUBLIC_CLARITY_ID is set.
export default function MicrosoftClarity() {
  if (!CLARITY_ID) return null;
  return (
    <Script id="ms-clarity-consent-loader" strategy="afterInteractive">
      {`
        (function () {
          var CLARITY_ID = '${CLARITY_ID}';
          var loaded = false;
          function boot() {
            if (loaded) return;
            if (localStorage.getItem('meta-consent') !== 'granted') return;
            loaded = true;
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", CLARITY_ID);
          }
          boot();
          window.addEventListener('meta-consent-changed', boot);
        })();
      `}
    </Script>
  );
}
