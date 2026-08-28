import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe, Sparkles, Search, DollarSign, AlertCircle, RefreshCw } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import VideoBackground from '../components/common/VideoBackground';
import ApplyModal from '../components/careers/ApplyModal';
import { getJobs } from '../services/api';

const perks = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health coverage and wellness stipends.' },
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere. We value output over hours at a desk.' },
  { icon: Zap, title: 'Growth Opportunities', desc: 'Continuous learning budgets and clear promotion paths.' },
];

export const CareersPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const fetchCareers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobs(selectedDepartment, 'All', searchTerm);
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs from API:', err);
      setError(err.message || 'Unable to connect to careers database. Please verify backend status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, [selectedDepartment, searchTerm]);

  useEffect(() => {
    document.title = 'Careers at Renovia Talent | Join Our Team';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore career opportunities at Renovia Talent and apply online for available positions.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore career opportunities at Renovia Talent and apply online for available positions.';
      document.head.appendChild(meta);
    }
  }, []);

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
    setSelectedJob(null);
  };

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
      <section className="py-24" id="open-positions">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 className="text-h2 font-bold text-white mb-4">Open Positions</h2>
              <p className="text-slate-400 max-w-2xl">
                Explore high-impact engineering and talent roles. Every application is reviewed by our AI-assisted ATS for fast candidate feedback.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-300 text-sm font-semibold whitespace-nowrap">
                {jobs.length} {jobs.length === 1 ? 'Role' : 'Roles'} Available
              </div>
            </div>
          </div>

          {/* Search & Department Filter */}
          <div className="p-4 rounded-2xl bg-[#080B14] border border-slate-800/80 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jobs by keyword or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {['All', 'Engineering', 'Design', 'Human Resources'].map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#05070D] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <div>
                  <p className="text-sm font-bold text-white">Careers Database Connection Error</p>
                  <p className="text-xs text-rose-300">{error}</p>
                </div>
              </div>
              <button
                onClick={fetchCareers}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-slate-400">Loading active vacancies from database...</p>
            </div>
          )}

          {/* Job Listings Grid */}
          {!loading && !error && (
            jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                  <div 
                    key={job._id || job.id} 
                    className="group p-6 sm:p-8 rounded-2xl bg-[#0B101A] border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg shadow-black/40"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
                          {job.department}
                        </span>
                        {job.workplaceType && (
                          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-medium text-slate-300">
                            {job.workplaceType}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {job.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 max-w-3xl">
                        {job.description}
                      </p>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.skills.slice(0, 5).map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-[#05070D] border border-slate-800 text-[11px] font-medium text-slate-400">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 pt-2 border-t border-slate-800/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          {job.location || 'Remote'}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-400" />
                          {job.type || 'Full-time'}
                        </div>
                        {job.salaryRange && (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                            <DollarSign className="w-4 h-4" />
                            {job.salaryRange}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 mt-4 md:mt-0">
                      <Button 
                        onClick={() => handleOpenApply(job)} 
                        variant="primary" 
                        icon={ArrowRight}
                        className="w-full md:w-auto"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-[#080B14] border border-slate-800/50">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No matching positions found</h3>
                <p className="text-slate-400 text-sm">Try searching for different keywords or reset the department filter.</p>
              </div>
            )
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
                We're always looking for exceptionally talented people. Send us your resume, and our AI recruitment engine will match your profile when relevant roles open.
              </p>
              <Button 
                onClick={() => handleOpenApply({ 
                  _id: 'general', 
                  id: 'general', 
                  title: 'General Application', 
                  department: 'All Departments', 
                  type: 'Any', 
                  location: 'Anywhere' 
                })} 
                variant="secondary" 
                icon={Sparkles}
              >
                Send Your Resume
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Apply Modal */}
      <ApplyModal
        job={selectedJob}
        isOpen={isApplyModalOpen}
        onClose={handleCloseApply}
      />
    </main>
  );
};

export default CareersPage;
