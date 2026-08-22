import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const el = containerRef.current;

    const ctx = gsap.context(() => {
      // Find all target reveal items (or reveal container itself)
      const targets = el.querySelectorAll('[data-reveal]');
      const items = targets.length > 0 ? targets : [el];

      // GSAP matchMedia for responsive animations
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isTablet: '(min-width: 640px) and (max-width: 1023px)',
          isMobile: '(max-width: 639px)',
        },
        (context) => {
          const { isMobile } = context.conditions;

          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: isMobile ? 16 : 28,
            },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.6 : 0.85,
              ease: 'power3.out',
              stagger: options.stagger !== undefined ? options.stagger : 0.1,
              scrollTrigger: {
                trigger: el,
                start: options.start || 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.stagger, options.start]);

  return containerRef;
};

export default useScrollReveal;
