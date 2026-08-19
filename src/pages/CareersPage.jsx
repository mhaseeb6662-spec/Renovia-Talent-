import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe, Sparkles } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { careersData } from '../data/careersData';

const perks = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health coverage and wellness stipends.' },
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere. We value output over hours at a desk.' },
  { icon: Zap, title: 'Growth Opportunities', desc: 'Continuous learning budgets and clear promotion paths.' },
];

import VideoBackground from '../components/common/VideoBackground';

export const CareersPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pb-20 bg-[#05070D]">
      <VideoBackground 
        videoSrc="https://cdn.coverr.co/videos/coverr-network-connections-5415/1080p.mp4"
        posterSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
      >
        <PageHero
          badge="Join Our Team"
          title="Build the Future of Technology"
          subtitle="We're looking for passionate engineers, designers, and innovators to join us in delivering world-class solutions to global clients."
          breadcrumb="Careers"
          transparent={true}
        />

        {/* Culture & Perks Section */}
        <section className="py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="p-8 rounded-3xl bg-[#05070D]/40 backdrop-blur-md border border-slate-800/50">
                <h2 className="text-h2 font-bold text-white mb-6">Why Work With Us?</h2>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  At Renovia Talent, we believe in empowering our people. We cultivate a culture of autonomy, continuous learning, and mutual respect. Whether you are building complex backend architectures or designing intuitive user interfaces, your work here makes a direct impact.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {perks.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <div key={i} className="p-6 rounded-2xl bg-[#080B14]/60 backdrop-blur-md border border-slate-800/50">
                      <Icon className="w-8 h-8 text-blue-400 mb-4" />
                      <h3 className="text-white font-bold mb-2">{perk.title}</h3>
                      <p className="text-sm text-slate-300">{perk.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      </VideoBackground>

      {/* Open Positions Section */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-h2 font-bold text-white mb-4">Open Positions</h2>
              <p className="text-slate-400 max-w-2xl">Find your next role and help us shape the future of technology.</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-300 text-sm font-semibold whitespace-nowrap">
              {careersData.length} {careersData.length === 1 ? 'Role' : 'Roles'} Available
            </div>
          </div>

          {careersData.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {careersData.map((job) => (
                <div key={job.id} className="group p-6 sm:p-8 rounded-2xl bg-[#0B101A] border border-slate-800/80 hover:border-blue-500/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">
                        {job.department}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 max-w-3xl">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-500" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 mt-4 md:mt-0">
                    <Button onClick={() => navigate('/contact')} variant="primary" icon={ArrowRight}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#080B14] border border-slate-800/50">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No open positions right now</h3>
              <p className="text-slate-400">We're not actively hiring at the moment, but check back soon!</p>
            </div>
          )}
        </Container>
      </section>

      {/* General Application */}
      <section className="py-20">
        <Container>
          <div className="relative p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border border-blue-500/20 text-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Don't see a perfect fit?</h2>
              <p className="text-slate-300 mb-8">
                We're always looking for exceptionally talented people. Send us your resume, and we'll reach out if a role opens up that matches your skills.
              </p>
              <Button onClick={() => navigate('/contact')} variant="secondary" icon={Sparkles}>
                Send Your Resume
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default CareersPage;
