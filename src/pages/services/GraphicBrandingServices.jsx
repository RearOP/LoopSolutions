import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/Layout/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import RevealOnScroll from '../../components/UI/RevealOnScroll';

const offerings = [
  {
    title: 'Logo Design',
    desc: 'Crafting unique and memorable logos that capture the essence of your brand and resonate with your audience.',
    icon: '✦'
  },
  {
    title: 'Brand Guidelines',
    desc: 'Developing comprehensive rulebooks to ensure consistency across typography, color palettes, and imagery.',
    icon: '⬢'
  },
  {
    title: 'Marketing Collateral',
    desc: 'Designing business cards, brochures, and digital assets that leave a lasting professional impression.',
    icon: '◈'
  },
  {
    title: 'UI/UX Design',
    desc: 'Translating your brand identity into seamless digital experiences that users love to interact with.',
    icon: '⟐'
  }
];

export default function GraphicBrandingServices() {
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
            Graphic & Branding Services
          </TextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="text-secondary" style={{ maxWidth: 600, marginTop: 'var(--space-lg)' }}>
              Make a lasting impression with exceptional branding and graphic design. We define your visual identity from logo creation to complete brand guidelines, ensuring consistency across all touchpoints.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <p className="label">WHAT WE OFFER</p>
            <TextReveal as="h2" className="heading-2">Crafting Visual Excellence</TextReveal>
          </div>
          
          <div className="services-grid">
            {offerings.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <motion.div
                  className="service-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="service-card__icon">{item.icon}</div>
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__desc">{item.desc}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div>
              <RevealOnScroll>
                <p className="label" style={{ marginBottom: 'var(--space-md)' }}>THE IMPACT</p>
                <h2 className="heading-2" style={{ marginBottom: 'var(--space-md)' }}>Why Branding Matters</h2>
                <p className="text-secondary" style={{ marginBottom: 'var(--space-md)' }}>
                  A strong brand is more than just a beautiful logo; it's the emotional connection you build with your audience. It communicates your values, builds trust, and sets you apart in a crowded marketplace.
                </p>
                <p className="text-secondary">
                  Our strategic approach to design ensures that every visual element serves a purpose, driving recognition and fostering long-term loyalty among your customers.
                </p>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.2}>
              <div style={{ background: 'var(--surface)', padding: 'var(--space-2xl)', borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)', color: 'var(--primary)' }}>✧</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>Stand Out</h3>
                <p className="text-secondary">Elevate your presence with a distinctive visual identity.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
