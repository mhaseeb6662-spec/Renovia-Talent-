import React from 'react';
import { Sparkles, Building2 } from 'lucide-react';

export const EntranceScene = ({ progress }) => {
  // Fade out as camera advances (opacity drops from 1 to 0 as progress goes from 0.0 to 0.35)
  const opacity = Math.max(0, 1 - progress / 0.35);

  if (opacity <= 0) return null;

  return (
    <div
      style={{ opacity }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-500"
    >
      {/* Soft Architectural Wall Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/15 blur-3xl" />

      {/* Reception Architectural Wall Card */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-950/80 border border-amber-500/30 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 max-w-lg mx-auto flex flex-col items-center space-y-6">
        
        {/* Architectural Reception Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Renovia Global Headquarters Entrance</span>
        </div>

        {/* Company Logo — Architectural Wall Mount */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-amber-200 to-blue-900 shadow-2xl shadow-amber-500/30">
          <img
            src="/renovia-logo.jpg"
            alt="Renovia Talent Logo"
            className="w-full h-full object-cover rounded-full bg-slate-950"
          />
        </div>

        {/* Reception Wall Typography */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            RENOVIA <span className="gold-gradient-text">TALENT</span>
          </h2>
          
          <p className="text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-bold">
            Technology • Talent • Business Solutions
          </p>
        </div>

        {/* Entrance Indicator */}
        <div className="pt-4 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>Entering Digital Innovation Center...</span>
        </div>

      </div>
    </div>
  );
};

export default EntranceScene;
