import React from 'react';
import { SearchCheck, Target, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import useScrollReveal from '../../hooks/useScrollReveal';

export const ServiceProcessSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.15 });

  const steps = [
    {
      step: '01',
      title: 'Requirement Scoping',
      description: 'We analyze your business objectives, technical stack, or workforce gaps to create a clear, transparent scope of work.',
      icon: SearchCheck,
      offsetClass: 'lg:mt-32',
    },
    {
      step: '02',
      title: 'Strategy & Talent Alignment',
      description: 'We map out the ideal engineering roadmap or select pre-vetted technology talent matched to your specific needs.',
      icon: Target,
      offsetClass: 'lg:mt-20',
    },
    {
      step: '03',
      title: 'Agile Execution',
      description: 'Development, talent placement, or remote operations setup begins swiftly with milestone tracking and open communication.',
      icon: Zap,
      offsetClass: 'lg:mt-10',
    },
    {
      step: '04',
      title: 'QA & Continuous Support',
      description: 'We deliver rigorous quality assurance, secure deployments, and ongoing support to ensure long-term operational success.',
      icon: ShieldCheck,
      offsetClass: 'lg:mt-0',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:36px_36px] opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <SectionHeading
          badge="Engagement Lifecycle"
          title="How We Deliver Services"
          subtitle="A transparent 4-step framework ensuring clarity, rapid execution, and ongoing support for your technology and workforce projects."
          centered
          className="mb-20 sm:mb-24"
        />

        {/* 3D Rising Staircase Journey (NO CARDS) */}
        <div className="relative max-w-[1440px] mx-auto">
          
          {/* Continuous Rising Stair Line Connector (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="stairLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M 100 240 L 350 170 L 600 100 L 850 30"
                fill="none"
                stroke="url(#stairLineGrad)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {/* 4 Rising Stair Platforms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-end relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-reveal
                  className={`group relative flex flex-col justify-end ${item.offsetClass} transition-all duration-500 hover:-translate-y-2`}
                >
                  
                  {/* Step Header: Large Number Node + Minimal Icon Holder (NO CARD BOX) */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold blue-gradient-text tracking-tight group-hover:scale-110 transition-transform">
                      {item.step}
                    </span>

                    {/* Minimal Icon Holder */}
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-md group-hover:border-blue-400 group-hover:bg-blue-500/20 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Upward Arrow Icon */}
                    {idx < steps.length - 1 && (
                      <TrendingUp className="w-4 h-4 text-blue-400/60 group-hover:text-blue-400 ml-auto hidden lg:block animate-pulse" />
                    )}
                  </div>

                  {/* Top-Edge Cyan/Blue Stair Highlight Surface (NO ENCLOSED CARD BOX) */}
                  <div className="relative pt-4 pb-2 border-t-2 border-blue-400/80 shadow-[0_-4px_16px_rgba(59,130,246,0.35)] group-hover:border-blue-300 transition-colors">
                    
                    {/* Glowing Traveling Light Pulse Node */}
                    <div className="absolute -top-[5px] left-0 w-3 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60A5FA] group-hover:w-6 transition-all duration-300" />

                    {/* Step Title */}
                    <h3 className="text-h3 font-bold text-white group-hover:text-blue-300 transition-colors mb-2 [text-wrap:balance]">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-body text-slate-300 font-normal leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                      <span>STAIR LEVEL {item.step}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default ServiceProcessSection;
