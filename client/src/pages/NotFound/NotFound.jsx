import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '82vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      background: 'var(--forest-green-dark)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(197, 164, 109, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={{ textAlign: 'center', maxWidth: 540, position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{
          fontSize: 'clamp(5rem, 12vw, 8.5rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-serif)',
          color: 'var(--champagne-gold)',
          lineHeight: 1,
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}>
          404
        </div>

        <span className="section-label" style={{ marginBottom: 12 }}>Off-Market Corridor</span>

        <h1 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 16 }}>
          Residence Not Found
        </h1>

        <p style={{ color: 'rgba(245, 241, 232, 0.78)', marginBottom: 36, lineHeight: 1.8, fontSize: '1.02rem' }}>
          The requested address is either privately archived or does not exist. Allow our private advisors to escort you back to active portfolios.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-gold btn-lg">
            <Home size={16} />
            <span>Return to Sanctuary (Home)</span>
          </Link>
          <Link to="/properties" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(197, 164, 109, 0.6)', color: 'var(--champagne-gold)' }}>
            <Compass size={16} />
            <span>Explore Portfolio</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
