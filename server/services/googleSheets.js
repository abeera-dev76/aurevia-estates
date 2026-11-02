
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID ||
  '1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_';

const SHEET_NAME = 'Inquiries';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

// Normalize Google private key
function formatPrivateKey(raw) {
  if (!raw || typeof raw !== 'string') {
    return '';
  }

  let key = raw.trim();

  key = key.replace(/^["'`]+|["'`]+$/g, '');

  key = key
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const match = key.match(
    /-----BEGIN PRIVATE KEY-----([\s\S]*?)-----END PRIVATE KEY-----/
  );

  if (!match) {
    throw new Error(
      'Invalid Google private key format. Check GOOGLE_PRIVATE_KEY.'
    );
  }

  const body = match[1].replace(/\s/g, '');
  const chunks = body.match(/.{1,64}/g) || [];

  if (!chunks.length) {
    throw new Error('Google private key content is empty.');
  }

  return [
    '-----BEGIN PRIVATE KEY-----',
    ...chunks,
    '-----END PRIVATE KEY-----',
    '',
  ].join('\n');
}

// Clean service account email
function cleanEmail(raw) {
  if (!raw || typeof raw !== 'string') {
    return '';
  }

  return raw.trim().replace(/^["'`]+|["'`]+$/g, '');
}

// Load credentials from JSON or Base64 environment variable
function getCredentialsFromEnv() {
  const raw =
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY ||
    process.env.GOOGLE_CREDENTIALS;

  if (!raw) {
    return null;
  }

  try {
    const trimmed = raw.trim();

    const credentials = trimmed.startsWith('{')
      ? JSON.parse(trimmed)
      : JSON.parse(
          Buffer.from(trimmed, 'base64').toString('utf8')
        );

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing service account fields.');
    }

    return {
      client_email: cleanEmail(credentials.client_email),
      private_key: formatPrivateKey(credentials.private_key),
    };
  } catch (error) {
    throw new Error(
      'Could not parse Google service account JSON credentials.'
    );
  }
}

// Create authenticated Google Sheets client
function getSheetsClient() {
  let credentials = getCredentialsFromEnv();

  // Method 1: Complete JSON environment credentials
  if (credentials) {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    return google.sheets({
      version: 'v4',
      auth,
    });
  }

  // Method 2: Local service-account JSON file
  const serverDir = path.resolve(__dirname, '..');

  const envKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? path.isAbsolute(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      ? process.env.GOOGLE_APPLICATION_CREDENTIALS
      : path.join(
          serverDir,
          process.env.GOOGLE_APPLICATION_CREDENTIALS
        )
    : null;

  const defaultKeyPath = path.join(
    serverDir,
    'service-account.json'
  );

  const candidatePaths = [
    envKeyPath,
    defaultKeyPath,
  ].filter(Boolean);

  for (const keyPath of candidatePaths) {
    if (fs.existsSync(keyPath)) {
      const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: SCOPES,
      });

      return google.sheets({
        version: 'v4',
        auth,
      });
    }
  }

  // Method 3: Individual Vercel environment variables
  if (
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  ) {
    const clientEmail = cleanEmail(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    );

    const privateKey = formatPrivateKey(
      process.env.GOOGLE_PRIVATE_KEY
    );

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: SCOPES,
    });

    return google.sheets({
      version: 'v4',
      auth,
    });
  }

  throw new Error(
    'Google Sheets credentials are not configured. Check your service account credentials.'
  );
}

// Test Google Sheets connection
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

// Append inquiry to Google Sheet
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
    data.inquiryId || '',
    submissionDate,
    data.customerName || '',
    data.phoneNumber || '',
    data.email || '',
    data.inquiryType || '',
    data.propertyId || '',
    data.propertyTitle || '',
    data.location || '',
    data.message || '',
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
};
