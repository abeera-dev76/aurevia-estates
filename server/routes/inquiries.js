const express = require('express');
const router = express.Router();
const {
  submitInquiry,
  submitContact,
  bookVisit,
  sellProperty,
  contactAgent,
  formLimiter,
} = require('../controllers/inquiryController');

// POST endpoints for form submissions
router.post('/inquiries', formLimiter, submitInquiry);
router.post('/contact', formLimiter, submitContact);
router.post('/visits', formLimiter, bookVisit);
router.post('/sell-property', formLimiter, sellProperty);
router.post('/agent-contact', formLimiter, contactAgent);

// GET status info endpoints (prevents 404 when tested directly in browser)
router.get('/inquiries', (_req, res) => {
  res.json({ success: true, endpoint: '/api/inquiries', method: 'POST', message: 'Inquiries API is active. Submit via POST.' });
});
router.get('/contact', (_req, res) => {
  res.json({ success: true, endpoint: '/api/contact', method: 'POST', message: 'Contact API is active. Submit via POST.' });
});
router.get('/visits', (_req, res) => {
  res.json({ success: true, endpoint: '/api/visits', method: 'POST', message: 'Visits API is active. Submit via POST.' });
});
router.get('/sell-property', (_req, res) => {
  res.json({ success: true, endpoint: '/api/sell-property', method: 'POST', message: 'Sell property API is active. Submit via POST.' });
});
router.get('/agent-contact', (_req, res) => {
  res.json({ success: true, endpoint: '/api/agent-contact', method: 'POST', message: 'Agent contact API is active. Submit via POST.' });
});

module.exports = router;
