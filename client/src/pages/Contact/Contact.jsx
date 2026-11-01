import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { submitContact } from '../../services/api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [serverMsg, setServerMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const set = (k,v) => { setForm(p=>({...p,[k]:v})); if(errors[k]) setErrors(p=>({...p,[k]:''})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.phone.trim())   e.phone   = 'Phone is required.';
    else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g,''))) e.phone = 'Enter a valid phone number.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await submitContact(form);
      setInquiryId(res.data?.inquiryId || '');
      setStatus('success');
    } catch (err) {
      const msgs = err.response?.data?.errors;
      setServerMsg(msgs?.join(' ') || err.response?.data?.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  const CONTACT_INFO = [
    { icon: MapPin, title:'Our Office', value:'Olaya District, Riyadh 12611\nSaudi Arabia' },
    { icon: Phone,  title:'Call Us',    value:'+966 11 234 5678\n+966 50 100 2001' },
    { icon: Mail,   title:'Email Us',   value:'info@aureviaestates.com\nsupport@aureviaestates.com' },
    { icon: Clock,  title:'Working Hours', value:'Sun – Thu: 9:00 AM – 6:00 PM\nFri: 9:00 AM – 12:00 PM' },
  ];

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Contact Us</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>
            We'd love to hear from you. Reach out to our team for any enquiries.
          </motion.p>
          <nav className="breadcrumb"><a href="/">Home</a><span>/</span><span>Contact</span></nav>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Contact cards */}
          <div className="contact-cards">
            {CONTACT_INFO.map((item,i) => (
              <motion.div key={i} className="contact-info-card"
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <div className="contact-icon"><item.icon size={22} /></div>
                <h3>{item.title}</h3>
                <p style={{ whiteSpace:'pre-line' }}>{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Form + Map layout */}
          <div className="contact-layout">
            <motion.div className="contact-form-wrap"
              initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <div className="card" style={{ padding:36 }}>
                <h2 style={{ marginBottom:6 }}>Send Us a Message</h2>
                <p style={{ color:'var(--text-muted)', marginBottom:28 }}>Fill out the form below and we'll respond within 24 hours.</p>

                {status === 'success' && (
                  <div className="alert alert-success" style={{ flexDirection:'column', alignItems:'center', textAlign:'center', padding:'32px' }}>
                    <CheckCircle size={40} color="#1a7a42" style={{ marginBottom:12 }} />
                    <h3 style={{ color:'#1a7a42' }}>Message Sent!</h3>
                    <p style={{ margin:'8px 0' }}>Thank you for contacting us. We'll be in touch shortly.</p>
                    {inquiryId && <p><strong>Reference: {inquiryId}</strong></p>}
                    <button className="btn btn-primary btn-sm" style={{ marginTop:16 }} onClick={() => { setStatus(null); setForm({ name:'',phone:'',email:'',subject:'',message:'' }); }}>Send Another</button>
                  </div>
                )}

                {status !== 'success' && (
                  <form onSubmit={handleSubmit} noValidate>
                    {status === 'error' && <div className="alert alert-error"><AlertCircle size={16} />{serverMsg}</div>}
                    <div className="grid-2" style={{ gap:16 }}>
                      <div className="form-group">
                        <label className="form-label">Full Name <span className="req">*</span></label>
                        <input className={`form-control ${errors.name?'error':''}`} type="text" placeholder="Your full name" value={form.name} onChange={e => set('name',e.target.value)} />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone <span className="req">*</span></label>
                        <input className={`form-control ${errors.phone?'error':''}`} type="tel" inputMode="numeric" placeholder="+966 5X XXX XXXX" value={form.phone} onChange={e => set('phone',e.target.value.replace(/[^0-9+\s]/g,''))} />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span className="req">*</span></label>
                      <input className={`form-control ${errors.email?'error':''}`} type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email',e.target.value)} />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input className="form-control" type="text" placeholder="What is this regarding?" value={form.subject} onChange={e => set('subject',e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message <span className="req">*</span></label>
                      <textarea className={`form-control ${errors.message?'error':''}`} rows={5} placeholder="How can we help you?" value={form.message} onChange={e => set('message',e.target.value)} />
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-full" style={{ justifyContent:'center' }} disabled={status==='loading'}>
                      {status==='loading' ? <><span className="spinner" /> Sending…</> : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div className="contact-map"
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <div className="map-placeholder">
                <MapPin size={48} color="var(--primary)" />
                <h3>Aurevia Estates</h3>
                <p>Olaya District, Riyadh 12611<br />Saudi Arabia</p>
                <a href="https://maps.google.com/?q=Olaya+Riyadh+Saudi+Arabia" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ marginTop:16 }}>Open in Google Maps</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
