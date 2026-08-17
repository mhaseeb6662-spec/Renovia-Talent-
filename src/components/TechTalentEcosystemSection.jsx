import React from 'react';
import { Cpu, Users, Globe, Code2, Smartphone, ShieldAlert, UserPlus, Headphones, Briefcase, Network, ArrowRightLeft } from 'lucide-react';
import Container from './common/Container';
import SectionHeading from './common/SectionHeading';

export const TechTalentEcosystemSection = () => {
  const techPillars = [
    { label: 'Website Development', icon: Globe },
    { label: 'Software Development', icon: Code2 },
    { label: 'Applications', icon: Smartphone },
    { label: 'IT Support', icon: ShieldAlert },
    { label: 'Digital Transformation', icon: Cpu },
  ];

  const peoplePillars = [
    { label: 'Recruitment', icon: UserPlus },
    { label: 'Staffing', icon: Users },
    { label: 'Remote Teams', icon: Network },
    { label: 'Customer Support', icon: Headphones },
    { label: 'Business Operations', icon: Briefcase },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Unified Ecosystem"
          title="One Partner. Multiple Capabilities."
          subtitle="Technology projects and workforce requirements often connect. Renovia Talent brings both capabilities together under one professional service model."
          centered
          className="mb-16"
        />

        {/* Central Ecosystem Interactive Diagram */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800 shadow-2xl shadow-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Technology Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-blue-500/30">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-body font-bold text-white uppercase tracking-wider">TECHNOLOGY</h3>
                  <p className="text-xs text-blue-400 font-medium">Digital Solutions & IT</p>
                </div>
              </div>

              <div className="space-y-3">
                {techPillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#080B12]/90 border border-slate-800 hover:border-blue-400/50 transition-all duration-300 flex items-center justify-between group hover:translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-body font-semibold text-slate-200 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-blue-400/60 group-hover:bg-blue-400 animate-pulse"></span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Center: RENOVIA TALENT Hub */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 lg:py-0 relative">
              
              {/* Connector lines behind */}
              <div className="hidden lg:block absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 pointer-events-none -z-10" />

              {/* Central Glowing Nexus Card */}
              <div className="relative p-8 rounded-full bg-gradient-to-b from-[#080B12] via-[#0B1C3D] to-[#080B12] border-2 border-blue-500/60 shadow-2xl shadow-blue-500/20 text-center w-56 h-56 flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-blue-300 to-indigo-900 mb-2 shadow-lg">
                  <img
                    src="/renovia-logo.jpg"
                    alt="Renovia Logo"
                    className="w-full h-full object-cover rounded-full bg-slate-950"
                  />
                </div>

                <h4 className="text-h3 font-bold text-white tracking-tight">
                  RENOVIA <span className="blue-gradient-text">TALENT</span>
                </h4>
                
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
                  Central Nexus
                </p>

                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[10px] font-semibold">
                  <ArrowRightLeft className="w-3 h-3" />
                  <span>Integrated</span>
                </div>
              </div>

            </div>

            {/* Right: People & Operations Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-blue-500/30">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-body font-bold text-white uppercase tracking-wider">PEOPLE & OPERATIONS</h3>
                  <p className="text-xs text-blue-400 font-medium">Talent & Workforce</p>
                </div>
              </div>

              <div className="space-y-3">
                {peoplePillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#080B12]/90 border border-slate-800 hover:border-blue-400/50 transition-all duration-300 flex items-center justify-between group hover:-translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-body font-semibold text-slate-200 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-blue-400/60 group-hover:bg-blue-400 animate-pulse"></span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default TechTalentEcosystemSection;
