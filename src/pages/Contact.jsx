import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import RevealOnScroll from '../components/UI/RevealOnScroll';
import MagneticButton from '../components/UI/MagneticButton';
import { siteConfig } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.form-group').forEach((group, i) => {
        gsap.fromTo(group,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.3 + i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray('.contact-info__item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.2 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://scentaromatic.com/loopsolution/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      // const result = await response.json();
      // console.log(response);
      if (response.ok) {
        setSubmitted(true);
        // Add a slight delay to ensure the DOM has updated and element exists
        setTimeout(() => {
          gsap.fromTo('.success-message',
            { y: 20, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
          );
        }, 50);

      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <PageTransition>
      <section className="contact-hero">
        <div className="container">
          <RevealOnScroll>
            <p className="label" style={{ marginBottom: 'var(--space-md)' }}>CONTACT</p>
          </RevealOnScroll>
          <TextReveal as="h1" className="heading-1">
            Let's turn your vision into reality.
          </TextReveal>
          <RevealOnScroll delay={0.2}>
            <p className="text-secondary" style={{ maxWidth: 550, marginTop: 'var(--space-lg)' }}>
              Have a project in mind? We'd love to hear about it.
              Drop us a line and we'll get back to you within 24 hours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-sm" ref={formRef}>
        <div className="container">
          <div className="contact-split">
            <div>
              {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-group__input"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-group__label">Your Name</label>
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-group__input"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-group__label">Email Address</label>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      className="form-group__input"
                      placeholder=" "
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <label className="form-group__label">Company (Optional)</label>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-group__textarea"
                      placeholder=" "
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                    <label className="form-group__label">Tell us about your project</label>
                  </div>

                  <div style={{ marginTop: 'var(--space-md)' }}>
                    <MagneticButton className="btn btn--primary btn--large" type="submit">
                      Send Message <span className="btn__arrow">→</span>
                    </MagneticButton>
                  </div>
                </form>
              ) : (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: 'var(--space-2xl)',
                    background: 'var(--color-bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-accent)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>✓</div>
                  <h3 className="heading-3" style={{ marginBottom: 'var(--space-sm)' }}>Message Sent!</h3>
                  <p className="text-secondary">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              )}
            </div>

            <div className="contact-info">
              <div className="contact-info__item">
                <span className="contact-info__label">Email</span>
                <p className="contact-info__value">
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </p>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__label">Phone</span>
                <p className="contact-info__value">
                  <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
                </p>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__label">Office</span>
                <p className="contact-info__value">{siteConfig.address}</p>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__label">Availability</span>
                <p className="contact-info__value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                    display: 'inline-block',
                    animation: 'pulse 2s ease infinite',
                  }} />
                  Currently accepting projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
