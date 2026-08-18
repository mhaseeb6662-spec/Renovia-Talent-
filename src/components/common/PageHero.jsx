import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import Container from './Container';
import AboutHeroCinematicCanvas from '../about/AboutHeroCinematicCanvas';

export const PageHero = ({ badge, title, subtitle, breadcrumb = 'Page', cinematic = false }) => {
  const isAboutHero = breadcrumb === 'About Us' || cinematic;

  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#05070D] via-[#0D162B] to-[#05070D] border-b border-slate-800/80">
      
      {/* Premium Cinematic Background Layer for About Page Hero */}
      {isAboutHero ? (
        <AboutHeroCinematicCanvas />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:36px_36px] opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <Container className="relative z-20 text-center max-w-4xl mx-auto space-y-5">
        
        {/* Breadcrumb Path */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101621]/90 border border-slate-800 text-xs font-medium text-slate-400 backdrop-blur-md">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-blue-300 font-semibold">{breadcrumb}</span>
        </div>

        {/* Eyebrow Badge */}
        {badge && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/40 text-blue-300 text-label font-semibold backdrop-blur-xl shadow-lg shadow-blue-500/10">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{badge}</span>
            </div>
          </div>
        )}

        {/* Page Main Heading */}
        <h1 className="text-[clamp(34px,3.8vw,58px)] font-bold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
          {title}
        </h1>

        {/* Page Subtitle Copy */}
        {subtitle && (
          <p className="text-body-lg text-slate-300 font-normal leading-relaxed max-w-[60ch] mx-auto">
            {subtitle}
          </p>
        )}

      </Container>
    </section>
  );
};

export default PageHero;
