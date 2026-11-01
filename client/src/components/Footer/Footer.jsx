import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Globe, Share2, MessageSquare, Send } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="logo-icon"><Building2 size={20} /></div>
                <span>Aurevia <span>Estates</span></span>
              </Link>
              <p>Saudi Arabia's premier luxury real estate firm, dedicated to connecting distinguished clients with extraordinary properties.</p>
              <div className="footer-social">
                <a href="https://facebook.com"  target="_blank" rel="noreferrer" aria-label="Facebook"><Globe size={18} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Share2 size={18} /></a>
                <a href="https://twitter.com"   target="_blank" rel="noreferrer" aria-label="Twitter"><MessageSquare size={18} /></a>
                <a href="https://linkedin.com"  target="_blank" rel="noreferrer" aria-label="LinkedIn"><Send size={18} /></a>
              </div>
            </div>

            {/* Quick links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/agents">Our Agents</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Properties */}
            <div className="footer-col">
              <h4>Properties</h4>
              <ul>
                <li><Link to="/properties">All Properties</Link></li>
                <li><Link to="/properties/residential">Residential</Link></li>
                <li><Link to="/properties/commercial">Commercial</Link></li>
                <li><Link to="/buy">Buy Property</Link></li>
                <li><Link to="/rent">Rent Property</Link></li>
                <li><Link to="/sell">Sell Property</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="contact-list">
                <li><MapPin size={15} /><span>Olaya District, Riyadh 12611, Saudi Arabia</span></li>
                <li><Phone size={15} /><a href="tel:+966112345678">+966 11 234 5678</a></li>
                <li><Mail  size={15} /><a href="mailto:info@aureviaestates.com">info@aureviaestates.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Aurevia Estates. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
