# Aurevia Estates — Full-Stack Real Estate Website

Aurevia Estates is a luxury real estate platform built with React, Vite, Node.js/Express, and the official Google Sheets API v4.

---

## 🏛️ Features & Architecture

### Frontend (Client)
- **Framework**: React 18, Vite
- **Routing**: React Router DOM v7 (15 routes covering all required pages)
  - Home (`/`)
  - About Us (`/about`)
  - All Properties (`/properties`)
  - Residential (`/properties/residential`)
  - Commercial (`/properties/commercial`)
  - Property Details (`/properties/:id`)
  - Buy (`/buy`)
  - Rent (`/rent`)
  - Sell Property (`/sell`)
  - Our Services (`/services`)
  - Our Agents (`/agents`)
  - Contact Us (`/contact`)
  - Privacy Policy (`/privacy-policy`)
  - Terms & Conditions (`/terms`)
  - 404 Not Found (`*`)
- **Design System & Theme**:
  - Primary: `#086288`
  - Secondary: `#4D8DBA`
  - Accent: `#97D7FF`
  - Highlight: `#FFEFC4`
  - White: `#FFFFFF`
  - Dark: `#142B3A`
  - Light Background: `#F5FAFC`
- **UI & Animations**: Framer Motion, Lucide React icons, normal-scrolling responsive navbar (not fixed/sticky as specified), mobile drawer menu.
- **Search & Filters**: Real-time filtering by keyword, location, status (Buy/Rent), category (Residential/Commercial), property type, price ranges, and bedroom counts.

### Backend (Server)
- **Framework**: Node.js & Express.js
- **Google Sheets API**: Official `googleapis` v4 integration via Google Service Account authentication directly from the Express backend (No Apps Script, no doPost, no 3rd-party SaaS replacement).
- **Security & Protection**:
  - `express-rate-limit` rate-limiting on forms & endpoints
  - CORS with origins whitelist
  - Comprehensive input sanitization & phone regex validation (`+` and 7–15 digits)
  - Secure credential reading exclusively via environment variables (`.env`)

---

## 📊 Google Sheets API Integration

### Spreadsheet Details
- **Spreadsheet ID**: `1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4`
- **Sheet Tab**: `Inquiries`
- **Columns (A–K)**:
  - `A`: Inquiry ID (`AE-<timestamp>-<rand>`)
  - `B`: Submission Date (DD/MM/YYYY, HH:MM:SS)
  - `C`: Customer Name
  - `D`: Phone Number
  - `E`: Email
  - `F`: Inquiry Type (`Buy`, `Rent`, `Sell`, `General Inquiry`, `Property Visit`)
  - `G`: Property ID
  - `H`: Property Title
  - `I`: Location
  - `J`: Message
  - `K`: Status (Default: `New`)

### Required Environment Configuration
To activate live appending to the Google Sheet, configure `server/.env` (or copy from `.env.example`):

```env
PORT=5000
GOOGLE_SHEET_ID=1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> **Note**: Share the target Google Sheet (`1FaJs1OEjF5MMgO_WfUtSdIQqDsu9M2oXsUelOB6zx_4`) with `GOOGLE_SERVICE_ACCOUNT_EMAIL` and assign **Editor** permissions.
> When credentials are not yet supplied, the server gracefully returns a 503 error informing the caller that Google Sheets credentials are not configured, rather than crashing or claiming fake success.

---

## 🚀 Running the Application

### 1. Install Dependencies
```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 2. Start the Backend API
```bash
cd server
npm start
# Server starts on http://localhost:5000
```

### 3. Start the Frontend
```bash
cd client
npm run dev
# Vite dev server starts on http://localhost:5173
```

---

## 🧪 Verified API Endpoints

- `GET  /api/health` — API health check
- `GET  /api/properties` — List all properties with optional query filters
- `GET  /api/properties/:id` — Single property details
- `POST /api/inquiries` — General and buy/rent inquiries
- `POST /api/contact` — Contact us submissions
- `POST /api/visits` — Booking property visits
- `POST /api/sell-property` — Property listing requests
- `POST /api/agent-contact` — Direct agent contact messages
