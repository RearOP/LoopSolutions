import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import RevealOnScroll from '../components/UI/RevealOnScroll';
import { projects } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Re-trigger scroll animations after filter
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Parallax on project image
        const img = card.querySelector('.project-card__image');
        if (img) {
          gsap.fromTo(img,
            { yPercent: -8 },
            {
              yPercent: 8,
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
  }, [activeCategory]);

  return (
    <PageTransition>
      <section className="work-hero">
        <div className="container">
          <RevealOnScroll>
            <p className="label" style={{ marginBottom: 'var(--space-md)' }}>OUR WORK</p>
          </RevealOnScroll>
          <TextReveal as="h1" className="heading-1">
            Projects that speak for themselves.
          </TextReveal>
          <RevealOnScroll delay={0.2}>
            <p className="text-secondary" style={{ maxWidth: 550, marginTop: 'var(--space-lg)' }}>
              A curated selection of our most impactful work across industries.
              Every project begins with a problem worth solving.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm" ref={gridRef}>
        <div className="container">
          <div className="work-filters">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                className={`work-filter-btn ${activeCategory === cat ? 'work-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="work-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="project-card work-project-card"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="project-card__image-wrap">
                    <div
                      className="project-card__image"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${project.color}15, ${project.color}35)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <span style={{
                        fontSize: '3.5rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        color: project.color,
                        opacity: 0.5,
                      }}>
                        {project.title.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                    <div className="project-card__overlay" />
                  </div>
                  <div className="project-card__info">
                    <p className="label project-card__category">{project.category} — {project.year}</p>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.description}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'var(--space-sm)', flexWrap: 'wrap' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.25rem 0.75rem',
                            background: 'var(--color-accent-subtle)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--fs-caption)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
