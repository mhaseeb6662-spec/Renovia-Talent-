import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdminAuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('renovia_admin_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('renovia_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('renovia_admin_token');
    localStorage.removeItem('renovia_admin_user');
  }, []);

  // Verify token validity on app load
  useEffect(() => {
    const verifySavedToken = async () => {
      const savedToken = localStorage.getItem('renovia_admin_token');
      if (!savedToken) {
        setInitialCheckDone(true);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('renovia_admin_user', JSON.stringify(data.user));
          } else {
            logout();
          }
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.warn('Backend connection unavailable for session verification:', err.message);
      } finally {
        setInitialCheckDone(true);
      }
    };

    verifySavedToken();
  }, [logout]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please verify email and password.');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('renovia_admin_token', data.token);
      localStorage.setItem('renovia_admin_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Unable to connect to authentication server. Please check your network or server status.',
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout, loading, initialCheckDone }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
