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
  _ensureMetaHeaders();
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

    // Also copy the lead into its matching per-page tab (Badsanierung,
    // Wärmepumpe Beratung, …) so it lives alongside the website leads
    // for the same offer. Dedup happens inside via lead-id.
    try { _routeMetaLeadToPageTab(headers, values, r); }
    catch (err) { console.error("Meta lead route failed for row " + r, err); }
  }

  props.setProperty("lastMetaEmailedRow", String(lastRow));
}

/**
 * One-time backfill — emails every Meta lead currently in Sheet1 that
 * has not been emailed yet. Safe to re-run; the row tracker prevents
 * duplicate sends. Detailed alert on completion so you can see exactly
 * how many landed, how many were skipped, and any errors per row.
 */
function backfillEmailAllMetaLeads() {
  _ensureMetaHeaders(); // fix headers before reading them

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");
  if (!sheet) throw new Error('Sheet "Sheet1" not found.');

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // Reset tracker so backfill considers every row.
  PropertiesService.getScriptProperties().deleteProperty("lastMetaEmailedRow");

  const remainingBefore = MailApp.getRemainingDailyQuota();
  let emailed = 0, skipped = 0;
  const errors = [];

  for (let r = 2; r <= lastRow; r++) {
    const values = sheet.getRange(r, 1, 1, lastCol).getValues()[0];
    const first = String(values[0] || "");
    if (!/^l:/i.test(first)) { skipped++; continue; }
    try {
      _sendMetaLeadEmail(headers, values, r);
      emailed++;
    } catch (err) {
      errors.push("Row " + r + " (email): " + err.message);
    }
    try {
      _routeMetaLeadToPageTab(headers, values, r);
    } catch (err) {
      errors.push("Row " + r + " (route): " + err.message);
    }
  }
  PropertiesService.getScriptProperties().setProperty("lastMetaEmailedRow", String(lastRow));

  const remainingAfter = MailApp.getRemainingDailyQuota();
  const summary =
    "Backfill result\n" +
    "───────────────\n" +
    "Emailed:      " + emailed + "\n" +
    "Skipped:      " + skipped + "  (rows where col A is not a Meta lead-id)\n" +
    "Errors:       " + errors.length + "\n" +
    "MailApp quota: " + remainingBefore + " → " + remainingAfter + " remaining today\n" +
    (errors.length ? "\nFirst errors:\n" + errors.slice(0, 5).join("\n") : "");
  SpreadsheetApp.getUi().alert(summary);
}

/**
 * Idempotent — sets the standard Meta schema on Sheet1's row 1 unless
 * it's already correct. Called automatically by the backfill + trigger
 * so the user never has to remember a separate setup step.
 */
function _ensureMetaHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  if (!sheet) return;
  const currentA1 = String(sheet.getRange(1, 1).getValue() || "");
  if (currentA1 === "Lead-ID") return; // already migrated
  const metaHeaders = [
    "Lead-ID", "Erstellt am",
    "Ad-ID", "Ad-Name",
    "Adset-ID", "Adset-Name",
    "Kampagnen-ID", "Kampagnen-Name",
    "Formular-ID", "Formular-Name",
  ];
  sheet.getRange(1, 1, 1, metaHeaders.length)
    .setValues([metaHeaders])
    .setFontWeight("bold")
    .setBackground("#f1f3f4");
  sheet.setFrozenRows(1);
  sheet.setTabColor("#1877f2"); // Meta blue
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

/**
 * Route-only backfill — copies every Meta lead into its matching
 * per-page tab WITHOUT re-sending emails. Idempotent (dedup by lead-id
 * in the target tab's Event-ID column), so safe to run any number of
 * times.
 *
 * Use this after adding the routing feature to populate the per-page
 * tabs with existing Meta leads that were only in Sheet1.
 */
