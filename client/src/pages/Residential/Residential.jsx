import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { properties } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './Residential.css';

const RES_TYPES = ['Apartment', 'Villa', 'House', 'Plot'];
const STATUSES  = ['Buy', 'Rent'];
const BED_OPTS  = [1, 2, 3, 4, 5, 6];

const EMPTY = { type: '', status: '', bedrooms: '', maxPrice: '' };

const residentialProperties = properties.filter(p => p.category === 'Residential');

export default function Residential() {
  const [filters, setFilters] = useState(EMPTY);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));
  const hasActive = Object.values(filters).some(Boolean);
  const clear = () => setFilters(EMPTY);

  const filtered = useMemo(() => {
    return residentialProperties.filter(p => {
      if (filters.type     && p.type     !== filters.type)     return false;
      if (filters.status   && p.status   !== filters.status)   return false;
      if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
      if (filters.maxPrice && p.price    > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="residential-page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="page-hero residential-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Residential</span>
            <h1 className="serif">Residential Properties</h1>
            <p>
              Discover exceptional homes, villas, apartments, and plots crafted for elevated living
              across Saudi Arabia's most prestigious addresses.
            </p>
            <div className="breadcrumb">
              <Home size={13} />
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/properties">Properties</Link>
              <ChevronRight size={13} />
              <span style={{ color: 'var(--accent)' }}>Residential</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────── */}
      <section className="res-filter-section">
        <div className="container">
          <motion.div
            className="res-filter-bar"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="res-filter-grid">
              {/* Type */}
              <div className="form-group mb-0">
                <label className="form-label">Property Type</label>
                <select
                  className="form-control"
                  value={filters.type}
                  onChange={e => set('type', e.target.value)}
                >
                  <option value="">All Types</option>
                  {RES_TYPES.map(t => <option key={t}>{t}</option>)}
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

              {/* Bedrooms */}
              <div className="form-group mb-0">
                <label className="form-label">Min Bedrooms</label>
                <select
                  className="form-control"
                  value={filters.bedrooms}
                  onChange={e => set('bedrooms', e.target.value)}
                >
                  <option value="">Any</option>
                  {BED_OPTS.map(n => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>

              {/* Max Price */}
              <div className="form-group mb-0">
                <label className="form-label">Max Price (SAR)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 5000000"
                  value={filters.maxPrice}
                  min={0}
                  onChange={e => set('maxPrice', e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="form-group mb-0 res-filter-actions">
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

      {/* ── Results ──────────────────────────────────── */}
      <section className="section residential-results">
        <div className="container">
          <div className="results-meta">
            <p className="results-count-text">
              {hasActive
                ? <>Showing <strong>{filtered.length}</strong> of <strong>{residentialProperties.length}</strong> residential properties</>
                : <>All <strong>{residentialProperties.length}</strong> residential properties</>
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
                <div className="empty-icon">🏡</div>
                <h3>No Residential Properties Found</h3>
                <p>No properties match your selected criteria. Try broadening your search or clear the filters below.</p>
                <button className="btn btn-primary mt-4" onClick={clear}>
                  <RotateCcw size={16} /> Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
