import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize2, Tag, Calendar, ChevronLeft, ChevronRight, CheckCircle, Phone, Mail, X } from 'lucide-react';
import { properties, agents, formatPrice } from '../../data/index';
import InquiryForm from '../../components/InquiryForm/InquiryForm';
import { submitInquiry, bookVisit } from '../../services/api';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const [modal, setModal] = useState(null); // null | 'inquiry' | 'visit'

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!property) return (
    <div style={{ textAlign:'center', padding:'120px 24px' }}>
      <h2>Property Not Found</h2>
      <p style={{ color:'var(--text-muted)', margin:'12px 0 24px' }}>The property you're looking for doesn't exist or may have been removed.</p>
      <Link to="/properties" className="btn btn-primary">View All Properties</Link>
    </div>
  );

  const agent = agents.find(a => a.id === property.agentId);
  const imgs = property.images || [];

  const prevImg = () => setImgIdx(i => (i - 1 + imgs.length) % imgs.length);
  const nextImg = () => setImgIdx(i => (i + 1) % imgs.length);

  return (
    <div className="property-details-page">
      {/* Breadcrumb */}
      <div className="details-breadcrumb">
        <div className="container breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/properties">Properties</Link><span>/</span>
          <span style={{ color:'rgba(255,255,255,.9)' }}>{property.title}</span>
        </div>
      </div>

      <div className="container" style={{ padding:'40px 24px' }}>
        <div className="details-layout">
          {/* ── LEFT: Images + Details ───────────────────────── */}
          <div className="details-main">
            {/* Gallery */}
            <div className="gallery">
              <div className="gallery-main">
                <AnimatePresence mode="wait">
                  <motion.img key={imgIdx} src={imgs[imgIdx]} alt={property.title}
                    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}} />
                </AnimatePresence>
                {imgs.length > 1 && <>
                  <button className="gallery-btn prev" onClick={prevImg}><ChevronLeft size={20} /></button>
                  <button className="gallery-btn next" onClick={nextImg}><ChevronRight size={20} /></button>
                  <span className="gallery-counter">{imgIdx+1} / {imgs.length}</span>
                </>}
              </div>
              {imgs.length > 1 && (
                <div className="gallery-thumbs">
                  {imgs.map((img,i) => (
                    <div key={i} className={`thumb ${i === imgIdx ? 'active' : ''}`} onClick={() => setImgIdx(i)}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div className="details-header">
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
                  <span className="badge badge-primary">{property.type}</span>
                  <span className={`badge ${property.status==='Rent'?'badge-rent':'badge-primary'}`}>{property.status}</span>
                  <span className="badge badge-success">{property.availability}</span>
                </div>
                <h1 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', marginBottom:8 }}>{property.title}</h1>
                <div className="details-location"><MapPin size={16} /> {property.location}</div>
              </div>
              <div className="details-price">
                <div className="price-main">{formatPrice(property.price, property.currency)}</div>
                <div className="price-id">Property ID: {property.id}</div>
              </div>
            </div>

            {/* Specs */}
            <div className="specs-bar">
              {property.bedrooms > 0 && <div className="spec"><Bed size={20} /><span>{property.bedrooms}</span><small>Bedrooms</small></div>}
              {property.bathrooms > 0 && <div className="spec"><Bath size={20} /><span>{property.bathrooms}</span><small>Bathrooms</small></div>}
              <div className="spec"><Maximize2 size={20} /><span>{property.area}</span><small>{property.areaUnit}</small></div>
              <div className="spec"><Tag size={20} /><span>{property.type}</span><small>Type</small></div>
              {property.yearBuilt && <div className="spec"><Calendar size={20} /><span>{property.yearBuilt}</span><small>Built</small></div>}
            </div>

            {/* Description */}
            <div className="details-section">
              <h2>Property Description</h2>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="details-section">
                <h2>Amenities & Features</h2>
                <div className="amenities-grid">
                  {property.amenities.map((a, i) => (
                    <div key={i} className="amenity-item"><CheckCircle size={15} color="var(--primary)" />{a}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ───────────────────────────────── */}
          <div className="details-sidebar">
            {/* CTA buttons */}
            <div className="sidebar-card">
              <div className="sidebar-price">{formatPrice(property.price, property.currency)}</div>
              <button className="btn btn-primary w-full" style={{ justifyContent:'center', marginBottom:10 }} onClick={() => setModal('inquiry')}>
                Send Inquiry
              </button>
              <button className="btn btn-outline w-full" style={{ justifyContent:'center' }} onClick={() => setModal('visit')}>
                Book a Visit
              </button>
            </div>

            {/* Agent */}
            {agent && (
              <div className="sidebar-card agent-sidebar">
                <h3>Your Agent</h3>
                <div className="sidebar-agent">
                  <img src={agent.photo} alt={agent.name} />
                  <div>
                    <strong>{agent.name}</strong>
                    <span>{agent.title}</span>
                  </div>
                </div>
                <a href={`tel:${agent.phone}`} className="btn btn-outline btn-sm w-full" style={{ justifyContent:'center', marginBottom:8 }}>
                  <Phone size={14} /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="btn btn-outline btn-sm w-full" style={{ justifyContent:'center' }}>
                  <Mail size={14} /> Email Agent
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setModal(null)}>
            <motion.div className="modal-box" initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}} onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModal(null)}><X size={20} /></button>
              {modal === 'inquiry' ? (
                <InquiryForm
                  title="Send Property Inquiry"
                  inquiryType={property.status === 'Rent' ? 'Rent' : 'Buy'}
                  propertyId={property.id}
                  propertyTitle={property.title}
                  onSubmitFn={submitInquiry}
                />
              ) : (
                <InquiryForm
                  title="Book a Property Visit"
                  inquiryType="Property Visit"
                  propertyId={property.id}
                  propertyTitle={property.title}
                  onSubmitFn={bookVisit}
                  extraFields={
                    <div className="form-group">
                      <label className="form-label">Preferred Visit Date</label>
                      <input type="date" className="form-control" min={new Date().toISOString().split('T')[0]} />
                    </div>
                  }
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
