import React from 'react';
import { Eye, Compass, Target, GitMerge } from 'lucide-react';
import Container from './common/Container';

export const VisionMission = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Panel 1: Our Vision */}
          <div className="relative p-8 sm:p-12 rounded-3xl glass-card border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 shadow-2xl shadow-blue-500/10 group flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Badge & Abstract 3D Target/Sphere Visual */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-label font-semibold">
                  <Eye className="w-4 h-4" />
                  <span>Strategic Horizon</span>
                </div>

                {/* Abstract 3D Sphere / Target Icon visual */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-[#080B12] border border-blue-400/50 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-500/20">
                  <Target className="w-8 h-8 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400 animate-ping"></div>
                </div>
              </div>

              <h3 className="text-h2 font-bold text-white tracking-tight">
                Our <span className="blue-gradient-text">Vision</span>
              </h3>

              <p className="text-body-lg text-slate-300 font-normal leading-relaxed">
                To become a trusted technology and professional services partner known for innovation, reliability, transparency, and quality.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="font-semibold text-blue-400">Core Aspiration</span>
              <span>Long-Term Reliability</span>
            </div>
          </div>

          {/* Panel 2: Our Mission */}
          <div className="relative p-8 sm:p-12 rounded-3xl glass-card border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-500 shadow-2xl shadow-indigo-500/10 group flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Badge & Abstract 3D Network/Path Visual */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-400 text-label font-semibold">
                  <Compass className="w-4 h-4" />
                  <span>Purpose & Pathway</span>
                </div>

                {/* Abstract 3D Connected Path Icon visual */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-[#080B12] border border-indigo-400/50 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-lg shadow-indigo-500/20">
                  <GitMerge className="w-8 h-8 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 animate-ping"></div>
                </div>
              </div>

              <h3 className="text-h2 font-bold text-white tracking-tight">
                Our <span className="text-indigo-400">Mission</span>
              </h3>

              <p className="text-body-lg text-slate-300 font-normal leading-relaxed">
                Our mission is to connect people, technology, and business opportunities by providing practical technology solutions and professional workforce services that create long-term value.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="font-semibold text-indigo-400">Practical Execution</span>
              <span>Value Creation</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default VisionMission;
