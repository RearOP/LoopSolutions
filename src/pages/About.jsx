import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import RevealOnScroll from '../components/UI/RevealOnScroll';
import { stats, teamMembers, values, timeline } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

/* ─── Stats Counter ─── */
function StatsSection() {
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.stat-item__number').forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              el.textContent = Math.floor(el.innerText) + suffix;
            },
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="stat-item">
                <div
                  className="stat-item__number"
                  data-target={stat.number}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <p className="stat-item__label">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team ─── */
function TeamSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <p className="label">OUR TEAM</p>
          <TextReveal as="h2" className="heading-2">The People Behind the Product</TextReveal>
        </div>
        <div className="team__grid">
          {teamMembers.map((member, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <motion.div
                className="team-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="team-card__image-wrap">
                  <div
                    className="team-card__image"
                    style={{
                      background: `linear-gradient(135deg, var(--color-bg-card), var(--color-surface))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      opacity: 0.4,
                      filter: 'none',
                    }}
                  >
                    {member.initials}
                  </div>
                </div>
                <div className="team-card__info">
                  <p className="team-card__name">{member.name}</p>
                  <p className="team-card__role">{member.role}</p>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Values ─── */
function ValuesSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <p className="label">OUR VALUES</p>
          <TextReveal as="h2" className="heading-2">What Drives Us</TextReveal>
        </div>
        <div className="values__grid">
          {values.map((v, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <motion.div
                className="value-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="value-card__number">0{i + 1}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.description}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ─── */
function TimelineSection() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.timeline__item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray('.timeline__dot').forEach((dot) => {
        gsap.fromTo(dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={timelineRef}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
          <p className="label">OUR JOURNEY</p>
          <TextReveal as="h2" className="heading-2">Milestones</TextReveal>
        </div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline__item" key={i}>
              <div className="timeline__dot" />
              <div className="timeline__content">
                <h4 className="timeline__year">{item.year}</h4>
                <p className="timeline__text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Page ─── */
export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Parallax on hero background
      gsap.to('.about-hero__bg', {
        yPercent: 30,
        opacity: 0.2,
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
    <PageTransition>
      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <RevealOnScroll>
            <p className="label" style={{ marginBottom: 'var(--space-md)' }}>ABOUT US</p>
          </RevealOnScroll>
          <TextReveal as="h1" className="heading-1 about-hero__title">
            We're a collective of strategists, designers, and engineers who believe software should be felt, not just used.
          </TextReveal>
          <RevealOnScroll delay={0.3}>
            <p className="text-secondary" style={{ maxWidth: 600, marginTop: 'var(--space-lg)', fontSize: 'var(--fs-body)' }}>
              Founded in 2013, Loop has grown from a two-person garage operation to a global team of 40+ specialists.
              We obsess over the details that others overlook, because that's where the magic lives.
            </p>
          </RevealOnScroll>
        </div>
        <div
          className="about-hero__bg"
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-accent-glow), transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </section>

      <StatsSection />
      <TeamSection />
      <ValuesSection />
      <TimelineSection />
    </PageTransition>
  );
}
