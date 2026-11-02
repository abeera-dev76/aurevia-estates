const express = require('express');
const router = express.Router();
const { getAuthConfigStatus, testConnection } = require('../services/googleSheets');

router.get('/', async (req, res) => {
  const authStatus = getAuthConfigStatus();

  const healthData = {
    success: true,
    status: 'OK',
    service: 'Aurevia Estates API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    googleSheetsAuth: authStatus,
  };

  // Optional: run a live Google Sheets test if explicitly requested
  if (req.query.testSheets === 'true') {
    try {
      const sheetsTest = await testConnection();
      healthData.sheetsTest = {
        success: true,
        spreadsheetTitle: sheetsTest.title,
        inquiriesTabFound: sheetsTest.sheetExists,
      };
    } catch (err) {
      healthData.sheetsTest = {
        success: false,
        error: err.message,
      };
    }
  }

  res.json(healthData);
});

module.exports = router;
