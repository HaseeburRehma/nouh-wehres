import { NextResponse } from "next/server";

// Where form submissions are delivered, and the verified sender address.
// Set these in .env.local (dev) and in Vercel project env vars (production).
const TO = process.env.CONTACT_TO || "info@nouh-wehres.de";
const FROM =
  process.env.CONTACT_FROM || "NOUH-WEHRES Website <formular@nouh-wehres.de>";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const tel = String(data.tel ?? "").trim();
  const message = String(data.message ?? "").trim();
  const honeypot = String(data.company ?? "").trim(); // spam trap

  // Bot filled the hidden field — silently accept and drop.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email) {
    return NextResponse.json(
      { error: "Bitte geben Sie Name und E-Mail an." },
      { status: 400 }
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige E-Mail-Adresse an." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return NextResponse.json(
      { error: "Der E-Mail-Versand ist noch nicht konfiguriert." },
      { status: 503 }
    );
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0b0b0b;line-height:1.6">
      <h2 style="margin:0 0 16px">Neue Anfrage über die Website</h2>
      <table cellpadding="0" cellspacing="0" style="font-size:15px">
        <tr><td style="padding:4px 16px 4px 0;color:#5b6573">Name</td><td><strong>${esc(name)}</strong></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#5b6573">E-Mail</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#5b6573">Telefon</td><td>${tel ? esc(tel) : "—"}</td></tr>
      </table>
      <p style="margin:16px 0 4px;color:#5b6573;font-size:15px">Nachricht</p>
      <div style="white-space:pre-wrap;background:#f5f6f7;border-radius:8px;padding:14px 16px;font-size:15px">${
        message ? esc(message) : "—"
      }</div>
      <p style="margin-top:20px;color:#98a1ad;font-size:12px">Gesendet über das Kontaktformular von nouh-wehres.de</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Neue Anfrage von ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend API error:", res.status, detail);
      return NextResponse.json(
        { error: "Die Anfrage konnte nicht gesendet werden." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
  }
}
