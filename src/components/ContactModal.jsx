import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, Building, User, Mail, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from './common/Button';

export const ContactModal = ({ isOpen, onClose }) => {
  const [inquiryType, setInquiryType] = useState('technology');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#FFFFFF']
      });
    } catch (err) {
      // confetti fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', company: '', details: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070D]/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#080B12] border border-slate-700/80 shadow-2xl overflow-hidden text-left">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#080B12] via-[#0D162B] to-[#080B12] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-h3 font-bold text-white">Let's Talk Solutions</h3>
              <p className="text-xs text-slate-400 font-normal">Renovia Talent Professional Scoping & Consultation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-h2 font-bold text-white">Inquiry Received</h4>
                <p className="text-body text-slate-300 font-normal max-w-md mx-auto">
                  Thank you for reaching out to Renovia Talent. Our team will review your requirement and respond promptly.
                </p>
              </div>

              <Button variant="primary" size="md" onClick={handleReset} className="mx-auto">
                Done
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
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col gap-1 ${
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
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col gap-1 ${
                      inquiryType === 'staffing'
                        ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-md'
                        : 'bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>Recruitment & Talent</span>
                    <span className="text-[10px] font-normal text-slate-400">Hiring & Workforce Placement</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryType('business')}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col gap-1 ${
                      inquiryType === 'business'
                        ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-md'
                        : 'bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>Business Support</span>
                    <span className="text-[10px] font-normal text-slate-400">Operations & Customer Service</span>
                  </button>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-body font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button variant="ghost" size="md" onClick={onClose} className="w-auto">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" icon={Send} className="w-auto">
                  Submit Inquiry
                </Button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
