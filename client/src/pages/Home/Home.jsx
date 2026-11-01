import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Home as HomeIcon, Building2, Layers, CheckCircle, Phone, Award, TrendingUp, Users, Shield } from 'lucide-react';
import { properties, agents, testimonials, formatPrice } from '../../data/index';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';

const fadeUp = { hidden:{opacity:0,y:30}, visible:(i=0)=>({ opacity:1,y:0, transition:{duration:0.5,delay:i*0.1} }) };

const SERVICES = [
  { icon: HomeIcon,    title:'Property Sales',      desc:'Expert guidance for residential and commercial purchases across Saudi Arabia.' },
  { icon: Building2,  title:'Property Rentals',     desc:'Premium rental properties for families and businesses, handled end-to-end.' },
  { icon: TrendingUp, title:'Investment Advisory',  desc:'Data-driven insights to help you build a high-performing property portfolio.' },
  { icon: Shield,     title:'Property Management',  desc:'Full management services so your investment performs while you relax.' },
];

const STATS = [
  { value:'500+', label:'Properties Sold' },
  { value:'12+',  label:'Years Experience' },
  { value:'98%',  label:'Client Satisfaction' },
  { value:'3',    label:'Offices Nationwide' },
];

export default function Home() {
  const navigate = useNavigate();
  const featured  = properties.filter(p => p.featured).slice(0, 6);
  const latest    = properties.slice(-4).reverse();

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="hero-label">
            Saudi Arabia's Premier Real Estate
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="hero-title serif">
            Find Your Place<br />in the World.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="hero-subtitle">
            Aurevia Estates connects discerning clients with Saudi Arabia's finest residential and commercial properties. Experience luxury real estate with unparalleled service.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="hero-ctas">
            <Link to="/properties" className="btn btn-primary btn-lg">Explore Properties <ArrowRight size={18} /></Link>
            <Link to="/contact"    className="btn btn-white   btn-lg">Contact Us</Link>
          </motion.div>
        </div>

        {/* Search bar over hero */}
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:0.5}} className="hero-search">
          <div className="container">
            <SearchBar />
          </div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s,i) => (
              <motion.div key={i} className="stat-item"
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Browse By</span>
            <h2 className="section-title">Explore Property Categories</h2>
          </div>
          <div className="categories-grid">
            {[
              { icon: HomeIcon, label:'Residential', to:'/properties/residential', count: properties.filter(p=>p.category==='Residential').length, img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
              { icon: Building2, label:'Commercial', to:'/properties/commercial', count: properties.filter(p=>p.category==='Commercial').length, img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
              { icon: Layers, label:'Buy', to:'/buy', count: properties.filter(p=>p.status==='Buy').length, img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80' },
              { icon: HomeIcon, label:'Rent', to:'/rent', count: properties.filter(p=>p.status==='Rent').length, img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' },
            ].map((cat, i) => (
              <motion.div key={i} className="category-card"
                initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.1}}
                onClick={() => navigate(cat.to)} style={{cursor:'pointer'}}>
                <img src={cat.img} alt={cat.label} />
                <div className="cat-overlay" />
                <div className="cat-body">
                  <cat.icon size={28} />
                  <h3>{cat.label}</h3>
                  <p>{cat.count} Properties</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ───────────────────────────────── */}
      <section className="section" style={{ background:'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Hand-Picked</span>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">Discover our curated selection of exceptional properties across Saudi Arabia</p>
          </div>
          <div className="grid-3">
            {featured.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/properties" className="btn btn-outline">View All Properties <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <span className="section-label">Why Aurevia</span>
              <h2 className="section-title" style={{ marginTop:12, textAlign:'left' }}>The Aurevia Advantage</h2>
              <p style={{ color:'var(--text-muted)', marginBottom:32, lineHeight:1.8 }}>
                For over a decade, Aurevia Estates has been setting the standard for luxury real estate in Saudi Arabia. Our commitment to excellence, integrity, and client satisfaction is at the heart of everything we do.
              </p>
              {[
                'Exclusive access to premium off-market properties',
                'Dedicated advisors with deep local market expertise',
                'Transparent, honest guidance at every step',
                'End-to-end support from search to handover',
                'Stringent property verification and due diligence',
              ].map((item, i) => (
                <motion.div key={i} className="why-item"
                  initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}}>
                  <CheckCircle size={18} color="var(--primary)" style={{flexShrink:0}} />
                  <span>{item}</span>
                </motion.div>
              ))}
              <Link to="/about" className="btn btn-primary mt-8">Learn About Us <ArrowRight size={16} /></Link>
            </div>
            <div className="why-image">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" alt="Why choose Aurevia Estates" />
              <div className="why-badge">
                <Award size={28} color="var(--primary)" />
                <div><strong>Award Winning</strong><span>Real Estate Agency 2024</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section" style={{ background:'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Comprehensive real estate services designed to meet every client need</p>
          </div>
          <div className="grid-4">
            {SERVICES.map((svc, i) => (
              <motion.div key={i} className="service-card"
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <div className="svc-icon"><svc.icon size={26} /></div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link to="/services" className="svc-link">Learn More <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENTS ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Meet The Team</span>
            <h2 className="section-title">Featured Agents</h2>
            <p className="section-subtitle">Our expert advisors are here to guide you through every step of your property journey</p>
          </div>
          <div className="grid-3">
            {agents.map((agent, i) => (
              <motion.div key={agent.id} className="agent-card"
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <div className="agent-img-wrap">
                  <img src={agent.photo} alt={agent.name} />
                </div>
                <div className="agent-body">
                  <h3>{agent.name}</h3>
                  <p className="agent-title">{agent.title}</p>
                  <p className="agent-spec">{agent.specialisation}</p>
                  <div className="agent-stats">
                    <span><strong>{agent.listings}</strong> Listings</span>
                    <span><strong>{agent.sales}</strong> Sold</span>
                    <span><strong>{agent.experience}</strong></span>
                  </div>
                  <Link to="/agents" className="btn btn-outline btn-sm w-full" style={{ justifyContent:'center', marginTop:16 }}>View Profile</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section" style={{ background:'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} className="card testimonial-card"
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <div className="stars">{Array(t.rating).fill(null).map((_,j) => <Star key={j} size={14} fill="#FFEFC4" color="#e4a20a" />)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <img src={t.image} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST PROPERTIES ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Just Listed</span>
            <h2 className="section-title">Latest Properties</h2>
          </div>
          <div className="grid-4">
            {latest.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <motion.div className="cta-inner"
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <h2 className="serif">Ready to Find Your Dream Property?</h2>
            <p>Let our expert team guide you to the perfect home or investment. Contact us today for a personalised consultation.</p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginTop:32 }}>
              <Link to="/contact" className="btn btn-white btn-lg">Get in Touch <Phone size={18} /></Link>
              <Link to="/properties" className="btn btn-outline btn-lg" style={{ borderColor:'rgba(255,255,255,.5)', color:'#fff' }}>Browse Properties <ArrowRight size={18} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
