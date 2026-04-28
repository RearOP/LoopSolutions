import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/Layout/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import RevealOnScroll from '../../components/UI/RevealOnScroll';

const platforms = [
  { name: 'Instagram', icon: '📸', desc: 'Visual storytelling and brand aesthetics.' },
  { name: 'LinkedIn', icon: '💼', desc: 'B2B networking and thought leadership.' },
  { name: 'Twitter / X', icon: '🐦', desc: 'Real-time engagement and community updates.' },
  { name: 'TikTok', icon: '🎵', desc: 'Viral short-form video content creation.' }
];

export default function SocialMediaServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <section className="services-hero">
        <div className="container">
          <RevealOnScroll>
            <p className="label" style={{ marginBottom: 'var(--space-md)' }}>SERVICES</p>
          </RevealOnScroll>
          <TextReveal as="h1" className="heading-1">
            Social Media Marketing
          </TextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="text-secondary" style={{ maxWidth: 600, marginTop: 'var(--space-lg)' }}>
              Engage your audience and build brand loyalty across all major platforms. Our social media marketing strategies are designed to grow your community and generate meaningful interactions.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <p className="label">PLATFORMS</p>
            <TextReveal as="h2" className="heading-2">Where We Excel</TextReveal>
          </div>
          
          <div className="tech-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {platforms.map((platform, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <motion.div
                  className="tech-item"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-xl)', height: '100%' }}
                >
                  <span style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>{platform.icon}</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-sm)' }}>{platform.name}</h3>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{platform.desc}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <RevealOnScroll>
              <p className="label" style={{ marginBottom: 'var(--space-md)' }}>WHAT WE DO</p>
              <h2 className="heading-2" style={{ marginBottom: 'var(--space-lg)' }}>Comprehensive Social Management</h2>
              <p className="text-secondary" style={{ marginBottom: 'var(--space-xl)' }}>
                From crafting a compelling content calendar and designing eye-catching creatives to managing targeted ad campaigns and engaging with your followers, we handle your entire social presence so you can focus on running your business.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'center' }}>
                <span style={{ padding: '0.5rem 1.5rem', background: 'var(--surface)', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '500' }}>Content Creation</span>
                <span style={{ padding: '0.5rem 1.5rem', background: 'var(--surface)', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '500' }}>Community Management</span>
                <span style={{ padding: '0.5rem 1.5rem', background: 'var(--surface)', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '500' }}>Paid Advertising</span>
                <span style={{ padding: '0.5rem 1.5rem', background: 'var(--surface)', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '500' }}>Analytics & Reporting</span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
