import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Preloader from './components/Layout/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SEOServices from './pages/services/SEOServices';
import SocialMediaServices from './pages/services/SocialMediaServices';
import WebDevServices from './pages/services/WebDevServices';
import GraphicBrandingServices from './pages/services/GraphicBrandingServices';
import NotFound from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/seo" element={<SEOServices />} />
        <Route path="/services/social-media" element={<SocialMediaServices />} />
        <Route path="/services/web-development" element={<WebDevServices />} />
        <Route path="/services/graphic-branding" element={<GraphicBrandingServices />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-panel" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

import { ThemeProvider } from './hooks/useTheme';

function AppContent() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
        <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <AppContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}
