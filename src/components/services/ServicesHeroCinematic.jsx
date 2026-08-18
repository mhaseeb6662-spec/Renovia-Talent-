import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Sparkles, Globe, Code2, Smartphone, ShieldAlert, Cpu, 
  UserPlus, Users, Network, Headphones, Briefcase, ArrowRight, MessageSquare, Hand
} from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

export const ServicesHeroCinematic = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [isGestureAnimating, setIsGestureAnimating] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const videoRef = useRef(null);

  const servicesList = [
    {
      id: '01',
      title: 'Website Development',
      category: 'Digital Engineering',
      icon: Globe,
      description: 'Responsive web applications, modern frontend architecture, and high-performance digital platforms.',
      metrics: ['99.9% Uptime', 'Next.js & React', 'SEO Optimized'],
    },
    {
      id: '02',
      title: 'Software Development',
      category: 'Enterprise Engineering',
      icon: Code2,
      description: 'Custom enterprise software, API integrations, microservices, and scalable backend systems.',
      metrics: ['Microservices', 'Python & Node', 'Cloud Native'],
    },
    {
      id: '03',
      title: 'Applications',
      category: 'Mobile & Desktop',
      icon: Smartphone,
      description: 'Cross-platform mobile applications and desktop software engineered for seamless user experiences.',
      metrics: ['iOS & Android', 'Cross-Platform', 'Real-Time Sync'],
    },
    {
      id: '04',
      title: 'IT Support',
      category: 'Infrastructure & Ops',
      icon: ShieldAlert,
      description: 'Continuous network monitoring, cloud infrastructure management, and 24/7 technical support.',
      metrics: ['24/7 Monitoring', 'Cloud Management', 'Zero Downtime'],
    },
    {
      id: '05',
      title: 'Digital Transformation',
      category: 'Modernization',
      icon: Cpu,
      description: 'Modernizing legacy enterprise systems into unified, automated cloud digital ecosystems.',
      metrics: ['Legacy Migration', 'Process Automation', 'Cloud Shift'],
    },
    {
      id: '06',
      title: 'Recruitment',
      category: 'Talent Acquisition',
      icon: UserPlus,
      description: 'Intelligent candidate sourcing and specialized IT talent matching for tech organizations.',
      metrics: ['Pre-Vetted Talent', 'Top 3% Engineers', 'Fast Placement'],
    },
    {
      id: '07',
      title: 'Staffing',
      category: 'Workforce Solutions',
      icon: Users,
      description: 'Flexible contract, direct hire, and project-based staffing tailored to client headcount requirements.',
      metrics: ['Flexible Staffing', 'Dedicated Placement', 'Scalable Teams'],
    },
    {
      id: '08',
      title: 'Remote Teams',
      category: 'Global Workforce',
      icon: Network,
      description: 'Assembling and managing dedicated remote engineering and operational teams globally.',
      metrics: ['Global Talent', 'Time-Zone Aligned', 'Seamless Ops'],
    },
    {
      id: '09',
      title: 'Customer Support',
      category: 'Client Engagement',
      icon: Headphones,
      description: 'Multi-channel customer service, technical helpdesk, and dedicated client support workflows.',
      metrics: ['Omnichannel', 'High SLA', 'Dedicated Agents'],
    },
    {
      id: '10',
      title: 'Business Operations',
      category: 'Managed Services',
      icon: Briefcase,
      description: 'Unifying technology, workforce, and back-office workflows into one streamlined business model.',
      metrics: ['End-to-End Ops', 'Cost Efficiency', 'Unified Partner'],
    },
  ];

  // Check if an MP4 video exists in /public/services-hero-bg.mp4
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/services-hero-bg.mp4';
    video.oncanplay = () => setHasVideo(true);
    video.onerror = () => setHasVideo(false);
  }, []);

  // Automatic 2.2-second continuous service gesture cycle (22s total loop)
  useEffect(() => {
    const interval = setInterval(() => {
      triggerServiceChange((activeService + 1) % servicesList.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [activeService, servicesList.length]);

  const triggerServiceChange = (nextIndex) => {
    setIsGestureAnimating(true);
    setActiveService(nextIndex);
    setTimeout(() => setIsGestureAnimating(false), 400);
  };

  const current = servicesList[activeService];
  const ActiveIcon = current.icon;

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 overflow-hidden bg-[#05070D] flex items-center border-b border-slate-800/80">
      
      {/* 1. Cinematic Background Image Layer */}
      <img
        src="/services-hero-cinematic-person.jpg"
        alt="Services Hero Cinematic Executive"
        className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105 transition-transform duration-1000"
      />

      {/* 2. Optional MP4 Video Layer */}
      {hasVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src="/services-hero-bg.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}

      {/* 3. Left/Center Text Safety Vignette Overlay (Guarantees 100% Readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070D] via-[#05070D]/85 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/80 z-10" />

      {/* 4. Ambient Blue Lighting Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-10" />

      <Container className="relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN (5 Cols): Hero Content & Actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Breadcrumb Path */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101621]/90 border border-slate-800 text-xs font-medium text-slate-400 backdrop-blur-md">
              <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-blue-300 font-semibold">Services</span>
            </div>

            {/* Eyebrow Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/40 text-blue-300 text-label font-semibold backdrop-blur-xl shadow-lg shadow-blue-500/10">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>What We Do</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-display font-bold text-white tracking-[-0.035em] leading-[1.02] [text-wrap:balance]">
              Services Designed Around{' '}
              <span className="blue-gradient-text block mt-1">
                Business Needs
              </span>
            </h1>

            {/* Subtitle Copy */}
            <p className="text-body-lg text-slate-300 font-normal leading-relaxed max-w-[50ch]">
              From building digital products to finding skilled professionals and managing back-office operations, Renovia Talent delivers practical solutions that scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={Sparkles}
                iconPosition="right"
                className="w-auto"
              >
                Let's Talk
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/about')}
                icon={ArrowRight}
                iconPosition="right"
                className="w-auto"
              >
                Learn About Us
              </Button>
            </div>

          </div>

          {/* RIGHT COLUMN (7 Cols): INTERACTIVE 3D GESTURE DIGITAL SYSTEM STAGE */}
          <div className="lg:col-span-7 relative">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080B12]/85 border border-blue-500/30 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 space-y-6 relative overflow-hidden">
              
              {/* Top Bar: Interactive Gestural Touch Status & Live Marker */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                    <Hand className={`w-3.5 h-3.5 ${isGestureAnimating ? 'scale-125 text-blue-300' : ''} transition-transform`} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase block">
                      INTERACTIVE SYSTEM • GESTURE CONTROLLED
                    </span>
                    <span className="text-xs font-semibold text-white">
                      SERVICE {current.id} / 10
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="text-xs font-semibold text-blue-300">{current.category}</span>
                </div>
              </div>

              {/* Central Active Service Card Display */}
              <div className={`transition-all duration-300 transform ${
                isGestureAnimating ? 'scale-95 opacity-60 blur-[1px]' : 'scale-100 opacity-100 blur-0'
              } space-y-5 p-6 rounded-2xl bg-[#0A0F1D]/90 border border-slate-800`}>
                
                {/* Header: Icon + Service Title */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10 shrink-0">
                    <ActiveIcon className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      RENOVIA SERVICE CAPABILITY
                    </span>
                    <h3 className="text-h2 font-bold text-white tracking-tight">
                      {current.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body text-slate-300 font-normal leading-relaxed">
                  {current.description}
                </p>

                {/* Key Service Metrics Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {current.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#05070D] border border-slate-800 text-xs font-semibold text-slate-200"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Interactive 10-Service Gesture Selector Bar */}
              <div className="pt-2">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                  {servicesList.map((service, sIdx) => {
                    const isSelected = activeService === sIdx;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => triggerServiceChange(sIdx)}
                        className={`p-2 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-blue-600/30 border-blue-400 text-blue-300 shadow-md scale-105'
                            : 'bg-[#05070D] border-slate-800/80 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                        }`}
                        title={service.title}
                      >
                        <span className="text-[10px] font-bold">{service.id}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-slate-700'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ServicesHeroCinematic;
