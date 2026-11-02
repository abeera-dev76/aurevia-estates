import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Shield, Clock, RotateCcw } from 'lucide-react';
import { properties } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import InquiryForm from '../../components/InquiryForm/InquiryForm';
import { submitInquiry } from '../../services/api';

const TYPES = ['Apartment', 'Villa', 'House'];

export default function Rent() {
  const [filters, setFilters] = useState({ type: '', maxPrice: '', bedrooms: '' });
  const set = (k, v) => setFilters(p => ({ ...p, [k]: v }));

  const rentProperties = useMemo(() => {
    let list = properties.filter(p => p.status === 'Rent');
    if (filters.type) list = list.filter(p => p.type === filters.type);
    if (filters.bedrooms) list = list.filter(p => p.bedrooms >= Number(filters.bedrooms));
    if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice.replace(/,/g, '')));
    return list;
  }, [filters]);

  const clear = () => setFilters({ type: '', maxPrice: '', bedrooms: '' });
  const hasActive = Object.values(filters).some(Boolean);

  return (
    <div className="rent-page">
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Executive Leases</span>
            <h1 className="serif">Prime Residences for Lease</h1>
            <p>
              Discover high-specification apartments, serviced penthouses, and private family villas across Saudi Arabia.
            </p>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Rent Property</span>
            </nav>
          </motion.div>
        </div>
      </div>

      {/* ── Lease Perks Strip ── */}
      <div className="buy-perks-strip">
        <div className="container buy-perks-inner">
          <div className="buy-perk">
            <KeyRound size={16} className="perk-icon" />
            <span>Turnkey Move-in Ready Residences</span>
          </div>
          <div className="buy-perk">
            <Shield size={16} className="perk-icon" />
            <span>Diplomatic & Corporate Tenancy Agreements</span>
          </div>
          <div className="buy-perk">
            <Clock size={16} className="perk-icon" />
            <span>24/7 Dedicated Estate Maintenance</span>
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
                  Refine Lease Criteria
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', letterSpacing: '0.04em' }}>
                  Showing <strong>{rentProperties.length}</strong> of {properties.filter(p => p.status === 'Rent').length} Available Leases
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
                  <label className="form-label">Max Rent (SAR/month)</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="e.g. 25,000"
                    value={filters.maxPrice}
                    onChange={e => set('maxPrice', e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Bedrooms</label>
                  <select className="form-control" value={filters.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
                    <option value="">Any Beds</option>
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
            {rentProperties.length > 0 ? (
              <div className="grid-2">
                {rentProperties.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ padding: '60px 24px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', marginBottom: 8 }}>
                  No Available Leases Match Criteria
                </h3>
                <p style={{ color: 'var(--charcoal-muted)', marginBottom: 20 }}>
                  Contact our private rental advisory to discuss off-market executive leases.
                </p>
                <button className="btn btn-forest btn-sm" onClick={clear}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Sticky Inquiry Sidebar */}
          <aside className="buy-sidebar">
            <div className="card" style={{ padding: '32px 28px' }}>
              <InquiryForm
                title="Rental Request"
                inquiryType="Rent"
                onSubmitFn={submitInquiry}
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
