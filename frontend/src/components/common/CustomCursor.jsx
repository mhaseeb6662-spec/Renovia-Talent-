import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on fine-pointer desktop devices (no touch/mobile)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isFinePointer || prefersReducedMotion) return;

    // Enable custom cursor CSS class on body
    document.body.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Optimized GSAP quickTo setters for 60 FPS smooth movement
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach mouse event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clickable Target Hover Detection
    const handleTargetOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, .glass-card-hover, [role="button"]');
      if (target) {
        setIsHovered(true);
      }
    };

    const handleTargetOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, .glass-card-hover, [role="button"]');
      if (target) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleTargetOver);
    document.addEventListener('mouseout', handleTargetOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleTargetOver);
      document.removeEventListener('mouseout', handleTargetOut);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Inner Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#3B82F6] transition-transform duration-200 ${
          isHovered ? 'scale-50' : 'scale-100'
        }`}
      />

      {/* Outer Lag Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/60 backdrop-blur-[1px] transition-all duration-300 ${
          isHovered
            ? 'w-12 h-12 bg-blue-500/15 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-110'
            : 'w-8 h-8 bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.15)] scale-100'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
