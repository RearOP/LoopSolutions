import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import MagneticButton from '../components/UI/MagneticButton';

export default function NotFound() {
  return (
    <PageTransition>
      <section 
        className="section" 
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Abstract Background Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 60%)',
            opacity: 0.05,
            filter: 'blur(80px)',
            zIndex: -1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 
              style={{ 
                fontSize: 'clamp(6rem, 15vw, 15rem)', 
                fontWeight: 800, 
                lineHeight: 1,
                marginBottom: '1rem',
                color: 'var(--color-text)',
                letterSpacing: '-0.05em'
              }}
            >
              404
            </h1>
          </motion.div>

          <TextReveal as="h2" className="heading-3" style={{ marginBottom: '2rem', color: 'var(--color-secondary)' }}>
            Lost in the void.
          </TextReveal>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-secondary"
            style={{ maxWidth: '500px', margin: '0 auto 3rem auto', fontSize: '1.125rem' }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to safety.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Link to="/">
              <MagneticButton className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                Return Home
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
