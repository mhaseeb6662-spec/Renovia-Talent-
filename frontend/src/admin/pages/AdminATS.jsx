import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Briefcase,
  DollarSign,
  AlertCircle,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Button from '../../components/common/Button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const stages = ['New', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'];

export const AdminATS = () => {
  const { token } = useAdminAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');
  const [minScoreFilter, setMinScoreFilter] = useState('');
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState(null);

  const fetchJobsList = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs?includeInactive=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.data || []);
      }
    } catch (e) {
      console.warn('Unable to load jobs for filter:', e.message);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (jobFilter !== 'All') params.append('jobId', jobFilter);
      if (minScoreFilter) params.append('minScore', minScoreFilter);
      if (searchTerm) params.append('search', searchTerm.trim());

      const res = await fetch(`${API_BASE_URL}/applications?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to load applications (Status: ${res.status})`);
      }
      const data = await res.json();
      setApplications(data.data || []);
    } catch (err) {
      console.error('Error loading applications:', err);
      setError(err.message || 'Unable to retrieve candidates from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsList();
  }, [token]);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, jobFilter, minScoreFilter, searchTerm, token]);

  const handleUpdateStatus = async (appId, newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${appId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(prev => (Array.isArray(prev) ? prev.map(a => a._id === appId ? { ...a, status: newStatus } : a) : []));
        if (selectedApp && selectedApp._id === appId) {
          setSelectedApp(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedApp) return;

    try {
      const res = await fetch(`${API_BASE_URL}/applications/${selectedApp._id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: newNote }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedApp(data.data);
        setNewNote('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
    if (score >= 80) return 'bg-blue-500/15 border-blue-500/30 text-blue-400';
    if (score >= 70) return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
    return 'bg-slate-800 text-slate-400 border-slate-700';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-emerald-400" />
            Applicant Tracking System (ATS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review candidate resumes, inspect AI match scores, download CVs, and manage hiring stages.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[#080B14] border border-slate-800 text-xs font-semibold text-slate-300">
          Total Candidates: <span className="text-emerald-400">{applications.length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#080B14] border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates / skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Filter */}
        <div>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Job Positions</option>
            {jobs.map((j) => (
              <option key={j._id} value={j._id}>{j.title}</option>
            ))}
          </select>
        </div>

        {/* Stage Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Stages (Pipeline)</option>
            {stages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* AI Score Filter */}
        <div>
          <select
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All AI Match Scores</option>
            <option value="90">90%+ Strong Match</option>
            <option value="80">80%+ Qualified Match</option>
            <option value="70">70%+ General Match</option>
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={() => { setSearchTerm(''); setStatusFilter('All'); setJobFilter('All'); setMinScoreFilter(''); }}
          className="px-3 py-2 rounded-xl bg-[#101621] border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          Reset Filters
        </button>

      </div>

      {/* Error State Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchApplications} className="text-rose-200 underline font-semibold shrink-0">
            Retry
          </button>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-2xl bg-[#080B14] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101D] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Position</th>
                <th className="p-4">AI Match Score</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Stage</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500 text-xs">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <p>Loading candidates...</p>
                    </div>
                  </td>
                </tr>
              ) : Array.isArray(applications) && applications.length > 0 ? (
                applications.map((app) => (
                  <tr 
                    key={app._id}
                    className="hover:bg-slate-900/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedApp(app)}
                  >
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{app?.fullName || 'Unknown'}</div>
                      <div className="text-slate-400 text-[11px]">{app?.email || 'No email'}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-200">{app?.jobTitle || 'Unknown Position'}</span>
                      <div className="text-[10px] text-slate-500">{app?.location || 'Remote'}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-bold text-xs ${getScoreColor(app?.aiMatchScore || 0)}`}>
                        <Sparkles className="w-3 h-3" />
                        {app?.aiMatchScore || 0}%
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">
                      {app?.yearsExperience || 'Not specified'}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={app?.status || 'New'}
                        disabled={updating}
                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-[#05070D] border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {stages.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1 rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors font-medium text-xs"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500 text-xs">
                    No candidate applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Details Modal / Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#030509]/80 backdrop-blur-xl" onClick={() => setSelectedApp(null)} />

          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#080B14] border border-blue-500/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{selectedApp?.fullName || 'Unknown'}</h3>
                  <span className={`px-2.5 py-0.5 rounded-md border font-bold text-xs ${getScoreColor(selectedApp?.aiMatchScore || 0)}`}>
                    {selectedApp?.aiMatchScore || 0}% AI Match
                  </span>
                </div>
                <p className="text-xs text-blue-400 font-medium">Applied for: {selectedApp?.jobTitle || 'Unknown Position'}</p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto py-6 pr-1 space-y-6 flex-1 text-xs">
              
              {/* AI Evaluation Section */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900/60 border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    AI Evaluation & Skills Breakdown
                  </h4>
                  <span className="text-[10px] text-slate-400">Automated Semantic Analysis</span>
                </div>

                <p className="text-slate-300 leading-relaxed text-xs">
                  {selectedApp?.aiSummary || 'Candidate evaluated successfully with strong skill overlap.'}
                </p>

                {/* Score Pills */}
                {selectedApp?.aiScoreBreakdown && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Technical Skills</span>
                      <span className="text-sm font-bold text-emerald-400">{selectedApp.aiScoreBreakdown.technicalSkills || 0}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Experience Depth</span>
                      <span className="text-sm font-bold text-blue-400">{selectedApp.aiScoreBreakdown.experience || 0}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Role Relevance</span>
                      <span className="text-sm font-bold text-indigo-400">{selectedApp.aiScoreBreakdown.roleRelevance || 80}%</span>
                    </div>
                  </div>
                )}

                {/* Extracted Skills */}
                {Array.isArray(selectedApp?.aiParsedSkills) && selectedApp.aiParsedSkills.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Parsed Skills from Resume:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApp.aiParsedSkills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#05070D] border border-slate-800 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Information</p>
                  <p className="text-white flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-400" /> {selectedApp?.email || 'N/A'}</p>
                  {selectedApp?.phone && <p className="text-white flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-400" /> {selectedApp.phone}</p>}
                  {selectedApp?.location && <p className="text-white flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {selectedApp.location}</p>}
                </div>

                <div className="p-3.5 rounded-xl bg-[#05070D] border border-slate-800 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Profile & Links</p>
                  {selectedApp?.linkedin && (
                    <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
                    </a>
                  )}
                  {selectedApp?.portfolio && (
                    <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Portfolio / GitHub
                    </a>
                  )}
                  <p className="text-slate-300">Experience: <strong className="text-white">{selectedApp?.yearsExperience || 'N/A'}</strong></p>
                </div>
              </div>

              {/* Resume File Actions */}
              <div className="p-4 rounded-2xl bg-[#05070D] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{selectedApp?.resumeOriginalName || 'Resume Document'}</p>
                    <p className="text-[10px] text-slate-500">Stored in secure platform storage</p>
                  </div>
                </div>

                <a
                  href={selectedApp?.resumeUrl ? (selectedApp.resumeUrl.startsWith('http') ? selectedApp.resumeUrl : `${API_BASE_URL.replace(/\/api$/, '')}${selectedApp.resumeUrl}`) : '#'}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>

              {/* Cover Letter */}
              {selectedApp?.coverLetter && (
                <div className="p-4 rounded-xl bg-[#05070D] border border-slate-800 space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cover Letter / Note</p>
                  <p className="text-slate-300 leading-relaxed">{selectedApp.coverLetter}</p>
                </div>
              )}

              {/* Recruiter Notes Thread */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  Recruiter Internal Notes ({Array.isArray(selectedApp?.internalNotes) ? selectedApp.internalNotes.length : 0})
                </h4>

                <div className="space-y-2">
                  {Array.isArray(selectedApp?.internalNotes) && selectedApp.internalNotes.length > 0 ? (
                    selectedApp.internalNotes.map((n, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#05070D] border border-slate-800 text-xs">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                          <span className="font-bold text-blue-400">{n?.author || 'Admin'}</span>
                          <span>{n?.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}</span>
                        </div>
                        <p className="text-slate-200">{n?.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-xs">No internal notes added yet.</p>
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add interview feedback or notes..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Note
                  </button>
                </form>
              </div>

            </div>

            {/* Footer Pipeline Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Change Candidate Stage:</span>
                <select
                  value={selectedApp?.status || 'New'}
                  onChange={(e) => handleUpdateStatus(selectedApp._id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#05070D] border border-slate-800 text-xs font-bold text-white focus:ring-2 focus:ring-blue-500"
                >
                  {stages.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <Button variant="secondary" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminATS;
