import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, ShieldCheck, Award, Users, FileCheck, ArrowRight, Sparkles } from 'lucide-react';
import { sellProperty } from '../../services/api';
import './Sell.css';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'House', 'Office', 'Shop', 'Plot', 'Compound', 'Other'];

export default function Sell() {
  const [form, setForm] = useState({
    ownerName: '',
    phone: '',
    email: '',
    propertyTitle: '',
    propertyType: '',
    location: '',
    expectedPrice: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.ownerName.trim()) e.ownerName = 'Owner / representative name is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid phone (7–15 digits).';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.propertyTitle.trim()) e.propertyTitle = 'Property title or description is required.';
    if (!form.location.trim()) e.location = 'Location / District is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    try {
      const res = await sellProperty(form);
      setInquiryId(res.data?.inquiryId || '');
      setStatus('success');
    } catch (err) {
      const msgs = err.response?.data?.errors;
      setServerMsg(msgs?.join(' ') || err.response?.data?.message || 'Unable to submit listing. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="sell-page">
        <div className="page-hero">
          <div className="container">
            <h1 className="serif">List With Aurevia</h1>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Property Listed</span>
            </nav>
          </div>
        </div>

        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', background: 'var(--ivory)' }}>
          <div className="card" style={{ maxWidth: 540, padding: '48px 36px', textAlign: 'center', border: '1px solid rgba(197, 164, 109, 0.4)' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(20, 37, 31, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <CheckCircle size={36} color="#C5A46D" />
            </div>
            <h2 style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', marginBottom: 12 }}>
              Dossier Received
            </h2>
            <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 20 }}>
              Thank you for listing your property with Aurevia Estates. Our Senior Partner for Acquisitions will review your asset and reach out discreetly within 24 hours.
            </p>
            {inquiryId && (
              <div style={{
                padding: '10px 18px',
                background: 'var(--ivory)',
                border: '1px dashed var(--champagne-gold)',
                fontSize: '0.85rem',
                color: 'var(--forest-green)',
                letterSpacing: '0.08em',
                marginBottom: 24,
              }}>
                LISTING REFERENCE: <strong>{inquiryId}</strong>
              </div>
            )}
            <button
              className="btn btn-forest"
              onClick={() => {
                setStatus(null);
                setForm({
                  ownerName: '',
                  phone: '',
                  email: '',
                  propertyTitle: '',
                  propertyType: '',
                  location: '',
                  expectedPrice: '',
                  description: '',
                });
              }}
            >
              List Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-page">
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Private Representation</span>
            <h1 className="serif">List Your Estate with Aurevia</h1>
            <p>
              Entrust your high-value property to the Kingdom's premier luxury brokerage. Maximum market valuation, discreet exposure, and verified qualified buyers.
            </p>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Sell Property</span>
            </nav>
          </motion.div>
        </div>
      </div>

      <section className="section bg-ivory">
        <div className="container sell-layout">
          {/* Main Form */}
          <div className="sell-form-card card" style={{ padding: '40px 36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', marginBottom: 4 }}>
                  Property Valuation & Listing Dossier
                </h2>
                <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-muted)' }}>
                  Provide initial details. Our private acquisitions desk will prepare a confidential market appraisal.
                </p>
              </div>
              <ShieldCheck size={28} color="var(--champagne-gold)" style={{ flexShrink: 0 }} />
            </div>

            {status === 'error' && (
              <div className="alert alert-error" style={{ marginBottom: 24 }}>
                <AlertCircle size={18} />
                <span>{serverMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <h4 className="form-section-title">Owner & Contact Details</h4>

              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name / Legal Entity <span className="req">*</span></label>
                  <input
                    className={`form-control ${errors.ownerName ? 'error' : ''}`}
                    type="text"
                    placeholder="Owner or Authorized Representative"
                    value={form.ownerName}
                    onChange={e => set('ownerName', e.target.value)}
                  />
                  {errors.ownerName && <p className="form-error">{errors.ownerName}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Telephone <span className="req">*</span></label>
                  <input
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    type="tel"
                    inputMode="numeric"
                    placeholder="+966 5X XXX XXXX"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value.replace(/[^0-9+\s]/g, ''))}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address <span className="req">*</span></label>
                <input
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  type="email"
                  placeholder="contact@domain.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <h4 className="form-section-title" style={{ marginTop: 28 }}>Property Specifications</h4>

              <div className="form-group">
                <label className="form-label">Property Title / Name <span className="req">*</span></label>
                <input
                  className={`form-control ${errors.propertyTitle ? 'error' : ''}`}
                  type="text"
                  placeholder="e.g. Contemporary Luxury Villa in Al Hada"
                  value={form.propertyTitle}
                  onChange={e => set('propertyTitle', e.target.value)}
                />
                {errors.propertyTitle && <p className="form-error">{errors.propertyTitle}</p>}
              </div>

              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    className="form-control"
                    value={form.propertyType}
                    onChange={e => set('propertyType', e.target.value)}
                  >
                    <option value="">Select Property Type</option>
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Location / District <span className="req">*</span></label>
                  <input
                    className={`form-control ${errors.location ? 'error' : ''}`}
                    type="text"
                    placeholder="City, District, Landmark"
                    value={form.location}
                    onChange={e => set('location', e.target.value)}
                  />
                  {errors.location && <p className="form-error">{errors.location}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Expected Valuation / Price (SAR)</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="e.g. 15,000,000 (Optional or On Request)"
                  value={form.expectedPrice}
                  onChange={e => set('expectedPrice', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Architectural Highlights & Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Detail the layout, plot area, finishes, year built, and any unique architectural elements…"
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold btn-lg w-full"
                disabled={status === 'loading'}
                style={{ justifyContent: 'center', marginTop: 12 }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner" />
                    <span>Transmitting Dossier…</span>
                  </>
                ) : (
                  <>
                    <span>Submit Private Listing Request</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="sell-sidebar">
            <div className="card info-card" style={{ marginBottom: 24, padding: '30px 24px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', fontSize: '1.2rem', marginBottom: 16 }}>
                The Aurevia Privilege
              </h3>
              <div className="why-item">
                <Award size={18} color="var(--champagne-gold)" style={{ flexShrink: 0 }} />
                <span>Verified High-Net-Worth Buyer Base</span>
              </div>
              <div className="why-item">
                <ShieldCheck size={18} color="var(--champagne-gold)" style={{ flexShrink: 0 }} />
                <span>Strict Non-Disclosure & Off-Market Discretion</span>
              </div>
              <div className="why-item">
                <Sparkles size={18} color="var(--champagne-gold)" style={{ flexShrink: 0 }} />
                <span>Architectural Drone & Cinematic Staging</span>
              </div>
              <div className="why-item">
                <FileCheck size={18} color="var(--champagne-gold)" style={{ flexShrink: 0 }} />
                <span>REGA Certified Conveyance & Legal Oversight</span>
              </div>
            </div>

            <div className="card info-card" style={{ padding: '30px 24px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', fontSize: '1.2rem', marginBottom: 16 }}>
                Listing Protocol
              </h3>
              <div className="sell-step">
                <div className="step-num">1</div>
                <div>
                  <strong>Confidential Appraisal</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>Comparative valuation within 24h</div>
                </div>
              </div>
              <div className="sell-step">
                <div className="step-num">2</div>
                <div>
                  <strong>Staging & Media Production</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>High-res photography & floor plans</div>
                </div>
              </div>
              <div className="sell-step">
                <div className="step-num">3</div>
                <div>
                  <strong>Targeted Representation</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>Direct presentation to vetted buyers</div>
                </div>
              </div>
              <div className="sell-step">
                <div className="step-num">4</div>
                <div>
                  <strong>Closing & Handover</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>Escrow closing and deed transfer</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
