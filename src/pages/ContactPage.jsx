import React, { useState } from 'react';
import { Send, CheckCircle2, Building, User, Mail, MessageSquare, Sparkles, ShieldCheck, Clock, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHero from '../components/common/PageHero';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

import VideoBackground from '../components/common/VideoBackground';

export const ContactPage = () => {
  const [inquiryType, setInquiryType] = useState('technology');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#FFFFFF']
      });
    } catch (err) {
      // confetti fallback
    }
  };

  return (
    <main className="min-h-screen bg-[#05070D]">
      <VideoBackground 
        videoSrc="https://cdn.coverr.co/videos/coverr-plexus-and-connected-lines-5374/1080p.mp4"
        posterSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
      >
        <PageHero
          badge="Contact & Consultation"
          title="Let's Discuss Your Requirement"
          subtitle="Tell us what your business needs. Renovia Talent can help you explore the right technology development, staffing placement, or business support solution."
          breadcrumb="Contact"
          transparent={true}
        />

        <section className="py-20 sm:py-28">
          <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Info & Value Commitments (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101621] border border-blue-500/40 text-blue-300 text-label font-semibold">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Direct Consultation</span>
                </div>
                <h2 className="text-h2 font-bold text-white tracking-tight">
                  Fast Response & Transparent Engagement
                </h2>
                <p className="text-body text-slate-300 font-normal leading-relaxed">
                  Our team reviews every inquiry carefully to match your specific technology stack or workforce requirement with a clear, straightforward scope.
                </p>
              </div>

              {/* Guarantees List */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#101621]/80 border border-slate-800 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-white">Prompt Feedback</h4>
                    <p className="text-xs text-slate-400 font-normal mt-1">Inquiries are acknowledged within 24 business hours.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#101621]/80 border border-slate-800 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-white">Confidential & Compliant</h4>
                    <p className="text-xs text-slate-400 font-normal mt-1">Strict data privacy and NDA options for sensitive projects.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#101621]/80 border border-slate-800 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-white">Global Service Delivery</h4>
                    <p className="text-xs text-slate-400 font-normal mt-1">Serving clients across technology, recruitment, and digital ops.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#080B14]/70 backdrop-blur-xl border border-slate-800/50 shadow-2xl relative z-10">
                {submitted ? (
                  <div className="py-16 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-h2 font-bold text-white">Inquiry Received</h3>
                      <p className="text-body text-slate-300 font-normal max-w-md mx-auto">
                        Thank you for reaching out to Renovia Talent. Our team will review your requirement and contact you shortly.
                      </p>
                    </div>

                    <Button variant="primary" size="md" onClick={() => setSubmitted(false)} className="mx-auto w-auto">
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Inquiry Category Selector */}
                    <div className="space-y-2">
                      <label className="text-label text-slate-400 font-semibold">
                        Select Inquiry Focus
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setInquiryType('technology')}
                          className={`p-3.5 rounded-2xl border text-xs font-semibold transition-all text-left flex flex-col gap-1 ${
                            inquiryType === 'technology'
                              ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-md'
                              : 'bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>Software & Technology</span>
                          <span className="text-[10px] font-normal text-slate-400">Apps, Web & IT Solutions</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInquiryType('staffing')}
                          className={`p-3.5 rounded-2xl border text-xs font-semibold transition-all text-left flex flex-col gap-1 ${
                            inquiryType === 'staffing'
                              ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-md'
                              : 'bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>Recruitment & Staffing</span>
                          <span className="text-[10px] font-normal text-slate-400">Hiring & Placement</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInquiryType('business')}
                          className={`p-3.5 rounded-2xl border text-xs font-semibold transition-all text-left flex flex-col gap-1 ${
                            inquiryType === 'business'
                              ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-md'
                              : 'bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>Business Support</span>
                          <span className="text-[10px] font-normal text-slate-400">Operations & Remote Teams</span>
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-400" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-blue-400" />
                        Organization / Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Global Solutions"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                        Requirement Details *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe what technology, talent, or operational support your business requires..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full sm:w-auto">
                        Submit Inquiry
                      </Button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </Container>
      </section>
      </VideoBackground>

    </main>
  );
};

export default ContactPage;
