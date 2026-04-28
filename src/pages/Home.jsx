import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import Marquee from '../components/UI/Marquee';
import MagneticButton from '../components/UI/MagneticButton';
import RevealOnScroll from '../components/UI/RevealOnScroll';
import HorizontalScroll from '../components/UI/HorizontalScroll';
import { projects, services, testimonials } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

/* ─── Hero ─── */
function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero__label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
        .fromTo('.hero__title-word', { y: '110%', rotateX: 10 }, {
          y: '0%', rotateX: 0, duration: 1.2, stagger: 0.06,
        }, '-=0.5')
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(badgeRef.current, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.5');

      // Parallax gradient on scroll
      gsap.to(gradientRef.current, {
        y: 200,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container hero__content">
        <p className="label hero__label">SOFTWARE AGENCY — EST. 2013</p>
        <h1 className="heading-display hero__title" ref={titleRef}>
          <span className="hero__title-line">
            <span className="hero__title-word">We</span>{' '}
            <span className="hero__title-word">build</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-word" style={{ color: 'var(--color-accent)' }}>digital</span>{' '}
            <span className="hero__title-word">products</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-word">that</span>{' '}
            <span className="hero__title-word">matter</span>
          </span>
        </h1>
        <p className="hero__subtitle" ref={subtitleRef}>
          Strategy, design, and engineering — unified under one roof.
          We partner with ambitious companies to create software people genuinely love to use.
        </p>
        <div className="hero__cta-row" ref={ctaRef}>
          <Link to="/work">
            <MagneticButton className="btn btn--primary btn--large">
              View Our Work
              <span className="btn__arrow">→</span>
            </MagneticButton>
          </Link>
          <Link to="/contact">
            <MagneticButton className="btn btn--outline btn--large">
              Let's Talk
            </MagneticButton>
          </Link>
        </div>

        <div className="hero__badge" ref={badgeRef}>
          <svg className="hero__badge-text" viewBox="0 0 120 120">
            <defs>
              <path id="circlePath" d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
            </defs>
            <text fill="var(--color-text-secondary)" fontSize="10" fontFamily="Inter" letterSpacing="3">
              <textPath href="#circlePath">
                SCROLL DOWN • EXPLORE MORE •
              </textPath>
            </text>
          </svg>
          <span className="hero__badge-arrow">↓</span>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-line" />
      </div>

      <div className="hero__bg-gradient" ref={gradientRef} />
    </section>
  );
}

/* ─── Featured Work ─── */
function FeaturedWork() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Parallax on image
        const img = card.querySelector('.project-card__image');
        if (img) {
          gsap.fromTo(img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <section className="featured-work section" ref={gridRef}>
      <div className="container">
        <div className="featured-work__header">
          <TextReveal as="h2" className="heading-2">Selected Work</TextReveal>
          <Link to="/work" className="view-all-link">
            View All <span className="view-all-link__arrow">→</span>
          </Link>
        </div>

        <div className="featured-work__grid">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              className={`project-card ${i === 0 ? 'project-card--large' : ''}`}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-card__image-wrap">
                <div
                  className="project-card__image"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: project.color,
                    opacity: 0.6,
                  }}
                >
                  {project.title.charAt(0)}
                </div>
                <div className="project-card__overlay" />
              </div>
              <div className="project-card__info">
                <p className="label project-card__category">{project.category} — {project.year}</p>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services Strip (Horizontal Scroll) ─── */
function ServicesStrip() {
  const header = (
    <div className="container" style={{ marginBottom: 'var(--space-xl)' }}>
      <p className="label">WHAT WE DO</p>
      <TextReveal as="h2" className="heading-2">Services & Capabilities</TextReveal>
    </div>
  );

  return (
    <HorizontalScroll header={header} className="services-strip">
      {services.map((service, i) => (
        <motion.div
          key={i}
          className="service-card"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            padding: 'var(--space-xl) var(--space-lg)',
            minWidth: '320px',
            maxWidth: '380px'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 'var(--space-md)',
            right: 'var(--space-lg)',
            fontSize: '4rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-border)',
            opacity: 0.4,
            fontWeight: 'bold',
            zIndex: 0
          }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="service-card__icon" style={{ 
              marginBottom: 'var(--space-md)', 
              color: 'var(--color-accent)',
              fontSize: '2rem'
            }}>
              {service.icon}
            </div>
            <h3 className="service-card__title" style={{ marginBottom: 'var(--space-sm)' }}>
              {service.title}
            </h3>
            <p className="service-card__desc" style={{ color: 'var(--color-text-secondary)' }}>
              {service.description}
            </p>
          </div>
        </motion.div>
      ))}
    </HorizontalScroll>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <p className="label">TESTIMONIALS</p>
          <TextReveal as="h2" className="heading-2">What Our Clients Say</TextReveal>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 0.15}>
              <motion.div
                className="testimonial-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <p className="testimonial-card__quote">{t.quote}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.initials}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="cta-section section">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <RevealOnScroll>
          <p className="label">READY TO START?</p>
          <h2 className="heading-1 cta-section__title">
            Let's build something<br />
            <span className="text-accent">extraordinary</span> together.
          </h2>
          <p className="cta-section__desc">
            We're always looking for ambitious projects and great partnerships.
            Tell us about your vision.
          </p>
          <Link to="/contact">
            <MagneticButton className="btn btn--primary btn--large">
              Start a Project <span className="btn__arrow">→</span>
            </MagneticButton>
          </Link>
        </RevealOnScroll>
      </div>
      <div className="cta-section__bg" />
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <FeaturedWork />
      <ServicesStrip />
      <Testimonials />
      <CTASection />
    </PageTransition>
  );
}
