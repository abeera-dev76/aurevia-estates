const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4';
const SHEET_NAME = 'Inquiries';

/**
 * Normalizes and formats a PEM private key from various environment variable formats.
 * Handles escaped newlines (\n, \\n, \r\n), literal newlines, optional surrounding quotes,
 * single-line space-separated PEM lines, and OpenSSL PKCS#8 formatting requirements.
 */
function formatPrivateKey(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let key = raw.trim();

  // Strip wrapping quotes (single, double, or backticks)
  key = key.replace(/^["'`]+|["'`]+$/g, '').trim();

  // Unescape double or single escaped newlines
  key = key.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n').replace(/\r\n/g, '\n');

  // Strip any remaining wrapping quotes after newline unescaping
  key = key.replace(/^["'`]+|["'`]+$/g, '').trim();

  // Look for standard PEM header and footer
  const headerMatch = key.match(/-----BEGIN [A-Z ]+KEY-----/);
  const footerMatch = key.match(/-----END [A-Z ]+KEY-----/);

  if (headerMatch && footerMatch) {
    const header = headerMatch[0];
    const footer = footerMatch[0];
    const headerIndex = key.indexOf(header);
    const footerIndex = key.indexOf(footer);

    // Extract base64 content between header and footer
    const bodyRaw = key.substring(headerIndex + header.length, footerIndex);

    // Strip all whitespace, spaces, newlines, and tabs from base64 content
    const cleanBase64 = bodyRaw.replace(/[\s\r\n\t]+/g, '');

    // Reconstruct valid 64-character PEM lines compliant with OpenSSL / Node crypto
    const chunks = cleanBase64.match(/.{1,64}/g) || [];
    key = `${header}\n${chunks.join('\n')}\n${footer}\n`;
  }

  return key;
}

/**
 * Cleans and trims an email address, stripping any accidental surrounding quotes.
 */
function cleanEmail(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw.trim().replace(/^["'`]+|["'`]+$/g, '').trim();
}

/**
 * Returns an authenticated Google Sheets client using Google Service Account credentials.
 * Works seamlessly in both local environments (reading service-account.json) and
 * Vercel serverless environments (reading environment variables).
 */
function getSheetsClient() {
  let auth;

  // 1. Check if complete service account JSON is passed via env var (raw JSON string or base64)
  const rawKeyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_CREDENTIALS;
  if (rawKeyJson) {
    try {
      let parsed;
      const trimmed = rawKeyJson.trim();
      if (trimmed.startsWith('{')) {
        parsed = JSON.parse(trimmed);
      } else {
        const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
        parsed = JSON.parse(decoded);
      }
      if (parsed.client_email && parsed.private_key) {
        const privateKey = formatPrivateKey(parsed.private_key);
        auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: cleanEmail(parsed.client_email),
            private_key: privateKey,
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
      }
    } catch (e) {
      console.warn('[GoogleSheets] Notice: Could not parse GOOGLE_SERVICE_ACCOUNT_KEY JSON string.');
    }
  }

  // 2. Check local or specified keyFile paths
  if (!auth) {
    const defaultKeyPath = path.resolve(__dirname, '..', 'service-account.json');
    const envKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? (path.isAbsolute(process.env.GOOGLE_APPLICATION_CREDENTIALS)
          ? process.env.GOOGLE_APPLICATION_CREDENTIALS
          : path.resolve(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS))
      : defaultKeyPath;

    if (fs.existsSync(envKeyPath)) {
      auth = new google.auth.GoogleAuth({
        keyFile: envKeyPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } else if (fs.existsSync(defaultKeyPath)) {
      auth = new google.auth.GoogleAuth({
        keyFile: defaultKeyPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    }
  }

  // 3. Check individual environment variables (GOOGLE_SERVICE_ACCOUNT_EMAIL & GOOGLE_PRIVATE_KEY)
  if (!auth && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const clientEmail = cleanEmail(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    const privateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY);

    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  if (!auth) {
    throw new Error(
      'Google Sheets service account credentials are not configured. ' +
      'Please configure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY (or GOOGLE_SERVICE_ACCOUNT_KEY) in environment variables.'
    );
  }

  return google.sheets({ version: 'v4', auth });
}

/**
 * Verifies authentication and connectivity to the Google Spreadsheet and tab.
 */
async function testConnection() {
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });
  const sheetExists = response.data.sheets?.some(
    s => s.properties?.title?.toLowerCase() === SHEET_NAME.toLowerCase()
  );
  return {
    title: response.data.properties?.title,
    sheetExists,
    sheets: response.data.sheets?.map(s => s.properties?.title),
  };
}

/**
 * Appends one inquiry record to the Inquiries sheet.
 *
 * Column layout (A–K):
 *   A Inquiry ID | B Submission Date | C Customer Name | D Phone Number
 *   E Email | F Inquiry Type | G Property ID | H Property Title
 *   I Location | J Message | K Status
 *
 * @param {object} data
 */
async function appendInquiry(data) {
  const sheets = getSheetsClient();

  const submissionDate = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Riyadh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const row = [
    data.inquiryId      || '',
    submissionDate,
    data.customerName   || '',
    data.phoneNumber    || '',
    data.email          || '',
    data.inquiryType    || '',
    data.propertyId     || '',
    data.propertyTitle  || '',
    data.location       || '',
    data.message        || '',
    'New',
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:K`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });

  return response.data;
}

module.exports = { appendInquiry, testConnection, getSheetsClient, formatPrivateKey, cleanEmail };
