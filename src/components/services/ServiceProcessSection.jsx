import React from 'react';
import { SearchCheck, Target, Zap, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import useScrollReveal from '../../hooks/useScrollReveal';

export const ServiceProcessSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.1 });

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
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Engagement Lifecycle"
          title="How We Deliver Services"
          subtitle="A transparent 4-step framework ensuring clarity, rapid execution, and ongoing support for your technology and workforce projects."
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-reveal
                className="group relative p-7 sm:p-8 rounded-3xl bg-[#080B12]/90 border border-slate-800/80 hover:border-blue-500/40 backdrop-blur-xl shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold blue-gradient-text">
                      STEP {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#05070D] border border-slate-700/80 group-hover:border-blue-400 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-h3 font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-body text-slate-300 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Renovia Lifecycle</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ServiceProcessSection;
