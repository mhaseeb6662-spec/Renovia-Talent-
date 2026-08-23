import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Sparkles,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  FolderPlus,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminErrorBoundary } from './AdminErrorBoundary';

export const AdminLayout = () => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'ATS Candidates', path: '/admin/ats', icon: Users },
    { name: 'Leads CRM', path: '/admin/crm', icon: Briefcase },
    { name: 'Blogs CMS', path: '/admin/blogs', icon: FileText },
    { name: 'Jobs Manager', path: '/admin/jobs', icon: FolderPlus },
    { name: 'AI Studio', path: '/admin/ai-tools', icon: Sparkles },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#030509] text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#080B14] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-900">
            <img src="/renovia-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="font-bold text-sm text-white">Renovia Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#05070D] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-900 shadow-md shadow-blue-500/20">
              <img src="/renovia-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="font-bold text-white tracking-tight text-base leading-tight">
                RENOVIA <span className="blue-gradient-text">ADMIN</span>
              </h2>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-400">
                Platform Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Management & AI
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-[#080B14]/60">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-emerald-400 font-medium capitalize flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 inline" /> {user?.role || 'Super Admin'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 px-3 py-2 rounded-xl bg-[#101621] hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-800"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Website
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-rose-500/20"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <AdminErrorBoundary>
          <Outlet />
        </AdminErrorBoundary>
      </main>

    </div>
  );
};

export default AdminLayout;
