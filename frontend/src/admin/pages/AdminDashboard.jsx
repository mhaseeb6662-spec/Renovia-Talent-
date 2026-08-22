import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flame,
  AlertCircle,
  FolderPlus,
  RefreshCw,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminDashboard = () => {
  const { token, user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    jobs: { total: 0, active: 0 },
    applications: { total: 0, new: 0, shortlisted: 0, avgScore: 0 },
    leads: { total: 0, highPriority: 0, new: 0 },
    blogs: { total: 0 },
    subscribers: { total: 0 },
  });
  const [recentActivity, setRecentActivity] = useState({
    applications: [],
    leads: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/stats/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }
      if (!res.ok) {
        throw new Error(`Failed to load dashboard metrics (Status: ${res.status})`);
      }
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentActivity(data.recentActivity || { applications: [], leads: [] });
      }
    } catch (err) {
      console.error('Dashboard stats fetch error:', err);
      setError(err.message || 'Unable to retrieve telemetry stats from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardStats();
    }
  }, [token]);

  const statCards = [
    {
      title: 'Active Job Openings',
      value: stats.jobs.active,
      sub: `${stats.jobs.total} total created`,
      icon: FolderPlus,
      color: 'from-blue-600/20 to-blue-900/10 border-blue-500/30 text-blue-400',
      link: '/admin/jobs',
    },
    {
      title: 'ATS Candidates',
      value: stats.applications.total,
      sub: stats.applications.avgScore > 0 ? `${stats.applications.avgScore}% Avg AI Match Score` : 'No score data yet',
      icon: Users,
      color: 'from-emerald-600/20 to-emerald-900/10 border-emerald-500/30 text-emerald-400',
      link: '/admin/ats',
    },
    {
      title: 'High-Priority Leads',
      value: stats.leads.highPriority,
      sub: `${stats.leads.total} total inquiries`,
      icon: Flame,
      color: 'from-amber-600/20 to-amber-900/10 border-amber-500/30 text-amber-400',
      link: '/admin/crm',
    },
    {
      title: 'Published Blogs',
      value: stats.blogs.total,
      sub: 'Dynamic content items',
      icon: FileText,
      color: 'from-purple-600/20 to-purple-900/10 border-purple-500/30 text-purple-400',
      link: '/admin/blogs',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1224] via-[#0D1836] to-[#080B14] border border-blue-500/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Real-Time Database Synchronized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user?.name || 'Administrator'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Your AI-powered Applicant Tracking System (ATS), Leads CRM, and Content Management System are active and synchronized with MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchDashboardStats}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
            </button>
            <Link
              to="/admin/ai-tools"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              AI Studio & Generator
            </Link>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchDashboardStats} className="text-rose-200 underline font-semibold shrink-0">
            Retry
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              to={c.link}
              className={`p-6 rounded-2xl bg-gradient-to-b ${c.color} border backdrop-blur-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {c.title}
                </span>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                  {loading ? (
                    <span className="text-slate-600 animate-pulse text-2xl font-mono">...</span>
                  ) : (
                    c.value
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>{c.sub}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Launch Action Center */}
      <div className="p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          Quick Actions & AI Utilities
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            to="/admin/jobs"
            className="p-4 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-blue-500/40 transition-colors flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-blue-300">Post Vacancy</p>
              <p className="text-[11px] text-slate-400">Generate JD with AI</p>
            </div>
          </Link>

          <Link
            to="/admin/blogs"
            className="p-4 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-purple-500/40 transition-colors flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-purple-300">Publish Article</p>
              <p className="text-[11px] text-slate-400">Write drafts with AI</p>
            </div>
          </Link>

          <Link
            to="/admin/ats"
            className="p-4 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-emerald-300">Review ATS</p>
              <p className="text-[11px] text-slate-400">See AI match scores</p>
            </div>
          </Link>

          <Link
            to="/admin/crm"
            className="p-4 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-amber-300">Manage Leads</p>
              <p className="text-[11px] text-slate-400">Review client pipeline</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Two Column Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Applicants */}
        <div className="p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Recent ATS Applicants
            </h3>
            <Link to="/admin/ats" className="text-xs text-blue-400 hover:underline">
              View All ATS →
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.applications && recentActivity.applications.length > 0 ? (
              recentActivity.applications.map((app, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0B101D] border border-slate-800/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{app.fullName}</p>
                    <p className="text-[11px] text-slate-400">{app.jobTitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      {app.aiMatchScore}% Match
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px]">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                {loading ? 'Fetching applicants from database...' : 'No candidate applications received yet.'}
              </div>
            )}
          </div>
        </div>

        {/* Recent Client Leads */}
        <div className="p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Recent Client Leads
            </h3>
            <Link to="/admin/crm" className="text-xs text-blue-400 hover:underline">
              View CRM Pipeline →
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.leads && recentActivity.leads.length > 0 ? (
              recentActivity.leads.map((lead, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0B101D] border border-slate-800/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{lead.name} • <span className="text-slate-400 font-normal">{lead.company}</span></p>
                    <p className="text-[11px] text-blue-400">{lead.service}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                      lead.aiPriority === 'High'
                        ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                        : 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                    }`}>
                      {lead.aiPriority === 'High' ? '🔥 High Priority' : 'Medium'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px]">
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                {loading ? 'Fetching leads from database...' : 'No contact leads recorded yet.'}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
