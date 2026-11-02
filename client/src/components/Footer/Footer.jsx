import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, Share2, ArrowUpRight, ShieldCheck } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* ── Top Prestige Banner ── */}
      <div className="footer-prestige">
        <div className="container footer-prestige-inner">
          <div className="prestige-item">
            <span className="prestige-title">Private Portfolio</span>
            <span className="prestige-desc">Ultra-prime residential & trophy assets</span>
          </div>
          <div className="prestige-sep" />
          <div className="prestige-item">
            <span className="prestige-title">Discreet Advisory</span>
            <span className="prestige-desc">Confidential acquisitions & private sales</span>
          </div>
          <div className="prestige-sep" />
          <div className="prestige-item">
            <span className="prestige-title">REGA Licensed</span>
            <span className="prestige-desc">Saudi Arabia verified brokerage partner</span>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand & Philosophy */}
            <div className="footer-brand-col">
              <Link to="/" className="footer-logo">
                <div className="footer-crest">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 9V21L12 17L21 21V9L12 2Z" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7V17" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M7 11L12 14L17 11" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="footer-logo-text">
                  <span className="footer-brand-name">AUREVIA</span>
                  <span className="footer-brand-sub">ESTATES • SAUDI ARABIA</span>
                </div>
              </Link>
              <p className="footer-intro">
                Aurevia Estates curates extraordinary residences and architectural landmarks across the Kingdom of Saudi Arabia. Committed to privacy, discretion, and uncompromising refinement.
              </p>
              <div className="footer-social-links">
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                {/* X / Twitter */}
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l16 16m0-16L4 20"/>
                  </svg>
                </a>
                {/* Global Web */}
                <a href="https://aureviaestates.com" target="_blank" rel="noreferrer" aria-label="Global Site">
                  <Globe size={17} />
                </a>
              </div>
            </div>

            {/* Column 2: The Portfolio */}
            <div className="footer-nav-col">
              <h4>Portfolio</h4>
              <ul>
                <li><Link to="/properties">Curated Collection</Link></li>
                <li><Link to="/properties/residential">Luxury Residences</Link></li>
                <li><Link to="/properties/commercial">Commercial Assets</Link></li>
                <li><Link to="/buy">Acquisitions (Buy)</Link></li>
                <li><Link to="/rent">Premium Leases (Rent)</Link></li>
                <li><Link to="/sell">Private Listings (Sell)</Link></li>
              </ul>
            </div>

            {/* Column 3: Advisory & Firm */}
            <div className="footer-nav-col">
              <h4>The Firm</h4>
              <ul>
                <li><Link to="/about">Our Heritage</Link></li>
                <li><Link to="/services">Bespoke Services</Link></li>
                <li><Link to="/agents">Private Advisors</Link></li>
                <li><Link to="/contact">Concierge Office</Link></li>
                <li><Link to="/privacy-policy">Client Privacy</Link></li>
                <li><Link to="/terms">Terms of Engagement</Link></li>
              </ul>
            </div>

            {/* Column 4: Private Offices */}
            <div className="footer-offices-col">
              <h4>Private Offices</h4>
              <div className="office-item">
                <div className="office-city"><MapPin size={14} className="office-icon" /> Riyadh Headquarters</div>
                <div className="office-addr">Al Olaya Towers, Level 28, King Fahd Road, Riyadh 12213</div>
              </div>
              <div className="office-item">
                <div className="office-city"><MapPin size={14} className="office-icon" /> Jeddah Gallery</div>
                <div className="office-addr">Corniche Promenade, Al Shati District, Jeddah 23414</div>
              </div>
              <div className="footer-direct-contact">
                <a href="tel:+966112345678" className="footer-phone"><Phone size={14} /> +966 11 234 5678</a>
                <a href="mailto:info@aureviaestates.com" className="footer-email"><Mail size={14} /> info@aureviaestates.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Bottom ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright">
            © {year} Aurevia Estates. All rights reserved. Registered with the Saudi Real Estate General Authority (REGA).
          </p>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="sep">•</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="sep">•</span>
            <Link to="/contact">VIP Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
