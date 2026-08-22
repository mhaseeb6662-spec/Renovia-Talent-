import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  FolderPlus,
  Users,
  Copy,
  CheckCircle2,
  Send,
  RefreshCw,
  Cpu,
  Bot,
  AlertCircle,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Button from '../../components/common/Button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminAITools = () => {
  const { token, user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('blog');
  const [errorMsg, setErrorMsg] = useState(null);

  // Blog State
  const [blogTopic, setBlogTopic] = useState('');
  const [blogCategory, setBlogCategory] = useState('Technology & AI');
  const [generatedBlog, setGeneratedBlog] = useState(null);
  const [blogLoading, setBlogLoading] = useState(false);

  // Job Spec State
  const [jobTitlePrompt, setJobTitlePrompt] = useState('');
  const [jobDept, setJobDept] = useState('Engineering');
  const [generatedJob, setGeneratedJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(false);

  // Resume Quick Evaluator State
  const [resumeText, setResumeText] = useState('');
  const [jobRequirementsText, setJobRequirementsText] = useState('React, Node.js, TypeScript, REST APIs, Docker, AWS');
  const [evalResult, setEvalResult] = useState(null);
  const [evalLoading, setEvalLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateBlog = async (e) => {
    e.preventDefault();
    if (!blogTopic.trim()) return;
    setBlogLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/generate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic: blogTopic, category: blogCategory, author: user?.name }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'AI blog draft generation failed');
      }
      setGeneratedBlog(json.data);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error communicating with AI blog generation service.');
    } finally {
      setBlogLoading(false);
    }
  };

  const handleGenerateJob = async (e) => {
    e.preventDefault();
    if (!jobTitlePrompt.trim()) return;
    setJobLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/generate-jd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roleTitle: jobTitlePrompt, department: jobDept }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'AI job specification generation failed');
      }
      setGeneratedJob(json.data);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error communicating with AI job description service.');
    } finally {
      setJobLoading(false);
    }
  };

  const handleEvaluateResume = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setEvalLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/ai/evaluate-resume-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeText,
          jobRequirements: jobRequirementsText,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'AI resume evaluation failed');
      }
      setEvalResult(json.data);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error evaluating resume with AI engine.');
    } finally {
      setEvalLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-purple-400" />
          Renovia AI Studio & Generation Workbench
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Instant generative tools for technical articles, role descriptions, and candidate resume match scoring.
        </p>
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-200 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-[#080B14] border border-slate-800 w-fit">
        <button
          onClick={() => { setActiveTab('blog'); setErrorMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'blog'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          AI Blog & SEO Writer
        </button>

        <button
          onClick={() => { setActiveTab('job'); setErrorMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'job'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          AI Job Description Studio
        </button>

        <button
          onClick={() => { setActiveTab('eval'); setErrorMsg(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'eval'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          Candidate Resume Evaluator
        </button>
      </div>

      {/* Tab 1: Blog Generator */}
      {activeTab === 'blog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4">
            <h3 className="font-bold text-white text-sm">Generate Technical Thought Leadership</h3>
            
            <form onSubmit={handleGenerateBlog} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Article Topic / Keyword</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modernizing Legacy Monoliths with Event-Driven Architecture"
                  value={blogTopic}
                  onChange={(e) => setBlogTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Industry Category</label>
                <select
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Software Development">Software Development</option>
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="Technology & AI">Technology & AI</option>
                  <option value="Recruitment">Recruitment</option>
                  <option value="Career Insights">Career Insights</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={blogLoading}
                icon={Sparkles}
                iconPosition="right"
                className="w-full justify-center bg-purple-600 hover:bg-purple-500"
              >
                {blogLoading ? 'Generating Full Draft with AI...' : 'Generate Article Draft'}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Generated Article Preview</h3>
              {generatedBlog && (
                <button
                  onClick={() => copyToClipboard(generatedBlog.content)}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              )}
            </div>

            {generatedBlog ? (
              <div className="space-y-4 p-4 rounded-xl bg-[#05070D] border border-slate-800/80 max-h-[500px] overflow-y-auto">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase">{generatedBlog.category}</span>
                  <h4 className="text-base font-bold text-white mt-1">{generatedBlog.title}</h4>
                  <p className="text-slate-400 text-xs mt-1 italic">{generatedBlog.excerpt}</p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-slate-300 whitespace-pre-wrap font-mono leading-relaxed text-[11px]">
                  {generatedBlog.content}
                </div>
              </div>
            ) : (
              <div className="p-16 text-center text-slate-500 text-xs">
                Enter a topic on the left and click Generate to run the AI draft engine.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Job Description Generator */}
      {activeTab === 'job' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4">
            <h3 className="font-bold text-white text-sm">Generate Job Specifications</h3>
            
            <form onSubmit={handleGenerateJob} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Position Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead AI / Machine Learning Architect"
                  value={jobTitlePrompt}
                  onChange={(e) => setJobTitlePrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Department</label>
                <select
                  value={jobDept}
                  onChange={(e) => setJobDept(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070D] border border-slate-800 text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="AI & Data">AI & Data</option>
                  <option value="Design">Design</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={jobLoading}
                icon={Sparkles}
                iconPosition="right"
                className="w-full justify-center"
              >
                {jobLoading ? 'Generating Specifications with AI...' : 'Generate Job Specs'}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm">Generated Role Specs</h3>
            
            {generatedJob ? (
              <div className="space-y-4 p-4 rounded-xl bg-[#05070D] border border-slate-800/80 max-h-[500px] overflow-y-auto">
                <div>
                  <h4 className="text-base font-bold text-white">{generatedJob.title}</h4>
                  <p className="text-slate-400 text-xs mt-1">{generatedJob.description}</p>
                </div>

                <div className="pt-2">
                  <p className="font-bold text-blue-400 uppercase text-[10px]">Key Responsibilities:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 mt-1">
                    {generatedJob.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="font-bold text-emerald-400 uppercase text-[10px]">Candidate Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 mt-1">
                    {generatedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-16 text-center text-slate-500 text-xs">
                Enter a role title on the left to auto-generate responsibilities, requirements, and screening questions.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Resume Quick Evaluator */}
      {activeTab === 'eval' && (
        <div className="p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 space-y-4 text-xs">
          <div>
            <h3 className="font-bold text-white text-sm">Instant Candidate Resume Evaluator</h3>
            <p className="text-slate-400">Paste raw text from a candidate's CV or bio to test AI matching against job requirements.</p>
          </div>

          <form onSubmit={handleEvaluateResume} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Job Requirements / Skills Target</label>
                <input
                  type="text"
                  value={jobRequirementsText}
                  onChange={(e) => setJobRequirementsText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Candidate Resume Text / Bio</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Paste candidate work history or skills summary here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" disabled={evalLoading} className="bg-emerald-600 hover:bg-emerald-500">
              {evalLoading ? 'Evaluating Profile with AI Engine...' : 'Run AI Evaluation'}
            </Button>
          </form>

          {evalResult && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-emerald-400">{evalResult.aiMatchScore}% AI Match</span>
                <span className="text-slate-400 text-xs">Score persisted & verified</span>
              </div>
              <p className="text-slate-200">{evalResult.aiSummary}</p>
              
              {evalResult.aiScoreBreakdown && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2 rounded-lg bg-[#05070D] border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block">Technical Skills</span>
                    <span className="font-bold text-emerald-400">{evalResult.aiScoreBreakdown.technicalSkills}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#05070D] border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block">Experience</span>
                    <span className="font-bold text-blue-400">{evalResult.aiScoreBreakdown.experience}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#05070D] border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block">Relevance</span>
                    <span className="font-bold text-indigo-400">{evalResult.aiScoreBreakdown.roleRelevance}%</span>
                  </div>
                </div>
              )}

              {evalResult.aiParsedSkills && evalResult.aiParsedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {evalResult.aiParsedSkills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default AdminAITools;
