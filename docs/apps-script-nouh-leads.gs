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

// ─── One-time helpers ──────────────────────────────────────────────
//
// Run each of these ONCE from the Apps Script editor (Run ▶ button).
// They are not part of the doPost flow — pure manual maintenance.

/**
 * Fix headers on the tab where Meta's "Send Leads to Google Sheets"
 * integration writes (usually "Sheet1"). Meta writes its own fixed
 * schema — this labels row 1 accurately so the data is readable.
 *
 * Does NOT rename the tab (renaming can break Meta's integration).
 * Does NOT touch existing data rows — only row 1 header labels.
 */
function setupMetaInstantFormsTab() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Meta's integration binds to the first sheet by default — usually "Sheet1".
  // Adjust the name here if yours is different.
  const sheet = ss.getSheetByName("Sheet1");
  if (!sheet) throw new Error('Sheet "Sheet1" not found — Meta Instant Forms tab expected here.');

  // Meta's fixed schema (columns A→J). Any form questions land in K+ and
  // are named after the question text — Meta manages those columns itself.
  const metaHeaders = [
    "Lead-ID",
    "Erstellt am",
    "Ad-ID",
    "Ad-Name",
    "Adset-ID",
    "Adset-Name",
    "Kampagnen-ID",
    "Kampagnen-Name",
    "Formular-ID",
    "Formular-Name",
  ];

  // Only overwrite the fixed columns — leave any question-answer headers
  // beyond column J alone (Meta owns those).
  sheet.getRange(1, 1, 1, metaHeaders.length)
    .setValues([metaHeaders])
    .setFontWeight("bold")
    .setBackground("#f1f3f4");
  sheet.setFrozenRows(1);

  // Add a tab colour so it's visually distinct from website-lead tabs.
  sheet.setTabColor("#1877f2"); // Meta blue

  SpreadsheetApp.getUi()
    .alert("✅ Meta Instant Forms headers updated (10 columns A→J). Tab left as Sheet1 to preserve Meta's integration binding.");
}

// ─── Meta Instant Form → email bridge ──────────────────────────────
//
// Meta's Sheets integration writes rows directly to Sheet1 — bypassing
// the /api/kontakt endpoint that sends the Resend email for website
// leads. Without this bridge, Instant Form leads only appear in the
// sheet + Meta Ads Manager, never in anfragen@nouh-wehres.de. This
// closes that gap.
//
// Setup (one time):
//   1. Paste this file into the Apps Script editor, Save.
//   2. Run backfillEmailAllMetaLeads once to email the existing 13 leads.
//   3. Apps Script → Triggers ⏰ → Add Trigger:
//        Function:  onMetaLeadArrived
//        Deployment: Head
//        Event source: From spreadsheet
//        Event type: On change
//      Save → approve permissions.
//   From then on, every new Meta lead auto-emails within seconds of
//   landing in the sheet.

const META_LEAD_INBOX = "anfragen@nouh-wehres.de";

/** Trigger — fires on any change to the spreadsheet. */
function onMetaLeadArrived(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");
  if (!sheet) return;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const props = PropertiesService.getScriptProperties();
  const lastEmailed = Number(props.getProperty("lastMetaEmailedRow") || 1);
  if (lastRow <= lastEmailed) return; // nothing new

  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  for (let r = lastEmailed + 1; r <= lastRow; r++) {
    const values = sheet.getRange(r, 1, 1, lastCol).getValues()[0];
    // Meta lead rows have a Lead-ID starting with "l:" in column A.
    // Skip anything else (old test rows, manual entries).
    const first = String(values[0] || "");
    if (!/^l:/i.test(first)) continue;

    try { _sendMetaLeadEmail(headers, values, r); }
    catch (err) { console.error("Meta lead email failed for row " + r, err); }
  }

  props.setProperty("lastMetaEmailedRow", String(lastRow));
}

/**
 * One-time backfill — emails every Meta lead currently in Sheet1 that
 * has not been emailed yet. Safe to re-run; the row tracker prevents
 * duplicate sends. Run manually from the Apps Script editor.
 */
function backfillEmailAllMetaLeads() {
  PropertiesService.getScriptProperties().deleteProperty("lastMetaEmailedRow");
  onMetaLeadArrived({});
  const emailed = PropertiesService.getScriptProperties().getProperty("lastMetaEmailedRow") || "0";
  SpreadsheetApp.getUi().alert("✅ Backfill complete. Emailed all Meta leads through row " + emailed + ".");
}

/**
 * Reset — run this if you want to re-email everything from scratch.
 * (Use with care — will send an email per Meta row on the next
 * onMetaLeadArrived tick.)
 */
function resetMetaEmailTracker() {
  PropertiesService.getScriptProperties().deleteProperty("lastMetaEmailedRow");
  SpreadsheetApp.getUi().alert("Tracker cleared. Next trigger will email all rows.");
}

function _sendMetaLeadEmail(headers, values, rowNum) {
  // Try to pull the Name/E-Mail/Telefon from Meta's Q&A columns
  // (they appear in K+ with question texts as headers).
  let displayName = "";
  let displayEmail = "";
  let displayPhone = "";
  const meta = {};
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || "").trim();
    const v = String(values[i] || "").trim();
    if (!h) continue;
    meta[h] = v;
    const hl = h.toLowerCase();
    if (!displayName  && /(vollständiger name|full[_ ]?name|full name|name)/i.test(hl)) displayName  = v;
    if (!displayEmail && /(e[- ]?mail|email)/i.test(hl))                                 displayEmail = v;
    if (!displayPhone && /(telefonnummer|telefon|phone|handy)/i.test(hl))                displayPhone = v;
  }

  const campaignName = meta["Kampagnen-Name"] || meta["campaign_name"] || "";
  const formName     = meta["Formular-Name"]  || meta["form_name"]     || "";
  const subjectBits  = ["Neue Meta Instant Form Anfrage"];
  if (displayName)  subjectBits.push(displayName);
  if (formName)     subjectBits.push(formName);
  const subject = subjectBits.join(" · ");

  let tableRows = "";
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || "").trim();
    const v = String(values[i] || "").trim();
    if (!h || !v) continue;
    tableRows +=
      '<tr><td style="padding:4px 16px 4px 0;color:#5b6573;vertical-align:top;">' + _esc(h) + '</td>' +
      '<td><strong>' + _esc(v) + '</strong></td></tr>';
  }

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0b0b0b;line-height:1.6">' +
      '<h2 style="margin:0 0 16px">Neue Anfrage über Meta Instant Form</h2>' +
      (campaignName ? '<p style="margin:0 0 12px;color:#5b6573">Kampagne: <strong>' + _esc(campaignName) + '</strong></p>' : '') +
      '<table cellpadding="0" cellspacing="0" style="font-size:15px">' + tableRows + '</table>' +
      '<p style="margin-top:20px;color:#98a1ad;font-size:12px">Automatisch weitergeleitet vom Meta → Google Sheets Bridge · Zeile ' + rowNum + '</p>' +
    '</div>';

  const textLines = ["Neue Anfrage über Meta Instant Form", ""];
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || "").trim();
    const v = String(values[i] || "").trim();
    if (!h || !v) continue;
    textLines.push(h + ": " + v);
  }

  const opts = {
    to: META_LEAD_INBOX,
    subject: subject,
    htmlBody: html,
    body: textLines.join("\n"),
    name: "NOUH-WEHRES Meta Leads",
  };
  if (displayEmail) opts.replyTo = displayEmail;

  MailApp.sendEmail(opts);
}

function _esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

