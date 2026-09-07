/**
 * NOUH-WEHRES — website lead webhook.
 * Reached by app/api/kontakt/route.ts after a form succeeds (kontakt,
 * badsanierung CheckWizard/QualifyForm, all wp landing pages).
 *
 * Writes each submission as a row on the sheet tab "Website" — a
 * dedicated tab so we never collide with Meta's own Instant-Form →
 * Google Sheets integration (which dumps its own fixed schema on the
 * first tab).
 *
 * Handles two long-standing corruption sources:
 *   1. Phone numbers starting with "+" are interpreted as formulas by
 *      Sheets (→ #ERROR!). We force the Telefon column format to text
 *      ("@") so "+49 176 …" is stored verbatim.
 *   2. Wizard answers add new columns on the fly — headers only append,
 *      never reorder, so historic rows stay aligned with their headers.
 */
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const TAB = "Website";
  let sheet = ss.getSheetByName(TAB);
  if (!sheet) sheet = ss.insertSheet(TAB);

  let d;
  try { d = JSON.parse(e.postData.contents); }
  catch (err) {
    return _out({ ok: false, error: "invalid json" });
  }

  // Fixed columns — same order the site sends them.
  const row = {
    "Zeitstempel": d.timestamp || new Date().toISOString(),
    "Quelle":      String(d.topic || ""),   // e.g. "Badsanierung · Festpreis"
    "Name":        String(d.name || ""),
    "E-Mail":      String(d.email || ""),
    // Prepend "'" so Sheets treats "+49…" as literal text — otherwise
    // appendRow parses it as a formula and the cell renders as #ERROR!.
    // The apostrophe is invisible in the cell (only shows in the formula bar).
    "Telefon":     d.tel ? ("'" + String(d.tel)) : "",
    "Nachricht":   String(d.message || "")
  };
  // Wizard answers → one column per question, added if new.
  (d.answers || []).forEach(function (it) {
    if (it && it.q) row[String(it.q)] = it.a != null ? String(it.a) : "";
  });

  // Read existing headers; start fresh if the sheet is blank / mis-headed.
  const lastCol = Math.max(1, sheet.getLastColumn());
  let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers[0] !== "Zeitstempel") headers = [];

  // Extend headers with any new keys, keep old order intact.
  Object.keys(row).forEach(function (key) {
    if (headers.indexOf(key) === -1) headers.push(key);
  });

  // Write header row (bold + frozen).
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold");
  sheet.setFrozenRows(1);

  // Append the row aligned to current header order. (Phone is already
  // apostrophe-prefixed above so no post-write formatting needed.)
  sheet.appendRow(headers.map(function (h) {
    return row[h] !== undefined ? row[h] : "";
  }));

  return _out({ ok: true, tab: TAB, row: sheet.getLastRow() });
}

// Tiny GET for browser-based health check — visit the /exec URL in a browser.
function doGet() {
  return _out({ ok: true, msg: "Nouh-Wehres lead webhook alive." });
}

function _out(o) {
  return ContentService
    .createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
