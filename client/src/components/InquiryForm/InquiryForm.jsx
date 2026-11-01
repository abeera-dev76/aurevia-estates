import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function InquiryForm({
  title = 'Send an Inquiry',
  inquiryType = 'General Inquiry',
  propertyId = '',
  propertyTitle = '',
  onSubmitFn,
  extraFields = null,
}) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', location:'', message:'' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const set = (k, v) => { setForm(p => ({...p, [k]: v})); if (errors[k]) setErrors(p => ({...p, [k]: ''})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required.';
    if (!form.phone.trim()) e.phone = 'Phone is required.';
    else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g,''))) e.phone = 'Enter a valid phone number (7–15 digits).';
    if (!form.email.trim()) e.email = 'Email is required.';
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
      const payload = { ...form, inquiryType, propertyId, propertyTitle };
      const res = await onSubmitFn(payload);
      setInquiryId(res.data?.inquiryId || '');
      setStatus('success');
      setForm({ name:'', phone:'', email:'', location:'', message:'' });
    } catch (err) {
      const msgs = err.response?.data?.errors;
      if (msgs?.length) setServerMsg(msgs.join(' '));
      else setServerMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="alert alert-success" style={{ flexDirection:'column', alignItems:'center', textAlign:'center', padding:'32px' }}>
      <CheckCircle size={40} color="#1a7a42" style={{ marginBottom:12 }} />
      <h3 style={{ color:'#1a7a42', marginBottom:8 }}>Inquiry Submitted!</h3>
      <p>Thank you! Your inquiry has been received.</p>
      {inquiryId && <p style={{ marginTop:8, fontWeight:600 }}>Reference: <strong>{inquiryId}</strong></p>}
      <button className="btn btn-primary btn-sm" style={{ marginTop:20 }} onClick={() => setStatus(null)}>Submit Another</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 style={{ marginBottom:24, color:'var(--primary)' }}>{title}</h3>

      {status === 'error' && (
        <div className="alert alert-error">
          <AlertCircle size={18} /> {serverMsg}
        </div>
      )}

      {extraFields}

      <div className="grid-2" style={{ gap:16 }}>
        <div className="form-group">
          <label className="form-label">Full Name <span className="req">*</span></label>
          <input className={`form-control ${errors.name ? 'error' : ''}`}
            type="text" placeholder="Your full name" value={form.name}
            onChange={e => set('name', e.target.value)} />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number <span className="req">*</span></label>
          <input className={`form-control ${errors.phone ? 'error' : ''}`}
            type="tel" inputMode="numeric" placeholder="+966 5X XXX XXXX" value={form.phone}
            onChange={e => set('phone', e.target.value.replace(/[^0-9+\s]/g,''))} />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Email Address <span className="req">*</span></label>
        <input className={`form-control ${errors.email ? 'error' : ''}`}
          type="email" placeholder="your@email.com" value={form.email}
          onChange={e => set('email', e.target.value)} />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      {inquiryType !== 'General Inquiry' && (
        <div className="form-group">
          <label className="form-label">Preferred Location</label>
          <input className="form-control" type="text" placeholder="City, District…" value={form.location}
            onChange={e => set('location', e.target.value)} />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Message <span className="req">*</span></label>
        <textarea className={`form-control ${errors.message ? 'error' : ''}`}
          rows={4} placeholder="Tell us what you're looking for…" value={form.message}
          onChange={e => set('message', e.target.value)} />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={status === 'loading'}
        style={{ justifyContent:'center' }}>
        {status === 'loading' ? <><span className="spinner" /> Sending…</> : 'Send Inquiry'}
      </button>
    </form>
  );
}
