import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/Layout/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import RevealOnScroll from '../../components/UI/RevealOnScroll';

const capabilities = [
  {
    title: 'Custom Web Apps',
    desc: 'Complex, interactive web applications tailored to your unique business requirements and workflows.',
    icon: '💻'
  },
  {
    title: 'E-commerce Solutions',
    desc: 'Scalable and secure online stores optimized for high conversion rates and seamless user experiences.',
    icon: '🛒'
  },
  {
    title: 'Marketing Sites',
    desc: 'High-performance landing pages and corporate websites designed to captivate and convert visitors.',
    icon: '🚀'
  },
  {
    title: 'CMS Integration',
    desc: 'Empowering your team with easy-to-use content management systems like Sanity, Strapi, or WordPress.',
    icon: '⚙️'
  }
];

export default function WebDevServices() {
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
            Website Development
          </TextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="text-secondary" style={{ maxWidth: 600, marginTop: 'var(--space-lg)' }}>
              Performant, accessible, and scalable web applications built with modern frameworks. From stunning landing pages to complex enterprise platforms, we craft digital experiences that push boundaries.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <p className="label">CAPABILITIES</p>
            <TextReveal as="h2" className="heading-2">What We Build</TextReveal>
          </div>
          
          <div className="services-grid">
            {capabilities.map((item, i) => (
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
            <div>
              <RevealOnScroll>
                <p className="label" style={{ marginBottom: 'var(--space-md)' }}>ENGINEERING</p>
                <h2 className="heading-2" style={{ marginBottom: 'var(--space-md)' }}>Modern Tech Stack</h2>
                <p className="text-secondary" style={{ marginBottom: 'var(--space-md)' }}>
                  We leverage the latest and most robust technologies to ensure your project is built for speed, security, and scalability. 
                </p>
                <p className="text-secondary">
                  Our expertise spans React, Next.js, Node.js, and various cloud platforms, allowing us to select the perfect architecture for your specific needs.
                </p>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.2}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'AWS'].map((tech, i) => (
                   <div key={i} style={{ background: 'var(--surface)', padding: 'var(--space-md)', borderRadius: '12px', textAlign: 'center', fontWeight: '500' }}>
                     {tech}
                   </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
