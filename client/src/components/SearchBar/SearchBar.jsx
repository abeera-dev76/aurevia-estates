import { useState } from 'react';
import { properties as allProperties } from '../../data/index';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const TYPES = ['Apartment', 'Villa', 'House', 'Office', 'Shop', 'Plot'];

export default function SearchBar({ onSearch, compact = false }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '', status: '', category: '', type: '', minPrice: '', maxPrice: '', bedrooms: '',
  });

  const set = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      navigate(`/properties?${params.toString()}`);
    }
  };

  const clear = () => {
    const empty = { search:'', status:'', category:'', type:'', minPrice:'', maxPrice:'', bedrooms:'' };
    setFilters(empty);
    if (onSearch) onSearch(empty);
  };

  return (
    <form className={`search-bar-form ${compact ? 'compact' : ''}`} onSubmit={handleSearch}>
      {/* Tab selector */}
      {!compact && (
        <div className="search-tabs">
          {['', 'Buy', 'Rent'].map(v => (
            <button
              key={v} type="button"
              className={`search-tab ${filters.status === v ? 'active' : ''}`}
              onClick={() => set('status', v)}
            >
              {v || 'All'}
            </button>
          ))}
        </div>
      )}

      <div className="search-fields">
        {/* Keyword */}
        <div className="search-field search-keyword">
          <Search size={16} className="field-icon" />
          <input
            type="text"
            placeholder="Search location or property…"
            value={filters.search}
            onChange={e => set('search', e.target.value)}
          />
        </div>

        {!compact && (
          <>
            <select value={filters.status} onChange={e => set('status', e.target.value)}>
              <option value="">Buy / Rent</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>
            <select value={filters.category} onChange={e => set('category', e.target.value)}>
              <option value="">Category</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <select value={filters.type} onChange={e => set('type', e.target.value)}>
              <option value="">Property Type</option>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={filters.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
              <option value="">Bedrooms</option>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}+</option>)}
            </select>
          </>
        )}

        <button type="submit" className="btn btn-primary search-submit">
          <Search size={16} /> Search
        </button>
        {(Object.values(filters).some(Boolean)) && (
          <button type="button" className="btn btn-outline search-clear" onClick={clear}>
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
}
