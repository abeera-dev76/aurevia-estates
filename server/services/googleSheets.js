const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4';
const SHEET_NAME = 'Inquiries';

/**
 * Returns an authenticated Google Sheets client using Google Service Account credentials.
 * Resolves credential path relative to the server directory so it functions consistently
 * regardless of the working directory from which node is invoked.
 */
function getSheetsClient() {
  let auth;

  // 1. Check for service account JSON file path (configured via env or default location)
  const defaultKeyPath = path.resolve(__dirname, '..', 'service-account.json');
  const envKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? path.resolve(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS)
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
  } else if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    // 2. Fallback to direct environment variables
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } else {
    throw new Error(
      'Google Sheets service account credentials not found. ' +
      'Please ensure server/service-account.json exists or configure GOOGLE_APPLICATION_CREDENTIALS.'
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

module.exports = { appendInquiry, testConnection, getSheetsClient };
