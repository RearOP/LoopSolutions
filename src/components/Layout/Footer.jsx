import { Link } from 'react-router-dom';
import { siteConfig, footerLinks } from '../../data/content';
import RevealOnScroll from '../UI/RevealOnScroll';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <RevealOnScroll>
          <div className="footer__top">
            <div className="footer__brand">
              <Link to="/" className="navbar__logo" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                {siteConfig.name}
                <span className="navbar__logo-dot" />
              </Link>
              <p className="footer__brand-desc">
                We craft digital experiences that push boundaries. Strategy, design, and engineering — unified under one roof.
              </p>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              {footerLinks.company.map((link) => (
                <Link key={link.label} to={link.path} className="footer__col-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Services</h4>
              {footerLinks.services.map((link) => (
                <Link key={link.label} to={link.path} className="footer__col-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Connect</h4>
              {footerLinks.connect.map((link) => (
                <a key={link.label} href={link.path} className="footer__col-link" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="footer__socials">
            {['X', 'Li', 'Gh', 'Dr'].map((s) => (
              <a key={s} href="#" className="footer__social-link">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
