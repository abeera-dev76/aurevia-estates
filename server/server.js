require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const propertiesRouter = require('./routes/properties');
const inquiriesRouter = require('./routes/inquiries');
const healthRouter = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ────────────────────────────────────────────────────────────────────
// Allow localhost, any Vercel domain, and any configured custom client domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];
if (process.env.CLIENT_URL) allowedOrigins.push(process.env.CLIENT_URL.trim());
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser requests (e.g. curl, server-to-server, mobile)
    if (!origin) return cb(null, true);

    // Allow known localhost and configured client origins
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // Allow all *.vercel.app origins (frontend deployments on Vercel)
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return cb(null, true);

    // For public real-estate inquiries, allow other web origins safely
    return cb(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Respond immediately to OPTIONS preflight
app.options('*', cors());

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Global rate limit ────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(globalLimiter);

// ── Root info endpoint ───────────────────────────────────────────────────────
app.get(['/', '/api'], (_req, res) => {
  res.json({
    success: true,
    service: 'Aurevia Estates API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      properties: 'GET /api/properties',
      propertyById: 'GET /api/properties/:id',
      inquiries: 'POST /api/inquiries',
      contact: 'POST /api/contact',
      visits: 'POST /api/visits',
      sellProperty: 'POST /api/sell-property',
      agentContact: 'POST /api/agent-contact',
    },
  });
});

// ── Routes (mount on both /api/* and /* for full Vercel compatibility) ────────
app.use(['/api/health', '/health'], healthRouter);
app.use(['/api/properties', '/properties'], propertiesRouter);
app.use(['/api', '/'], inquiriesRouter);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found.' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

// Only listen when executed directly (e.g. node server.js); when imported as a Vercel serverless function, export app without listening
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅  Aurevia Estates API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
