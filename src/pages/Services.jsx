import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import RevealOnScroll from '../components/UI/RevealOnScroll';
import { services, processSteps, techStack } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

/* ─── Process ─── */
function ProcessSection() {
  const processRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.fromTo(step,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray('.process-step__num').forEach((num) => {
        gsap.fromTo(num,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: num,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={processRef}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <p className="label">OUR PROCESS</p>
          <TextReveal as="h2" className="heading-2">How We Work</TextReveal>
        </div>
        <div className="process__list">
          {processSteps.map((step, i) => (
            <div className="process-step" key={i}>
              <div className="process-step__num">{String(i + 1).padStart(2, '0')}</div>
              <div className="process-step__content">
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Stack ─── */
function TechStackSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <p className="label">TECHNOLOGY</p>
          <TextReveal as="h2" className="heading-2">Our Tech Stack</TextReveal>
        </div>
        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <motion.div
                className="tech-item"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="tech-item__icon">{tech.icon}</span>
                {tech.name}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services Page ─── */
export default function Services() {
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
            End-to-end digital solutions for ambitious companies.
          </TextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="text-secondary" style={{ maxWidth: 600, marginTop: 'var(--space-lg)' }}>
              From initial strategy to post-launch optimization, we cover every stage of the product lifecycle.
              Our integrated approach ensures consistency, quality, and speed.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="services-grid">
            {services.map((service, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <motion.div
                  className="service-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{ minWidth: 'unset' }}
                >
                  <div className="service-card__icon">{service.icon}</div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__desc">{service.description}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <TechStackSection />
    </PageTransition>
  );
}
