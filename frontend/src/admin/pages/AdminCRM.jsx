import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Flame,
  Mail,
  Phone,
  Building,
  DollarSign,
  Clock,
  Send,
  X,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Button from '../../components/common/Button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminCRM = () => {
  const { token } = useAdminAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState(null);

  const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (priorityFilter !== 'All') params.append('aiPriority', priorityFilter);
      if (searchTerm) params.append('search', searchTerm.trim());

      const res = await fetch(`${API_BASE_URL}/leads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to load leads (Status: ${res.status})`);
      }
      const data = await res.json();
      setLeads(data.data || []);
    } catch (err) {
      console.error('Error loading leads:', err);
      setError(err.message || 'Unable to retrieve client inquiries from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, priorityFilter, searchTerm, token]);

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${leadId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l)));
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    try {
      const res = await fetch(`${API_BASE_URL}/leads/${selectedLead._id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: newNote }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedLead(data.data);
        setNewNote('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-400 font-bold';
      case 'Medium':
        return 'bg-blue-500/15 border-blue-500/30 text-blue-400 font-semibold';
      case 'General':
        return 'bg-slate-800 border-slate-700 text-slate-300';
      case 'Spam':
        return 'bg-rose-500/15 border-rose-500/30 text-rose-400 font-bold';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-amber-400" />
            Client Leads CRM & Sales Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track inquiries from the Contact page with automated AI Lead Scoring and qualification.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[#080B14] border border-slate-800 text-xs font-semibold text-slate-300">
          Total Inquiries: <span className="text-amber-400">{leads.length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#080B14] border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, client or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Pipeline Stages</option>
            {stages.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All AI Priorities</option>
            <option value="High">🔥 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="General">⚪ General Inquiry</option>
            <option value="Spam">🔴 Flagged Spam</option>
          </select>
        </div>

        <button
          onClick={() => { setSearchTerm(''); setStatusFilter('All'); setPriorityFilter('All'); }}
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
          <button onClick={fetchLeads} className="text-rose-200 underline font-semibold shrink-0">
            Retry
          </button>
        </div>
      )}

      {/* Leads Table */}
      <div className="rounded-2xl bg-[#080B14] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101D] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Client & Company</th>
                <th className="p-4">Service</th>
                <th className="p-4">AI Priority</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Stage</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-slate-900/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-slate-400 text-[11px]">{lead.company} • {lead.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-200">{lead.service}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs ${getPriorityBadge(lead.aiPriority)}`}>
                        {lead.aiPriority === 'High' && <Flame className="w-3 h-3 text-amber-400" />}
                        {lead.aiPriority}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-400 font-semibold">
                      {lead.budget}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-[#05070D] border border-slate-800 text-xs font-semibold text-white focus:ring-1 focus:ring-blue-500"
                      >
                        {stages.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1 rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors font-medium text-xs"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500 text-xs">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#030509]/80 backdrop-blur-xl" onClick={() => setSelectedLead(null)} />

          <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#080B14] border border-amber-500/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden text-xs">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-md border text-xs font-bold ${getPriorityBadge(selectedLead.aiPriority)}`}>
                    {selectedLead.aiPriority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-400">{selectedLead.company} • {selectedLead.service}</p>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto py-6 pr-1 space-y-5 flex-1">
              
              {/* AI Analysis Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Lead Qualification Analysis
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {selectedLead.aiAnalysis || 'Genuine business inquiry identified from website consultation form.'}
                </p>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#05070D] border border-slate-800 space-y-1.5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Email</p>
                  <p className="text-white font-medium">{selectedLead.email}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#05070D] border border-slate-800 space-y-1.5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Phone</p>
                  <p className="text-white font-medium">{selectedLead.phone || 'Not provided'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#05070D] border border-slate-800 space-y-1.5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Service Required</p>
                  <p className="text-blue-400 font-medium">{selectedLead.service}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#05070D] border border-slate-800 space-y-1.5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Budget</p>
                  <p className="text-emerald-400 font-bold">{selectedLead.budget}</p>
                </div>
              </div>

              {/* Requirement Message */}
              <div className="p-4 rounded-xl bg-[#05070D] border border-slate-800 space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Client Requirement Message</p>
                <p className="text-slate-200 leading-relaxed">{selectedLead.message}</p>
              </div>

              {/* Sales Internal Notes */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  Sales Internal Notes ({selectedLead.internalNotes?.length || 0})
                </h4>

                <div className="space-y-2">
                  {selectedLead.internalNotes && selectedLead.internalNotes.length > 0 ? (
                    selectedLead.internalNotes.map((n, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#05070D] border border-slate-800">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                          <span className="font-bold text-blue-400">{n.author}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-200">{n.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">No sales notes added yet.</p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add follow-up notes or deal updates..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Save
                  </button>
                </form>
              </div>

            </div>

            {/* Footer Pipeline Update */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Pipeline Stage:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead._id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#05070D] border border-slate-800 text-xs font-bold text-white focus:ring-2 focus:ring-blue-500"
                >
                  {stages.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <Button variant="secondary" size="sm" onClick={() => setSelectedLead(null)}>
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCRM;
