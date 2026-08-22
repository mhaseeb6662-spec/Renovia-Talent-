import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Button from '../../components/common/Button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminBlogs = () => {
  const { token, user } = useAdminAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Technology & AI',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    excerpt: '',
    content: '',
    status: 'published',
    seoTitle: '',
    seoDescription: '',
    tags: 'AI, Engineering, Software',
  });

  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/blogs?includeDrafts=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to load blogs (Status: ${res.status})`);
      }
      const data = await res.json();
      setBlogs(data.data || []);
    } catch (err) {
      console.error('Fetch blogs error:', err);
      setError(err.message || 'Unable to retrieve blog posts from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setModalError(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Technology & AI',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      excerpt: '',
      content: '',
      status: 'published',
      seoTitle: '',
      seoDescription: '',
      tags: 'AI, Engineering, Software',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setModalError(null);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      readTime: blog.readTime,
      image: blog.image,
      excerpt: blog.excerpt,
      content: blog.content,
      status: blog.status,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      tags: (blog.tags || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setModalError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/generate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic: aiPrompt, category: formData.category, author: user?.name }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'AI blog generation failed');
      }
      const generated = json.data;
      setFormData({
        title: generated.title,
        slug: generated.slug,
        category: generated.category,
        readTime: generated.readTime,
        image: generated.image,
        excerpt: generated.excerpt,
        content: generated.content,
        status: 'published',
        seoTitle: generated.seoTitle,
        seoDescription: generated.seoDescription,
        tags: (generated.tags || []).join(', '),
      });
    } catch (err) {
      console.error('AI generation error:', err);
      setModalError(err.message || 'AI generation failed. Please verify AI provider configuration.');
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
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      const url = editingBlog ? `${API_BASE_URL}/blogs/${editingBlog._id}` : `${API_BASE_URL}/blogs`;
      const method = editingBlog ? 'PUT' : 'POST';

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
        throw new Error(json.message || 'Failed to save blog article');
      }

      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error('Blog save error:', err);
      setModalError(err.message || 'Error saving article to database.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete blog post');
      }
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error deleting blog post');
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-purple-400" />
            Blogs Content Management System
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, edit, and publish dynamic thought leadership articles with 1-click AI generation.
          </p>
        </div>

        <Button onClick={handleOpenCreate} variant="primary" icon={Plus}>
          New Blog Post
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#080B14] border border-slate-800/80 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <span className="text-xs text-slate-400">
          Published: <strong className="text-white">{blogs.length}</strong>
        </span>
      </div>

      {/* Blogs Table */}
      <div className="rounded-2xl bg-[#080B14] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101D] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Read Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm hover:text-blue-300 cursor-pointer" onClick={() => handleOpenEdit(b)}>
                        {b.title}
                      </div>
                      <div className="text-slate-400 text-[11px] truncate max-w-md">{b.excerpt}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold text-xs">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{b.readTime}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500 text-xs">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal with AI Generator */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#030509]/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#080B14] border border-purple-500/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden text-xs">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editingBlog ? 'Edit Blog Article' : 'Create New Article'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Use the AI draft generator below or write custom Markdown content.</p>
              </div>

              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto py-6 pr-1 space-y-6 flex-1">
              
              {/* 1-Click AI Generator Tool */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI Article & SEO Generator
                  </span>
                  <span className="text-[10px] text-slate-400">Autofills title, body, and meta tags</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter topic e.g. Future of Generative AI in Microservices..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    disabled={aiGenerating || !aiPrompt.trim()}
                    onClick={handleGenerateWithAI}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-40 transition-colors shrink-0 shadow-lg shadow-purple-600/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {aiGenerating ? 'Writing Draft...' : 'Generate with AI'}
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
              <form id="blogForm" onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Technology & AI">Technology & AI</option>
                      <option value="Recruitment">Recruitment</option>
                      <option value="Career Insights">Career Insights</option>
                      <option value="Company News">Company News</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Featured Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Short Excerpt (Summary) *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Article Content (HTML or Markdown) *</label>
                  <textarea
                    rows={8}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* SEO Fields */}
                <div className="p-4 rounded-xl bg-[#05070D] border border-slate-800 space-y-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">SEO & Social Meta Tags</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">SEO Meta Title</label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#080B14] border border-slate-800 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Tags (Comma separated)</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#080B14] border border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

              </form>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button form="blogForm" type="submit" variant="primary" size="sm">
                {editingBlog ? 'Save Changes' : 'Publish Article'}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBlogs;
