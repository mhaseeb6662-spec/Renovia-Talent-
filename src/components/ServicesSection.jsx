import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, UserCheck, Layers, Headphones, ArrowRight, Sparkles } from 'lucide-react';
import Container from './common/Container';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const servicesData = [
  {
    id: 'software-solutions',
    number: '01',
    title: 'Software & Technology',
    line: 'Web, software and digital solutions built around business needs.',
    keywords: ['WEB', 'SOFTWARE', 'APPLICATIONS', 'IT SUPPORT'],
    description: 'We provide technology services including website development, software development, application development, IT support, and customized digital solutions.',
    icon: Code,
    accentColor: '#3B82F6',
    features: [
      'Website Development & Redesign',
      'Custom Software & SaaS Platforms',
      'Mobile Application Development',
      'IT Support & Maintenance Services',
      'Tailored Enterprise Solutions'
    ]
  },
  {
    id: 'recruitment-staffing',
    number: '02',
    title: 'Recruitment & Staffing',
    line: 'Qualified professionals across technology, sales and business functions.',
    keywords: ['TECH TALENT', 'SUPPORT', 'ADMIN', 'SALES'],
    description: 'Renovia Talent connects organizations with qualified professionals across technology, customer support, administration, sales, and other business functions.',
    icon: UserCheck,
    accentColor: '#2563EB',
    features: [
      'Technology & Engineering Hiring',
      'Customer Support & Service Roles',
      'Administrative & Operational Staffing',
      'Sales & Revenue Generation Professionals',
      'Employer Requirement Matching'
    ]
  },
  {
    id: 'it-digital-services',
    number: '03',
    title: 'IT & Digital Services',
    line: 'Digital transformation, engineering and technology consulting.',
    keywords: ['TRANSFORMATION', 'ENGINEERING', 'CONSULTING'],
    description: 'We support businesses with digital transformation initiatives, web solutions, software engineering, technology consulting, and other IT-enabled services.',
    icon: Layers,
    accentColor: '#8B5CF6',
    features: [
      'Digital Transformation Consulting',
      'Web & Application Engineering',
      'Cloud & Infrastructure Advisory',
      'Technology Strategy Alignment',
      'IT-Enabled Business Processes'
    ]
  },
  {
    id: 'business-support',
    number: '04',
    title: 'Business Support',
    line: 'Operational support, back-office operations and remote workforce.',
    keywords: ['OPERATIONS', 'BACK OFFICE', 'REMOTE TEAMS'],
    description: 'Our services include customer support, back-office operations, business process support, and remote workforce solutions based on client requirements.',
    icon: Headphones,
    accentColor: '#10B981',
    features: [
      'Multi-Channel Customer Support',
      'Back-Office Operations & Data Management',
      'Business Process Outsourcing (BPO)',
      'Remote Workforce Placement',
      'Scalable Operational Extensions'
    ]
  }
];

