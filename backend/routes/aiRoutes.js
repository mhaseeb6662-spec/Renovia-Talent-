import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  generateAIBlog,
  generateAIJobDescription,
  getWebsiteAssistantResponse,
  analyzeCandidateResume,
} from '../services/aiService.js';

const router = express.Router();

// @route   POST /api/ai/generate-blog
// @desc    Generate a complete blog article with SEO metadata using AI
// @access  Private (Admin)
router.post('/generate-blog', verifyToken, async (req, res) => {
  try {
    const { topic, category, author } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, message: 'Please provide a blog topic or title prompt.' });
    }

    const blogDraft = await generateAIBlog({
      topic,
      category: category || 'Technology & AI',
      author: author || req.user.name,
    });

    res.json({ success: true, data: blogDraft });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/ai/generate-jd
// @desc    Generate a job description with screening questions using AI
// @access  Private (Admin)
router.post('/generate-jd', verifyToken, async (req, res) => {
  try {
    const { roleTitle, department, experienceLevel, workplaceType } = req.body;
    if (!roleTitle) {
      return res.status(400).json({ success: false, message: 'Please provide a role title prompt.' });
    }

    const jdDraft = await generateAIJobDescription({
      roleTitle,
      department,
      experienceLevel,
      workplaceType,
    });

    res.json({ success: true, data: jdDraft });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/ai/evaluate-resume-text
// @desc    Analyze raw resume text against requirements using AI engine
// @access  Private (Admin)
router.post('/evaluate-resume-text', verifyToken, async (req, res) => {
  try {
    const { resumeText, jobRequirements } = req.body;
    if (!resumeText) {
      return res.status(400).json({ success: false, message: 'Resume text is required for evaluation.' });
    }

    const reqSkills = jobRequirements
      ? jobRequirements.split(',').map((s) => s.trim()).filter(Boolean)
      : ['React', 'Node.js', 'TypeScript', 'REST APIs'];

    const evaluation = await analyzeCandidateResume({
      resumeText,
      candidate: {
        fullName: 'Evaluated Candidate',
        coverLetter: '',
      },
      job: {
        title: 'Target Position',
        skills: reqSkills,
        requirements: reqSkills,
      },
    });

    res.json({ success: true, data: evaluation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/ai/chat-assistant
// @desc    Public website conversational AI assistant (RAG)
// @access  Public
router.post('/chat-assistant', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const reply = await getWebsiteAssistantResponse(message, history || []);
    res.json({ success: true, reply });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
