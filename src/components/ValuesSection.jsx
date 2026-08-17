import React from 'react';
import { ShieldCheck, Award, Lightbulb, HeartHandshake, Award as Star, TrendingUp } from 'lucide-react';
import Container from './common/Container';
import SectionHeading from './common/SectionHeading';
import useScrollReveal from '../hooks/useScrollReveal';

export const ValuesSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.08 });

  const values = [
    {
      title: 'Integrity',
      desc: 'We believe in transparent and ethical business practices.',
      icon: ShieldCheck,
      color: 'text-blue-400 border-blue-500/30',
    },
    {
      title: 'Quality',
      desc: 'We focus on delivering dependable services and solutions.',
      icon: Award,
      color: 'text-indigo-400 border-indigo-500/30',
    },
    {
      title: 'Innovation',
      desc: 'We continuously explore better ways to solve business challenges.',
      icon: Lightbulb,
      color: 'text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'People First',
      desc: 'We value employees, candidates, clients, and partners.',
      icon: HeartHandshake,
      color: 'text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Professionalism',
      desc: 'We maintain high standards in communication and service delivery.',
      icon: Star,
      color: 'text-blue-300 border-blue-400/30',
    },
    {
      title: 'Growth',
      desc: 'We aim to create sustainable opportunities for businesses and professionals.',
      icon: TrendingUp,
      color: 'text-blue-500 border-blue-600/30',
    },
  ];

  return (
    <section id="values" ref={sectionRef} className="relative py-24 sm:py-32 bg-[#080B12] overflow-hidden">
      <Container>
        <SectionHeading
          badge="What Guides Us"
          title="Our Values"
          subtitle="Our principles define how we operate, build partnerships, and deliver consistent quality across technology and human capital."
          centered
          className="mb-16"
        />

        {/* 3 x 2 Grid Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-reveal
                className="group relative p-8 rounded-3xl glass-card glass-card-hover flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#05070D] border border-slate-700/80 group-hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 shadow-md">
                    <Icon className={`w-6 h-6 ${item.color.split(' ')[0]}`} />
                  </div>

                  <h3 className="text-h3 font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-body text-slate-300 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Guided Principle</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50 group-hover:bg-blue-400 transition-colors"></span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ValuesSection;
