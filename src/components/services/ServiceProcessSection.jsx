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
      microPulse: 'group-hover:animate-pulse',
    },
    {
      step: '02',
      title: 'Strategy & Talent Alignment',
      description: 'We map out the ideal engineering roadmap or select pre-vetted technology talent matched to your specific needs.',
      icon: Target,
      microPulse: 'group-hover:rotate-45',
    },
    {
      step: '03',
      title: 'Agile Execution',
      description: 'Development, talent placement, or remote operations setup begins swiftly with milestone tracking and open communication.',
      icon: Zap,
      microPulse: 'group-hover:scale-125',
    },
    {
      step: '04',
      title: 'QA & Continuous Support',
      description: 'We deliver rigorous quality assurance, secure deployments, and ongoing support to ensure long-term operational success.',
      icon: ShieldCheck,
      microPulse: 'group-hover:text-emerald-400',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />
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

        {/* Desktop Connected Horizontal Flow (1024px+) & Mobile/Tablet Timelines */}
        <div className="relative max-w-[1440px] mx-auto">
          
          {/* Desktop Horizontal Connecting Arrow Line with Light Pulse */}
          <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-slate-800/80 z-0 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-indigo-400/40 to-blue-500/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-48 h-full animate-shimmer" />
          </div>

          {/* Steps Grid Composition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-reveal
                  className="group relative flex flex-col space-y-5 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Step Node Header (01 + Icon + Arrow) */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      
                      {/* Step Number Node */}
                      <div className="w-14 h-14 rounded-2xl bg-[#080B12] border border-blue-500/40 flex items-center justify-center shadow-lg text-blue-300 font-extrabold text-lg group-hover:border-blue-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                        {item.step}
                      </div>

                      {/* Icon Badge */}
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-md">
                        <Icon className={`w-5 h-5 transition-all duration-300 ${item.microPulse}`} />
                      </div>

                    </div>

                    {/* Desktop Connector Arrow indicator for steps 01, 02, 03 */}
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:flex items-center text-blue-400/60 group-hover:text-blue-400 transition-colors pl-2">
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Step Card Content Container */}
                  <div className="p-6 sm:p-7 rounded-3xl bg-[#080B12]/80 border border-slate-800/80 group-hover:border-blue-500/40 backdrop-blur-xl shadow-xl group-hover:shadow-blue-500/10 transition-all duration-300 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="text-h3 font-semibold text-white group-hover:text-blue-300 transition-colors [text-wrap:balance]">
                        {item.title}
                      </h3>

                      <p className="text-body text-slate-300 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                      <span>Phase {item.step}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]" />
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
