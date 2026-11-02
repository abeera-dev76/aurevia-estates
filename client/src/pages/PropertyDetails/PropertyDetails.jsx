import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize2, Tag, Calendar, ChevronLeft, ChevronRight, CheckCircle, Phone, Mail, X, CalendarCheck, ShieldCheck } from 'lucide-react';
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
    <div style={{ textAlign: 'center', padding: '120px 24px', background: 'var(--ivory)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', marginBottom: 12 }}>
        Residence Not Found
      </h2>
      <p style={{ color: 'var(--charcoal-muted)', margin: '12px 0 24px' }}>
        The estate you are seeking is either off-market or has been acquired.
      </p>
      <Link to="/properties" className="btn btn-forest">Explore Current Portfolio</Link>
    </div>
  );

  const agent = agents.find(a => a.id === property.agentId);
  const imgs = property.images || [];

  const prevImg = () => setImgIdx(i => (i - 1 + imgs.length) % imgs.length);
  const nextImg = () => setImgIdx(i => (i + 1) % imgs.length);

  return (
    <div className="property-details-page">
      {/* ── Breadcrumb Bar ── */}
      <div className="details-breadcrumb">
        <div className="container breadcrumb" style={{ justifyContent: 'flex-start' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/properties">Portfolio</Link>
          <span>/</span>
          <span style={{ color: 'var(--champagne-gold)' }}>{property.title}</span>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        <div className="details-layout">
          {/* ── LEFT: Images + Details ── */}
          <div className="details-main">
            {/* Gallery */}
            <div className="gallery">
              <div className="gallery-main">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIdx}
                    src={imgs[imgIdx]}
                    alt={property.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                {imgs.length > 1 && (
                  <>
                    <button className="gallery-btn prev" onClick={prevImg} aria-label="Previous Photo">
                      <ChevronLeft size={22} />
                    </button>
                    <button className="gallery-btn next" onClick={nextImg} aria-label="Next Photo">
                      <ChevronRight size={22} />
                    </button>
                    <span className="gallery-counter">{imgIdx + 1} / {imgs.length}</span>
                  </>
                )}
              </div>
              {imgs.length > 1 && (
                <div className="gallery-thumbs">
                  {imgs.map((img, i) => (
                    <div
                      key={i}
                      className={`thumb ${i === imgIdx ? 'active' : ''}`}
                      onClick={() => setImgIdx(i)}
                    >
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Header */}
            <div className="details-header">
              <div>
                <span className="section-label" style={{ marginBottom: 8 }}>
                  {property.category} • {property.status === 'Rent' ? 'For Lease' : 'For Sale'}
                </span>
                <h1 className="details-title">{property.title}</h1>
                <div className="details-location">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="details-price">
                <div className="price-main">{formatPrice(property.price, property.currency)}</div>
                <div className="price-id">ARCHITECTURAL REF #{property.id}</div>
              </div>
            </div>

            {/* Specs Bar */}
            <div className="specs-bar">
              {property.bedrooms > 0 && (
                <div className="spec">
                  <Bed size={22} />
                  <span>{property.bedrooms}</span>
                  <small>Bedrooms</small>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="spec">
                  <Bath size={22} />
                  <span>{property.bathrooms}</span>
                  <small>Bathrooms</small>
                </div>
              )}
              <div className="spec">
                <Maximize2 size={22} />
                <span>{property.area}</span>
                <small>{property.areaUnit}</small>
              </div>
              <div className="spec">
                <Tag size={22} />
                <span>{property.type}</span>
                <small>Estate Type</small>
              </div>
              {property.yearBuilt && (
                <div className="spec">
                  <Calendar size={22} />
                  <span>{property.yearBuilt}</span>
                  <small>Completion</small>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="details-section">
              <h2>Architectural Profile</h2>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="details-section">
                <h2>Features & Sovereign Amenities</h2>
                <div className="amenities-grid">
                  {property.amenities.map((a, i) => (
                    <div key={i} className="amenity-item">
                      <CheckCircle size={16} />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="details-sidebar">
            {/* CTA card */}
            <div className="sidebar-card">
              <span className="section-label" style={{ marginBottom: 6 }}>Direct Acquisition</span>
              <div className="sidebar-price">{formatPrice(property.price, property.currency)}</div>
              
              <button
                className="btn btn-gold btn-lg w-full"
                style={{ justifyContent: 'center', marginBottom: 12 }}
                onClick={() => setModal('inquiry')}
              >
                <span>Confidential Inquiry</span>
              </button>

              <button
                className="btn btn-outline btn-lg w-full"
                style={{ justifyContent: 'center' }}
                onClick={() => setModal('visit')}
              >
                <CalendarCheck size={16} />
                <span>Book Private Viewing</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 16, fontSize: '0.74rem', color: 'var(--charcoal-muted)' }}>
                <ShieldCheck size={14} color="var(--champagne-gold)" />
                <span>Discreet viewing accompanied by Senior Partner</span>
              </div>
            </div>

            {/* Assigned Partner / Advisor */}
            {agent && (
              <div className="sidebar-card agent-sidebar">
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', fontSize: '1.15rem', marginBottom: 16 }}>
                  Appointed Private Advisor
                </h3>
                <div className="sidebar-agent">
                  <img src={agent.photo} alt={agent.name} />
                  <div>
                    <strong>{agent.name}</strong>
                    <span>{agent.title}</span>
                  </div>
                </div>
                <a
                  href={`tel:${agent.phone}`}
                  className="btn btn-outline btn-sm w-full"
                  style={{ justifyContent: 'center', marginBottom: 10 }}
                >
                  <Phone size={14} />
                  <span>{agent.phone}</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="btn btn-forest btn-sm w-full"
                  style={{ justifyContent: 'center' }}
                >
                  <Mail size={14} />
                  <span>Direct Advisor Email</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL (Wired to Google Sheets!) ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="modal-box"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setModal(null)} aria-label="Close modal">
                <X size={22} />
              </button>

              {modal === 'inquiry' ? (
                <InquiryForm
                  title={`Inquire: ${property.title}`}
                  inquiryType={property.status === 'Rent' ? 'Rent' : 'Buy'}
                  propertyId={property.id}
                  propertyTitle={property.title}
                  onSubmitFn={submitInquiry}
                />
              ) : (
                <InquiryForm
                  title={`Book Viewing: ${property.title}`}
                  inquiryType="Property Visit"
                  propertyId={property.id}
                  propertyTitle={property.title}
                  onSubmitFn={bookVisit}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
