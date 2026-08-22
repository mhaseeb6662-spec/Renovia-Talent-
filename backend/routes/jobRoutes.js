import express from 'express';
import Job from '../models/Job.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all active jobs (or all if admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { department, workplaceType, search, includeInactive } = req.query;
    const query = {};

    if (!includeInactive) {
      query.isActive = true;
    }

    if (department && department !== 'All') {
      query.department = department;
    }

    if (workplaceType && workplaceType !== 'All') {
      query.workplaceType = workplaceType;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job vacancy not found' });
    }
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job opening
// @access  Private (Admin / Recruiter)
router.post('/', verifyToken, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job opening
// @access  Private (Admin / Recruiter)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job opening
// @access  Private (Admin / Recruiter)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job opening deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
