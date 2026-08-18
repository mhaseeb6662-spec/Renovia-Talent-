import React from 'react';
import { Cpu, Users, MessageSquareText, Building2 } from 'lucide-react';
import Container from './common/Container';
import SectionHeading from './common/SectionHeading';
import useScrollReveal from '../hooks/useScrollReveal';

export const WhyChooseUs = () => {
  const sectionRef = useScrollReveal({ stagger: 0.1 });

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

  return (
    <section id="why-us" ref={sectionRef} className="relative py-24 sm:py-32 bg-[#080B12] overflow-hidden">
      <Container>
        <SectionHeading
          badge="Why Renovia"
          title="A Practical Partner for Technology and Talent"
          subtitle="Renovia Talent aims to provide a combination of technology expertise, professional talent, responsive service, and business understanding. Whether a client needs technology development, workforce support, or digital services, our objective is to provide solutions aligned with their specific requirements."
          centered
          className="mb-16 max-w-4xl"
        />

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                data-reveal
                className="group relative p-8 rounded-3xl glass-card glass-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: 01 Number badge + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[32px] font-bold blue-gradient-text tracking-tight">
                      {item.number}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-[#05070D] border ${item.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-h3 font-semibold text-white group-hover:text-blue-300 transition-colors mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-body text-slate-300 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Renovia Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
