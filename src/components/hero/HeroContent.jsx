import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-7 text-left max-w-[640px] relative z-20 pointer-events-auto">
      
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101621]/90 border border-blue-500/40 text-blue-300 text-label font-semibold backdrop-blur-xl shadow-lg shadow-blue-500/10">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span>Technology • Talent • Business Solutions</span>
      </div>

      {/* Main Heading with Controlled Clamp Font Size (40px - 72px), 700 Weight, -0.035em Tracking */}
      <h1 className="text-display font-bold text-white tracking-[-0.035em] leading-[1.02] [text-wrap:balance]">
        Technology and Talent{' '}
        <span className="blue-gradient-text block mt-1.5 sm:mt-2">
          Built Around Your Business
        </span>
      </h1>

      {/* Constrained Supporting Copy (Max 55ch, 400 Weight) */}
      <p className="text-body-lg text-slate-300 font-normal leading-relaxed max-w-[55ch]">
        Renovia Talent helps organizations build digital solutions, find skilled professionals, and strengthen business operations through dependable technology and professional services.
      </p>

      {/* Compact Side-by-Side CTA Buttons (Natural Width) */}
      <div className="flex flex-wrap items-center gap-3.5 pt-1 w-fit">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/services')}
          icon={ArrowRight}
          iconPosition="right"
          className="w-auto"
        >
          Explore Our Services
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/contact')}
          icon={MessageSquare}
          iconPosition="left"
          className="w-auto"
        >
          Let's Talk
        </Button>
      </div>

      {/* Clean Trust Indicators */}
      <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-body text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold">Technology Expertise</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold">Professional Talent</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold">Reliable Support</span>
        </div>
      </div>

    </div>
  );
};

export default HeroContent;
