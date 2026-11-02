import { useState } from 'react';
import { Search, SlidersHorizontal, X, MapPin, Building, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const TYPES = ['Apartment', 'Villa', 'House', 'Office', 'Shop', 'Plot'];

export default function SearchBar({ onSearch, compact = false }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const set = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      navigate(`/properties?${params.toString()}`);
    }
  };

  const clear = () => {
    const empty = { search: '', status: '', category: '', type: '', minPrice: '', maxPrice: '', bedrooms: '' };
    setFilters(empty);
    if (onSearch) onSearch(empty);
  };

  const hasActive = Object.values(filters).some(Boolean);

  return (
    <form className={`luxury-search-form ${compact ? 'compact' : ''}`} onSubmit={handleSearch}>
      {/* Search Mode Tabs */}
      {!compact && (
        <div className="luxury-search-tabs">
          {[
            { val: '', label: 'All Portfolio' },
            { val: 'Buy', label: 'For Sale' },
            { val: 'Rent', label: 'For Lease' },
          ].map(tab => (
            <button
              key={tab.val}
              type="button"
              className={`luxury-tab ${filters.status === tab.val ? 'active' : ''}`}
              onClick={() => set('status', tab.val)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Inputs Bar */}
      <div className="luxury-search-fields">
        {/* Location / Keyword */}
        <div className="search-field-item field-keyword">
          <div className="field-icon-wrap"><MapPin size={16} /></div>
          <div className="field-input-wrap">
            <span className="field-label">Location / Landmark</span>
            <input
              type="text"
              placeholder="e.g. Al Malqa, Riyadh, Jeddah Corniche…"
              value={filters.search}
              onChange={e => set('search', e.target.value)}
            />
          </div>
        </div>

        {!compact && (
          <>
            {/* Category */}
            <div className="search-field-item">
              <div className="field-icon-wrap"><Building size={16} /></div>
              <div className="field-input-wrap">
                <span className="field-label">Category</span>
                <select value={filters.category} onChange={e => set('category', e.target.value)}>
                  <option value="">Residential & Commercial</option>
                  <option value="Residential">Residential Only</option>
                  <option value="Commercial">Commercial Only</option>
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="search-field-item">
              <div className="field-input-wrap">
                <span className="field-label">Estate Type</span>
                <select value={filters.type} onChange={e => set('type', e.target.value)}>
                  <option value="">All Types (Villa, Penthouse…)</option>
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="search-field-item field-small">
              <div className="field-input-wrap">
                <span className="field-label">Bedrooms</span>
                <select value={filters.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
                  <option value="">Any Beds</option>
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Action Button */}
        <div className="search-action-wrap">
          <button type="submit" className="btn btn-gold luxury-search-btn">
            <Search size={15} />
            <span>Search</span>
          </button>
          {hasActive && (
            <button type="button" className="luxury-clear-btn" onClick={clear} title="Clear Filters">
              <X size={15} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
