import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/Layout/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import RevealOnScroll from '../../components/UI/RevealOnScroll';

const strategies = [
  {
    title: 'On-Page SEO',
    desc: 'Optimizing individual web pages to rank higher and earn more relevant traffic in search engines.',
    icon: '📝'
  },
  {
    title: 'Off-Page SEO',
    desc: 'Building authority and trust through strategic link building and brand mentions across the web.',
    icon: '🔗'
  },
  {
    title: 'Technical SEO',
    desc: 'Improving site speed, mobile-friendliness, and architecture to help search engines crawl and index your site.',
    icon: '⚙️'
  },
  {
    title: 'Content Strategy',
    desc: 'Creating high-quality, keyword-rich content that engages your audience and satisfies search intent.',
    icon: '✍️'
  }
];

export default function SEOServices() {
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
            SEO Services
          </TextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="text-secondary" style={{ maxWidth: 600, marginTop: 'var(--space-lg)' }}>
              Enhance your online visibility and drive organic growth with our top-tier SEO services. We ensure your business stands out on search engines, driving targeted traffic and increasing conversions.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <p className="label">CORE STRATEGIES</p>
            <TextReveal as="h2" className="heading-2">Our Approach to Search</TextReveal>
          </div>
          
          <div className="services-grid">
            {strategies.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <motion.div
                  className="service-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="service-card__icon" style={{ fontSize: '1.5rem' }}>{item.icon}</div>
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
            <RevealOnScroll>
              <div style={{ background: 'var(--surface)', padding: 'var(--space-2xl)', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '4rem', marginBottom: 'var(--space-sm)', color: 'var(--primary)' }}>200%</h3>
                <p className="text-secondary">Average increase in organic traffic for our clients within the first 6 months of implementation.</p>
              </div>
            </RevealOnScroll>
            <div>
              <RevealOnScroll delay={0.2}>
                <p className="label" style={{ marginBottom: 'var(--space-md)' }}>PROVEN RESULTS</p>
                <h2 className="heading-2" style={{ marginBottom: 'var(--space-md)' }}>Data-Driven Growth</h2>
                <p className="text-secondary" style={{ marginBottom: 'var(--space-md)' }}>
                  We don't just guess; we use advanced analytics and tools to track performance, understand user behavior, and continuously refine our strategies.
                </p>
                <p className="text-secondary">
                  Our transparent reporting ensures you always know how your investment is performing and what steps we are taking next to secure your dominance in search results.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