function backfillRouteMetaLeadsToPageTabs() {
  _ensureMetaHeaders();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");
  if (!sheet) throw new Error('Sheet "Sheet1" not found.');

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  let routed = 0, deduped = 0, unmapped = 0, skipped = 0;
  const errors = [];
  const perTab = {};

  for (let r = 2; r <= lastRow; r++) {
    const values = sheet.getRange(r, 1, 1, lastCol).getValues()[0];
    const first = String(values[0] || "");
    if (!/^l:/i.test(first)) { skipped++; continue; }
    try {
      const result = _routeMetaLeadToPageTab(headers, values, r);
      if (!result) { unmapped++; continue; }
      if (result.dedup) { deduped++; continue; }
      routed++;
      perTab[result.tab] = (perTab[result.tab] || 0) + 1;
    } catch (err) {
      errors.push("Row " + r + ": " + err.message);
    }
  }

  const tabsSummary = Object.keys(perTab)
    .map(function (t) { return "  • " + t + ": " + perTab[t]; })
    .join("\n") || "  (none)";
  const summary =
    "Route-only backfill result\n" +
    "──────────────────────────\n" +
    "Routed into per-page tabs: " + routed + "\n" +
    "Already routed (dedup):    " + deduped + "\n" +
    "Unmapped (stayed Sheet1):  " + unmapped + "\n" +
    "Non-Meta rows skipped:     " + skipped + "\n" +
    "Errors:                    " + errors.length + "\n\n" +
    "By tab:\n" + tabsSummary +
    (errors.length ? "\n\nFirst errors:\n" + errors.slice(0, 5).join("\n") : "");
  SpreadsheetApp.getUi().alert(summary);
}

