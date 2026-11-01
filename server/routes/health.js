const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    status: 'OK',
    service: 'Aurevia Estates API',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
