import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { properties, formatPrice } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import InquiryForm from '../../components/InquiryForm/InquiryForm';
import { submitInquiry } from '../../services/api';
import './Buy.css';

const TYPES = ['Apartment', 'Villa', 'House', 'Plot'];

export default function Buy() {
  const [filters, setFilters] = useState({ type:'', minPrice:'', maxPrice:'', bedrooms:'' });
  const set = (k,v) => setFilters(p => ({...p,[k]:v}));

  const buyProperties = useMemo(() => {
    let list = properties.filter(p => p.status === 'Buy');
    if (filters.type)     list = list.filter(p => p.type === filters.type);
    if (filters.bedrooms) list = list.filter(p => p.bedrooms >= Number(filters.bedrooms));
    if (filters.minPrice) list = list.filter(p => p.price >= Number(filters.minPrice.replace(/,/g,'')));
    if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice.replace(/,/g,'')));
    return list;
  }, [filters]);

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Buy Property</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>
            Find your perfect home or investment from our premium portfolio of properties for sale
          </motion.p>
          <nav className="breadcrumb"><a href="/">Home</a><span>/</span><span>Buy</span></nav>
        </div>
      </div>

      <section className="section">
        <div className="container buy-layout">
          <div className="buy-main">
            {/* Filter bar */}
            <div className="filter-bar">
              <h3 style={{ marginBottom:16, fontSize:'1rem' }}>Filter Properties</h3>
              <div className="filter-grid">
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Property Type</label>
                  <select className="form-control" value={filters.type} onChange={e => set('type',e.target.value)}>
                    <option value="">All Types</option>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Min Price (SAR)</label>
                  <input className="form-control" type="text" placeholder="e.g. 1,000,000" value={filters.minPrice} onChange={e => set('minPrice',e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Max Price (SAR)</label>
                  <input className="form-control" type="text" placeholder="e.g. 5,000,000" value={filters.maxPrice} onChange={e => set('maxPrice',e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Bedrooms</label>
                  <select className="form-control" value={filters.bedrooms} onChange={e => set('bedrooms',e.target.value)}>
                    <option value="">Any</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
                <div className="filter-actions">
                  <button className="btn btn-outline" onClick={() => setFilters({ type:'',minPrice:'',maxPrice:'',bedrooms:'' })}>Clear</button>
                </div>
              </div>
            </div>

            <p style={{ color:'var(--text-muted)', marginBottom:24 }}>Showing <strong>{buyProperties.length}</strong> properties for sale</p>

            {buyProperties.length > 0 ? (
              <div className="grid-3">
                {buyProperties.map((p,i) => <PropertyCard key={p.id} property={p} index={i} />)}
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
                <p>No properties match your filters. Try adjusting your search criteria.</p>
                <button className="btn btn-outline btn-sm" style={{ marginTop:16 }} onClick={() => setFilters({ type:'',minPrice:'',maxPrice:'',bedrooms:'' })}>Clear Filters</button>
              </div>
            )}
          </div>

          {/* Sidebar inquiry */}
          <div className="buy-sidebar">
            <div className="card" style={{ padding:28 }}>
              <InquiryForm title="Buying Inquiry" inquiryType="Buy" onSubmitFn={submitInquiry} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
