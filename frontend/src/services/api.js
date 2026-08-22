const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses and throw genuine, debuggable errors
 */
const handleResponse = async (res) => {
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Server returned invalid JSON response (Status: ${res.status})`);
  }

  if (!res.ok) {
    const errorMsg = json.message || `Request failed with status ${res.status}`;
    const err = new Error(errorMsg);
    err.status = res.status;
    err.details = json;
    throw err;
  }

  return json;
};

/**
 * Fetch all published blogs with optional category & search filters
 */
export const getBlogs = async (category = 'All', search = '') => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search.trim());

  const res = await fetch(`${API_BASE_URL}/blogs?${params.toString()}`);
  const json = await handleResponse(res);
  return json.data || [];
};

/**
 * Fetch single published blog by slug
 */
export const getBlogBySlug = async (slug) => {
  const res = await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}`);
  const json = await handleResponse(res);
  return {
    blog: json.data,
    relatedPosts: json.relatedPosts || [],
  };
};

/**
 * Fetch all active jobs with optional department, workplace & search filters
 */
export const getJobs = async (department = 'All', workplaceType = 'All', search = '') => {
  const params = new URLSearchParams();
  if (department && department !== 'All') params.append('department', department);
  if (workplaceType && workplaceType !== 'All') params.append('workplaceType', workplaceType);
  if (search) params.append('search', search.trim());

  const res = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
  const json = await handleResponse(res);
  return json.data || [];
};

/**
 * Fetch single job by ID
 */
export const getJobById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${encodeURIComponent(id)}`);
  const json = await handleResponse(res);
  return json.data;
};

/**
 * Submit candidate job application with resume file (multipart/form-data)
 */
export const submitJobApplication = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/applications/apply`, {
    method: 'POST',
    body: formData,
  });
  return await handleResponse(res);
};

/**
 * Submit contact inquiry / create client lead
 */
export const submitContactLead = async (leadData) => {
  const res = await fetch(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  return await handleResponse(res);
};

/**
 * Subscribe email to newsletter
 */
export const subscribeNewsletter = async (email) => {
  const res = await fetch(`${API_BASE_URL}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
  return await handleResponse(res);
};

/**
 * Chat with RAG AI Website Assistant
 */
export const chatWithAIAssistant = async (message, history = []) => {
  const res = await fetch(`${API_BASE_URL}/ai/chat-assistant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: message.trim(), history }),
  });
  const json = await handleResponse(res);
  return json.reply;
};

export default {
  getBlogs,
  getBlogBySlug,
  getJobs,
  getJobById,
  submitJobApplication,
  submitContactLead,
  subscribeNewsletter,
  chatWithAIAssistant,
};
