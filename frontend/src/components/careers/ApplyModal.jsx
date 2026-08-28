import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Sparkles, AlertCircle, FileText, Briefcase, Mail, User, Phone, MapPin, Linkedin, Globe, DollarSign, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitJobApplication } from '../../services/api';
import Button from '../common/Button';

export const ApplyModal = ({ job, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    yearsExperience: '',
    currentRole: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: '30 Days',
    employmentPreference: 'Full-time',
    source: '',
    coverLetter: '',
    consentGiven: false,
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
        setStatusMessage({ type: 'error', text: 'Please upload a valid PDF, DOC, or DOCX resume.' });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setStatusMessage({ type: 'error', text: 'File size exceeds 10MB limit.' });
        return;
      }
      setResumeFile(file);
      setStatusMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setStatusMessage({ type: 'error', text: 'Please attach your resume / CV.' });
      return;
    }

    if (formData.linkedin) {
      try {
        new URL(formData.linkedin);
      } catch (_) {
        setStatusMessage({ type: 'error', text: 'Please enter a valid LinkedIn URL.' });
        return;
      }
    }

    setSubmitting(true);
    setStatusMessage({ type: 'info', text: 'Uploading resume and initiating AI evaluation...' });

    const data = new FormData();
    data.append('jobId', job._id || job.id);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('location', formData.location);
    data.append('linkedin', formData.linkedin);
    data.append('portfolio', formData.portfolio);
    data.append('yearsExperience', formData.yearsExperience);
    data.append('currentRole', formData.currentRole);
    data.append('currentCompany', formData.currentCompany);
    data.append('expectedSalary', formData.expectedSalary);
    data.append('noticePeriod', formData.noticePeriod);
    data.append('employmentPreference', formData.employmentPreference);
    data.append('source', formData.source);
    data.append('consentGiven', formData.consentGiven);
    data.append('coverLetter', formData.coverLetter);
    data.append('resume', resumeFile);

    try {
      const res = await submitJobApplication(data);
      if (res.success) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3B82F6', '#60A5FA', '#10B981', '#FFFFFF'],
          });
        } catch (e) {}
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      console.error('Apply submission error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Error submitting application. Please verify backend status.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setResumeFile(null);
    setStatusMessage({ type: '', text: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={handleResetAndClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#080B14] border border-blue-500/30 shadow-2xl shadow-blue-500/10 p-6 sm:p-8 z-10 overflow-hidden text-left max-h-[90vh] flex flex-col">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Apply for Position</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {job.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {job.department} • {job.location || 'Remote'} • {job.type || 'Full-time'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-6 pr-1 space-y-6 flex-1">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Application Received!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your resume has been uploaded and queued for AI evaluation. Our recruitment team will be in touch with next steps!
                </p>
              </div>
              <div className="pt-4">
                <Button variant="primary" size="md" onClick={handleResetAndClose}>
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {statusMessage.text && (
                <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium ${
                  statusMessage.type === 'error'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Current Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    Portfolio / GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Professional Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    Current / Most Recent Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    Current / Most Recent Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TechCorp Inc."
                    value={formData.currentCompany}
                    onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Experience & Expectations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    Total Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 years"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $80,000 / Year"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Notice Period
                  </label>
                  <select
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="2 Weeks">2 Weeks</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60+ Days</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Employment Pref
                  </label>
                  <select
                    value={formData.employmentPreference}
                    onChange={(e) => setFormData({ ...formData, employmentPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              {/* Resume File Upload Box */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    Resume / CV (PDF, DOC, DOCX) *
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal">Max 10MB</span>
                </label>

                <label className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  resumeFile
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-slate-800 hover:border-blue-500/50 bg-[#05070D]/60 hover:bg-slate-900/50'
                }`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {resumeFile ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white truncate max-w-xs">{resumeFile.name}</p>
                        <p className="text-xs text-emerald-400 font-medium">Ready for AI parsing ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 text-blue-400 mb-2" />
                      <p className="text-sm font-semibold text-white">Click or Drag & Drop your Resume here</p>
                      <p className="text-xs text-slate-400 mt-1">Our AI engine will parse your skills automatically</p>
                    </>
                  )}
                </label>
              </div>

              {/* Cover Letter / Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Cover Letter / Additional Note (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share anything that makes you an outstanding fit for this role..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Source */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  placeholder="e.g. LinkedIn, Referral, Google Search"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group mt-2">
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="peer appearance-none w-5 h-5 border border-slate-700 rounded bg-[#05070D] checked:bg-blue-600 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  I confirm that the information provided is accurate and agree that Renovia Talent may contact me regarding this application. *
                </span>
              </label>

              {/* Submit Button */}
              <div className="pt-3 flex justify-end gap-3">
                <Button variant="secondary" size="md" type="button" onClick={handleResetAndClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={submitting}
                  icon={Sparkles}
                  iconPosition="right"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplyModal;
