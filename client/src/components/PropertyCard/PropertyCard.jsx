import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize2, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { formatPrice } from '../../data/index';

export default function PropertyCard({ property, index = 0 }) {
  const navigate = useNavigate();
  const img = property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80';

  const isRent = property.status === 'Rent';

  return (
    <motion.div
      className="card property-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      {/* Image Container */}
      <div className="card-image">
        <img src={img} alt={property.title} loading="lazy" />
        
        {/* Status Badge */}
        <span className={`card-badge ${isRent ? 'rent' : ''}`}>
          {isRent ? 'For Lease' : 'For Sale'}
        </span>

        {/* Pre-launch / Exclusive Tag */}
        {property.availability === 'Pre-Launch' && (
          <span style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(20, 37, 31, 0.85)',
            color: '#C5A46D',
            border: '1px solid #C5A46D',
            fontSize: '0.68rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            zIndex: 2,
            backdropFilter: 'blur(6px)',
          }}>
            Exclusive
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="card-body">
        {/* Price */}
        <div className="card-price">
          {formatPrice(property.price, property.currency)}
        </div>

        {/* Title */}
        <h3 className="card-title">{property.title}</h3>

        {/* Location */}
        <div className="card-location">
          <MapPin size={13} style={{ color: 'var(--champagne-gold)', flexShrink: 0 }} />
          <span>{property.location}</span>
        </div>

        {/* Specs Bar */}
        <div className="card-specs">
          {property.bedrooms > 0 && (
            <span className="spec-item">
              <Bed size={13} />
              <span>{property.bedrooms} Beds</span>
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="spec-item">
              <Bath size={13} />
              <span>{property.bathrooms} Baths</span>
            </span>
          )}
          <span className="spec-item">
            <Maximize2 size={13} />
            <span>{property.area} {property.areaUnit}</span>
          </span>
          <span className="spec-item">
            <Tag size={13} />
            <span>{property.type}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <span style={{ fontSize: '0.74rem', color: 'var(--charcoal-muted)', letterSpacing: '0.06em' }}>
            REF #{property.id}
          </span>
          <button className="view-btn" aria-label={`View ${property.title}`}>
            <span>View Residence</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
