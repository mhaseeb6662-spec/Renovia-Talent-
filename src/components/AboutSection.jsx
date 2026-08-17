import React from 'react';
import { Cpu, Users, TrendingUp, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Container from './common/Container';
import SectionHeading from './common/SectionHeading';
import useScrollReveal from '../hooks/useScrollReveal';

export const AboutSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.12 });

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 bg-[#05070D] overflow-hidden">
      {/* Subtle Blue Background Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Side (Left) */}
          <div className="lg:col-span-6 space-y-6" data-reveal>
            <SectionHeading
              badge="About Renovia Talent"
              title="Connecting Technology, People, and Business"
            />

            <div className="space-y-4 text-body-lg text-slate-300 font-normal leading-relaxed">
              <p>
                Renovia Talent is a technology and professional services company focused on delivering reliable digital solutions, technology talent, and business support services to organizations and individuals.
              </p>
              <p>
                We combine technology, skilled professionals, and service excellence to help businesses improve their operations, develop digital capabilities, and build strong teams.
              </p>
            </div>

            {/* Core Synergy Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" data-reveal>
              <div className="p-4 rounded-2xl bg-[#101621]/80 border border-slate-800/80 backdrop-blur-md flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body font-semibold text-white">Integrated Solutions</h4>
                  <p className="text-xs text-slate-400 font-normal mt-1">Bridging custom software and human resource needs.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#101621]/80 border border-slate-800/80 backdrop-blur-md flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body font-semibold text-white">Service Excellence</h4>
                  <p className="text-xs text-slate-400 font-normal mt-1">Transparent, dependable delivery models for long-term growth.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Layered 3D Diagram Side (Right) */}
          <div className="lg:col-span-6 relative" data-reveal>
            <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 shadow-2xl shadow-black/80 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <span className="text-label text-blue-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  Renovia Value Chain Diagram
                </span>
                <span className="text-xs text-slate-400 font-normal">Integrated Synergy</span>
              </div>

              {/* Ecosystem Flow Nodes */}
              <div className="space-y-4">
                
                {/* Node 1: Technology */}
                <div className="relative p-5 rounded-2xl bg-[#080B12]/90 border border-blue-500/30 backdrop-blur-md flex items-center justify-between group hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-h3 font-semibold text-white">1. Digital Technology</h4>
                      <p className="text-xs text-slate-400 font-normal">Software, web apps & IT infrastructure</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400/60 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Connector Arrow Line */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 via-blue-400 to-indigo-500 animate-pulse"></div>
                </div>

                {/* Node 2: Talent */}
                <div className="relative p-5 rounded-2xl bg-[#080B12]/90 border border-blue-500/40 backdrop-blur-md flex items-center justify-between group hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-blue-500/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-h3 font-semibold text-white">2. Skilled Professionals</h4>
                      <p className="text-xs text-slate-400 font-normal">Recruitment, staffing & specialized workforce</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400/60 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Connector Arrow Line */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 via-indigo-500 to-emerald-500 animate-pulse"></div>
                </div>

                {/* Node 3: Business Growth */}
                <div className="relative p-5 rounded-2xl bg-[#080B12]/90 border border-emerald-500/30 backdrop-blur-md flex items-center justify-between group hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-h3 font-semibold text-white">3. Business Growth</h4>
                      <p className="text-xs text-slate-400 font-normal">Operational excellence & scalable performance</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">Target Outcome</span>
                </div>

              </div>

              {/* Bottom Ecosystem Note */}
              <div className="pt-2 text-center text-xs text-slate-400 font-normal">
                Unified Service Delivery Model for Modern Enterprises
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