function _sendMetaLeadEmail(headers, values, rowNum) {
  // Build a clean list of (header, value) pairs where the value is
  // non-empty. Meta's sheet often has inconsistent header labels, so
  // downstream extraction uses VALUE patterns instead of header names.
  const kv = [];
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || "").trim();
    const v = String(values[i] || "").trim();
    if (v) kv.push({ h: h || ("Spalte " + (i + 1)), v: v });
  }

  // Extract customer fields by value pattern — schema-independent.
  let customerName = "";
  let customerEmail = "";
  let customerPhone = "";
  for (const { v } of kv) {
    // Strip Meta's occasional short prefixes: "p:+49…" or "ag:1234".
    const clean = v.replace(/^[A-Za-z]{1,3}:/, "").trim();
    if (!customerEmail && /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(clean)) {
      customerEmail = clean; continue;
    }
    // Phone must start with + or 0 (real phone patterns) — this rejects
    // Meta's bare-numeric lead IDs like "2806841865280" that would
    // otherwise match a generic \d{8,} regex.
    if (!customerPhone && /^(?:\+|00|0)\d[\d\s\-()\/]{6,}$/.test(clean)) {
      customerPhone = clean; continue;
    }
    // Person name: 2+ words, letters only (incl. umlauts / hyphen).
    // Excludes URLs, IDs, timestamps, single words.
    if (!customerName && /^[A-ZÄÖÜ][a-zäöüß\-']{1,40}(\s+[A-ZÄÖÜ][a-zäöüß\-']{1,40}){1,3}$/.test(v)) {
      customerName = v;
    }
  }

  // Try to pull campaign / form context by header name (these are
  // usually labeled correctly after _ensureMetaHeaders runs).
  let campaignName = "", formName = "", adName = "";
  for (const { h, v } of kv) {
    const hl = h.toLowerCase();
    if (!campaignName && /kampagnen[- ]?name|campaign[_ ]?name/.test(hl)) campaignName = v;
    if (!formName     && /formular[- ]?name|form[_ ]?name/.test(hl))     formName     = v;
    if (!adName       && /^(ad-?name|ad_name)$/.test(hl))                 adName       = v;
  }

  // Subject: put the most useful info up front for inbox scanning.
  const subjectBits = ["🎯 Meta Lead"];
  if (customerName)  subjectBits.push(customerName);
  if (formName)      subjectBits.push(formName);
  const subject = subjectBits.join(" · ");

  // Highlighted customer block at the top.
  const customerBlock =
    '<div style="background:#e8f4ff;border:1px solid #b8d9fc;border-radius:10px;padding:16px 20px;margin:0 0 20px;">' +
      '<h3 style="margin:0 0 10px;font-size:12px;color:#1a56b8;text-transform:uppercase;letter-spacing:.8px;font-weight:700;">Kundendaten</h3>' +
      '<table style="font-size:15px;line-height:1.6;">' +
        (customerName  ? '<tr><td style="padding:3px 20px 3px 0;color:#5b6573;width:80px">Name</td><td><strong>' + _esc(customerName) + '</strong></td></tr>' : '') +
        (customerEmail ? '<tr><td style="padding:3px 20px 3px 0;color:#5b6573">E-Mail</td><td><a href="mailto:' + _esc(customerEmail) + '" style="color:#1a56b8"><strong>' + _esc(customerEmail) + '</strong></a></td></tr>' : '') +
        (customerPhone ? '<tr><td style="padding:3px 20px 3px 0;color:#5b6573">Telefon</td><td><a href="tel:' + _esc(customerPhone.replace(/\s/g,"")) + '" style="color:#1a56b8"><strong>' + _esc(customerPhone) + '</strong></a></td></tr>' : '') +
      '</table>' +
    '</div>';

  // Campaign context strip
  const ctxBits = [];
  if (campaignName) ctxBits.push('Kampagne: <strong>' + _esc(campaignName) + '</strong>');
  if (adName)       ctxBits.push('Anzeige: <strong>' + _esc(adName) + '</strong>');
  if (formName)     ctxBits.push('Formular: <strong>' + _esc(formName) + '</strong>');
  const ctxBlock = ctxBits.length
    ? '<p style="margin:0 0 16px;color:#5b6573;font-size:13px">' + ctxBits.join(' · ') + '</p>'
    : "";

  // Full raw data table (collapsible).
  let rawRows = "";
  for (const { h, v } of kv) {
    rawRows +=
      '<tr><td style="padding:3px 16px 3px 0;color:#5b6573;vertical-align:top;font-size:12px;">' + _esc(h) + '</td>' +
      '<td style="font-size:13px;">' + _esc(v) + '</td></tr>';
  }

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0b0b0b;line-height:1.6;max-width:640px;">' +
      '<h2 style="margin:0 0 8px;font-size:20px">Neue Anfrage über Meta Instant Form</h2>' +
      ctxBlock +
      customerBlock +
      '<p style="margin:16px 0 8px;color:#5b6573;font-size:13px;font-weight:600;">Alle Felder aus dem Formular:</p>' +
      '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">' + rawRows + '</table>' +
      '<p style="margin-top:24px;color:#98a1ad;font-size:11px">Automatisch weitergeleitet von Sheet1 Zeile ' + rowNum + ' · Meta → Sheets → E-Mail Bridge</p>' +
    '</div>';

  const textLines = ["Neue Meta Instant Form Anfrage", ""];
  if (customerName)  textLines.push("Name:    " + customerName);
  if (customerEmail) textLines.push("E-Mail:  " + customerEmail);
  if (customerPhone) textLines.push("Telefon: " + customerPhone);
  if (campaignName)  textLines.push("Kampagne: " + campaignName);
  if (adName)        textLines.push("Anzeige:  " + adName);
  if (formName)      textLines.push("Formular: " + formName);
  textLines.push("", "--- Alle Felder ---");
  for (const { h, v } of kv) textLines.push(h + ": " + v);

  const opts = {
    to: META_LEAD_INBOX,
    subject: subject,
    htmlBody: html,
    body: textLines.join("\n"),
    name: "NOUH-WEHRES Meta Leads",
  };
  if (customerEmail) opts.replyTo = customerEmail;

  MailApp.sendEmail(opts);
}

