import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize2, Tag } from 'lucide-react';
import { formatPrice } from '../../data/index';

export default function PropertyCard({ property, index = 0 }) {
  const navigate = useNavigate();
  const img = property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';

  return (
    <motion.div
      className="card property-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      <div className="card-image">
        <img src={img} alt={property.title} loading="lazy" />
        <span className={`card-badge ${property.status === 'Rent' ? 'rent' : ''}`}>
          {property.status}
        </span>
        {property.availability === 'Pre-Launch' && (
          <span style={{ position:'absolute', top:14, right:14, background:'#FFEFC4', color:'#142B3A', fontSize:'0.7rem', fontWeight:700, padding:'4px 10px', borderRadius:'100px' }}>
            Pre-Launch
          </span>
        )}
      </div>
      <div className="card-body">
        <div className="card-price">
          {formatPrice(property.price, property.currency)}
        </div>
        <div className="card-title">{property.title}</div>
        <div className="card-location">
          <MapPin size={13} /> {property.location}
        </div>
        <div className="card-specs">
          {property.bedrooms > 0 && (
            <span className="spec-item"><Bed size={13} /> {property.bedrooms} Bed</span>
          )}
          {property.bathrooms > 0 && (
            <span className="spec-item"><Bath size={13} /> {property.bathrooms} Bath</span>
          )}
          <span className="spec-item"><Maximize2 size={13} /> {property.area} {property.areaUnit}</span>
          <span className="spec-item"><Tag size={13} /> {property.type}</span>
        </div>
        <div className="card-footer">
          <span style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>ID: {property.id}</span>
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </motion.div>
  );
}
