import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Building2,
  TrendingUp,
  ChevronRight,
  Star,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import './About.css';

/* ─── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
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
const values = [
  {
    icon: Target,
    title: 'Client-First Focus',
    description:
      'Every decision we make is guided by what is best for our clients. We listen deeply, advise honestly, and act with unwavering dedication to your goals.',
  },
  {
    icon: Eye,
    title: 'Unmatched Transparency',
    description:
      'We believe in full disclosure at every step. No hidden fees, no ambiguous terms — just clear, honest communication that earns lasting trust.',
  },
  {
    icon: Heart,
    title: 'Passion for Excellence',
    description:
      'Luxury is our standard, not our marketing. From the first consultation to the final handover, we deliver an experience that exceeds expectations.',
  },
];

const stats = [
  { icon: Award, value: '12+', label: 'Years of Excellence' },
  { icon: Building2, value: '500+', label: 'Properties Sold' },
  { icon: MapPin, value: '3', label: 'Regional Offices' },
  { icon: Star, value: '98%', label: 'Client Satisfaction' },
];

const milestones = [
  {
    year: '2012',
    title: 'Foundation',
    description:
      'Aurevia Estates was founded in Riyadh with a single office and a bold vision: to redefine luxury real estate in the Kingdom.',
  },
  {
    year: '2015',
    title: 'Jeddah Expansion',
    description:
      'We opened our Jeddah branch on the iconic Corniche, extending our premium services to the Western Region and its thriving coastal market.',
  },
  {
    year: '2018',
    title: '200 Properties Milestone',
    description:
      'We celebrated the sale and management of our 200th property — a testament to the trust our clients place in our team.',
  },
  {
    year: '2020',
    title: 'Investment Advisory Launch',
    description:
      'Responding to growing demand, we launched a dedicated Investment Advisory division to help clients maximise portfolio returns.',
  },
  {
    year: '2022',
    title: 'NEOM & Future Cities',
    description:
      'Aurevia became an authorised sales partner for future-city developments, including early-stage NEOM projects in the Tabuk Region.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    description:
      'We launched our fully integrated digital platform, giving clients real-time access to listings, valuations, and agent consultations.',
  },
];

/* ─── Component ────────────────────────────────────────── */
export default function About() {
  return (
    <main className="about-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero about-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp} className="serif">
              About Aurevia Estates
            </motion.h1>
            <motion.p variants={fadeUp}>
              Twelve years of crafting extraordinary real estate experiences across
              the Kingdom of Saudi Arabia — built on expertise, trust, and an
              unyielding passion for excellence.
            </motion.p>
            <motion.nav variants={fadeUp} className="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>About Us</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* ── Company Story ─────────────────────────────────── */}
      <section className="section about-story">
        <div className="container">
          <div className="story-grid">
            <motion.div
              className="story-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideLeft}
            >
              <span className="section-label">Who We Are</span>
              <h2 className="serif section-title" style={{ textAlign: 'left', marginBottom: '20px', marginTop: '12px' }}>
                More Than a Real Estate Agency
              </h2>
              <p className="story-lead">
                Aurevia Estates was born from a belief that luxury real estate
                deserves a luxury experience — from start to finish.
              </p>
              <p className="story-text">
                Founded in Riyadh in 2012, we set out to challenge the status quo
                of property transactions in Saudi Arabia. Where others offered
                listings, we offered guidance. Where others rushed closings, we
                built relationships. Today, Aurevia Estates stands as one of the
                Kingdom's most trusted names in premium residential and commercial
                real estate, with offices in Riyadh, Jeddah, and NEOM.
              </p>
              <p className="story-text">
                Our team of highly qualified consultants brings decades of combined
                experience across every segment of the market — from palatial villas
                and waterfront apartments to landmark commercial buildings and
                future-city investments. We are proud to serve Saudi families,
                regional investors, and global corporations alike.
              </p>
              <div className="story-badges">
                <span className="story-badge">
                  <Award size={15} /> RERA Certified
                </span>
                <span className="story-badge">
                  <Users size={15} /> 1,000+ Happy Clients
                </span>
                <span className="story-badge">
                  <TrendingUp size={15} /> SAR 2B+ in Transactions
                </span>
              </div>
            </motion.div>

            <motion.div
              className="story-image-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideRight}
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                alt="Aurevia Estates office"
                className="story-img"
              />
              <div className="story-img-badge">
                <strong>Est. 2012</strong>
                <span>Riyadh, KSA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Values ──────────────────────────────── */}
      <section className="section about-values">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="section-label">Our Foundation</span>
            <h2 className="serif section-title">Mission &amp; Core Values</h2>
            <p className="section-subtitle">
              Everything we do is grounded in three principles that have guided
              Aurevia Estates since day one.
            </p>
          </motion.div>

          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {values.map((v, i) => (
              <motion.div key={i} className="value-card card" variants={fadeUp}>
                <div className="value-icon-wrap">
                  <v.icon size={28} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission statement */}
          <motion.div
            className="mission-statement"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="mission-quote">"</span>
            <p>
              Our mission is to deliver unparalleled real estate experiences that
              empower our clients to achieve their property ambitions — with
              integrity, expertise, and a commitment to excellence that never
              wavers.
            </p>
            <cite>— The Aurevia Estates Leadership Team</cite>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section className="about-stats-bar">
        <div className="container">
          <motion.div
            className="stats-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            {stats.map((s, i) => (
              <motion.div key={i} className="stat-item" variants={fadeUp}>
                <div className="stat-icon">
                  <s.icon size={24} />
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline / Journey ────────────────────────────── */}
      <section className="section about-timeline">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="section-label">Our Journey</span>
            <h2 className="serif section-title">Key Milestones</h2>
            <p className="section-subtitle">
              Over twelve years, we have grown from a single office to a
              full-service luxury real estate group shaping the Kingdom's
              property landscape.
            </p>
          </motion.div>

          <div className="timeline">
            <div className="timeline-spine" />
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`timeline-item ${isLeft ? 'left' : 'right'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={isLeft ? slideLeft : slideRight}
                >
                  <div className="timeline-card">
                    <span className="timeline-year">{m.year}</span>
                    <h3>{m.title}</h3>
                    <p>{m.description}</p>
                  </div>
                  <div className="timeline-dot" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="cta-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="section-label" style={{ color: '#fff', background: 'rgba(255,255,255,0.15)' }}>
              Get In Touch
            </motion.span>
            <motion.h2 variants={fadeUp} className="serif" style={{ color: '#fff', marginTop: '12px' }}>
              Ready to Work with Aurevia?
            </motion.h2>
            <motion.p variants={fadeUp}>
              Whether you're buying, selling, investing, or simply exploring, our
              experts are ready to guide you every step of the way.
            </motion.p>
            <motion.div variants={fadeUp} className="cta-actions">
              <Link to="/properties" className="btn btn-white btn-lg">
                Browse Properties
              </Link>
              <Link to="/contact" className="btn btn-lg" style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)' }}>
                Contact Us <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