function _esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Copy a Meta Instant Form lead from Sheet1 into the matching per-page
 * tab (Badsanierung / Wärmepumpe Beratung / …), so opening the tab for
 * an offer shows every lead for that offer regardless of source.
 *
 * Rows are dedup'd by lead-id: a Meta lead-id already present in the
 * target tab's Event-ID column is skipped.
 */
function _routeMetaLeadToPageTab(headers, values, srcRow) {
  // Parse the Meta row into a clean shape (schema-independent).
  const kv = [];
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || "").trim();
    const v = String(values[i] || "").trim();
    if (v) kv.push({ h: h, v: v, i: i });
  }

  // Meta metadata by header, customer info by value pattern.
  let leadId = "", createdTime = "", formName = "", campaignName = "",
      adName = "", adsetName = "";
  let customerName = "", customerEmail = "", customerPhone = "";
  const answers = [];

  // Meta writes duplicate/misleading headers past column J
  // (e.g. "created_time" containing a customer name, "ad_id" containing
  // a phone). Do THREE passes so noisy late duplicates never overwrite
  // Sheet1's clean col-B / col-D / etc.

  // Pass 1 — Meta metadata: only the FIRST match per field wins.
  for (const { h, v } of kv) {
    const hl = String(h).toLowerCase();
    if (!leadId       && /lead[- ]?id/.test(hl))                              { leadId = v;        continue; }
    if (!createdTime  && /^erstellt am$|^created[_ ]?time$/.test(hl))          { createdTime = v;   continue; }
    if (!formName     && /^(formular[- ]?name|form[_ ]?name)$/.test(hl))       { formName = v;      continue; }
    if (!campaignName && /^(kampagnen[- ]?name|campaign[_ ]?name)$/.test(hl))  { campaignName = v;  continue; }
    if (!adsetName    && /^adset[- ]?name$/.test(hl))                          { adsetName = v;     continue; }
    if (!adName       && /^(ad[- ]?name|ad_name)$/.test(hl))                   { adName = v;        continue; }
  }

  // Pass 2 — customer info by VALUE pattern (schema-independent). Runs
  // over every cell, including ones whose header was consumed above, so
  // Meta's "created_time = Oksana Neelova" still contributes a name.
  for (const { v } of kv) {
    const clean = v.replace(/^[A-Za-z]{1,3}:/, "").trim();
    if (!customerEmail && /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(clean)) {
      customerEmail = clean; continue;
    }
    // Phone must start with + or 0 (real phone patterns) — this rejects
    // Meta's bare-numeric lead IDs like "2806841865280" that would
    // otherwise match a generic \d{8,} regex.
    if (!customerPhone && /^(?:\+|00|0)\d[\d\s\-()\/]{6,}$/.test(clean)) {
      customerPhone = clean; continue;
    }
    if (!customerName &&
        /^[A-ZÄÖÜ][a-zäöüß\-']{1,40}(\s+[A-ZÄÖÜ][a-zäöüß\-']{1,40}){1,3}$/.test(v)) {
      customerName = v;
    }
  }

  // Pass 3 — everything else = form answer, EXCEPT well-known Meta
  // metadata noise (ids, platform, lead_status) which we drop.
  const isMetaMetaHeader = function (hl) {
    return /^(lead[- ]?id|erstellt am|created[_ ]?time|ad[- ]?id|adset[- ]?id|kampagnen[- ]?id|campaign[- ]?id|formular[- ]?id|form[- ]?id|ad[- ]?name|ad_name|adset[- ]?name|formular[- ]?name|form[_ ]?name|kampagnen[- ]?name|campaign[_ ]?name|lead[- ]?status|platform|id)$/i.test(hl);
  };
  for (const { h, v } of kv) {
    const hl = String(h).toLowerCase();
    if (isMetaMetaHeader(hl)) continue;
    // Skip values that already landed in the customer / metadata slots.
    if (v === customerName || v === customerEmail || v === customerPhone) continue;
    if (v === leadId || v === createdTime || v === formName ||
        v === campaignName || v === adName || v === adsetName) continue;
    if (h && v) answers.push({ q: h, a: v });
  }

  // Which page tab does this Meta form belong to?
  const combined = (formName + " " + campaignName + " " + adName).toLowerCase();
  let targetTab = null, landingPage = "";
  if (/badsanier|badraum|neues\s?bad/.test(combined)) {
    targetTab = "Badsanierung"; landingPage = "/badsanierung";
  } else if (/(wärme|waerme|wp).*kauf/.test(combined) || /kauf.*wärme|kauf.*waerme/.test(combined)) {
    targetTab = "Wärmepumpe Kaufen"; landingPage = "/waermepumpe-kaufen";
  } else if (/wärmepumpe|waermepumpe|wärme|waerme|heizung/.test(combined)) {
    targetTab = "Wärmepumpe Beratung"; landingPage = "/waermepumpe-beratung";
  } else if (/förder|foerder|bafa|kfw/.test(combined)) {
    targetTab = "Fördermittel"; landingPage = "/foerdermittel-service";
  } else if (/kontakt/.test(combined)) {
    targetTab = "Kontakt"; landingPage = "/kontakt";
  }
  // Unmapped → stay in Sheet1 only (safety — don't spray into random tabs).
  if (!targetTab) return null;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(targetTab);
  if (!sheet) sheet = ss.insertSheet(targetTab);

  const lastCol = Math.max(1, sheet.getLastColumn());
  let hdrs = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (hdrs[0] !== "Zeitstempel") hdrs = [];

  // Dedup: if a row with this Meta lead-id already exists in the tab
  // (Event-ID column contains "meta:<leadId>"), skip.
  const eventColIdx = hdrs.indexOf("Event-ID");
  const dedupKey = leadId ? ("meta:" + leadId) : "";
  if (dedupKey && eventColIdx >= 0 && sheet.getLastRow() > 1) {
    const eventValues = sheet.getRange(2, eventColIdx + 1, sheet.getLastRow() - 1, 1).getValues();
    for (const [ev] of eventValues) {
      if (String(ev) === dedupKey) return { tab: targetTab, dedup: true };
    }
  }

  // Build the row using the same schema as website leads.
  const answersSummary = answers.length
    ? answers.map(function (a) { return a.q + ": " + a.a; }).join(" · ")
    : "";
  const row = {
    "Zeitstempel":  createdTime || new Date().toISOString(),
    "Landingpage":  landingPage,
    "Formular":     "Meta · " + (formName || campaignName || "Instant Form"),
    "Name":         customerName,
    "E-Mail":       customerEmail,
    "Telefon":      customerPhone ? ("'" + customerPhone) : "",
    "Nachricht":    "Meta Instant Form Lead" + (answersSummary ? " · " + answersSummary : ""),
  };
  // Each form answer as its own column (Sheet auto-adds if new).
  answers.forEach(function (a) { row[a.q] = a.a; });
  // Attribution — same columns as website leads, plus Meta-specific ones.
  row["Meta Kampagne"]         = campaignName;
  row["Meta Adset"]            = adsetName;
  row["Meta Ad"]               = adName;
  row["Meta Click ID (fbc)"]   = "";
  row["Meta Browser ID (fbp)"] = "";
  row["Referer"]               = "meta://instant-form";
  row["User Agent"]            = "Meta Instant Form";
  row["IP-Adresse"]            = "";
  row["Event-ID"]              = dedupKey;

  // Extend headers if new keys — never reorder.
  Object.keys(row).forEach(function (k) {
    if (hdrs.indexOf(k) === -1) hdrs.push(k);
  });
  sheet.getRange(1, 1, 1, hdrs.length)
    .setValues([hdrs])
    .setFontWeight("bold");
  sheet.setFrozenRows(1);

  sheet.appendRow(hdrs.map(function (h) {
    return row[h] !== undefined ? row[h] : "";
  }));

  return { tab: targetTab, row: sheet.getLastRow() };
}

