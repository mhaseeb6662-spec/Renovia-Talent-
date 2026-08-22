import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Container from './common/Container';
import Button from './common/Button';

export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 sm:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80">
      <Container className="relative z-10">
        <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#0D162B] via-[#080B12] to-[#0D162B] border border-blue-500/40 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 overflow-hidden text-center">
          
          {/* Ambient Blue Lighting Background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#101621] border border-blue-400/40 text-blue-300 text-label font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Let's Build Together</span>
            </div>

            <h2 className="text-h1 font-bold text-white tracking-tight leading-tight">
              Looking for Technology Solutions or{' '}
              <span className="blue-gradient-text">the Right Talent?</span>
            </h2>

            <p className="text-body-lg text-slate-300 font-normal leading-relaxed">
              Tell us what your business needs. Renovia Talent can help you explore the right technology, staffing, or professional service solution.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
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
                onClick={() => navigate('/services')}
                icon={ArrowRight}
                iconPosition="right"
                className="w-auto"
              >
                Explore Services
              </Button>
            </div>

            <p className="text-xs text-slate-400 pt-2 font-medium">
              Fast Response • Custom Scoping • Professional Service Delivery
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTA;
