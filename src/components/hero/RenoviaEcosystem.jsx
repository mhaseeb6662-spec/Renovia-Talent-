import React from 'react';
import { Cpu, Users, TrendingUp, Sparkles, ArrowDown, ArrowDownLeft, ArrowDownRight } from 'lucide-react';

export const RenoviaEcosystem = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto py-6 flex flex-col items-center justify-center pointer-events-auto">
      
      {/* TOP NODE: Technology */}
      <div className="relative p-4 rounded-2xl bg-slate-950/90 border border-blue-500/50 backdrop-blur-xl shadow-xl flex items-center gap-3 animate-float-slow transform hover:scale-105 transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 shrink-0">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Top Capability</span>
          <h4 className="text-xs font-bold text-white">Technology Solutions</h4>
        </div>
      </div>

      {/* Downward Connector Line */}
      <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500 via-amber-400 to-amber-500 animate-pulse my-1"></div>

      {/* CENTER NODE: RENOVIA TALENT HUB */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/20 text-center flex flex-col items-center justify-center group hover:scale-105 transition-all duration-500 my-1">
        
        {/* Glow Ring Behind Logo */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-blue-600/20 to-amber-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-amber-200 to-blue-900 mb-2 shadow-lg">
          <img
            src="/renovia-logo.jpg"
            alt="Renovia Talent Logo"
            className="w-full h-full object-cover rounded-full bg-slate-950"
          />
        </div>

        <h3 className="relative text-lg font-extrabold text-white tracking-tight">
          RENOVIA <span className="gold-gradient-text">TALENT</span>
        </h3>
        
        <p className="relative text-[9px] uppercase tracking-widest text-amber-400 font-bold mt-0.5">
          Central Digital Nexus
        </p>
      </div>

      {/* Branching Diagonal Connectors */}
      <div className="flex justify-between w-64 my-1">
        <div className="w-20 h-6 border-l-2 border-t-2 border-amber-400/50 rounded-tl-xl"></div>
        <div className="w-20 h-6 border-r-2 border-t-2 border-emerald-400/50 rounded-tr-xl"></div>
      </div>

      {/* BOTTOM NODES: Talent & Business */}
      <div className="flex items-center justify-between w-full max-w-sm gap-4">
        
        {/* Left Bottom Node: Talent */}
        <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-amber-500/50 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transform hover:scale-105 transition-all duration-300">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">Workforce</span>
            <h5 className="text-[11px] font-bold text-white">Talent</h5>
          </div>
        </div>

        {/* Right Bottom Node: Business */}
        <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/50 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transform hover:scale-105 transition-all duration-300">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Growth</span>
            <h5 className="text-[11px] font-bold text-white">Business</h5>
          </div>
        </div>

      </div>

    </div>
  );
};

export default RenoviaEcosystem;
