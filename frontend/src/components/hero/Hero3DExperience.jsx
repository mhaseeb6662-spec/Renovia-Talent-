import React, { useState, useEffect } from 'react';
import Container from '../common/Container';
import RenoviaPlanet3D from './RenoviaPlanet3D';
import HeroContent from './HeroContent';

export const Hero3DExperience = ({ onOpenContact }) => {
  const [scaleState, setScaleState] = useState(0.95);
  const [opacityState, setOpacityState] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setScaleState(1.0);
      setOpacityState(1.0);
      return;
    }

    setOpacityState(1.0);
    const scaleTimer = setTimeout(() => {
      setScaleState(1.0);
    }, 400);

    return () => clearTimeout(scaleTimer);
  }, []);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = -(e.clientY / innerHeight) * 2 + 1;
    setMousePos({ x: x * 0.4, y: y * 0.4 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] lg:min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden bg-[#030712] flex items-center"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:36px_36px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <Container className="relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT COLUMN (43% Desktop Width): Constrained Text Content */}
          <div className="lg:col-span-5 relative z-30">
            <HeroContent onOpenContact={onOpenContact} />
          </div>

          {/* RIGHT COLUMN (57% Desktop Width): FREE-FLOATING 3D RENOVIA PLANET */}
          <div
            style={{
              opacity: opacityState,
              transform: `scale(${scaleState})`,
              transition: 'opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="lg:col-span-7 relative z-20 w-full flex items-center justify-center"
          >
            <RenoviaPlanet3D mousePos={mousePos} />
          </div>

        </div>
      </Container>

      {/* Bottom Transition into Next Section */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero3DExperience;
