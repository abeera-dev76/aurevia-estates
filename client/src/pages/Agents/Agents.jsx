import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  ChevronRight,
  ArrowRight,
  Star,
  Briefcase,
  BarChart2,
  Globe,
  UserPlus,
} from 'lucide-react';
import { agents } from '../../data/index';
import './Agents.css';

/* ─── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Component ────────────────────────────────────────── */
export default function Agents() {
  return (
    <main className="agents-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero agents-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="section-label"
              style={{ marginBottom: '16px', display: 'inline-block' }}
            >
              The Experts Behind Your Success
            </motion.span>
            <motion.h1 variants={fadeUp} className="serif">
              Meet Our Agents
            </motion.h1>
            <motion.p variants={fadeUp}>
              Our team of dedicated, experienced property consultants are
              passionate about finding the perfect match between clients and
              properties — every single time.
            </motion.p>
            <motion.nav variants={fadeUp} className="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>Our Agents</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* ── Agents Grid ──────────────────────────────────── */}
      <section className="section agents-grid-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="section-label">Our Team</span>
            <h2 className="serif section-title">Your Trusted Property Consultants</h2>
            <p className="section-subtitle">
              Every Aurevia agent is rigorously trained, market-certified, and
              driven by a genuine commitment to your real estate success.
            </p>
          </motion.div>

          <motion.div
            className="agents-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {agents.map((agent) => (
              <motion.div key={agent.id} className="agent-card card" variants={fadeUp}>
                {/* Photo */}
                <div className="agent-photo-wrap">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="agent-photo"
                  />
                  <span className="agent-specialisation-badge">
                    {agent.specialisation}
                  </span>
                </div>

                {/* Identity */}
                <div className="agent-body">
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-title">{agent.title}</p>

                  {/* Stats */}
                  <div className="agent-stats">
                    <div className="agent-stat">
                      <Briefcase size={15} />
                      <span><strong>{agent.listings}</strong> Listings</span>
                    </div>
                    <div className="agent-stat">
                      <BarChart2 size={15} />
                      <span><strong>{agent.sales}</strong> Sales</span>
                    </div>
                    <div className="agent-stat">
                      <Star size={15} />
                      <span><strong>{agent.experience}</strong></span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="agent-languages">
                    <Globe size={14} />
                    {agent.languages.map((lang, i) => (
                      <span key={i} className="lang-pill">{lang}</span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="agent-bio">{agent.bio}</p>

                  {/* Contact info */}
                  <div className="agent-contact-info">
                    <a href={`tel:${agent.phone}`} className="contact-line">
                      <Phone size={14} />
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="contact-line">
                      <Mail size={14} />
                      {agent.email}
                    </a>
                  </div>

                  {/* CTA */}
                  <Link to="/contact" className="btn btn-primary w-full agent-cta">
                    Contact Agent <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Join Our Team CTA ─────────────────────────────── */}
      <section className="agents-join">
        <div className="container">
          <motion.div
            className="join-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.div className="join-icon" variants={fadeUp}>
              <UserPlus size={40} />
            </motion.div>
            <motion.span
              variants={fadeUp}
              className="section-label"
              style={{ color: 'var(--primary)', background: 'rgba(8,98,136,.1)' }}
            >
              Career Opportunity
            </motion.span>
            <motion.h2 variants={fadeUp} className="serif">
              Join Our Award-Winning Team
            </motion.h2>
            <motion.p variants={fadeUp}>
              Are you a passionate, driven real estate professional ready to take
              your career to the next level? Aurevia Estates is always looking
              for exceptional talent to grow with us. Enjoy competitive
              commissions, a premium brand to represent, and the tools to
              succeed.
            </motion.p>
            <motion.div variants={fadeUp} className="join-perks">
              {[
                'Industry-leading commission structure',
                'Continuous training & development',
                'Premium marketing support',
                'Collaborative, high-performance culture',
              ].map((perk, i) => (
                <div key={i} className="join-perk">
                  <Star size={14} fill="currentColor" />
                  {perk}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Apply Now <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
