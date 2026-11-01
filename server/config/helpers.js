// ── Utility helpers ──────────────────────────────────────────────────────────

/**
 * Generates a unique inquiry ID: AE-<timestamp>-<random 4-char hex>
 */
function generateInquiryId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return `AE-${ts}-${rand}`;
}

/**
 * Sanitises a string: trim + collapse whitespace.
 */
function sanitiseStr(val = '') {
  return String(val).trim().replace(/\s+/g, ' ');
}

/**
 * Returns true if the email looks valid (simple RFC-5322 subset).
 */
function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Returns true if the phone looks valid:
 *   – digits only (after stripping leading +)
 *   – 7–15 digits total
 */
function isValidPhone(phone = '') {
  const digits = phone.replace(/^\+/, '').replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

module.exports = { generateInquiryId, sanitiseStr, isValidEmail, isValidPhone };
