import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { properties } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import InquiryForm from '../../components/InquiryForm/InquiryForm';
import { submitInquiry } from '../../services/api';

const TYPES = ['Apartment', 'Villa', 'House'];

export default function Rent() {
  const [filters, setFilters] = useState({ type:'', maxPrice:'', bedrooms:'' });
  const set = (k,v) => setFilters(p => ({...p,[k]:v}));

  const rentProperties = useMemo(() => {
    let list = properties.filter(p => p.status === 'Rent');
    if (filters.type)     list = list.filter(p => p.type === filters.type);
    if (filters.bedrooms) list = list.filter(p => p.bedrooms >= Number(filters.bedrooms));
    if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice.replace(/,/g,'')));
    return list;
  }, [filters]);

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Rent Property</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>
            Discover premium rental properties across Saudi Arabia's finest neighbourhoods
          </motion.p>
          <nav className="breadcrumb"><a href="/">Home</a><span>/</span><span>Rent</span></nav>
        </div>
      </div>

      <section className="section">
        <div className="container buy-layout">
          <div>
            <div className="filter-bar">
              <h3 style={{ marginBottom:16, fontSize:'1rem' }}>Filter Rentals</h3>
              <div className="filter-grid">
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Type</label>
                  <select className="form-control" value={filters.type} onChange={e => set('type',e.target.value)}>
                    <option value="">All Types</option>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Max Price (SAR/month)</label>
                  <input className="form-control" type="text" placeholder="e.g. 20,000" value={filters.maxPrice} onChange={e => set('maxPrice',e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Bedrooms</label>
                  <select className="form-control" value={filters.bedrooms} onChange={e => set('bedrooms',e.target.value)}>
                    <option value="">Any</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
                <div className="filter-actions">
                  <button className="btn btn-outline" onClick={() => setFilters({ type:'',maxPrice:'',bedrooms:'' })}>Clear</button>
                </div>
              </div>
            </div>
            <p style={{ color:'var(--text-muted)', marginBottom:24 }}>Showing <strong>{rentProperties.length}</strong> rental properties</p>
            {rentProperties.length > 0 ? (
              <div className="grid-3">
                {rentProperties.map((p,i) => <PropertyCard key={p.id} property={p} index={i} />)}
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
                <p>No rentals match your criteria. Adjust your filters.</p>
                <button className="btn btn-outline btn-sm" style={{ marginTop:16 }} onClick={() => setFilters({ type:'',maxPrice:'',bedrooms:'' })}>Clear</button>
              </div>
            )}
          </div>
          <div className="buy-sidebar">
            <div className="card" style={{ padding:28 }}>
              <InquiryForm title="Rental Inquiry" inquiryType="Rent" onSubmitFn={submitInquiry} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
