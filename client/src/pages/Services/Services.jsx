import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Key,
  TrendingUp,
  Settings,
  FileText,
  BarChart2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award,
} from 'lucide-react';
import './Services.css';

/* ─── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/* ─── Data ──────────────────────────────────────────────── */
const services = [
  {
    icon: Home,
    title: 'Property Sales',
    description:
      'Whether you are buying your dream home or selling a cherished property, our sales specialists ensure a seamless, transparent, and rewarding transaction from listing to handover.',
    features: [
      'Comprehensive market valuation',
      'Professional photography & staging',
      'Targeted multi-channel marketing',
      'Qualified buyer screening',
      'Expert negotiation & closing',
      'Post-sale support',
    ],
  },
  {
    icon: Key,
    title: 'Property Rentals',
    description:
      'We connect landlords with vetted, reliable tenants and help renters find premium residential and commercial spaces that perfectly match their lifestyle or business needs.',
    features: [
      'Residential & commercial rentals',
      'Tenant screening & vetting',
      'Lease drafting & negotiation',
      'Move-in inspection reports',
      'Rental market analysis',
      'Renewal & exit management',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    description:
      'Our certified investment advisors help you build and grow a high-performing real estate portfolio through data-driven strategy, ROI analysis, and access to exclusive off-market opportunities.',
    features: [
      'Portfolio strategy development',
      'ROI & yield analysis',
      'Off-market deal access',
      'Risk assessment & mitigation',
      'Market trend reporting',
      'Vision 2030 opportunity mapping',
    ],
  },
  {
    icon: Settings,
    title: 'Property Management',
    description:
      'Enjoy true peace of mind with our end-to-end property management service. We handle everything — from maintenance coordination and tenant relations to financial reporting.',
    features: [
      'Full tenant relationship management',
      'Preventive maintenance scheduling',
      '24/7 emergency response',
      'Monthly financial statements',
      'Rent collection & disbursement',
      'Property performance reviews',
    ],
  },
  {
    icon: FileText,
    title: 'Legal & Documentation',
    description:
      'Navigate complex real estate legalities with confidence. Our legal specialists handle all paperwork, title deed transfers, RERA compliance, and contract reviews with meticulous precision.',
    features: [
      'Title deed transfer (Watheeq)',
      'Sales & lease contract drafting',
      'RERA compliance checks',
      'Due diligence & title searches',
      'Power of attorney services',
      'Dispute resolution support',
    ],
  },
  {
    icon: BarChart2,
    title: 'Valuation & Appraisal',
    description:
      'Receive certified, impartial property valuations prepared by our accredited appraisers. Ideal for sales, financing, insurance, estate planning, and investment benchmarking.',
    features: [
      'RICS-aligned appraisal methodology',
      'Residential & commercial valuations',
      'Bank & mortgage valuations',
      'Insurance replacement valuations',
      'Estate & inheritance assessments',
      'Detailed written reports',
    ],
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Fully Licensed & Regulated',
    text: 'All our services comply with Saudi Real Estate laws and RERA regulations, giving you full legal protection at every step.',
  },
  {
    icon: Award,
    title: 'Award-Winning Expertise',
    text: 'Our team holds industry certifications and has been recognised for excellence in luxury real estate across the Kingdom.',
  },
  {
    icon: Clock,
    title: 'Responsive & Reliable',
    text: 'We respond to every enquiry within 2 hours and assign a dedicated consultant to manage your case from day one.',
  },
  {
    icon: Users,
    title: 'Dedicated Client Success',
    text: 'Every client receives a named consultant — a single point of contact who knows your goals and advocates for your best interests.',
  },
];

/* ─── Component ────────────────────────────────────────── */
export default function Services() {
  return (
    <main className="services-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero services-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>
              What We Offer
            </motion.span>
            <motion.h1 variants={fadeUp} className="serif">
              Our Services
            </motion.h1>
            <motion.p variants={fadeUp}>
              A comprehensive suite of premium real estate services — expertly
              designed to serve buyers, sellers, landlords, tenants, and
              investors across Saudi Arabia.
            </motion.p>
            <motion.nav variants={fadeUp} className="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>Services</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────── */}
      <section className="section services-grid-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="section-label">Premium Offerings</span>
            <h2 className="serif section-title">Everything You Need, Under One Roof</h2>
            <p className="section-subtitle">
              From a first-time property search to complex multi-property portfolio
              management, Aurevia Estates has a service crafted for you.
            </p>
          </motion.div>

          <motion.div
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {services.map((svc, i) => (
              <motion.div key={i} className="service-card card" variants={fadeUp}>
                <div className="service-icon-wrap">
                  <svc.icon size={30} />
                </div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.description}</p>
                <ul className="service-features">
                  {svc.features.map((f, j) => (
                    <li key={j}>
                      <CheckCircle2 size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-outline btn-sm service-cta">
                  Get Started <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="section services-why">
        <div className="container">
          <div className="why-grid">
            <motion.div
              className="why-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideLeft}
            >
              <span className="section-label">Why Aurevia?</span>
              <h2 className="serif section-title" style={{ textAlign: 'left', marginTop: '12px', marginBottom: '16px' }}>
                The Aurevia Difference
              </h2>
              <p className="why-lead">
                Hundreds of agencies list properties. Only Aurevia Estates
                provides the depth of service, legal protection, and personal
                dedication that truly premium real estate demands.
              </p>
              <div className="why-points">
                {whyChooseUs.map((w, i) => (
                  <div key={i} className="why-point">
                    <div className="why-point-icon">
                      <w.icon size={20} />
                    </div>
                    <div>
                      <strong>{w.title}</strong>
                      <p>{w.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="why-image-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideRight}
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80"
                alt="Aurevia Estates team"
                className="why-img"
              />
              <div className="why-img-overlay">
                <div className="why-stat">
                  <span className="why-stat-value">98%</span>
                  <span className="why-stat-label">Client Satisfaction Rate</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            className="cta-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="section-label"
              style={{ color: '#fff', background: 'rgba(255,255,255,0.15)' }}
            >
              Start Today
            </motion.span>
            <motion.h2 variants={fadeUp} className="serif" style={{ color: '#fff', marginTop: '12px' }}>
              Not Sure Which Service You Need?
            </motion.h2>
            <motion.p variants={fadeUp}>
              Speak with one of our experts and we'll help you identify exactly
              the right solution for your property goals.
            </motion.p>
            <motion.div variants={fadeUp} className="cta-actions">
              <Link to="/contact" className="btn btn-white btn-lg">
                Book a Free Consultation
              </Link>
              <Link to="/agents" className="btn btn-lg" style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)' }}>
                Meet Our Agents <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
