// Client-side helper for firing Meta Pixel events with dedup event_id.
// Silently no-ops when the pixel hasn't been loaded (no PIXEL_ID or no consent).

export function firePixelLead(
  eventId: string,
  data?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (!fbq) return;
  try {
    fbq("track", "Lead", data ?? {}, { eventID: eventId });
  } catch {
    // ignore
  }
}
