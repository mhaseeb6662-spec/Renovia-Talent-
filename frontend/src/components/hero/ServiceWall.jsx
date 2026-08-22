import React from 'react';
import { Code, Users, Layers, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServiceWall = ({ progress, onSelectService }) => {
  // Visible during corridor travel (progress between 0.2 and 0.85)
  // Opacity peaks around progress = 0.5
  let wallOpacity = 0;
  if (progress >= 0.2 && progress <= 0.85) {
    if (progress < 0.5) {
      wallOpacity = (progress - 0.2) / 0.3;
    } else {
      wallOpacity = (0.85 - progress) / 0.35;
    }
  }

  if (wallOpacity <= 0) return null;

  return (
    <div
      style={{ opacity: wallOpacity }}
      className="absolute inset-0 z-10 flex items-center justify-between px-4 sm:px-12 pointer-events-none transition-opacity duration-300 max-w-7xl mx-auto"
    >
      {/* LEFT WALL PANELS */}
      <div className="w-full sm:w-80 md:w-96 space-y-6 transform -rotate-y-6 hover:rotate-y-0 transition-transform duration-500">
        
        {/* Left Wall 1: Software & Technology Solutions */}
        <div className="p-6 rounded-2xl bg-slate-950/85 border border-blue-500/40 backdrop-blur-xl shadow-2xl shadow-blue-500/10 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-blue-500/30">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Left Wall Display</span>
              <h3 className="text-base font-bold text-white">Software & Technology</h3>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Website Development</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Software Development</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Application Development</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Custom Digital Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>IT Support & Maintenance</span>
            </div>
          </div>
        </div>

        {/* Left Wall 2: IT & Digital Services */}
        <div className="hidden sm:block p-5 rounded-2xl bg-slate-950/85 border border-indigo-500/40 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center gap-3 pb-2 border-b border-indigo-500/30">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-indigo-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">IT & Digital Services</h4>
              <p className="text-[10px] text-indigo-300">Digital Transformation & Consulting</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
            <span>• Digital Transformation</span>
            <span>• Web Solutions</span>
            <span>• Software Engineering</span>
            <span>• Tech Consulting</span>
          </div>
        </div>

      </div>

      {/* RIGHT WALL PANELS */}
      <div className="hidden md:block w-80 md:w-96 space-y-6 transform rotate-y-6 hover:rotate-y-0 transition-transform duration-500">
        
        {/* Right Wall 1: Recruitment & Staffing */}
        <div className="p-6 rounded-2xl bg-slate-950/85 border border-amber-500/40 backdrop-blur-xl shadow-2xl shadow-amber-500/10 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Right Wall Display</span>
              <h3 className="text-base font-bold text-white">Recruitment & Staffing</h3>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Technology Talent</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Customer Support Staff</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Administration Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Sales & Business Hiring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Remote Workforce Placement</span>
            </div>
          </div>
        </div>

        {/* Right Wall 2: Professional & Business Support */}
        <div className="p-5 rounded-2xl bg-slate-950/85 border border-emerald-500/40 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center gap-3 pb-2 border-b border-emerald-500/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Business Support</h4>
              <p className="text-[10px] text-emerald-300">Operations & Back-Office</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
            <span>• Back-Office Ops</span>
            <span>• Customer Support</span>
            <span>• Business Process</span>
            <span>• Remote Teams</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceWall;
