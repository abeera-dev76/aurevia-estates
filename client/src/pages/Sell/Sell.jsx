import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { sellProperty } from '../../services/api';
import './Sell.css';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'House', 'Office', 'Shop', 'Plot', 'Other'];

export default function Sell() {
  const [form, setForm] = useState({
    ownerName:'', phone:'', email:'', propertyTitle:'', propertyType:'', location:'',
    expectedPrice:'', description:'', imageFiles: null,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [serverMsg, setServerMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const set = (k, v) => { setForm(p => ({...p, [k]:v})); if (errors[k]) setErrors(p => ({...p, [k]:''})); };

  const validate = () => {
    const e = {};
    if (!form.ownerName.trim())     e.ownerName     = 'Owner name is required.';
    if (!form.phone.trim())          e.phone          = 'Phone is required.';
    else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g,''))) e.phone = 'Enter a valid phone (7–15 digits).';
    if (!form.email.trim())          e.email          = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.propertyTitle.trim())  e.propertyTitle  = 'Property title is required.';
    if (!form.location.trim())       e.location       = 'Location is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const { imageFiles, ...payload } = form;
      const res = await sellProperty(payload);
      setInquiryId(res.data?.inquiryId || '');
      setStatus('success');
    } catch (err) {
      const msgs = err.response?.data?.errors;
      setServerMsg(msgs?.join(' ') || err.response?.data?.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div className="alert alert-success" style={{ flexDirection:'column', alignItems:'center', textAlign:'center', padding:'48px', maxWidth:500 }}>
        <CheckCircle size={48} color="#1a7a42" style={{ marginBottom:16 }} />
        <h2 style={{ color:'#1a7a42', marginBottom:8 }}>Request Received!</h2>
        <p>Thank you for listing your property with Aurevia Estates. Our team will contact you within 24 hours.</p>
        {inquiryId && <p style={{ marginTop:12, fontWeight:600 }}>Reference ID: <strong>{inquiryId}</strong></p>}
        <button className="btn btn-primary btn-sm" style={{ marginTop:24 }} onClick={() => { setStatus(null); setForm({ ownerName:'', phone:'', email:'', propertyTitle:'', propertyType:'', location:'', expectedPrice:'', description:'', imageFiles:null }); }}>
          Submit Another Property
        </button>
      </div>
    </div>
  );

  return (
    <div className="sell-page">
      <div className="page-hero">
        <div className="container">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Sell Your Property</motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            List your property with Aurevia Estates and reach thousands of qualified buyers
          </motion.p>
          <nav className="breadcrumb"><a href="/">Home</a><span>/</span><span>Sell Property</span></nav>
        </div>
      </div>

      <section className="section">
        <div className="container sell-layout">
          {/* Form */}
          <motion.div className="sell-form-wrap" initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.2}}>
            <div className="card" style={{ padding:36 }}>
              <h2 style={{ marginBottom:8 }}>Property Listing Form</h2>
              <p style={{ color:'var(--text-muted)', marginBottom:28 }}>Fill in the details below and our team will be in touch.</p>

              {status === 'error' && (
                <div className="alert alert-error"><AlertCircle size={16} />{serverMsg}</div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <h3 className="form-section-title">Owner Information</h3>
                <div className="grid-2" style={{ gap:16 }}>
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="req">*</span></label>
                    <input className={`form-control ${errors.ownerName?'error':''}`} type="text" placeholder="Owner full name" value={form.ownerName} onChange={e => set('ownerName',e.target.value)} />
                    {errors.ownerName && <p className="form-error">{errors.ownerName}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="req">*</span></label>
                    <input className={`form-control ${errors.phone?'error':''}`} type="tel" inputMode="numeric" placeholder="+966 5X XXX XXXX" value={form.phone} onChange={e => set('phone',e.target.value.replace(/[^0-9+\s]/g,''))} />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address <span className="req">*</span></label>
                  <input className={`form-control ${errors.email?'error':''}`} type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email',e.target.value)} />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <h3 className="form-section-title" style={{ marginTop:24 }}>Property Information</h3>
                <div className="form-group">
                  <label className="form-label">Property Title <span className="req">*</span></label>
                  <input className={`form-control ${errors.propertyTitle?'error':''}`} type="text" placeholder="e.g. 4-Bedroom Villa in Al Yasmin" value={form.propertyTitle} onChange={e => set('propertyTitle',e.target.value)} />
                  {errors.propertyTitle && <p className="form-error">{errors.propertyTitle}</p>}
                </div>
                <div className="grid-2" style={{ gap:16 }}>
                  <div className="form-group">
                    <label className="form-label">Property Type</label>
                    <select className="form-control" value={form.propertyType} onChange={e => set('propertyType',e.target.value)}>
                      <option value="">Select type…</option>
                      {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expected Price (SAR)</label>
                    <input className="form-control" type="text" placeholder="e.g. 2,500,000" value={form.expectedPrice} onChange={e => set('expectedPrice',e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Property Location <span className="req">*</span></label>
                  <input className={`form-control ${errors.location?'error':''}`} type="text" placeholder="District, City" value={form.location} onChange={e => set('location',e.target.value)} />
                  {errors.location && <p className="form-error">{errors.location}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Property Description</label>
                  <textarea className="form-control" rows={4} placeholder="Describe your property, key features, condition…" value={form.description} onChange={e => set('description',e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Property Images <span className="form-hint" style={{ fontWeight:400 }}>(optional — attach when meeting our team)</span></label>
                  <div className="upload-area">
                    <Upload size={24} color="var(--text-muted)" />
                    <p>Images are collected during our on-site visit. You may note any relevant details in the description above.</p>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" style={{ justifyContent:'center' }} disabled={status==='loading'}>
                  {status==='loading' ? <><span className="spinner" /> Submitting…</> : 'Submit Property Listing'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info sidebar */}
          <motion.div className="sell-info" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.3}}>
            <div className="info-card">
              <h3>How It Works</h3>
              {['Submit your property details', 'Our team evaluates and contacts you', 'We schedule a property inspection', 'We list on our premium platform', 'Connect with qualified buyers'].map((step, i) => (
                <div key={i} className="sell-step">
                  <div className="step-num">{i+1}</div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="info-card" style={{ marginTop:20 }}>
              <h3>Why Sell With Us?</h3>
              {['Access to thousands of qualified buyers', 'Professional photography & marketing', 'Expert pricing and negotiation', 'Legal and documentation support', 'No upfront fees'].map((item, i) => (
                <div key={i} className="why-item"><CheckCircle size={15} color="var(--primary)" /><span>{item}</span></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
