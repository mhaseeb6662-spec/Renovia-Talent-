import React, { useRef, useState, useEffect } from 'react';
import { Cpu, Users, MessageSquareText, Building2 } from 'lucide-react';
import Container from './common/Container';
import SectionHeading from './common/SectionHeading';
import useScrollReveal from '../hooks/useScrollReveal';

// Interactive 3D Card with Dynamic Spotlight & Perspective Tilt
const Card3DItem = ({ item, index }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;
  }, []);

  const handleMouseMove = (e) => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables for cursor-follow radial spotlight
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Calculate 3D tilt angles (max ~5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) translateY(-5px)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-reveal
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative p-7 sm:p-8 rounded-3xl bg-[#080B12]/90 border ${
        isHovered ? 'border-blue-500/50 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25)]' : 'border-slate-800/80 shadow-xl shadow-black/40'
      } backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer will-change-transform`}
    >
      {/* Dynamic Radial Spotlight following cursor */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.16), transparent 80%)',
        }}
      />

      {/* Ambient Inner Lighting */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

      <div className="relative z-10 space-y-5">
        {/* Top Header: 01 Index Marker + Micro-Animated Icon Container */}
        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-extrabold blue-gradient-text tracking-tight group-hover:scale-105 transition-transform">
            {item.number}
          </span>

          {/* 48-52px Icon Container with Floating Micro-Animation */}
          <div
            className={`w-12 h-12 rounded-2xl bg-[#05070D] border ${item.accent} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md relative overflow-hidden`}
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform animate-float-slow" />
            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Card Title & Description */}
        <div className="space-y-2.5">
          <h3 className="text-h3 font-semibold text-white group-hover:text-blue-300 transition-colors [text-wrap:balance]">
            {item.title}
          </h3>

          <p className="text-body text-slate-300 font-normal leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom "Renovia Standard" Footer Row */}
      <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400">
        <span className="group-hover:text-slate-300 transition-colors">Renovia Standard</span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#3B82F6] group-hover:scale-125 transition-transform" />
      </div>

    </div>
  );
};

export const WhyChooseUs = () => {
  const sectionRef = useScrollReveal({ stagger: 0.12 });
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });

  const benefits = [
    {
      number: '01',
      title: 'Technology Expertise',
      description: 'Practical digital solutions designed around real business requirements.',
      icon: Cpu,
      accent: 'border-blue-500/40 text-blue-400',
    },
    {
      number: '02',
      title: 'Professional Talent',
      description: 'Access to skilled professionals across technology and business functions.',
      icon: Users,
      accent: 'border-blue-500/40 text-blue-400',
    },
    {
      number: '03',
      title: 'Responsive Service',
      description: 'Clear communication and dependable support throughout every engagement.',
      icon: MessageSquareText,
      accent: 'border-indigo-500/40 text-indigo-400',
    },
    {
      number: '04',
      title: 'Business Understanding',
      description: "Solutions aligned with the client's operational needs and long-term goals.",
      icon: Building2,
      accent: 'border-emerald-500/40 text-emerald-400',
    },
  ];

  // Mouse Parallax for Background Lighting
  const handleSectionMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    setParallaxPos({ x: x * 15, y: y * 15 });
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative py-24 sm:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80"
    >
      {/* Interactive Mouse-Parallax Background Radial Glows */}
      <div
        style={{
          transform: `translate3d(${parallaxPos.x}px, ${parallaxPos.y}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full"
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background Subtle Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:36px_36px] opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <SectionHeading
          badge="Why Renovia"
          title="A Practical Partner for Technology and Talent"
          subtitle="Renovia Talent aims to provide a combination of technology expertise, professional talent, responsive service, and business understanding tailored to your operational goals."
          centered
          className="mb-16 max-w-4xl"
        />

        {/* 4 Benefit Cards Grid with Subtle SVG Desktop Connectors */}
        <div className="relative">
          
          {/* Subtle SVG Desktop Card Connectors */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6.5 items-stretch relative z-10">
            {benefits.map((item, index) => (
              <Card3DItem key={item.number} item={item} index={index} />
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};

export default WhyChooseUs;
