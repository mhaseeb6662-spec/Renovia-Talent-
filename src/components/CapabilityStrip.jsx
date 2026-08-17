import React, { useEffect, useRef } from 'react';
import { Code2, UserCheck, Layers, Headphones } from 'lucide-react';
import { gsap } from '../lib/gsap';

export const CapabilityStrip = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const capabilities = [
    {
      title: 'Software Development',
      icon: Code2,
      desc: 'Web, Mobile & Enterprise Applications',
    },
    {
      title: 'Recruitment & Staffing',
      icon: UserCheck,
      desc: 'Tech, Admin & Customer Support Talent',
    },
    {
      title: 'Digital Services',
      icon: Layers,
      desc: 'Consulting & Digital Transformation',
    },
    {
      title: 'Business Support',
      icon: Headphones,
      desc: 'Back-Office & Remote Workforce Solutions',
    },
  ];

  // Quadruplicated set to guarantee continuous mathematical seamless loop (A B C D A B C D A B C D A B C D)
  const duplicatedCapabilities = [
    ...capabilities,
    ...capabilities,
    ...capabilities,
    ...capabilities,
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current) return;

    const track = trackRef.current;

    // Create GSAP continuous infinite loop traveling LEFT -> RIGHT
    // Animating xPercent from -50% to 0% produces seamless LEFT to RIGHT movement!
    const tween = gsap.fromTo(
      track,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: 'none',
        duration: 32,
        repeat: -1,
      }
    );

    tweenRef.current = tween;

    return () => {
      if (tween) tween.kill();
    };
  }, []);

  // Gently reduce speed by ~35% on desktop hover
  const handleMouseEnter = () => {
    if (tweenRef.current && window.innerWidth >= 1024) {
      gsap.to(tweenRef.current, { timeScale: 0.65, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current && window.innerWidth >= 1024) {
      gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.5, ease: 'power2.out' });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 py-7 bg-[#080B12]/95 border-y border-slate-800/80 backdrop-blur-xl overflow-hidden"
    >
      {/* Edge Gradient Mask for Subtle Left/Right Fade */}
      <div className="absolute inset-0 pointer-events-none z-10 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]" />

      {/* Infinite Horizontal Marquee Track (Left -> Right Motion) */}
      <div className="flex w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center shrink-0 space-x-6 sm:space-x-10 pl-4 will-change-transform"
        >
          {duplicatedCapabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-[#101621]/60 border border-slate-800/70 hover:border-blue-500/40 backdrop-blur-md shrink-0 w-[280px] sm:w-[360px] lg:w-[420px] transition-all duration-300 group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#05070D] border border-slate-700/80 group-hover:border-blue-500/50 flex items-center justify-center text-blue-400 group-hover:text-blue-300 shadow-md group-hover:shadow-blue-500/10 transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <div className="text-left overflow-hidden">
                  <h3 className="text-body font-semibold text-white group-hover:text-blue-300 transition-colors whitespace-nowrap">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilityStrip;
