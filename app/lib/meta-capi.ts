import crypto from "node:crypto";

// Meta Pixel + Conversions API (CAPI) server-side helper.
//
// Requires two env vars to actually send:
//   NEXT_PUBLIC_META_PIXEL_ID    — pixel id (also used client-side)
//   META_CAPI_ACCESS_TOKEN       — long-lived system-user token from Meta
// Optional:
//   META_CAPI_TEST_EVENT_CODE    — set to a TEST123-style code during setup;
//                                  events show under "Test events" in Events Manager
//
// If either required var is missing, sendCapiEvent() is a silent no-op — safe to
// call from the API route unconditionally.

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

function sha256(s: string): string {
  return crypto
    .createHash("sha256")
    .update(s.trim().toLowerCase())
    .digest("hex");
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  city?: string;
  country?: string; // ISO-2 lowercased
  ipAddress?: string;
  userAgent?: string;
  fbc?: string; // Meta click-id cookie (_fbc)
  fbp?: string; // Meta browser-id cookie (_fbp)
}

export async function sendCapiEvent(opts: {
  eventName: "Lead" | "Contact" | "SubmitApplication" | "Schedule" | "CompleteRegistration";
  eventId: string; // MUST match the client-side fbq() eventID for dedup
  eventSourceUrl?: string;
  userData?: CapiUserData;
  customData?: Record<string, unknown>;
}): Promise<void> {
  if (!PIXEL_ID || !TOKEN) return;

  const user_data: Record<string, string | string[]> = {};
  const u = opts.userData ?? {};
  if (u.email) user_data.em = [sha256(u.email)];
  if (u.phone) user_data.ph = [sha256(u.phone.replace(/[^\d]/g, ""))];
  if (u.firstName) user_data.fn = [sha256(u.firstName)];
  if (u.lastName) user_data.ln = [sha256(u.lastName)];
  if (u.postalCode) user_data.zp = [sha256(u.postalCode)];
  if (u.city) user_data.ct = [sha256(u.city)];
  if (u.country) user_data.country = [sha256(u.country)];
  if (u.ipAddress) user_data.client_ip_address = u.ipAddress;
  if (u.userAgent) user_data.client_user_agent = u.userAgent;
  if (u.fbc) user_data.fbc = u.fbc;
  if (u.fbp) user_data.fbp = u.fbp;

  const payload = {
    data: [
      {
        event_name: opts.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        action_source: "website",
        event_source_url: opts.eventSourceUrl,
        user_data,
        custom_data: opts.customData ?? {},
      },
    ],
    ...(TEST_CODE ? { test_event_code: TEST_CODE } : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      const detail = await res.text();
      console.error(
        "Meta CAPI error:",
        res.status,
        detail.slice(0, 800)
      );
    }
  } catch (err) {
    console.error("Meta CAPI request failed:", err);
  }
}
