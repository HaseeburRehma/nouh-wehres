// Unified client-side lead-event dispatcher.
//
// One call, three destinations:
//   1. Meta Pixel `Lead` event (matched to server CAPI via eventID)
//   2. GA4 `generate_lead` event via gtag (fires only after consent since
//      the loader is gated on `localStorage['meta-consent']=granted`)
//   3. window.dataLayer push, so a future GTM container will pick the same
//      event up without any code change — same event name, same params.
//
// Silently no-ops on the pieces that aren't loaded (no consent, missing IDs).

type LeadPayload = {
  eventId: string;         // uuid shared with server CAPI for dedup
  topic: string;           // Which form / landing page: "Badsanierung", "Kontakt", …
  value?: number;          // Optional monetary value (EUR)
};

type W = typeof window & {
  fbq?: (...a: unknown[]) => void;
  gtag?: (...a: unknown[]) => void;
  dataLayer?: unknown[];
};

// When GTM is configured, we ONLY push to dataLayer — GTM's GA4 Event tags
// forward to GA4 for us. Firing gtag() as well would double-count every
// lead in GA4. `gtag` stays as a fallback for dev/preview builds that
// haven't set NEXT_PUBLIC_GTM_ID.
const HAS_GTM = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

export function fireLeadEvent({ eventId, topic, value }: LeadPayload) {
  if (typeof window === "undefined") return;
  const w = window as W;

  // 1. Meta Pixel — matches server CAPI Lead via eventID.
  //    Always direct: keeps client-side <-> server-side dedup simple and
  //    doesn't rely on GTM being loaded.
  try {
    w.fbq?.("track", "Lead", { content_name: topic, value, currency: "EUR" }, { eventID: eventId });
  } catch { /* ignore */ }

  // 2. dataLayer — GTM picks this up (custom event trigger `generate_lead`).
  try {
    (w.dataLayer ||= []).push({
      event: "generate_lead",
      form_name: topic,
      value: value ?? 0,
      currency: "EUR",
      event_id: eventId,
    });
  } catch { /* ignore */ }

  // 3. Direct gtag fallback — ONLY when GTM is absent.
  if (HAS_GTM) return;
  try {
    w.gtag?.("event", "generate_lead", {
      currency: "EUR",
      value: value ?? 0,
      form_name: topic,
      event_id: eventId,
    });
  } catch { /* ignore */ }
}

// Fire when a user clicks a tel: link. dataLayer push → GTM; gtag fallback
// only when GTM is absent (same anti-double-count rule as leads).
export function firePhoneClickEvent(where: string) {
  if (typeof window === "undefined") return;
  const w = window as W;
  try {
    (w.dataLayer ||= []).push({ event: "phone_click", link_location: where });
  } catch { /* ignore */ }
  if (HAS_GTM) return;
  try {
    w.gtag?.("event", "phone_click", { link_location: where });
  } catch { /* ignore */ }
}
