import React from 'react';
import { SearchCheck, Target, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import useScrollReveal from '../../hooks/useScrollReveal';

export const ServiceProcessSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.12 });

  const steps = [
    {
      step: '01',
      title: 'Requirement Scoping',
      description: 'We analyze your business objectives, technical stack, or workforce gaps to create a clear, transparent scope of work.',
      icon: SearchCheck,
    },
    {
      step: '02',
      title: 'Strategy & Talent Alignment',
      description: 'We map out the ideal engineering roadmap or select pre-vetted technology talent matched to your specific needs.',
      icon: Target,
    },
    {
      step: '03',
      title: 'Agile Execution',
      description: 'Development, talent placement, or remote operations setup begins swiftly with milestone tracking and open communication.',
      icon: Zap,
    },
    {
      step: '04',
      title: 'QA & Continuous Support',
      description: 'We deliver rigorous quality assurance, secure deployments, and ongoing support to ensure long-term operational success.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      
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
          className="mb-16 sm:mb-20"
        />

        {/* Refined Connected Process Path (NO CARDS, NO BOXES) */}
        <div className="relative max-w-[1440px] mx-auto">
          
          {/* Desktop Horizontal Glowing Line Connector */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-800/80 z-0 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-indigo-400/40 to-blue-500/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-48 h-full animate-shimmer" />
          </div>

          {/* Steps Grid (Open, Spacious Typography Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 items-start relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-reveal
                  className="group relative flex flex-col space-y-4 transition-all duration-300 hover:-translate-y-1"
                >
                  
                  {/* Step Node Row: Circular Glass Step Node + Minimal Icon Holder + Arrow */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      
                      {/* Circular Glass Step Node (01, 02, 03, 04) */}
                      <div className="w-14 h-14 rounded-full bg-[#080B12] border border-blue-500/40 flex items-center justify-center shadow-lg text-blue-300 font-extrabold text-lg group-hover:border-blue-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-300">
                        {item.step}
                      </div>

                      {/* Embedded Micro-Icon Badge */}
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-md group-hover:border-blue-400 group-hover:bg-blue-500/20 transition-all">
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>

                    </div>

                    {/* Desktop Directional Arrow (Steps 01, 02, 03) */}
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:flex items-center text-blue-400/60 group-hover:text-blue-400 transition-colors pl-2">
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Open Step Content Area (NO CARD BOX / NO BORDER CONTAINER) */}
                  <div className="pt-2 space-y-2.5">
                    
                    {/* Step Phase Label */}
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                      <span>PHASE {item.step}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-h3 font-bold text-white group-hover:text-blue-300 transition-colors [text-wrap:balance]">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-body text-slate-300 font-normal leading-relaxed">
                      {item.description}
                    </p>

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
