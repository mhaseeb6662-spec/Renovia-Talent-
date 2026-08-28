import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { extractTextFromResume, analyzeCandidateResume } from '../services/aiService.js';
import { sendApplicationConfirmationEmail } from '../services/emailService.js';

const router = express.Router();

// @route   POST /api/applications/apply
// @desc    Submit job application with resume file & trigger AI scoring
// @access  Public
router.post('/apply', uploadResume.single('resume'), async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      location,
      linkedin,
      portfolio,
      yearsExperience,
      currentRole,
      expectedSalary,
      noticePeriod,
      employmentPreference,
      currentCompany,
      source,
      consentGiven,
      coverLetter,
      screeningAnswers,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload your resume (PDF/DOC/DOCX).' });
    }

    let job;
    if (jobId === 'general') {
      job = {
        _id: null,
        title: 'General Application',
        department: 'All Departments',
        location: 'Anywhere',
        type: 'Any'
      };
    } else {
      job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: 'The specified job vacancy was not found or is closed.' });
      }
    }

    // Relative URL for serving resume file
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    // 1. Extract text from uploaded resume
    const resumeText = await extractTextFromResume(req.file.path);

    // 2. AI Evaluation Engine
    const aiAnalysis = await analyzeCandidateResume({
      resumeText,
      candidate: {
        fullName,
        yearsExperience,
        currentRole,
        coverLetter,
      },
      job,
    });

    // Parse screening answers if provided as string
    let parsedScreening = [];
    if (screeningAnswers) {
      try {
        parsedScreening = typeof screeningAnswers === 'string' ? JSON.parse(screeningAnswers) : screeningAnswers;
      } catch (e) {
        parsedScreening = [];
      }
    }

    // 3. Create Application Record
    const application = await Application.create({
      ...(job._id ? { job: job._id } : {}),
      jobTitle: job.title,
      fullName,
      email,
      phone: phone || '',
      location: location || '',
      linkedin: linkedin || '',
      portfolio: portfolio || '',
      yearsExperience: yearsExperience || '',
      currentRole: currentRole || '',
      expectedSalary: expectedSalary || '',
      noticePeriod: noticePeriod || 'Immediate',
      employmentPreference: employmentPreference || 'Full-time',
      currentCompany: currentCompany || '',
      source: source || '',
      consentGiven: consentGiven === 'true' || consentGiven === true,
      coverLetter: coverLetter || '',
      resumeUrl,
      resumeOriginalName: req.file.originalname,
      status: 'New',
      aiMatchScore: aiAnalysis.aiMatchScore,
      aiScoreBreakdown: aiAnalysis.aiScoreBreakdown,
      aiParsedSkills: aiAnalysis.aiParsedSkills,
      aiStrongMatches: aiAnalysis.aiStrongMatches,
      aiMissingSkills: aiAnalysis.aiMissingSkills,
      aiSummary: aiAnalysis.aiSummary,
      screeningAnswers: parsedScreening,
    });

    // Increment applicants counter on job
    if (job._id && job.save) {
      job.applicantsCount = (job.applicantsCount || 0) + 1;
      await job.save();
    }

    // 4. Send Confirmation Email (Async)
    sendApplicationConfirmationEmail({
      candidateEmail: email,
      candidateName: fullName,
      jobTitle: job.title,
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our recruitment team will review your profile.',
      data: {
        id: application._id,
        fullName: application.fullName,
        jobTitle: application.jobTitle,
        aiMatchScore: application.aiMatchScore,
      },
    });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/applications
// @desc    Get all candidate applications (ATS dashboard)
// @access  Private (Admin / Recruiter)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { jobId, status, minScore, search } = req.query;
    const query = {};

    if (jobId && jobId !== 'All') {
      query.job = jobId;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (minScore) {
      query.aiMatchScore = { $gte: Number(minScore) };
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
        { aiParsedSkills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const applications = await Application.find(query)
      .populate('job', 'title department location type')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application details
// @access  Private (Admin / Recruiter)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update candidate recruitment stage
// @access  Private (Admin / Recruiter)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/applications/:id/notes
// @desc    Add internal interview note
// @access  Private (Admin / Recruiter)
router.put('/:id/notes', verifyToken, async (req, res) => {
  try {
    const { note } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.internalNotes.push({
      note,
      author: req.user.name,
      createdAt: new Date(),
    });

    await application.save();
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete candidate application
// @access  Private (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
