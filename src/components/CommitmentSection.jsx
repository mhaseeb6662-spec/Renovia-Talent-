import React from 'react';
import { MessageSquareText, ShieldCheck, Award, Sparkles } from 'lucide-react';
import Container from './common/Container';

export const CommitmentSection = () => {
  const principles = [
    {
      title: 'Clear Communication',
      desc: 'Transparent status updates, active listening, and straightforward client alignment.',
      icon: MessageSquareText,
    },
    {
      title: 'Responsible Practices',
      desc: 'Strict confidentiality, ethical recruitment, and compliance in every engagement.',
      icon: ShieldCheck,
    },
    {
      title: 'Consistent Quality',
      desc: 'Rigorous talent vetting and technical verification for reliable execution.',
      icon: Award,
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#05070D] via-[#0D162B] to-[#05070D] overflow-hidden border-t border-slate-800/80">
      {/* Subtle Blue Ambient Depth Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:48px_48px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-label font-semibold">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Our Commitment</span>
          </div>

          <h2 className="text-h1 font-bold text-white tracking-tight leading-tight">
            Relationships Built on <span className="blue-gradient-text">Trust & Consistent Service</span>
          </h2>

          <p className="text-body-lg text-slate-300 font-normal leading-relaxed">
            We are committed to building lasting relationships with clients, candidates, employees, and business partners through responsible practices, clear communication, and consistent service quality.
          </p>
        </div>

        {/* 3 Supporting Visual Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-stretch">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#101621]/80 border border-slate-800 backdrop-blur-xl shadow-xl hover:border-blue-500/40 transition-all duration-300 group text-center flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform mb-6 shadow-lg shadow-blue-500/10">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-h3 font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-body text-slate-300 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CommitmentSection;
