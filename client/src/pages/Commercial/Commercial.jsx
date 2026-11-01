import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, RotateCcw, Building2, TrendingUp, ShieldCheck, Users,
} from 'lucide-react';
import { properties } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './Commercial.css';

const COMM_TYPES = ['Office', 'Shop'];
const STATUSES   = ['Buy', 'Rent'];

const EMPTY = { type: '', status: '', maxPrice: '' };

const commercialProperties = properties.filter(p => p.category === 'Commercial');

const SERVICES = [
  {
    icon: Building2,
    title: 'Premium Office Spaces',
    desc: 'Grade-A offices in prime business districts, from single suites to full-floor headquarters.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Opportunities',
    desc: 'High-yield commercial assets with strong rental income and long-term capital appreciation.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Due Diligence',
    desc: 'Our experts conduct thorough legal, financial, and structural assessments on every listing.',
  },
  {
    icon: Users,
    title: 'Corporate Relocation',
    desc: 'End-to-end support for businesses relocating or expanding across Saudi Arabia.',
  },
];

export default function Commercial() {
  const [filters, setFilters] = useState(EMPTY);

  const set = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));
  const hasActive = Object.values(filters).some(Boolean);
  const clear = () => setFilters(EMPTY);

  const filtered = useMemo(() => {
    return commercialProperties.filter(p => {
      if (filters.type     && p.type   !== filters.type)   return false;
      if (filters.status   && p.status !== filters.status) return false;
      if (filters.maxPrice && p.price  > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="commercial-page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="page-hero commercial-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Commercial</span>
            <h1 className="serif">Commercial Properties</h1>
            <p>
              Premium offices, retail spaces, and investment-grade commercial real estate across
              Saudi Arabia's leading business hubs.
            </p>
            <div className="breadcrumb">
              <Home size={13} />
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/properties">Properties</Link>
              <ChevronRight size={13} />
              <span style={{ color: 'var(--accent)' }}>Commercial</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────── */}
      <section className="comm-filter-section">
        <div className="container">
          <motion.div
            className="comm-filter-bar"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="comm-filter-grid">
              {/* Type */}
              <div className="form-group mb-0">
                <label className="form-label">Property Type</label>
                <select
                  className="form-control"
                  value={filters.type}
                  onChange={e => set('type', e.target.value)}
                >
                  <option value="">All Types</option>
                  {COMM_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              {/* Status */}
              <div className="form-group mb-0">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={filters.status}
                  onChange={e => set('status', e.target.value)}
                >
                  <option value="">Buy &amp; Rent</option>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Max Price */}
              <div className="form-group mb-0">
                <label className="form-label">Max Price (SAR)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 1000000"
                  value={filters.maxPrice}
                  min={0}
                  onChange={e => set('maxPrice', e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="form-group mb-0 comm-filter-actions">
                {hasActive && (
                  <button className="btn btn-outline btn-sm" onClick={clear}>
                    <RotateCcw size={14} /> Clear
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Listings ─────────────────────────────────── */}
      <section className="section commercial-results">
        <div className="container">
          <div className="results-meta">
            <p className="results-count-text">
              {hasActive
                ? <>Showing <strong>{filtered.length}</strong> of <strong>{commercialProperties.length}</strong> commercial properties</>
                : <>All <strong>{commercialProperties.length}</strong> commercial properties</>
              }
            </p>
            {hasActive && (
              <button className="clear-tag" onClick={clear}>
                <RotateCcw size={13} /> Clear filters
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                className="grid-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="empty-icon">🏢</div>
                <h3>No Commercial Properties Found</h3>
                <p>No listings match your selected filters. Try widening your search or clear filters to view all commercial properties.</p>
                <button className="btn btn-primary mt-4" onClick={clear}>
                  <RotateCcw size={16} /> Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Services Section ─────────────────────────── */}
      <section className="section commercial-services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Expertise</span>
            <h2 className="section-title serif">Commercial Real Estate Services</h2>
            <p className="section-subtitle">
              Aurevia Estates provides end-to-end commercial property solutions, from acquisition and
              leasing to investment advisory and corporate relocation — backed by over a decade of
              market expertise across the Kingdom.
            </p>
          </div>

          <div className="comm-services-grid">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="comm-service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="comm-service-icon">
                  <Icon size={28} />
                </div>
                <h4 className="comm-service-title">{title}</h4>
                <p className="comm-service-desc">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="comm-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="comm-cta-inner">
              <h3 className="serif">Looking for the Perfect Commercial Space?</h3>
              <p>Our specialist commercial team will match you with properties tailored to your business needs and investment goals.</p>
              <div className="comm-cta-actions">
                <Link to="/contact" className="btn btn-white btn-lg">
                  Speak to an Advisor
                </Link>
                <Link to="/properties" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
                  View All Properties
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
