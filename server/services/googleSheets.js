const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

// Spreadsheet ID (default: Aurevia Estates Google Sheet)
const SPREADSHEET_ID = (
  process.env.GOOGLE_SHEET_ID ||
  process.env.GOOGLE_SPREADSHEET_ID ||
  process.env.SPREADSHEET_ID ||
  '1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4'
).trim();

const SHEET_NAME = 'Inquiries';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

/**
 * Normalizes and formats a PEM private key from various environment variable formats.
 * Handles escaped newlines (\n, \\n, \r\n), literal newlines, optional surrounding quotes,
 * space-separated PEM lines, and OpenSSL PKCS#8 formatting requirements.
 */
function formatPrivateKey(raw) {
  if (!raw || typeof raw !== 'string') {
    return '';
  }

  let key = raw.trim();

  // Strip wrapping quotes (single, double, or backticks)
  key = key.replace(/^["'`]+|["'`]+$/g, '').trim();

  // Unescape escaped newlines commonly produced by shells and Vercel UI
  key = key
    .replace(/\\\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  // Strip any remaining wrapping quotes
  key = key.replace(/^["'`]+|["'`]+$/g, '').trim();

  // Look for PEM header and footer (standard PKCS#8 or RSA)
  const headerMatch = key.match(/-----BEGIN [A-Z ]+KEY-----/);
  const footerMatch = key.match(/-----END [A-Z ]+KEY-----/);

  let header = '-----BEGIN PRIVATE KEY-----';
  let footer = '-----END PRIVATE KEY-----';
  let bodyRaw = key;

  if (headerMatch && footerMatch) {
    header = headerMatch[0];
    footer = footerMatch[0];
    const hIdx = key.indexOf(header);
    const fIdx = key.indexOf(footer);
    bodyRaw = key.substring(hIdx + header.length, fIdx);
  }

  // Strip all non-base64 characters from body (removes spaces, tabs, stray escapes)
  const cleanBase64 = bodyRaw.replace(/[^A-Za-z0-9+/=]/g, '');

  if (!cleanBase64) {
    throw new Error('Google service account private key content is empty or invalid.');
  }

  // Format into 64-character lines compliant with OpenSSL / Node crypto
  const chunks = cleanBase64.match(/.{1,64}/g) || [];

  return [
    header,
    ...chunks,
    footer,
    '',
  ].join('\n');
}

/**
 * Cleans and trims a service account email address, stripping accidental wrapping quotes.
 */
function cleanEmail(raw) {
  if (!raw || typeof raw !== 'string') {
    return '';
  }

  return raw.trim().replace(/^["'`]+|["'`]+$/g, '').trim();
}

/**
 * Load credentials from complete JSON or Base64 environment variable.
 */
function getCredentialsFromEnv() {
  const raw =
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY ||
    process.env.GOOGLE_CREDENTIALS ||
    process.env.SERVICE_ACCOUNT_KEY ||
    process.env.GCP_KEY ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (!raw) {
    return null;
  }

  try {
    const trimmed = raw.trim();

    const credentials = trimmed.startsWith('{')
      ? JSON.parse(trimmed)
      : JSON.parse(Buffer.from(trimmed, 'base64').toString('utf8'));

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing client_email or private_key in service account JSON.');
    }

    return {
      client_email: cleanEmail(credentials.client_email),
      private_key: formatPrivateKey(credentials.private_key),
    };
  } catch (error) {
    console.error('[GoogleSheets] Could not parse service account JSON from environment variable:', error.message);
    return null;
  }
}

/**
 * Diagnostic helper: returns the status of credentials configuration WITHOUT exposing secrets.
 */
function getAuthConfigStatus() {
  const fullJson = Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY ||
    process.env.GOOGLE_CREDENTIALS ||
    process.env.SERVICE_ACCOUNT_KEY ||
    process.env.GCP_KEY ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  );

  const rawEmail = (
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_CLIENT_EMAIL ||
    process.env.GCP_SERVICE_ACCOUNT_EMAIL ||
    process.env.CLIENT_EMAIL ||
    ''
  ).trim();

  const rawKey = (
    process.env.GOOGLE_PRIVATE_KEY ||
    process.env.GCP_PRIVATE_KEY ||
    process.env.PRIVATE_KEY ||
    ''
  ).trim();

  const serverDir = path.resolve(__dirname, '..');
  let localFile = null;
  try {
    if (fs.existsSync(path.join(serverDir, 'service-account.json'))) {
      localFile = 'service-account.json';
    } else {
      const entries = fs.readdirSync(serverDir);
      const gcpFile = entries.find(
        f => /^[a-z0-9-]+-[0-9a-f]{8,}\.json$/i.test(f) && f !== 'package.json' && f !== 'package-lock.json'
      );
      if (gcpFile) localFile = gcpFile;
    }
  } catch (_) {}

  let method = 'none';
  if (fullJson) {
    method = 'full_json_env';
  } else if (localFile) {
    method = 'local_file';
  } else if (rawEmail && rawKey) {
    method = 'individual_env_vars';
  }

  return {
    isConfigured: method !== 'none',
    method,
    hasEmail: Boolean(rawEmail),
    hasPrivateKey: Boolean(rawKey),
    hasFullJsonEnv: fullJson,
    hasLocalKeyFile: Boolean(localFile),
    spreadsheetIdConfigured: Boolean(process.env.GOOGLE_SHEET_ID),
  };
}

/**
 * Returns an authenticated Google Sheets client.
 * Supports:
 *   1. Full JSON / Base64 credentials in env (GOOGLE_SERVICE_ACCOUNT_KEY / GOOGLE_CREDENTIALS)
 *   2. Local service-account.json or downloaded GCP JSON files (local development)
 *   3. Individual environment variables (GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY)
 */
function getSheetsClient() {
  // Method 1: Complete JSON in environment variable (raw JSON string or Base64)
  const credentials = getCredentialsFromEnv();
  if (credentials) {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
    return google.sheets({ version: 'v4', auth });
  }

  // Method 2: Local service-account JSON file (for local development)
  const serverDir = path.resolve(__dirname, '..');

  const envKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? (path.isAbsolute(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        ? process.env.GOOGLE_APPLICATION_CREDENTIALS
        : path.join(serverDir, process.env.GOOGLE_APPLICATION_CREDENTIALS))
    : null;

  const defaultKeyPath = path.join(serverDir, 'service-account.json');

  let downloadedKeyPath = null;
  try {
    const entries = fs.readdirSync(serverDir);
    const gcpFile = entries.find(
      f => /^[a-z0-9-]+-[0-9a-f]{8,}\.json$/i.test(f) && f !== 'package.json' && f !== 'package-lock.json'
    );
    if (gcpFile) downloadedKeyPath = path.join(serverDir, gcpFile);
  } catch (_) {}

  const candidatePaths = [envKeyPath, defaultKeyPath, downloadedKeyPath].filter(Boolean);

  for (const keyPath of candidatePaths) {
    if (fs.existsSync(keyPath)) {
      const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: SCOPES,
      });
      return google.sheets({ version: 'v4', auth });
    }
  }

  // Method 3: Individual Vercel environment variables
  const clientEmail = cleanEmail(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_CLIENT_EMAIL ||
    process.env.GCP_SERVICE_ACCOUNT_EMAIL ||
    process.env.CLIENT_EMAIL
  );

  const rawKey =
    process.env.GOOGLE_PRIVATE_KEY ||
    process.env.GCP_PRIVATE_KEY ||
    process.env.PRIVATE_KEY;

  if (clientEmail && rawKey) {
    const privateKey = formatPrivateKey(rawKey);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: SCOPES,
    });

    return google.sheets({ version: 'v4', auth });
  }

  throw new Error(
    'Google Sheets credentials are not configured on the server. ' +
    'Please configure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY (or GOOGLE_SERVICE_ACCOUNT_KEY) in your environment variables.'
  );
}

/**
 * Verifies authentication and connectivity to the Google Spreadsheet and Inquiries tab.
 */
async function testConnection() {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });

  const sheetNames =
    response.data.sheets?.map(
      sheet => sheet.properties?.title
    ) || [];

  return {
    title: response.data.properties?.title,
    sheetExists: sheetNames.some(
      name => name?.toLowerCase() === SHEET_NAME.toLowerCase()
    ),
    sheets: sheetNames,
  };
}

/**
 * Appends one inquiry record to the Inquiries sheet.
 *
 * Column layout (A–K):
 *   A Inquiry ID | B Submission Date | C Customer Name | D Phone Number
 *   E Email | F Inquiry Type | G Property ID | H Property Title
 *   I Location | J Message | K Status
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
    data.inquiryId     || '',
    submissionDate,
    data.customerName  || '',
    data.phoneNumber   || '',
    data.email         || '',
    data.inquiryType   || '',
    data.propertyId    || '',
    data.propertyTitle || '',
    data.location      || '',
    data.message       || '',
    'New',
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:K`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });

  return response.data;
}

module.exports = {
  appendInquiry,
  testConnection,
  getSheetsClient,
  formatPrivateKey,
  cleanEmail,
  getAuthConfigStatus,
};
