import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, siteConfig } from '../../data/content';
import ThemeToggle from '../UI/ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            {siteConfig.name}
            <span className="navbar__logo-dot" />
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <div key={link.path} className="navbar__link-wrapper">
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                  {link.dropdown && <span className="navbar__dropdown-icon">▾</span>}
                </Link>
                {link.dropdown && (
                  <div className="navbar__dropdown">
                    {link.dropdown.map((dropLink) => (
                      <Link
                        key={dropLink.path}
                        to={dropLink.path}
                        className="navbar__dropdown-link"
                      >
                        {dropLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <ThemeToggle />
            <Link to="/contact" className="navbar__cta navbar__cta-desktop">
              Get in Touch
            </Link>

            <button
              className={`navbar__menu-toggle ${mobileOpen ? 'navbar__menu-toggle--open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="navbar__mobile-link-wrapper"
              >
                <Link
                  to={link.path}
                  className="navbar__mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="navbar__mobile-dropdown">
                    {link.dropdown.map((dropLink) => (
                      <Link
                        key={dropLink.path}
                        to={dropLink.path}
                        className="navbar__mobile-dropdown-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        {dropLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
