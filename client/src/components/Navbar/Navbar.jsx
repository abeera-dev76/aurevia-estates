import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, Building2 } from 'lucide-react';
import './Navbar.css';

const propertyLinks = [
  { to: '/properties',               label: 'All Properties' },
  { to: '/properties/residential',   label: 'Residential' },
  { to: '/properties/commercial',    label: 'Commercial' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen]  = useState(false);
  const dropRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => { setMenuOpen(false); setDropOpen(false); };

  const activeClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeAll}>
          <div className="logo-icon"><Building2 size={24} /></div>
          <span className="logo-text">Aurevia <span>Estates</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/"         className={activeClass} onClick={closeAll}>Home</NavLink>
          <NavLink to="/about"    className={activeClass} onClick={closeAll}>About</NavLink>

          {/* Properties Dropdown */}
          <div className="nav-dropdown" ref={dropRef}>
            <button
              className={`nav-link dropdown-toggle ${dropOpen ? 'active' : ''}`}
              onClick={() => setDropOpen(p => !p)}
              aria-expanded={dropOpen}
            >
              Properties <ChevronDown size={14} className={`drop-icon ${dropOpen ? 'rotate' : ''}`} />
            </button>
            {dropOpen && (
              <div className="dropdown-menu">
                {propertyLinks.map(l => (
                  <NavLink key={l.to} to={l.to} className="dropdown-item" onClick={closeAll}>{l.label}</NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/buy"      className={activeClass} onClick={closeAll}>Buy</NavLink>
          <NavLink to="/rent"     className={activeClass} onClick={closeAll}>Rent</NavLink>
          <NavLink to="/sell"     className={activeClass} onClick={closeAll}>Sell</NavLink>
          <NavLink to="/services" className={activeClass} onClick={closeAll}>Services</NavLink>
          <NavLink to="/agents"   className={activeClass} onClick={closeAll}>Agents</NavLink>
          <NavLink to="/contact"  className="btn btn-primary btn-sm" onClick={closeAll}>Contact Us</NavLink>
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
