import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, as: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split text into lines
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = '';

    const lineWrapper = document.createElement('span');
    lineWrapper.className = 'line-mask';
    lineWrapper.style.display = 'block';
    lineWrapper.style.overflow = 'hidden';

    words.forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'line-inner';
      wordSpan.style.display = 'inline-block';
      wordSpan.textContent = word;
      lineWrapper.appendChild(wordSpan);
      // Add a regular space text node between words so the browser can wrap
      if (i < words.length - 1) {
        lineWrapper.appendChild(document.createTextNode(' '));
      }
    });

    el.appendChild(lineWrapper);

    const innerWords = el.querySelectorAll('.line-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerWords,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.04,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
