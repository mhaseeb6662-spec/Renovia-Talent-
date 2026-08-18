import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Users, MessageSquareText, Building2, Sparkles, ArrowRight } from 'lucide-react';
import Container from './common/Container';
import Button from './common/Button';
import useScrollReveal from '../hooks/useScrollReveal';

export const WhyChooseUs = ({ showCTA = true }) => {
  const navigate = useNavigate();
  const sectionRef = useScrollReveal({ stagger: 0.08 });

  const benefits = [
    {
      number: '01',
      title: 'Technology Expertise',
      description: 'Practical digital solutions designed around real business requirements.',
      icon: Cpu,
      accent: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    },
    {
      number: '02',
      title: 'Professional Talent',
      description: 'Access to skilled professionals across technology and business functions.',
      icon: Users,
      accent: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    },
    {
      number: '03',
      title: 'Responsive Service',
      description: 'Clear communication and dependable support throughout every engagement.',
      icon: MessageSquareText,
      accent: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10',
    },
    {
      number: '04',
      title: 'Business Understanding',
      description: "Solutions aligned with the client's operational needs and long-term goals.",
      icon: Building2,
      accent: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    },
  ];

  return (
    <section id="why-us" ref={sectionRef} className="relative py-24 lg:py-28 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      
      {/* Ambient Blue Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-14">
          
          {/* Section Header: Visually Integrated Header (No Giant Enclosing Card) */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Small Elegant Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101621] border border-blue-500/40 text-blue-300 text-label font-semibold shadow-lg shadow-blue-500/10">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>LET'S BUILD TOGETHER</span>
            </div>

            {/* Main Headline with Highlighted "Right Talent?" */}
            <h2 className="text-h1 font-bold text-white tracking-[-0.025em] leading-[1.08] [text-wrap:balance]">
              Looking for Technology Solutions or{' '}
              <span className="blue-gradient-text">the Right Talent?</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-body-lg text-slate-300 font-normal leading-relaxed max-w-[60ch] mx-auto">
              Tell us what your business needs. Renovia Talent can help you explore the right technology, staffing, or professional service solution.
            </p>

          </div>

          {/* 4 Equal-Height Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  data-reveal
                  className="group relative p-7 sm:p-8 rounded-3xl bg-[#090E1A]/90 border border-slate-800/80 hover:border-blue-500/40 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-blue-500/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-5">
                    {/* Top Marker & Icon Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-400/80 tracking-tight">
                        {item.number}
                      </span>

                      {/* 48-52px Icon Container */}
                      <div className={`w-12 h-12 rounded-2xl bg-[#05070D] border border-slate-700/80 group-hover:border-blue-400 flex items-center justify-center transition-all duration-300 shadow-md ${item.accent.split(' ')[0]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Card Title & Description */}
                    <div className="space-y-2.5">
                      <h3 className="text-h3 font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-body text-slate-300 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom "Renovia Standard" Footer Row */}
                  <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400">
                    <span>Renovia Standard</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]"></span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Action CTAs Section */}
          {showCTA && (
            <div className="pt-4 text-center space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  icon={Sparkles}
                  iconPosition="right"
                  className="w-auto"
                >
                  Let's Talk
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/services')}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-auto"
                >
                  Explore Services
                </Button>
              </div>

              <p className="text-xs text-slate-400 font-medium tracking-wide">
                Fast Response • Custom Scoping • Professional Service Delivery
              </p>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
