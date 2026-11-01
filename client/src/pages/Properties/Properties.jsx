import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, Home, ChevronRight, RotateCcw,
} from 'lucide-react';
import { properties } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Properties.css';

const TYPES      = ['Apartment', 'Villa', 'House', 'Office', 'Shop', 'Plot'];
const CATEGORIES = ['Residential', 'Commercial'];
const STATUSES   = ['Buy', 'Rent'];
const BED_OPTS   = [1, 2, 3, 4, 5, 6];

const EMPTY_FILTERS = {
  search: '', status: '', category: '', type: '',
  minPrice: '', maxPrice: '', bedrooms: '',
};

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Initialise filters from URL search params
  const [filters, setFilters] = useState(() => ({
    search:   searchParams.get('search')   || '',
    status:   searchParams.get('status')   || '',
    category: searchParams.get('category') || '',
    type:     searchParams.get('type')     || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
  }));

  const set = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));

  // Sync URL when filters change
  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  // Memoised filtering
  const filtered = useMemo(() => {
    return properties.filter(p => {
      const q = filters.search.toLowerCase();
      if (q && !p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false;
      if (filters.status   && p.status   !== filters.status)   return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.type     && p.type     !== filters.type)     return false;
      if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
      if (filters.minPrice && p.price    < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price    > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [filters]);

  // Handle SearchBar's onSearch callback
  const handleSearchBar = (sf) => {
    setFilters(prev => ({ ...prev, ...sf }));
  };

  return (
    <div className="properties-page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="page-hero properties-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Explore Listings</span>
            <h1 className="serif">All Properties</h1>
            <p>Browse our curated portfolio of luxury residential and commercial properties across the Kingdom of Saudi Arabia.</p>
            <div className="breadcrumb">
              <Home size={13} />
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span style={{ color: 'var(--accent)' }}>All Properties</span>
            </div>
          </motion.div>

          {/* Inline search bar in hero */}
          <motion.div
            className="hero-search-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchBar onSearch={handleSearchBar} />
          </motion.div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────── */}
      <section className="section properties-body">
        <div className="container">
          <div className="properties-layout">

            {/* ── Filter Panel ────────────────────────── */}
            <aside className={`filter-panel ${showFilters ? 'open' : ''}`}>
              <div className="filter-panel-header">
                <h3>Filters</h3>
                <button
                  className="filter-panel-close"
                  onClick={() => setShowFilters(false)}
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="fp-group">
                <label className="fp-label">Keyword</label>
                <div className="fp-search-wrap">
                  <Search size={15} className="fp-search-icon" />
                  <input
                    className="form-control fp-search-input"
                    placeholder="Location or title…"
                    value={filters.search}
                    onChange={e => set('search', e.target.value)}
                  />
                  {filters.search && (
                    <button type="button" className="fp-clear-field" onClick={() => set('search', '')}>
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="fp-group">
                <label className="fp-label">Status</label>
                <div className="fp-chip-group">
                  {['', ...STATUSES].map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`fp-chip ${filters.status === s ? 'active' : ''}`}
                      onClick={() => set('status', s)}
                    >
                      {s || 'All'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="fp-group">
                <label className="fp-label">Category</label>
                <div className="fp-chip-group">
                  {['', ...CATEGORIES].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`fp-chip ${filters.category === c ? 'active' : ''}`}
                      onClick={() => set('category', c)}
                    >
                      {c || 'All'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="fp-group">
                <label className="fp-label">Property Type</label>
                <div className="fp-chip-group fp-chip-group--wrap">
                  {['', ...TYPES].map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`fp-chip ${filters.type === t ? 'active' : ''}`}
                      onClick={() => set('type', t)}
                    >
                      {t || 'Any'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="fp-group">
                <label className="fp-label">Price Range (SAR)</label>
                <div className="fp-price-row">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                    value={filters.minPrice}
                    min={0}
                    onChange={e => set('minPrice', e.target.value)}
                  />
                  <span className="fp-dash">–</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    value={filters.maxPrice}
                    min={0}
                    onChange={e => set('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="fp-group">
                <label className="fp-label">Min Bedrooms</label>
                <div className="fp-chip-group">
                  {['', ...BED_OPTS].map(b => (
                    <button
                      key={b}
                      type="button"
                      className={`fp-chip fp-chip--sq ${filters.bedrooms === String(b) ? 'active' : ''}`}
                      onClick={() => set('bedrooms', String(b))}
                    >
                      {b || 'Any'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <button className="btn btn-outline w-full fp-clear-btn" onClick={clearFilters}>
                  <RotateCcw size={15} /> Clear All Filters
                </button>
              )}
            </aside>

            {/* ── Results ─────────────────────────────── */}
            <div className="properties-results">
              {/* Toolbar */}
              <div className="results-toolbar">
                <div className="results-count">
                  {hasActiveFilters ? (
                    <>
                      Showing <strong>{filtered.length}</strong> of <strong>{properties.length}</strong> properties
                    </>
                  ) : (
                    <>Showing all <strong>{properties.length}</strong> properties</>
                  )}
                </div>
                <div className="results-toolbar-right">
                  {hasActiveFilters && (
                    <button className="clear-tag" onClick={clearFilters}>
                      <RotateCcw size={13} /> Clear filters
                    </button>
                  )}
                  <button
                    className="btn btn-outline btn-sm filter-toggle-btn"
                    onClick={() => setShowFilters(v => !v)}
                    aria-expanded={showFilters}
                  >
                    <SlidersHorizontal size={15} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                </div>
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="active-chips">
                  {Object.entries(filters).map(([k, v]) => {
                    if (!v) return null;
                    const label = {
                      search: `"${v}"`, status: v, category: v, type: v,
                      minPrice: `Min SAR ${Number(v).toLocaleString()}`,
                      maxPrice: `Max SAR ${Number(v).toLocaleString()}`,
                      bedrooms: `${v}+ Beds`,
                    }[k];
                    return (
                      <button key={k} className="active-chip" onClick={() => set(k, '')}>
                        {label} <X size={11} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Grid */}
              <AnimatePresence mode="wait">
                {filtered.length > 0 ? (
                  <motion.div
                    key="grid"
                    className="grid-3 properties-grid"
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
                    transition={{ duration: 0.4 }}
                  >
                    <div className="empty-icon">🔍</div>
                    <h3>No Properties Found</h3>
                    <p>No properties match your current filters. Try adjusting your criteria or clear all filters to browse our full portfolio.</p>
                    <button className="btn btn-primary mt-4" onClick={clearFilters}>
                      <RotateCcw size={16} /> Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter overlay */}
      {showFilters && (
        <div
          className="filter-overlay"
          onClick={() => setShowFilters(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
