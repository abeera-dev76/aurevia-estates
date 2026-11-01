
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID ||
  '1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4';

const SHEET_NAME = 'Inquiries';

function formatPrivateKey(raw) {
  if (!raw || typeof raw !== 'string') return '';

  let key = raw.trim();
  key = key.replace(/^["'`]+|["'`]+$/g, '');

  key = key
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n');

  const match = key.match(
    /-----BEGIN PRIVATE KEY-----([\s\S]*?)-----END PRIVATE KEY-----/
  );

  if (!match) {
    throw new Error('Invalid Google service account private key format.');
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
    ''
  ].join('\n');
}

function cleanEmail(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw.trim().replace(/^["'`]+|["'`]+$/g, '');
}

function getSheetsClient() {
  const scopes = [
    'https://www.googleapis.com/auth/spreadsheets'
  ];

  // Vercel production: use environment variables
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
        private_key: privateKey
      },
      scopes
    });

    return google.sheets({ version: 'v4', auth });
  }

  // Local development: use service-account.json
  const serverDir = path.resolve(__dirname, '..');
  const keyPath = path.join(serverDir, 'service-account.json');

  if (fs.existsSync(keyPath)) {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes
    });

    return google.sheets({ version: 'v4', auth });
  }

  throw new Error(
    'Google Sheets credentials are not configured. Check GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.'
  );
}

async function testConnection() {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID
  });

  const sheetNames = response.data.sheets?.map(
    sheet => sheet.properties?.title
  ) || [];

  return {
    title: response.data.properties?.title,
    sheetExists: sheetNames.some(
      name => name?.toLowerCase() === SHEET_NAME.toLowerCase()
    ),
    sheets: sheetNames
  };
}

async function appendInquiry(data) {
  const sheets = getSheetsClient();

  const submissionDate = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Karachi',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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
    'New'
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:K`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row]
    }
  });

  return response.data;
}

module.exports = {
  appendInquiry,
  testConnection,
  getSheetsClient,
  formatPrivateKey,
  cleanEmail
};
