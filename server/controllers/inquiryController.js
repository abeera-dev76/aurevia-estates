const { appendInquiry } = require('../services/googleSheets');
const { generateInquiryId, sanitiseStr, isValidEmail, isValidPhone } = require('../config/helpers');

// ── Rate limiter for form endpoints ─────────────────────────────────────────
const rateLimit = require('express-rate-limit');
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
  message: { success: false, message: 'Too many submissions. Please wait before trying again.' },
});

// ── POST /api/inquiries ──────────────────────────────────────────────────────
async function submitInquiry(req, res) {
  try {
    const { name, phone, email, inquiryType, propertyId, propertyTitle, location, message } = req.body;

    // Validate
    const errors = [];
    if (!sanitiseStr(name))          errors.push('Name is required.');
    if (!sanitiseStr(phone))         errors.push('Phone number is required.');
    if (!isValidPhone(phone))        errors.push('Phone number is invalid (7–15 digits).');
    if (!sanitiseStr(email))         errors.push('Email is required.');
    if (!isValidEmail(email))        errors.push('Email address is invalid.');
    if (!sanitiseStr(inquiryType))   errors.push('Inquiry type is required.');
    if (!sanitiseStr(message))       errors.push('Message is required.');

    if (errors.length) return res.status(400).json({ success: false, errors });

    const inquiryId = generateInquiryId();
    await appendInquiry({
      inquiryId,
      customerName:  sanitiseStr(name),
      phoneNumber:   sanitiseStr(phone),
      email:         sanitiseStr(email).toLowerCase(),
      inquiryType:   sanitiseStr(inquiryType),
      propertyId:    sanitiseStr(propertyId  || ''),
      propertyTitle: sanitiseStr(propertyTitle || ''),
      location:      sanitiseStr(location || ''),
      message:       sanitiseStr(message),
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully.',
      inquiryId,
    });
  } catch (err) {
    console.error('[submitInquiry] Error:', err.message);
    if (err.message.includes('credentials are not configured')) {
      return res.status(503).json({ success: false, message: 'Google Sheets is not configured on the server.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to save inquiry. Please try again.' });
  }
}

// ── POST /api/contact ────────────────────────────────────────────────────────
async function submitContact(req, res) {
  try {
    const { name, phone, email, subject, message } = req.body;

    const errors = [];
    if (!sanitiseStr(name))    errors.push('Name is required.');
    if (!sanitiseStr(phone))   errors.push('Phone is required.');
    if (!isValidPhone(phone))  errors.push('Phone number is invalid.');
    if (!sanitiseStr(email))   errors.push('Email is required.');
    if (!isValidEmail(email))  errors.push('Email address is invalid.');
    if (!sanitiseStr(message)) errors.push('Message is required.');
    if (errors.length) return res.status(400).json({ success: false, errors });

    const inquiryId = generateInquiryId();
    await appendInquiry({
      inquiryId,
      customerName: sanitiseStr(name),
      phoneNumber:  sanitiseStr(phone),
      email:        sanitiseStr(email).toLowerCase(),
      inquiryType:  'General Inquiry',
      propertyId:   '',
      propertyTitle: sanitiseStr(subject || ''),
      location:     '',
      message:      sanitiseStr(message),
    });

    return res.status(201).json({ success: true, message: 'Message sent successfully.', inquiryId });
  } catch (err) {
    console.error('[submitContact] Error:', err.message);
    if (err.message.includes('credentials are not configured')) {
      return res.status(503).json({ success: false, message: 'Google Sheets is not configured on the server.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
}

// ── POST /api/visits ─────────────────────────────────────────────────────────
async function bookVisit(req, res) {
  try {
    const { name, phone, email, propertyId, propertyTitle, location, preferredDate, message } = req.body;

    const errors = [];
    if (!sanitiseStr(name))    errors.push('Name is required.');
    if (!sanitiseStr(phone))   errors.push('Phone is required.');
    if (!isValidPhone(phone))  errors.push('Phone number is invalid.');
    if (!sanitiseStr(email))   errors.push('Email is required.');
    if (!isValidEmail(email))  errors.push('Email address is invalid.');
    if (errors.length) return res.status(400).json({ success: false, errors });

    const inquiryId = generateInquiryId();
    const msg = [sanitiseStr(message || ''), preferredDate ? `Preferred visit date: ${preferredDate}` : ''].filter(Boolean).join(' | ');

    await appendInquiry({
      inquiryId,
      customerName:  sanitiseStr(name),
      phoneNumber:   sanitiseStr(phone),
      email:         sanitiseStr(email).toLowerCase(),
      inquiryType:   'Property Visit',
      propertyId:    sanitiseStr(propertyId || ''),
      propertyTitle: sanitiseStr(propertyTitle || ''),
      location:      sanitiseStr(location || ''),
      message:       msg,
    });

    return res.status(201).json({ success: true, message: 'Visit booking request submitted.', inquiryId });
  } catch (err) {
    console.error('[bookVisit] Error:', err.message);
    if (err.message.includes('credentials are not configured')) {
      return res.status(503).json({ success: false, message: 'Google Sheets is not configured on the server.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to book visit. Please try again.' });
  }
}

// ── POST /api/sell-property ──────────────────────────────────────────────────
async function sellProperty(req, res) {
  try {
    const { ownerName, phone, email, propertyTitle, propertyType, location, expectedPrice, description } = req.body;

    const errors = [];
    if (!sanitiseStr(ownerName))     errors.push('Owner name is required.');
    if (!sanitiseStr(phone))         errors.push('Phone is required.');
    if (!isValidPhone(phone))        errors.push('Phone number is invalid.');
    if (!sanitiseStr(email))         errors.push('Email is required.');
    if (!isValidEmail(email))        errors.push('Email address is invalid.');
    if (!sanitiseStr(propertyTitle)) errors.push('Property title is required.');
    if (!sanitiseStr(location))      errors.push('Location is required.');
    if (errors.length) return res.status(400).json({ success: false, errors });

    const inquiryId = generateInquiryId();
    const msg = [
      `Type: ${sanitiseStr(propertyType || '')}`,
      `Expected Price: ${sanitiseStr(expectedPrice || '')}`,
      sanitiseStr(description || ''),
    ].filter(Boolean).join(' | ');

    await appendInquiry({
      inquiryId,
      customerName:  sanitiseStr(ownerName),
      phoneNumber:   sanitiseStr(phone),
      email:         sanitiseStr(email).toLowerCase(),
      inquiryType:   'Sell',
      propertyId:    '',
      propertyTitle: sanitiseStr(propertyTitle),
      location:      sanitiseStr(location),
      message:       msg,
    });

    return res.status(201).json({ success: true, message: 'Sell request submitted successfully.', inquiryId });
  } catch (err) {
    console.error('[sellProperty] Error:', err.message);
    if (err.message.includes('credentials are not configured')) {
      return res.status(503).json({ success: false, message: 'Google Sheets is not configured on the server.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to submit sell request. Please try again.' });
  }
}

// ── POST /api/agent-contact ──────────────────────────────────────────────────
async function contactAgent(req, res) {
  try {
    const { name, phone, email, agentName, propertyId, message } = req.body;

    const errors = [];
    if (!sanitiseStr(name))    errors.push('Name is required.');
    if (!sanitiseStr(phone))   errors.push('Phone is required.');
    if (!isValidPhone(phone))  errors.push('Phone number is invalid.');
    if (!sanitiseStr(email))   errors.push('Email is required.');
    if (!isValidEmail(email))  errors.push('Email address is invalid.');
    if (!sanitiseStr(message)) errors.push('Message is required.');
    if (errors.length) return res.status(400).json({ success: false, errors });

    const inquiryId = generateInquiryId();
    await appendInquiry({
      inquiryId,
      customerName:  sanitiseStr(name),
      phoneNumber:   sanitiseStr(phone),
      email:         sanitiseStr(email).toLowerCase(),
      inquiryType:   'General Inquiry',
      propertyId:    sanitiseStr(propertyId || ''),
      propertyTitle: agentName ? `Agent: ${sanitiseStr(agentName)}` : '',
      location:      '',
      message:       sanitiseStr(message),
    });

    return res.status(201).json({ success: true, message: 'Agent inquiry submitted.', inquiryId });
  } catch (err) {
    console.error('[contactAgent] Error:', err.message);
    if (err.message.includes('credentials are not configured')) {
      return res.status(503).json({ success: false, message: 'Google Sheets is not configured on the server.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to send agent inquiry. Please try again.' });
  }
}

module.exports = { submitInquiry, submitContact, bookVisit, sellProperty, contactAgent, formLimiter };
