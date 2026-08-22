import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Button from '../../components/common/Button';

export const AdminLogin = () => {
  const [email, setEmail] = useState('admin@renoviatalent.com');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState('');
  const { login, loading, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Invalid email or password. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030509] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Lighting Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#080B14] border border-blue-500/30 shadow-2xl shadow-blue-500/10 z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-900 shadow-lg shadow-blue-500/20 mb-3">
            <img src="/renovia-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full bg-slate-950" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Admin Console
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to manage AI recruitment, leads CRM, and platform content.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@renoviatalent.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full justify-center"
            >
              {loading ? 'Authenticating...' : 'Sign In to Console'}
            </Button>
          </div>
        </form>

        {/* Default Credential Helper Note */}
        <div className="p-3.5 rounded-2xl bg-[#101621] border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1 text-blue-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Default Super Admin Credentials:</span>
          </div>
          <p>Email: <code className="text-slate-200">admin@renoviatalent.com</code></p>
          <p>Password: <code className="text-slate-200">Admin@123456</code></p>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">
            ← Return to public website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
