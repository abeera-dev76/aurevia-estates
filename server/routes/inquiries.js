const express = require('express');
const router = express.Router();
const {
  submitInquiry, submitContact, bookVisit, sellProperty, contactAgent, formLimiter,
} = require('../controllers/inquiryController');

router.post('/inquiries',     formLimiter, submitInquiry);
router.post('/contact',       formLimiter, submitContact);
router.post('/visits',        formLimiter, bookVisit);
router.post('/sell-property', formLimiter, sellProperty);
router.post('/agent-contact', formLimiter, contactAgent);

module.exports = router;
