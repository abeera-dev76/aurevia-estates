import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', background:'var(--bg-light)' }}>
      <motion.div style={{ textAlign:'center', maxWidth:480 }}
        initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
        <div style={{ fontSize:'8rem', fontWeight:900, color:'var(--accent)', lineHeight:1, marginBottom:8 }}>404</div>
        <h1 style={{ marginBottom:12 }}>Page Not Found</h1>
        <p style={{ color:'var(--text-muted)', marginBottom:32, lineHeight:1.7 }}>
          The page you're looking for doesn't exist or may have been moved. Let us help you find what you're looking for.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/" className="btn btn-primary"><Home size={16} /> Back to Home</Link>
          <Link to="/properties" className="btn btn-outline"><Search size={16} /> Browse Properties</Link>
        </div>
      </motion.div>
    </div>
  );
}
