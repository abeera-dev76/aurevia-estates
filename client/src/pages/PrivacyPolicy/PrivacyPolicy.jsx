import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Institutional Governance</span>
            <h1 className="serif">Privacy & Discretion Policy</h1>
            <p>Last updated: November 2026 • Royal Decree & Personal Data Protection Law (PDPL) Compliant</p>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Privacy Policy</span>
            </nav>
          </motion.div>
        </div>
      </div>

      <section className="section bg-ivory">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="card" style={{ padding: '48px 40px', border: '1px solid rgba(197, 164, 109, 0.3)' }}>
            {[
              {
                title: '1. Confidentiality & Personal Data',
                body: 'We collect personal information you provide when using our website, including full name, telephone number, email address, and property dossier specifications. We uphold rigorous discretion standard to private banking protocols.'
              },
              {
                title: '2. Purpose of Processing',
                body: 'Your information is strictly used to match you with suitable ultra-prime properties, coordinate private viewings, prepare comparative market appraisals, and fulfill REGA regulatory conveyance requirements.'
              },
              {
                title: '3. Institutional CRM & Storage Protocol',
                body: 'Your enquiry records are securely encrypted in our private enterprise CRM, integrated with Google Sheets API under enterprise service account authentication with strict role-based access control.'
              },
              {
                title: '4. Non-Disclosure & Third Parties',
                body: 'We do not sell, license, or disclose your identity or transaction records to third parties without prior explicit non-disclosure agreement (NDA) clearance, except where formally mandated by Saudi judicial authorities.'
              },
              {
                title: '5. Digital Footprint & Cookies',
                body: 'Our platform utilizes strictly necessary performance tokens to deliver seamless responsive rendering. No cross-site marketing tracking is conducted.'
              },
              {
                title: '6. Private Client Rights',
                body: 'Under the Saudi Personal Data Protection Law (PDPL), you retain the unreserved right to request audit, correction, or confidential expungement of your dossier by contacting our Compliance Desk.'
              },
              {
                title: '7. Direct Compliance Contact',
                body: 'For privacy inquiries, please address the Data Governance Officer at: compliance@aureviaestates.com or telephone our VIP Concierge at +966 11 234 5678.'
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  marginBottom: 32,
                  paddingBottom: 24,
                  borderBottom: i < 6 ? '1px solid rgba(20, 37, 31, 0.08)' : 'none'
                }}
              >
                <h2 style={{
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--forest-green)',
                  marginBottom: 10
                }}>
                  {s.title}
                </h2>
                <p style={{ color: 'var(--charcoal)', lineHeight: 1.8, fontSize: '0.96rem' }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
