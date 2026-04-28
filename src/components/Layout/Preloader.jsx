import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const barFillRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };

    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      },
    });

    gsap.to(barFillRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut',
    });

    // Exit animation
    const tl = gsap.timeline({ delay: 3 });
    tl.to(counterRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => onComplete && onComplete(),
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div ref={counterRef}>
        <div className="preloader__counter">{count}</div>
        <div className="preloader__bar">
          <div className="preloader__bar-fill" ref={barFillRef} />
        </div>
      </div>
    </div>
  );
}
