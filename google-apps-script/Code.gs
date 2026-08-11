/**
 * Webhook Google Apps Script pentru preregistrarea și chestionarul de
 * validare GrowYourMusic.
 *
 * Payload de preregistrare (implicit, fără `type`, sau `type: "preregister"`):
 * { email, role, city, timestamp, source }. Scrie un rând în foaia activă,
 * cu coloanele: Timestamp, Email, Rol, Oraș, Sursă.
 *
 * Payload de validare (`type: "validare"`): { email, current_process,
 * biggest_pain, has_paid, paid_amount, frequency, top_features, would_pay,
 * price_range, concerns }. Scrie un rând în tab-ul "Validare" (creat automat
 * dacă nu există), cu coloanele: Timestamp, Email, Proces actual, Cea mai
 * mare frustrare, A plătit, Suma plătită, Frecvență, Feature-uri preferate,
 * Ar plăti abonament, Interval preț, Bariera de utilizare.
 *
 * Dacă emailul există deja în foaia de preregistrări (comparație
 * case-insensitive), nu se adaugă un rând duplicat, dar se răspunde tot cu
 * succes, ca să nu se afișeze userului că adresa e deja înscrisă. Tab-ul
 * "Validare" nu deduplichează după email, fiecare trimitere de chestionar e
 * un rând nou.
 *
 * Pașii de configurare și republicare sunt descriși în README.md din acest
 * folder.
 */

var PREREGISTER_HEADER_ROW = ['Timestamp', 'Email', 'Rol', 'Oraș', 'Sursă'];

var VALIDARE_SHEET_NAME = 'Validare';
var VALIDARE_HEADER_ROW = [
  'Timestamp',
  'Email',
  'Proces actual',
  'Cea mai mare frustrare',
  'A plătit',
  'Suma plătită',
  'Frecvență',
  'Feature-uri preferate',
  'Ar plăti abonament',
  'Interval preț',
  'Bariera de utilizare',
];

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
  } catch (lockError) {
    return jsonResponse({ success: false, error: 'Serverul este ocupat, încearcă din nou.' });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'Cerere invalidă, lipsește body-ul.' });
    }

    var data = JSON.parse(e.postData.contents);

    if (data.type === 'validare') {
      return handleValidare(data);
    }

    return handlePreregister(data);
  } catch (err) {
    return jsonResponse({ success: false, error: err && err.message ? err.message : 'Eroare necunoscută.' });
  } finally {
    lock.releaseLock();
  }
}

function handlePreregister(data) {
  var email = normalize(data.email);
  var role = normalize(data.role);
  var city = normalize(data.city);
  var source = normalize(data.source) || 'direct';
  var timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

  if (!email || !role) {
    return jsonResponse({ success: false, error: 'Email și rol sunt obligatorii.' });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaderRow(sheet, PREREGISTER_HEADER_ROW);

  var existingEmails = getExistingEmails(sheet);
  var emailKey = email.toLowerCase();

  if (existingEmails.indexOf(emailKey) === -1) {
    sheet.appendRow([timestamp, email, role, city, source]);
  }

  return jsonResponse({ success: true });
}

function handleValidare(data) {
  var email = normalize(data.email);

  if (!email) {
    return jsonResponse({ success: false, error: 'Email este obligatoriu.' });
  }

  var sheet = getOrCreateSheet(VALIDARE_SHEET_NAME);
  ensureHeaderRow(sheet, VALIDARE_HEADER_ROW);

  var timestamp = new Date();
  var topFeatures = Array.isArray(data.top_features)
    ? data.top_features.join(', ')
    : normalize(data.top_features);

  sheet.appendRow([
    timestamp,
    email,
    normalize(data.current_process),
    normalize(data.biggest_pain),
    normalize(data.has_paid),
    normalize(data.paid_amount),
    normalize(data.frequency),
    topFeatures,
    normalize(data.would_pay),
    normalize(data.price_range),
    normalize(data.concerns),
  ]);

  return jsonResponse({ success: true });
}

function getOrCreateSheet(name) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  return sheet;
}

function ensureHeaderRow(sheet, headerRow) {
  var firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell !== headerRow[0]) {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);
  }
}

function getExistingEmails(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  return values.map(function (row) {
    return normalize(row[0]).toLowerCase();
  });
}

function normalize(value) {
  return (value === undefined || value === null ? '' : value.toString()).trim();
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
