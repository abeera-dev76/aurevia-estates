import { useState } from 'react';
import { CheckCircle, AlertCircle, ShieldCheck, Send } from 'lucide-react';

export default function InquiryForm({
  title = 'Private Inquiry',
  inquiryType = 'General Inquiry',
  propertyId = '',
  propertyTitle = '',
  onSubmitFn,
  extraFields = null,
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', message: '', preferredDate: '' });
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
    if (!form.message.trim()) e.message = 'Please provide details on your requirements.';
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
      const payload = { ...form, inquiryType, propertyId, propertyTitle };
      const res = await onSubmitFn(payload);
      setInquiryId(res.data?.inquiryId || '');
      setStatus('success');
      setForm({ name: '', phone: '', email: '', location: '', message: '', preferredDate: '' });
    } catch (err) {
      const msgs = err.response?.data?.errors;
      if (msgs?.length) setServerMsg(msgs.join(' '));
      else setServerMsg(err.response?.data?.message || 'Unable to submit inquiry. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="alert alert-success" style={{
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        background: '#FAF8F4',
        border: '1px solid rgba(197, 164, 109, 0.45)',
        borderRadius: 'var(--radius-xs)',
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(20, 37, 31, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <CheckCircle size={32} color="#C5A46D" />
        </div>
        <h3 style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', marginBottom: 8, fontSize: '1.4rem' }}>
          Inquiry Successfully Lodged
        </h3>
        <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.92rem', maxWidth: 420, lineHeight: 1.6 }}>
          Thank you. Your dossier has been delivered to our Private Clients Desk. A senior advisor will contact you discreetly within 24 hours.
        </p>
        {inquiryId && (
          <div style={{
            marginTop: 18,
            padding: '8px 18px',
            background: 'var(--white)',
            border: '1px dashed var(--champagne-gold)',
            fontSize: '0.82rem',
            color: 'var(--forest-green)',
            letterSpacing: '0.08em',
          }}>
            DOSSIER REF: <strong>{inquiryId}</strong>
          </div>
        )}
        <button
          className="btn btn-forest btn-sm"
          style={{ marginTop: 24 }}
          onClick={() => setStatus(null)}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="luxury-inquiry-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>
          {title}
        </h3>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.7rem', color: 'var(--champagne-gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
          <ShieldCheck size={13} /> Confidential
        </span>
      </div>

      {status === 'error' && (
        <div className="alert alert-error" style={{ marginBottom: 20 }}>
          <AlertCircle size={18} />
          <span>{serverMsg}</span>
        </div>
      )}

      {extraFields}

      {inquiryType === 'Property Visit' && (
        <div className="form-group">
          <label className="form-label">Preferred Viewing Date</label>
          <input
            className="form-control"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={form.preferredDate}
            onChange={e => set('preferredDate', e.target.value)}
          />
        </div>
      )}

      <div className="grid-2" style={{ gap: 16 }}>
        <div className="form-group">
          <label className="form-label">Full Name <span className="req">*</span></label>
          <input
            className={`form-control ${errors.name ? 'error' : ''}`}
            type="text"
            placeholder="e.g. Sheikh Faisal Al-Saud"
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

      <div className="form-group">
        <label className="form-label">Email Address <span className="req">*</span></label>
        <input
          className={`form-control ${errors.email ? 'error' : ''}`}
          type="email"
          placeholder="faisal@example.com"
          value={form.email}
          onChange={e => set('email', e.target.value)}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      {inquiryType !== 'General Inquiry' && inquiryType !== 'Property Visit' && (
        <div className="form-group">
          <label className="form-label">Preferred Location / District</label>
          <input
            className="form-control"
            type="text"
            placeholder="e.g. Al Hada, Diplomatic Quarter, Al Nakheel…"
            value={form.location}
            onChange={e => set('location', e.target.value)}
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Requirements / Message <span className="req">*</span></label>
        <textarea
          className={`form-control ${errors.message ? 'error' : ''}`}
          rows={4}
          placeholder="Describe your desired timeline, budget expectations, or bespoke requirements…"
          value={form.message}
          onChange={e => set('message', e.target.value)}
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="btn btn-gold w-full"
        disabled={status === 'loading'}
        style={{ justifyContent: 'center', marginTop: 10 }}
      >
        {status === 'loading' ? (
          <>
            <span className="spinner" />
            <span>Transmitting Dossier…</span>
          </>
        ) : (
          <>
            <span>Submit Confidential Inquiry</span>
            <Send size={14} />
          </>
        )}
      </button>

      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-muted)', letterSpacing: '0.04em' }}>
          Guaranteed privacy under strict non-disclosure advisory protocol.
        </span>
      </div>
    </form>
  );
}
