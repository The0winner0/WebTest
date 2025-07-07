// FadeInSection.js
"use client";
import { useState, useRef, useEffect } from 'react';

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        // The delay is added here
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(20px)',
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;