export const ServicesSection = ({ onSelectService }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3, 4 (all settled)
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const stage = stageRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP ONLY: Controlled GSAP ScrollTrigger Sequence with pin
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top+=60',
            end: '+=1100',
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.22) setActiveStep(0);
              else if (p < 0.45) setActiveStep(1);
              else if (p < 0.68) setActiveStep(2);
              else if (p < 0.88) setActiveStep(3);
              else setActiveStep(4);
            },
          },
        });

        // Stage 1 to Stage 4 3D spatial rotation sequence
        tl.to(stage, { rotateY: 3, rotateX: -2, ease: 'none', duration: 1 })
          .to(stage, { rotateY: -3, rotateX: 2, ease: 'none', duration: 1 })
          .to(stage, { rotateY: 0, rotateX: 0, ease: 'none', duration: 1 });
      });

      // TABLET: Reduced ScrollTrigger without pinning
      mm.add('(min-width: 640px) and (max-width: 1023px)', () => {
        gsap.fromTo(
          stage,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-24 bg-[#05070D] overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Subtle Background Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <Container className="relative z-10 w-full max-w-[1400px]">
        
        {/* TOP CENTER: SMALL SECTION BADGE IDENTIFIER ONLY */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101621] border border-blue-500/40 text-blue-300 text-label font-semibold shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>WHAT WE DO</span>
          </div>
        </div>

        {/* MAIN 3D INTERACTIVE SERVICE ARCHITECTURE (85-100% SECTION WIDTH) */}
        <div className="relative w-full">
          
          {/* Desktop 3D Stage (Transparent Background, No Giant Outer Box) */}
          <div
            ref={stageRef}
            className="relative w-full min-h-[580px] lg:min-h-[640px] perspective-1200 transform-style-3d hidden sm:flex items-center justify-center p-4"
          >
            {/* ================= CENTRAL ARCHITECTURAL CORE WITH OFFICIAL RENOVIA TALENT LOGO ================= */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-blue-500/50 bg-[#080B12]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(37,99,235,0.25)] flex items-center justify-center p-3.5 sm:p-4 group transition-transform duration-700 hover:scale-105">
              {/* Rotating Outer Architectural Blue Ring */}
              <div className="absolute inset-0 rounded-full border border-blue-400/30 border-dashed animate-spin [animation-duration:30s] pointer-events-none" />
              <div className="absolute -inset-2 rounded-full border border-blue-500/20 pointer-events-none" />

              {/* Official Renovia Talent Logo Image */}
              <div className="w-full h-full rounded-full overflow-hidden p-1 bg-slate-950/80 border border-blue-400/30 shadow-inner flex items-center justify-center">
                <img
                  src="/renovia-logo.jpg"
                  alt="Official Renovia Talent Logo"
                  className="w-full h-full object-contain rounded-full bg-slate-950 transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>

            {/* SVG Vector Connector Lines linked to Central Core */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Top-Left Connector (Software & Tech) */}
              <line x1="26%" y1="26%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity={activeStep === 0 ? 0.85 : 0.2} strokeDasharray="6 4" />
              {/* Top-Right Connector (Recruitment) */}
              <line x1="74%" y1="26%" x2="50%" y2="50%" stroke="#2563EB" strokeWidth="1.5" strokeOpacity={activeStep === 1 ? 0.85 : 0.2} strokeDasharray="6 4" />
              {/* Bottom-Left Connector (IT & Digital) */}
              <line x1="26%" y1="74%" x2="50%" y2="50%" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity={activeStep === 2 ? 0.85 : 0.2} strokeDasharray="6 4" />
              {/* Bottom-Right Connector (Business Support) */}
              <line x1="74%" y1="74%" x2="50%" y2="50%" stroke="#10B981" strokeWidth="1.5" strokeOpacity={activeStep === 3 ? 0.85 : 0.2} strokeDasharray="6 4" />
            </svg>

            {/* ================= 4 ARCHITECTURAL SERVICE PLANES IN 3D DEPTH ================= */}
            
            {/* PLANE 01: Software & Technology (Top-Left) */}
            <div
              onClick={() => onSelectService(servicesData[0])}
              style={{
                transform: activeStep === 0
                  ? 'translate3d(-24px, -24px, 60px) scale(1.05)'
                  : 'translate3d(0px, 0px, -20px) scale(0.95)',
                opacity: activeStep === 0 || activeStep === 4 ? 1 : 0.45,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute top-4 left-4 sm:left-12 w-68 sm:w-80 p-5 sm:p-6 rounded-3xl bg-[#080B12]/90 border ${
                activeStep === 0 ? 'border-blue-400 shadow-2xl shadow-blue-500/25' : 'border-slate-800'
              } backdrop-blur-xl z-20 cursor-pointer group hover:scale-[1.05]`}
            >
              {/* Architectural Outline Number */}
              <div className="absolute -top-4 -left-2 text-5xl font-black text-blue-500/10 pointer-events-none select-none">
                01
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">01 CAPABILITY</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                Software & Technology
              </h3>

              {/* ONLY ACTIVE STEP SHOWS FULL 1-LINE COPY & KEYWORDS */}
              {activeStep === 0 ? (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {servicesData[0].line}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {servicesData[0].keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-[9px] font-semibold text-blue-300 border border-blue-500/20">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 font-normal truncate">
                  Web, software and custom digital solutions
                </p>
              )}
            </div>

            {/* PLANE 02: Recruitment & Staffing (Top-Right) */}
            <div
              onClick={() => onSelectService(servicesData[1])}
              style={{
                transform: activeStep === 1
                  ? 'translate3d(24px, -24px, 60px) scale(1.05)'
                  : 'translate3d(0px, 0px, -20px) scale(0.95)',
                opacity: activeStep === 1 || activeStep === 4 ? 1 : 0.45,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute top-4 right-4 sm:right-12 w-68 sm:w-80 p-5 sm:p-6 rounded-3xl bg-[#080B12]/90 border ${
                activeStep === 1 ? 'border-blue-400 shadow-2xl shadow-blue-500/25' : 'border-slate-800'
              } backdrop-blur-xl z-20 cursor-pointer group hover:scale-[1.05]`}
            >
              {/* Architectural Outline Number */}
              <div className="absolute -top-4 -right-2 text-5xl font-black text-blue-500/10 pointer-events-none select-none">
                02
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">02 CAPABILITY</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                Recruitment & Staffing
              </h3>

              {/* ONLY ACTIVE STEP SHOWS FULL 1-LINE COPY & KEYWORDS */}
              {activeStep === 1 ? (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {servicesData[1].line}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {servicesData[1].keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-[9px] font-semibold text-blue-300 border border-blue-500/20">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 font-normal truncate">
                  Qualified professionals across technology & sales
                </p>
              )}
            </div>

            {/* PLANE 03: IT & Digital Services (Bottom-Left) */}
            <div
              onClick={() => onSelectService(servicesData[2])}
              style={{
                transform: activeStep === 2
                  ? 'translate3d(-24px, 24px, 60px) scale(1.05)'
                  : 'translate3d(0px, 0px, -20px) scale(0.95)',
                opacity: activeStep === 2 || activeStep === 4 ? 1 : 0.45,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute bottom-4 left-4 sm:left-12 w-68 sm:w-80 p-5 sm:p-6 rounded-3xl bg-[#080B12]/90 border ${
                activeStep === 2 ? 'border-indigo-400 shadow-2xl shadow-indigo-500/25' : 'border-slate-800'
              } backdrop-blur-xl z-20 cursor-pointer group hover:scale-[1.05]`}
            >
              {/* Architectural Outline Number */}
              <div className="absolute -bottom-3 -left-2 text-5xl font-black text-indigo-500/10 pointer-events-none select-none">
                03
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">03 CAPABILITY</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                IT & Digital Services
              </h3>

              {/* ONLY ACTIVE STEP SHOWS FULL 1-LINE COPY & KEYWORDS */}
              {activeStep === 2 ? (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {servicesData[2].line}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {servicesData[2].keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-[9px] font-semibold text-indigo-300 border border-indigo-500/20">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 font-normal truncate">
                  Digital transformation & engineering consulting
                </p>
              )}
            </div>

            {/* PLANE 04: Business Support (Bottom-Right) */}
            <div
              onClick={() => onSelectService(servicesData[3])}
              style={{
                transform: activeStep === 3
                  ? 'translate3d(24px, 24px, 60px) scale(1.05)'
                  : 'translate3d(0px, 0px, -20px) scale(0.95)',
                opacity: activeStep === 3 || activeStep === 4 ? 1 : 0.45,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute bottom-4 right-4 sm:right-12 w-68 sm:w-80 p-5 sm:p-6 rounded-3xl bg-[#080B12]/90 border ${
                activeStep === 3 ? 'border-emerald-400 shadow-2xl shadow-emerald-500/25' : 'border-slate-800'
              } backdrop-blur-xl z-20 cursor-pointer group hover:scale-[1.05]`}
            >
              {/* Architectural Outline Number */}
              <div className="absolute -bottom-3 -right-2 text-5xl font-black text-emerald-500/10 pointer-events-none select-none">
                04
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">04 CAPABILITY</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                Business Support
              </h3>

              {/* ONLY ACTIVE STEP SHOWS FULL 1-LINE COPY & KEYWORDS */}
              {activeStep === 3 ? (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {servicesData[3].line}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {servicesData[3].keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-[9px] font-semibold text-emerald-300 border border-emerald-500/20">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 font-normal truncate">
                  Operational support & remote workforce
                </p>
              )}
            </div>

          </div>

          {/* Mobile Fallback (<640px): Simplified Vertical Architectural Timeline */}
          <div className="sm:hidden space-y-4 relative pl-6 border-l-2 border-blue-500/40 my-4">
            {servicesData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectService(item)}
                  className="relative p-4 sm:p-5 rounded-2xl bg-[#080B12] border border-slate-800 space-y-2 cursor-pointer active:scale-98 transition-transform"
                >
                  {/* Node Dot */}
                  <div className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-blue-400 border-2 border-slate-950 shadow-[0_0_10px_#3B82F6]" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-400 tracking-wider">0{idx + 1} CAPABILITY</span>
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>

                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">{item.line}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-500/10 text-[9px] text-blue-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
