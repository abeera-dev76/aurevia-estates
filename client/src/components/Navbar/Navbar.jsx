import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, Mail, ShieldCheck, Compass } from 'lucide-react';
import './Navbar.css';

const propertyLinks = [
  { to: '/properties',             label: 'All Properties',    desc: 'Browse entire luxury portfolio' },
  { to: '/properties/residential', label: 'Residential',       desc: 'Penthouses, villas & private estates' },
  { to: '/properties/commercial',  label: 'Commercial Assets', desc: 'Grade-A towers, retail & offices' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  const closeAll = () => {
    setMenuOpen(false);
    setDropOpen(false);
  };

  const activeClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="site-header">
      {/* ── Top Bar (VIP Advisory Line) ── */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-badge"><ShieldCheck size={12} /> Verified Agency</span>
            <span className="top-text">Islamabad • Lahore • Rawalpindi Luxury Portfolio</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:+925128900001" className="top-link"><Phone size={12} /> +92 51 289 0001</a>
            <span className="top-sep">|</span>
            <a href="mailto:info@aureviaestates.com" className="top-link"><Mail size={12} /> info@aureviaestates.com</a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation ── */}
      <div className="navbar">
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={closeAll}>
            <div className="logo-crest">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 9V21L12 17L21 21V9L12 2Z" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V17" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M7 11L12 14L17 11" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="logo-text-block">
              <span className="logo-brand">AUREVIA</span>
              <span className="logo-sub">ESTATES • PAKISTAN</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <NavLink to="/" className={activeClass}>Home</NavLink>
            <NavLink to="/about" className={activeClass}>About</NavLink>

            {/* Properties Dropdown */}
            <div className="nav-dropdown" ref={dropRef}>
              <button
                className={`nav-link dropdown-toggle ${dropOpen || location.pathname.startsWith('/properties') ? 'active' : ''}`}
                onClick={() => setDropOpen(p => !p)}
                aria-expanded={dropOpen}
              >
                Portfolio <ChevronDown size={13} className={`drop-icon ${dropOpen ? 'rotate' : ''}`} />
              </button>
              {dropOpen && (
                <div className="dropdown-menu">
                  {propertyLinks.map(l => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className="dropdown-item"
                      onClick={closeAll}
                    >
                      <div className="drop-item-title">{l.label}</div>
                      <div className="drop-item-desc">{l.desc}</div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/buy" className={activeClass}>Buy</NavLink>
            <NavLink to="/rent" className={activeClass}>Rent</NavLink>
            <NavLink to="/sell" className={activeClass}>Sell</NavLink>
            <NavLink to="/services" className={activeClass}>Services</NavLink>
            <NavLink to="/agents" className={activeClass}>Advisors</NavLink>
          </nav>

          {/* Right Action */}
          <div className="nav-actions">
            <Link to="/contact" className="btn btn-gold btn-sm nav-cta">
              Schedule Consultation
            </Link>

            {/* Mobile Toggle Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle Navigation"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {menuOpen && (
        <div className="mobile-drawer">
          <div className="container mobile-drawer-inner">
            <div className="mobile-links">
              <NavLink to="/" className={activeClass} onClick={closeAll}>Home</NavLink>
              <NavLink to="/about" className={activeClass} onClick={closeAll}>About</NavLink>
              
              <div className="mobile-subgroup">
                <span className="mobile-group-label">Properties</span>
                <NavLink to="/properties" className={activeClass} onClick={closeAll}>• All Properties</NavLink>
                <NavLink to="/properties/residential" className={activeClass} onClick={closeAll}>• Residential</NavLink>
                <NavLink to="/properties/commercial" className={activeClass} onClick={closeAll}>• Commercial</NavLink>
              </div>

              <NavLink to="/buy" className={activeClass} onClick={closeAll}>Buy</NavLink>
              <NavLink to="/rent" className={activeClass} onClick={closeAll}>Rent</NavLink>
              <NavLink to="/sell" className={activeClass} onClick={closeAll}>Sell</NavLink>
              <NavLink to="/services" className={activeClass} onClick={closeAll}>Services</NavLink>
              <NavLink to="/agents" className={activeClass} onClick={closeAll}>Advisors</NavLink>
              <NavLink to="/contact" className={activeClass} onClick={closeAll}>Contact Us</NavLink>
            </div>

            <div className="mobile-drawer-footer">
              <Link to="/contact" className="btn btn-gold w-full" onClick={closeAll}>
                Schedule Consultation
              </Link>
              <div className="mobile-contact-info">
                <div><Phone size={13} /> +92 51 289 0001</div>
                <div><Mail size={13} /> info@aureviaestates.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
