import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Legal Framework</span>
            <h1 className="serif">Terms of Advisory & Engagement</h1>
            <p>Last updated: November 2026 • Real Estate General Authority (REGA) Compliant</p>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Terms & Conditions</span>
            </nav>
          </motion.div>
        </div>
      </div>

      <section className="section bg-ivory">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="card" style={{ padding: '48px 40px', border: '1px solid rgba(197, 164, 109, 0.3)' }}>
            {[
              {
                title: '1. Framework of Engagement',
                body: 'By accessing this private digital portal, you acknowledge and agree to be bound by these Terms of Advisory. All transactions are governed strictly by the laws of the Kingdom of Saudi Arabia.'
              },
              {
                title: '2. Professional Representation',
                body: 'Aurevia Estates is a licensed real estate firm authorized to conduct real estate marketing, property management, and private brokerage under license issued by the Real Estate General Authority (REGA).'
              },
              {
                title: '3. Portfolio Accuracy & Due Diligence',
                body: 'Architectural renderings, surface areas, and valuations displayed represent verified listings. Prospective purchasers or lessees are provided formal title deed (Sak) verification and structural due diligence prior to binding deposit.'
              },
              {
                title: '4. Inquiries & Representation Agreements',
                body: 'Lodging an inquiry through this platform initiates an exclusive preliminary consultation. Formal agency representation is sealed upon execution of a standard REGA-certified brokerage agreement.'
              },
              {
                title: '5. Intellectual Property & Architectural Copyright',
                body: 'All brand identities, photography, architectural diagrams, and editorial materials remain the proprietary intellectual property of Aurevia Estates. Unauthorized syndication is strictly prohibited.'
              },
              {
                title: '6. Jurisdiction',
                body: 'These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any dispute shall fall within the exclusive jurisdiction of the competent courts of Riyadh.'
              },
              {
                title: '7. Legal Contact',
                body: 'For legal notifications and corporate affairs: legal@aureviaestates.com • Headquarters: Al Olaya Towers, Level 28, King Fahd Road, Riyadh 12213.'
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
