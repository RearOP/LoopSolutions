import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({ children, className = '', header = null }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      // Calculate how far to scroll based on container width vs viewport width
      const scrollWidth = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          // Pin slightly below the navbar so it doesn't clip
          start: 'top top+=80', 
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`horizontal-scroll-section ${className}`} style={{ paddingBottom: 'var(--space-2xl)' }}>
      {header && (
         <div className="horizontal-scroll__header">
           {header}
         </div>
      )}
      <div ref={containerRef} className="horizontal-scroll__container" style={{ padding: '0 var(--content-padding)' }}>
        {children}
      </div>
    </section>
  );
}
