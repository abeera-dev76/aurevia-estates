import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { submitContact } from '../../services/api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
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
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid phone number (7–15 digits).';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message content is required.';
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
      const res = await submitContact(form);
      setInquiryId(res.data?.inquiryId || '');
      setStatus('success');
    } catch (err) {
      const msgs = err.response?.data?.errors;
      setServerMsg(msgs?.join(' ') || err.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const CONTACT_INFO = [
    {
      icon: MapPin,
      title: 'Riyadh Flagship',
      value: 'Al Olaya Towers, Level 28\nKing Fahd Road, Riyadh 12213',
    },
    {
      icon: MapPin,
      title: 'Jeddah Gallery',
      value: 'Corniche Promenade, Al Shati\nJeddah 23414, Saudi Arabia',
    },
    {
      icon: Phone,
      title: 'VIP Concierge Desk',
      value: '+966 11 234 5678\n+966 50 100 2001 (WhatsApp VIP)',
    },
    {
      icon: Clock,
      title: 'Advisory Hours',
      value: 'Sun – Thu: 9:00 AM – 7:00 PM\nPrivate viewings by appointment',
    },
  ];

  return (
    <div className="contact-page">
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Private Client Concierge</span>
            <h1 className="serif">Initiate Confidential Counsel</h1>
            <p>
              Connect with our senior partners in Riyadh and Jeddah for bespoke acquisitions, valuations, and private advisory.
            </p>
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--champagne-gold)' }}>Contact</span>
            </nav>
          </motion.div>
        </div>
      </div>

      <section className="section bg-ivory">
        <div className="container">
          {/* Contact Cards Grid */}
          <div className="contact-cards">
            {CONTACT_INFO.map((c, i) => (
              <motion.div
                key={i}
                className="card contact-info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="contact-icon">
                  <c.icon size={22} />
                </div>
                <h3>{c.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{c.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Form & Map Layout */}
          <div className="contact-layout">
            {/* Form */}
            <div className="card" style={{ padding: '44px 38px', border: '1px solid rgba(197, 164, 109, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', fontSize: '1.45rem' }}>
                  Send a Confidential Message
                </h2>
                <ShieldCheck size={24} color="var(--champagne-gold)" />
              </div>

              {status === 'success' ? (
                <div className="alert alert-success" style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '40px 24px',
                  background: '#FAF8F4',
                }}>
                  <CheckCircle size={40} color="#C5A46D" style={{ marginBottom: 16 }} />
                  <h3 style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', marginBottom: 8 }}>
                    Message Dispatched
                  </h3>
                  <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Thank you. Your inquiry has been routed to our Senior Partners. An advisor will respond within 24 hours.
                  </p>
                  {inquiryId && (
                    <div style={{
                      marginTop: 16,
                      padding: '8px 18px',
                      background: 'var(--white)',
                      border: '1px dashed var(--champagne-gold)',
                      fontSize: '0.82rem',
                      color: 'var(--forest-green)',
                      letterSpacing: '0.08em',
                    }}>
                      TRACKING REF: <strong>{inquiryId}</strong>
                    </div>
                  )}
                  <button
                    className="btn btn-forest btn-sm"
                    style={{ marginTop: 24 }}
                    onClick={() => {
                      setStatus(null);
                      setForm({ name: '', phone: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {status === 'error' && (
                    <div className="alert alert-error" style={{ marginBottom: 24 }}>
                      <AlertCircle size={18} />
                      <span>{serverMsg}</span>
                    </div>
                  )}

                  <div className="grid-2" style={{ gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Full Name <span className="req">*</span></label>
                      <input
                        className={`form-control ${errors.name ? 'error' : ''}`}
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
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

                  <div className="grid-2" style={{ gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Email Address <span className="req">*</span></label>
                      <input
                        className={`form-control ${errors.email ? 'error' : ''}`}
                        type="email"
                        placeholder="name@domain.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject of Counsel</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="e.g. Acquisition Inquiry, Portfolio Advisory"
                        value={form.subject}
                        onChange={e => set('subject', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confidential Brief <span className="req">*</span></label>
                    <textarea
                      className={`form-control ${errors.message ? 'error' : ''}`}
                      rows={5}
                      placeholder="Share your investment timeline, target districts, or property requirements…"
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold btn-lg w-full"
                    disabled={status === 'loading'}
                    style={{ justifyContent: 'center', marginTop: 10 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="spinner" />
                        <span>Transmitting Message…</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Office Presence Card */}
            <div className="card contact-map">
              <div className="map-placeholder">
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(20, 37, 31, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--champagne-gold)',
                  marginBottom: 18,
                  border: '1px solid rgba(197, 164, 109, 0.4)',
                }}>
                  <MapPin size={28} />
                </div>

                <span className="section-label" style={{ marginBottom: 8 }}>Kingdom Presence</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', fontSize: '1.3rem', marginBottom: 10 }}>
                  Riyadh & Jeddah Galleries
                </h3>
                <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 320, marginBottom: 24 }}>
                  Our private client suites are situated in the diplomatic and financial cores of Riyadh and Jeddah, providing total privacy for transaction negotiations.
                </p>

                <div style={{ width: '100%', borderTop: '1px solid rgba(197, 164, 109, 0.25)', paddingTop: 20 }}>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-forest btn-sm w-full"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>View Riyadh HQ Map</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
