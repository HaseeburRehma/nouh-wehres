import { NextResponse } from "next/server";

// Where form submissions are delivered, and the verified sender address.
// Set these in .env.local (dev) and in Vercel project env vars (production).
const TO = process.env.CONTACT_TO || "info@nouh-wehres.de";
const FROM =
  process.env.CONTACT_FROM || "NOUH-WEHRES Website <formular@nouh-wehres.de>";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const telRe = /^[+(]?[\d][\d\s()/-]{5,19}$/;

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

  const name = String(data.name ?? "").trim().slice(0, 120);
  const email = String(data.email ?? "").trim().slice(0, 160);
  const tel = String(data.tel ?? "").trim().slice(0, 40);
  const topic = String(data.topic ?? "").trim().slice(0, 80);
  const message = String(data.message ?? "").trim().slice(0, 4000);
  const honeypot = String(data.company ?? "").trim(); // spam trap

  // Bot filled the hidden field — silently accept and drop.
  if (honeypot) return NextResponse.json({ ok: true });

  // Server-side validation (mirrors the client — never trust the browser).
  if (name.length < 2) {
    return NextResponse.json(
      { error: "Bitte geben Sie Ihren Namen an." },
      { status: 400 }
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige E-Mail-Adresse an." },
      { status: 400 }
    );
  }
  if (tel && !telRe.test(tel)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige Telefonnummer an." },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Bitte beschreiben Sie kurz Ihr Anliegen." },
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

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#5b6573;vertical-align:top">${label}</td><td><strong>${value}</strong></td></tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0b0b0b;line-height:1.6">
      <h2 style="margin:0 0 16px">Neue Anfrage über die Website</h2>
      <table cellpadding="0" cellspacing="0" style="font-size:15px">
        ${row("Name", esc(name))}
        ${row("E-Mail", `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
        ${row("Telefon", tel ? esc(tel) : "—")}
        ${topic ? row("Anliegen", esc(topic)) : ""}
      </table>
      <p style="margin:16px 0 4px;color:#5b6573;font-size:15px">Nachricht</p>
      <div style="white-space:pre-wrap;background:#f5f6f7;border-radius:8px;padding:14px 16px;font-size:15px">${esc(
        message
      )}</div>
      <p style="margin-top:20px;color:#98a1ad;font-size:12px">Gesendet über das Kontaktformular von nouh-wehres.de</p>
    </div>`;

  const text =
    `Neue Anfrage über die Website\n\n` +
    `Name: ${name}\nE-Mail: ${email}\nTelefon: ${tel || "—"}\n` +
    `${topic ? `Anliegen: ${topic}\n` : ""}\nNachricht:\n${message}\n`;

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
        subject: `Neue Anfrage von ${name}${topic ? ` · ${topic}` : ""}`,
        html,
        text,
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
