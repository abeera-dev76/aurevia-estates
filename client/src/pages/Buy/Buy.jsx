import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Filter, RotateCcw, Home, ChevronRight } from 'lucide-react';
import { properties } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import InquiryForm from '../../components/InquiryForm/InquiryForm';
import { submitInquiry } from '../../services/api';
import './Buy.css';

const TYPES = ['Apartment', 'Villa', 'House', 'Plot'];

export default function Buy() {
  const [filters, setFilters] = useState({ type: '', minPrice: '', maxPrice: '', bedrooms: '' });
  const set = (k, v) => setFilters(p => ({ ...p, [k]: v }));

  const buyProperties = useMemo(() => {
    let list = properties.filter(p => p.status === 'Buy');
    if (filters.type) list = list.filter(p => p.type === filters.type);
    if (filters.bedrooms) list = list.filter(p => p.bedrooms >= Number(filters.bedrooms));
    if (filters.minPrice) list = list.filter(p => p.price >= Number(filters.minPrice.replace(/,/g, '')));
    if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice.replace(/,/g, '')));
    return list;
  }, [filters]);

  const clear = () => setFilters({ type: '', minPrice: '', maxPrice: '', bedrooms: '' });
  const hasActive = Object.values(filters).some(Boolean);

  return (
    <div className="buy-page">
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Acquisitions Portfolio</span>
            <h1 className="serif">Acquire an Architectural Legacy</h1>
            <p>
              Curated luxury residences and freehold commercial assets across Saudi Arabia's most prestigious corridors.
            </p>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Buy Property</span>
            </nav>
          </motion.div>
        </div>
      </div>

      {/* ── Perks Strip ── */}
      <div className="buy-perks-strip">
        <div className="container buy-perks-inner">
          <div className="buy-perk">
            <Shield size={16} className="perk-icon" />
            <span>REGA Certified Escrow Conveyance</span>
          </div>
          <div className="buy-perk">
            <Sparkles size={16} className="perk-icon" />
            <span>Off-Market Palace & Compound Access</span>
          </div>
          <div className="buy-perk">
            <Home size={16} className="perk-icon" />
            <span>Freehold & Investment Eligibility</span>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <section className="section bg-ivory">
        <div className="container buy-layout">
          <div className="buy-main">
            {/* Filter Bar */}
            <div className="filter-bar">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--forest-green)', fontFamily: 'var(--font-serif)' }}>
                  Refine Acquisition Criteria
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', letterSpacing: '0.04em' }}>
                  Showing <strong>{buyProperties.length}</strong> of {properties.filter(p => p.status === 'Buy').length} Properties
                </span>
              </div>

              <div className="filter-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Estate Type</label>
                  <select className="form-control" value={filters.type} onChange={e => set('type', e.target.value)}>
                    <option value="">All Types</option>
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Min Price (SAR)</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="e.g. 1,000,000"
                    value={filters.minPrice}
                    onChange={e => set('minPrice', e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Max Price (SAR)</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="e.g. 10,000,000"
                    value={filters.maxPrice}
                    onChange={e => set('maxPrice', e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Bedrooms</label>
                  <select className="form-control" value={filters.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
                  </select>
                </div>
              </div>

              {hasActive && (
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-outline btn-sm" onClick={clear}>
                    <RotateCcw size={13} />
                    <span>Reset Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Properties Grid */}
            {buyProperties.length > 0 ? (
              <div className="grid-2">
                {buyProperties.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ padding: '60px 24px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', marginBottom: 8 }}>
                  No Matching Properties Found
                </h3>
                <p style={{ color: 'var(--charcoal-muted)', marginBottom: 20 }}>
                  We could not find any properties matching your current criteria.
                </p>
                <button className="btn btn-forest btn-sm" onClick={clear}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Sticky Inquiry Sidebar */}
          <aside className="buy-sidebar">
            <div className="card" style={{ padding: '32px 28px' }}>
              <InquiryForm
                title="Acquisition Inquiry"
                inquiryType="Buy"
                onSubmitFn={submitInquiry}
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
