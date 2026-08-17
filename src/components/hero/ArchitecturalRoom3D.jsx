import React from 'react';
import { Code, Users, Layers, Headphones, CheckCircle2, Building2, Sparkles } from 'lucide-react';

export const ArchitecturalRoom3D = ({ timelineTime, mousePos }) => {
  // Timeline Time (0.0s to 6.0s+)
  // Stage 1 (0.0s - 0.8s): Entrance Visible outside room
  // Stage 2 (0.8s - 2.0s): Camera moves forward into room
  // Stage 3 (1.5s - 3.5s): Software & Tech (Left) & Recruitment (Right) Screens illuminate
  // Stage 4 (3.5s - 5.0s): IT Services (Left) & Business Support (Right) Screens reveal
  // Stage 5 (5.0s - 6.0s+): Settled inside main digital room with back reception wall dominant

  // Calculate Camera Z Travel (-220px at 0s down to 0px at 5.5s)
  const cameraZ = Math.min(0, -220 + Math.min(timelineTime, 5.5) * 40);
  
  // Calculate Room Scale (0.85 at 0s up to 1.0 at 5.5s)
  const roomScale = Math.min(1.0, 0.85 + Math.min(timelineTime, 5.5) * 0.027);

  // Left & Right Wall Screen Illuminations based on timelineTime
  const leftScreen1Opacity = timelineTime >= 1.2 ? Math.min(1, (timelineTime - 1.2) / 0.8) : 0.2;
  const rightScreen1Opacity = timelineTime >= 2.0 ? Math.min(1, (timelineTime - 2.0) / 0.8) : 0.2;
  const leftScreen2Opacity = timelineTime >= 3.2 ? Math.min(1, (timelineTime - 3.2) / 0.8) : 0.2;
  const rightScreen2Opacity = timelineTime >= 4.0 ? Math.min(1, (timelineTime - 4.0) / 0.8) : 0.2;
  const backWallHighlight = timelineTime >= 4.8 ? Math.min(1, (timelineTime - 4.8) / 0.8) : 0.4;

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden bg-[#040816] border border-slate-700/80 shadow-2xl shadow-black perspective-1200">
      
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-[#070E24] to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 3D PHYSICAL SPATIAL ROOM CONTAINER */}
      <div
        className="relative w-full h-full transform-style-3d transition-transform duration-100 flex items-center justify-center"
        style={{
          transform: `translateZ(${cameraZ}px) scale(${roomScale}) rotateY(${mousePos.x * 3}deg) rotateX(${mousePos.y * -2}deg)`,
        }}
      >
        {/* ==================== 1. CEILING PLANE ==================== */}
        <div className="absolute -top-12 inset-x-0 h-40 bg-gradient-to-b from-[#020510] to-transparent border-b border-slate-800/80 flex justify-between px-16 pointer-events-none">
          {/* Ceiling Recessed Gold Light Strip */}
          <div className="w-1.5 h-full bg-amber-400 shadow-[0_0_20px_#D4AF37] opacity-80" />
          {/* Ceiling Recessed Blue Light Strip */}
          <div className="w-1.5 h-full bg-blue-500 shadow-[0_0_20px_#3B82F6] opacity-80" />
        </div>

        {/* ==================== 2. FLOOR PLANE ==================== */}
        <div className="absolute -bottom-12 inset-x-0 h-44 bg-gradient-to-t from-[#02040D] via-[#070D22] to-transparent border-t border-slate-800/80 flex justify-between px-16 pointer-events-none">
          {/* Floor Edge Light Strips */}
          <div className="w-1 h-full bg-blue-500/60 shadow-[0_0_15px_#3B82F6]" />
          <div className="w-1 h-full bg-amber-400/60 shadow-[0_0_15px_#D4AF37]" />
        </div>

        {/* ==================== 3. LEFT WALL & INTEGRATED SCREENS ==================== */}
        <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-64 sm:w-72 space-y-5 z-20 transition-all duration-500">
          
          {/* Left Screen 1: Software & Technology */}
          <div
            style={{ opacity: leftScreen1Opacity }}
            className="p-5 rounded-2xl bg-slate-950/90 border border-blue-500/50 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 space-y-3 transform -rotate-y-6 hover:rotate-y-0 transition-all duration-500"
          >
            <div className="flex items-center gap-3 pb-2 border-b border-blue-500/30">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 shrink-0">
                <Code className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400">Left Wall Screen 1</span>
                <h4 className="text-sm font-bold text-white">Software & Technology</h4>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-200">
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
                <span>Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>IT Support</span>
              </div>
            </div>
          </div>

          {/* Left Screen 2: IT & Digital Services */}
          <div
            style={{ opacity: leftScreen2Opacity }}
            className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/40 backdrop-blur-2xl shadow-2xl space-y-2 transform -rotate-y-6 transition-all duration-500"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-purple-500/30">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-400 shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <h5 className="text-xs font-bold text-white">IT & Digital Services</h5>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>• Digital Transformation</div>
              <div>• Software Engineering</div>
              <div>• Technology Consulting</div>
            </div>
          </div>

        </div>

        {/* ==================== 4. RIGHT WALL & INTEGRATED SCREENS ==================== */}
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-64 sm:w-72 space-y-5 z-20 transition-all duration-500">
          
          {/* Right Screen 1: Recruitment & Staffing */}
          <div
            style={{ opacity: rightScreen1Opacity }}
            className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/50 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 space-y-3 transform rotate-y-6 hover:rotate-y-0 transition-all duration-500"
          >
            <div className="flex items-center gap-3 pb-2 border-b border-amber-500/30">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Right Wall Screen 1</span>
                <h4 className="text-sm font-bold text-white">Recruitment & Staffing</h4>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Technology Talent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Sales Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Administration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Customer Support</span>
              </div>
            </div>
          </div>

          {/* Right Screen 2: Business Support */}
          <div
            style={{ opacity: rightScreen2Opacity }}
            className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 backdrop-blur-2xl shadow-2xl space-y-2 transform rotate-y-6 transition-all duration-500"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-500/30">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <h5 className="text-xs font-bold text-white">Business Support</h5>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>• Customer Support</div>
              <div>• Back-Office Operations</div>
              <div>• Remote Workforce</div>
            </div>
          </div>

        </div>

        {/* ==================== 5. FAR BACK RECEPTION WALL (FOCAL POINT & SINGLE LOGO) ==================== */}
        <div
          style={{ opacity: backWallHighlight }}
          className="relative z-10 p-8 sm:p-10 rounded-3xl bg-slate-950/95 border-2 border-amber-500/50 backdrop-blur-2xl shadow-2xl shadow-amber-500/20 text-center max-w-xs sm:max-w-sm mx-auto space-y-4 transform transition-all duration-700 hover:scale-105"
        >
          {/* Back Wall Architectural Reception Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Software House Reception</span>
          </div>

          {/* MOUNTED ILLUMINATED RECEPTION LOGO (SINGLE INSTANCE) */}
          <div className="relative w-24 h-24 mx-auto rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-amber-200 to-blue-900 shadow-2xl shadow-amber-500/30">
            <img
              src="/renovia-logo.jpg"
              alt="Renovia Talent Logo"
              className="w-full h-full object-cover rounded-full bg-slate-950"
            />
          </div>

          {/* Reception Sign Typography */}
          <div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              RENOVIA <span className="gold-gradient-text">TALENT</span>
            </h3>
            
            <p className="text-[11px] uppercase tracking-widest text-amber-400 font-bold mt-1">
              Technology • Talent • Business Solutions
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ArchitecturalRoom3D;
