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

export function fireLeadEvent({ eventId, topic, value }: LeadPayload) {
  if (typeof window === "undefined") return;
  const w = window as W;

  // 1. Meta Pixel — matches server CAPI Lead via eventID
  try {
    w.fbq?.("track", "Lead", { content_name: topic, value, currency: "EUR" }, { eventID: eventId });
  } catch { /* ignore */ }

  // 2. GA4 — standard e-commerce-style lead event
  try {
    w.gtag?.("event", "generate_lead", {
      currency: "EUR",
      value: value ?? 0,
      form_name: topic,
      event_id: eventId,
    });
  } catch { /* ignore */ }

  // 3. dataLayer — GTM will inherit these automatically once container ships
  try {
    (w.dataLayer ||= []).push({
      event: "generate_lead",
      form_name: topic,
      value: value ?? 0,
      currency: "EUR",
      event_id: eventId,
    });
  } catch { /* ignore */ }
}

// Fire when a user clicks a tel: link. Fires GA4 + dataLayer only
// (Meta Pixel doesn't have a first-class phone-click event).
export function firePhoneClickEvent(where: string) {
  if (typeof window === "undefined") return;
  const w = window as W;
  try {
    w.gtag?.("event", "phone_click", { link_location: where });
  } catch { /* ignore */ }
  try {
    (w.dataLayer ||= []).push({ event: "phone_click", link_location: where });
  } catch { /* ignore */ }
}
