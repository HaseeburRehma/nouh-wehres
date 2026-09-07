/**
 * NOUH-WEHRES — website lead webhook.
 * Reached by app/api/kontakt/route.ts after a form submission succeeds
 * (Kontakt, Badsanierung Wizard/Qualify, Wärmepumpe Beratung/Kaufen,
 * Fördermittel, and any future landing page).
 *
 * Behaviour
 * ─────────
 *  • One dedicated tab per landing page (Badsanierung, Wärmepumpe
 *    Beratung, Wärmepumpe Kaufen, Fördermittel, Kontakt, Startseite,
 *    Sonstige). Tabs are created on first hit — no manual setup.
 *  • Fixed lead columns (Zeitstempel → Nachricht), followed by any
 *    per-form wizard answers (auto-appended), followed by attribution
 *    columns (Meta Click ID, Meta Browser ID, Referer, User Agent,
 *    IP-Adresse, Event-ID). Headers only ever append, never reorder,
 *    so historic rows stay aligned.
 *  • Phone numbers get a leading apostrophe so Sheets does not parse
 *    "+49 …" as a formula ( → #ERROR!). Invisible in the cell,
 *    visible in the formula bar.
 *  • Everything runs best-effort — malformed payloads return
 *    {ok:false} without breaking the form submission on the site.
 */

// ─── Config ─────────────────────────────────────────────────────────

// Landing-page path → tab name. Any path not listed falls through to
// "Sonstige". Match on `startsWith` so nested paths (/badsanierung/foo)
// still route correctly. Order matters — first match wins.
const TAB_MAP = [
  { prefix: "/badsanierung",         tab: "Badsanierung" },
  { prefix: "/waermepumpe-beratung", tab: "Wärmepumpe Beratung" },
  { prefix: "/waermepumpe-kaufen",   tab: "Wärmepumpe Kaufen" },
  { prefix: "/foerdermittel",        tab: "Fördermittel" },
  { prefix: "/kontakt",              tab: "Kontakt" },
  { prefix: "/",                     tab: "Startseite" }, // "/" only
];

// Attribution columns are appended AFTER any wizard-answer columns so
// the human-readable lead data stays leftmost and easy to scan.
const ATTRIBUTION_COLS = [
  "Meta Click ID (fbc)",
  "Meta Browser ID (fbp)",
  "Referer",
  "User Agent",
  "IP-Adresse",
  "Event-ID",
];

// ─── Entry ──────────────────────────────────────────────────────────

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); }
  catch (err) { return _out({ ok: false, error: "invalid json" }); }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tabName = _pickTab(String(d.landingPage || "/"));
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) sheet = ss.insertSheet(tabName);

  // 1. Fixed lead columns — same order the site sends them.
  const row = {
    "Zeitstempel":  d.timestamp || new Date().toISOString(),
    "Landingpage":  String(d.landingPage || ""),
    "Formular":     String(d.topic || ""),  // e.g. "Badsanierung · Festpreis"
    "Name":         String(d.name || ""),
    "E-Mail":       String(d.email || ""),
    // Apostrophe → Sheets stores as literal text, so "+49 …" survives.
    "Telefon":      d.tel ? ("'" + String(d.tel)) : "",
    "Nachricht":    String(d.message || ""),
  };

  // 2. Wizard answers → one column per question (added if new).
  (d.answers || []).forEach(function (it) {
    if (it && it.q) row[String(it.q)] = it.a != null ? String(it.a) : "";
  });

  // 3. Attribution columns — Meta Pixel cookies + request context.
  row["Meta Click ID (fbc)"]  = String(d.fbc || "");
  row["Meta Browser ID (fbp)"] = String(d.fbp || "");
  row["Referer"]              = String(d.referer || "");
  row["User Agent"]           = String(d.userAgent || "");
  row["IP-Adresse"]           = String(d.ipAddress || "");
  row["Event-ID"]             = String(d.eventId || "");

  // Existing headers (row 1) — start fresh if the sheet is blank.
  const lastCol = Math.max(1, sheet.getLastColumn());
  let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers[0] !== "Zeitstempel") headers = [];

  // Extend headers with any new keys, keep old order intact.
  // Ordering priority when writing a fresh sheet:
  //   [fixed leads]  +  [wizard answers]  +  [attribution]
  const wizardKeys = Object.keys(row).filter(function (k) {
    return _isWizardKey(k);
  });
  const desiredOrder = _fixedCols().concat(wizardKeys, ATTRIBUTION_COLS);
  desiredOrder.forEach(function (key) {
    if (row[key] !== undefined && headers.indexOf(key) === -1) headers.push(key);
  });
  // Safety net: any keys neither fixed/wizard/attribution.
  Object.keys(row).forEach(function (key) {
    if (headers.indexOf(key) === -1) headers.push(key);
  });

  // Write header row (bold + frozen).
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold");
  sheet.setFrozenRows(1);

  // Append the row, aligned to current headers.
  sheet.appendRow(headers.map(function (h) {
    return row[h] !== undefined ? row[h] : "";
  }));

  return _out({ ok: true, tab: tabName, row: sheet.getLastRow() });
}

// Browser-friendly health check — visit the /exec URL in a browser.
function doGet() {
  return _out({ ok: true, msg: "Nouh-Wehres lead webhook alive." });
}

// ─── Helpers ────────────────────────────────────────────────────────

function _pickTab(pathRaw) {
  const path = String(pathRaw || "/").toLowerCase().replace(/\/+$/, "") || "/";
  for (let i = 0; i < TAB_MAP.length; i++) {
    const m = TAB_MAP[i];
    if (m.prefix === "/") { if (path === "/") return m.tab; }
    else if (path.indexOf(m.prefix) === 0) return m.tab;
  }
  return "Sonstige";
}

function _fixedCols() {
  return [
    "Zeitstempel",
    "Landingpage",
    "Formular",
    "Name",
    "E-Mail",
    "Telefon",
    "Nachricht",
  ];
}

function _isWizardKey(k) {
  return _fixedCols().indexOf(k) === -1 && ATTRIBUTION_COLS.indexOf(k) === -1;
}

function _out(o) {
  return ContentService
    .createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
