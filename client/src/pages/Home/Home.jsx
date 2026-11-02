import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  Home as HomeIcon,
  Building2,
  Layers,
  CheckCircle,
  Phone,
  Award,
  TrendingUp,
  Shield,
  Compass,
  Sparkles,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { properties, agents, testimonials } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const SERVICES = [
  {
    icon: HomeIcon,
    title: 'Bespoke Acquisitions',
    desc: 'Unlocking off-market palaces, skyline penthouses, and private compounds with complete discretion.'
  },
  {
    icon: Building2,
    title: 'Prime Commercial Assets',
    desc: 'Grade-A corporate headquarters, boutique hospitality spaces, and institutional investment properties.'
  },
  {
    icon: TrendingUp,
    title: 'Private Wealth Advisory',
    desc: 'Strategic portfolio structuring, capital preservation, and capital growth across the Kingdom.'
  },
  {
    icon: Shield,
    title: 'Asset & Estate Care',
    desc: 'Discreet tenancy vetting, continuous maintenance, and comprehensive concierge management.'
  },
];

const STATS = [
  { value: 'SAR 4.8B+', label: 'Transacted Portfolio' },
  { value: '15+ Years', label: 'Kingdom-Wide Discretion' },
  { value: '99.4%', label: 'Private Client Retention' },
  { value: '2 Flagships', label: 'Riyadh & Jeddah Galleries' },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = properties.filter(p => p.featured).slice(0, 6);
  const latest = properties.slice(-4).reverse();

  return (
    <div className="home-page">

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-pattern" />

        <div className="container hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="hero-label-badge"
          >
            <Sparkles size={13} className="hero-star" />
            <span>Saudi Arabia's Premier Luxury Brokerage</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="hero-title serif"
          >
            Timeless Architecture.<br />
            Extraordinary Living.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="hero-subtitle"
          >
            Aurevia Estates curates the Kingdom’s most distinguished residential compounds, skyline penthouses, and commercial trophy assets. Experience real estate redefined by discretion and distinction.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="hero-ctas"
          >
            <Link to="/properties" className="btn btn-gold btn-lg">
              <span>Explore Portfolio</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(197, 164, 109, 0.6)', color: 'var(--champagne-gold)' }}>
              <span>Private Consultation</span>
            </Link>
          </motion.div>
        </div>

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="hero-search-wrapper"
        >
          <div className="container">
            <SearchBar />
          </div>
        </motion.div>
      </section>

      {/* ── STATS / PRESTIGE STRIP ───────────────────────────── */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURATED CATEGORIES ───────────────────────────────── */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Curated Collections</span>
            <h2 className="section-title">Explore by Distinction</h2>
            <p className="section-subtitle">
              From waterfront penthouses to private family estates, discover residences tailored to your lifestyle.
            </p>
          </div>

          <div className="categories-grid">
            {[
              {
                icon: HomeIcon,
                label: 'Luxury Residences',
                to: '/properties/residential',
                count: properties.filter(p => p.category === 'Residential').length,
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
                desc: 'Villas, Penthouses & Private Compounds',
              },
              {
                icon: Building2,
                label: 'Commercial Assets',
                to: '/properties/commercial',
                count: properties.filter(p => p.category === 'Commercial').length,
                img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
                desc: 'Towers, Retail Gallerias & Prime HQ Offices',
              },
              {
                icon: Layers,
                label: 'Private Acquisitions',
                to: '/buy',
                count: properties.filter(p => p.status === 'Buy').length,
                img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80',
                desc: 'Freehold & Off-Market Trophy Investments',
              },
              {
                icon: KeyRound,
                label: 'Bespoke Leases',
                to: '/rent',
                count: properties.filter(p => p.status === 'Rent').length,
                img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
                desc: 'Serviced Residences & Executive Long-Term Stays',
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                className="category-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(cat.to)}
              >
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className="cat-overlay" />
                <div className="cat-content">
                  <div className="cat-badge-wrap">
                    <span className="cat-count">{cat.count} Properties</span>
                  </div>
                  <h3 className="cat-title">{cat.label}</h3>
                  <p className="cat-desc">{cat.desc}</p>
                  <span className="cat-link-cta">
                    <span>View Collection</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ESTATES ─────────────────────────────────── */}
      <section className="section featured-section bg-ivory">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Signature Portfolio</span>
            <h2 className="section-title">Featured Estates</h2>
            <p className="section-subtitle">
              A private selection of exceptional properties currently offered through Aurevia Estates.
            </p>
          </div>

          <div className="grid-3">
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/properties" className="btn btn-forest btn-lg">
              <span>View Entire Collection ({properties.length} Estates)</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE AUREVIA DIFFERENCE (HERITAGE & CRAFT) ─────────── */}
      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <span className="section-label">The Aurevia Standard</span>
              <h2 className="section-title text-left">
                Where Prestige Meets Complete Discretion.
              </h2>
              <p className="why-lead">
                For over fifteen years, Aurevia Estates has represented the Kingdom’s most esteemed families, private investors, and diplomatic missions. We view luxury real estate not as transactions, but as custodianship of architectural legacies.
              </p>

              <div className="why-pillars">
                {[
                  {
                    title: 'Bespoke Off-Market Portfolios',
                    desc: 'Direct confidential access to iconic estates never publicly advertised.'
                  },
                  {
                    title: 'Private Wealth & Legal Assurance',
                    desc: 'End-to-end conveyance, escrow management, and REGA-certified regulatory compliance.'
                  },
                  {
                    title: 'Tailored Concierge Onboarding',
                    desc: 'Personalized handover, private security coordination, and interior architectural staging.'
                  },
                ].map((pillar, i) => (
                  <motion.div
                    key={i}
                    className="why-pillar-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <div className="pillar-check">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="pillar-title">{pillar.title}</h4>
                      <p className="pillar-desc">{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="why-actions">
                <Link to="/about" className="btn btn-gold">
                  <span>Our Heritage & Vision</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  <span>Meet Managing Director</span>
                </Link>
              </div>
            </div>

            <div className="why-image-wrapper">
              <div className="why-frame">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80"
                  alt="Aurevia Estates Architecture"
                  loading="lazy"
                />
                <div className="why-gold-corner top-left" />
                <div className="why-gold-corner bottom-right" />
              </div>

              <div className="why-floating-badge">
                <Award size={32} className="badge-icon" />
                <div>
                  <strong>Excellence in Private Brokerage</strong>
                  <span>Awarded Top Luxury Real Estate Agency 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BESPOKE SERVICES ─────────────────────────────────── */}
      <section className="section services-section bg-ivory">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Tailored Capabilities</span>
            <h2 className="section-title">Bespoke Real Estate Services</h2>
            <p className="section-subtitle">
              Comprehensive advisory services crafted for high-net-worth individuals, family offices, and institutions.
            </p>
          </div>

          <div className="grid-4">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={i}
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="svc-icon-box">
                  <svc.icon size={26} />
                </div>
                <h3 className="svc-title">{svc.title}</h3>
                <p className="svc-desc">{svc.desc}</p>
                <Link to="/services" className="svc-link">
                  <span>Explore Service</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVATE ADVISORS ─────────────────────────────────── */}
      <section className="section advisors-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Distinguished Counsel</span>
            <h2 className="section-title">Meet Our Private Advisors</h2>
            <p className="section-subtitle">
              Seasoned consultants with deep institutional knowledge of the Kingdom’s ultra-prime corridors.
            </p>
          </div>

          <div className="grid-3">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                className="luxury-agent-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="agent-photo-box">
                  <img src={agent.photo} alt={agent.name} loading="lazy" />
                  <div className="agent-overlay" />
                  <span className="agent-exp-badge">{agent.experience} Experience</span>
                </div>
                <div className="agent-info">
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-role">{agent.title}</p>
                  <p className="agent-focus">{agent.specialisation}</p>

                  <div className="agent-metrics">
                    <div className="metric-box">
                      <span className="metric-val">{agent.listings}</span>
                      <span className="metric-lbl">Active Estates</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">{agent.sales}</span>
                      <span className="metric-lbl">Transactions</span>
                    </div>
                  </div>

                  <Link to="/agents" className="btn btn-outline btn-sm w-full" style={{ marginTop: 16 }}>
                    <span>Consult Advisor</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ──────────────────────────────── */}
      <section className="section testimonials-section bg-ivory">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Words of Trust</span>
            <h2 className="section-title">Client Reflections</h2>
            <p className="section-subtitle">
              Discretion is our hallmark. Read what our distinguished clients say about their journey with Aurevia.
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="card luxury-testimonial-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="gold-stars">
                  {Array(t.rating).fill(null).map((_, j) => (
                    <Star key={j} size={15} fill="#C5A46D" color="#C5A46D" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.text}"</p>
                <div className="testimonial-footer">
                  <img src={t.image} alt={t.name} loading="lazy" />
                  <div>
                    <strong className="author-name">{t.name}</strong>
                    <span className="author-role">{t.role} • {t.property}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST ADDITIONS ─────────────────────────────────── */}
      <section className="section latest-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Just Unveiled</span>
            <h2 className="section-title">Recent Portfolio Additions</h2>
            <p className="section-subtitle">Freshly listed residential and commercial opportunities.</p>
          </div>

          <div className="grid-4">
            {latest.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE LUXURY CTA BANNER ──────────────────────── */}
      <section className="signature-cta-section">
        <div className="container">
          <motion.div
            className="signature-cta-inner"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-crest-mark">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 9V21L12 17L21 21V9L12 2Z" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V17" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M7 11L12 14L17 11" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>

            <span className="section-label" style={{ color: 'var(--champagne-gold)', marginBottom: 12 }}>
              Exclusive Representation
            </span>

            <h2 className="cta-headline serif">
              Ready to Acquire or List Your Architectural Masterpiece?
            </h2>

            <p className="cta-text">
              Whether you wish to discreetly market an iconic residence or acquire prime Saudi real estate, our senior partners are at your service.
            </p>

            <div className="cta-button-group">
              <Link to="/contact" className="btn btn-gold btn-lg">
                <span>Request Private Consultation</span>
                <Phone size={17} />
              </Link>
              <Link to="/sell" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
                <span>List an Estate</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
