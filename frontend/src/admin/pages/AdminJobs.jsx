import React, { useState, useEffect } from 'react';
import {
  FolderPlus,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  Users,
  MapPin,
  Clock,
  DollarSign,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Button from '../../components/common/Button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminJobs = () => {
  const { token } = useAdminAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [aiRolePrompt, setAiRolePrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time',
    workplaceType: 'Remote',
    experienceLevel: 'Mid-Senior Level (3+ Years)',
    salaryRange: '$70,000 - $100,000 / Year',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: 'React, Node.js, TypeScript, REST APIs',
    deadline: 'Open until filled',
    isActive: true,
  });

  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/jobs?includeInactive=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to load jobs from database (Status: ${res.status})`);
      }
      const data = await res.json();
      setJobs(data.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Unable to retrieve jobs from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handleOpenCreate = () => {
    setEditingJob(null);
    setModalError(null);
    setFormData({
      title: '',
      department: 'Engineering',
      location: 'Remote / Global',
      type: 'Full-time',
      workplaceType: 'Remote',
      experienceLevel: 'Mid-Senior Level (3+ Years)',
      salaryRange: '$70,000 - $100,000 / Year',
      description: '',
      responsibilities: '',
      requirements: '',
      skills: 'React, Node.js, TypeScript, REST APIs',
      deadline: 'Open until filled',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setModalError(null);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      workplaceType: job.workplaceType || 'Remote',
      experienceLevel: job.experienceLevel || '',
      salaryRange: job.salaryRange || '',
      description: job.description,
      responsibilities: (job.responsibilities || []).join('\n'),
      requirements: (job.requirements || []).join('\n'),
      skills: (job.skills || []).join(', '),
      deadline: job.deadline || 'Open until filled',
      isActive: job.isActive,
    });
    setIsModalOpen(true);
  };

  const handleGenerateWithAI = async () => {
    if (!aiRolePrompt.trim()) return;
    setAiGenerating(true);
    setModalError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/generate-jd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roleTitle: aiRolePrompt,
          department: formData.department,
          experienceLevel: formData.experienceLevel,
          workplaceType: formData.workplaceType,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'AI job description generation failed');
      }
      const gen = json.data;
      setFormData({
        title: gen.title,
        department: gen.department,
        location: gen.location,
        type: gen.type,
        workplaceType: gen.workplaceType,
        experienceLevel: gen.experienceLevel,
        salaryRange: gen.salaryRange,
        description: gen.description,
        responsibilities: (gen.responsibilities || []).join('\n'),
        requirements: (gen.requirements || []).join('\n'),
        skills: (gen.skills || []).join(', '),
        deadline: gen.deadline,
        isActive: true,
      });
    } catch (err) {
      console.error('AI JD generator error:', err);
      setModalError(err.message || 'AI generation failed. Please verify AI service.');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    try {
      const payload = {
        ...formData,
        responsibilities: formData.responsibilities.split('\n').map((r) => r.trim()).filter(Boolean),
        requirements: formData.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const url = editingJob ? `${API_BASE_URL}/jobs/${editingJob._id}` : `${API_BASE_URL}/jobs`;
      const method = editingJob ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to save job vacancy');
      }

      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      console.error('Job save error:', err);
      setModalError(err.message || 'Error saving job opening to database.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job vacancy?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete job');
      }
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error deleting job opening');
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FolderPlus className="w-6 h-6 text-blue-400" />
            Job Openings & Vacancy Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish open roles to the Careers page with automated AI Job Description generation.
          </p>
        </div>

        <Button onClick={handleOpenCreate} variant="primary" icon={Plus}>
          Create Job Opening
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#080B14] border border-slate-800/80 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search jobs by title or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <span className="text-xs text-slate-400">
          Total Roles: <strong className="text-white">{jobs.length}</strong>
        </span>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchJobs} className="text-rose-200 underline font-semibold shrink-0">
            Retry
          </button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="rounded-2xl bg-[#080B14] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101D] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Position Title</th>
                <th className="p-4">Department</th>
                <th className="p-4">Workplace</th>
                <th className="p-4">Applicants</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((j) => (
                  <tr key={j._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm hover:text-blue-300 cursor-pointer" onClick={() => handleOpenEdit(j)}>
                        {j.title}
                      </div>
                      <div className="text-slate-400 text-[11px]">{j.location} • {j.type}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold text-xs">
                        {j.department}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{j.workplaceType || 'Remote'}</td>
                    <td className="p-4">
                      <span className="font-bold text-emerald-400">{j.applicantsCount || 0} candidates</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        j.isActive
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {j.isActive ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(j)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Edit Job"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(j._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        title="Delete Job"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500 text-xs">
                    No job openings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal with AI JD Generator */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#030509]/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#080B14] border border-blue-500/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden text-xs">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editingJob ? 'Edit Job Opening' : 'Post New Job Vacancy'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Use the AI generator to auto-create job specs or fill in manually.</p>
              </div>

              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto py-6 pr-1 space-y-6 flex-1">
              
              {/* 1-Click AI Generator Tool */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-300 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    AI Job Description & Requirements Generator
                  </span>
                  <span className="text-[10px] text-slate-400">Autofills full specs & questions</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter role title e.g. Senior DevOps & Cloud Architect..."
                    value={aiRolePrompt}
                    onChange={(e) => setAiRolePrompt(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    disabled={aiGenerating || !aiRolePrompt.trim()}
                    onClick={handleGenerateWithAI}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-40 transition-colors shrink-0 shadow-lg shadow-blue-600/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {aiGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
              </div>

              {/* Modal Error Alert */}
              {modalError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Form Inputs */}
              <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Position Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="AI & Data">AI & Data</option>
                      <option value="Design">Design</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Workplace Type</label>
                    <select
                      value={formData.workplaceType}
                      onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Remote / Global"
                      className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Salary Range</label>
                    <input
                      type="text"
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                      placeholder="$70k - $100k / Year"
                      className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Job Overview Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Key Responsibilities (1 per line)</label>
                    <textarea
                      rows={5}
                      value={formData.responsibilities}
                      onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Requirements (1 per line)</label>
                    <textarea
                      rows={5}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActiveCheck"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded bg-[#05070D] border-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isActiveCheck" className="text-white text-xs font-semibold">
                    Position is currently Active and Accepting Applications on Website
                  </label>
                </div>

              </form>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button form="jobForm" type="submit" variant="primary" size="sm">
                {editingJob ? 'Save Changes' : 'Publish Job Opening'}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminJobs;
