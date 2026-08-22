import express from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Lead from '../models/Lead.js';
import Blog from '../models/Blog.js';
import Subscriber from '../models/Subscriber.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/stats/dashboard
// @desc    Get dashboard metrics & aggregated overview
// @access  Private (Admin)
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      newApplications,
      shortlistedApplications,
      totalLeads,
      highPriorityLeads,
      newLeads,
      totalBlogs,
      totalSubscribers,
      recentApplications,
      recentLeads,
    ] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'New' }),
      Application.countDocuments({ status: 'Shortlisted' }),
      Lead.countDocuments(),
      Lead.countDocuments({ aiPriority: 'High' }),
      Lead.countDocuments({ status: 'New' }),
      Blog.countDocuments(),
      Subscriber.countDocuments(),
      Application.find().sort({ createdAt: -1 }).limit(5).select('fullName jobTitle aiMatchScore status createdAt'),
      Lead.find().sort({ createdAt: -1 }).limit(5).select('name company service aiPriority status createdAt'),
    ]);

    // Average AI Match Score
    const avgScoreResult = await Application.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$aiMatchScore' } } },
    ]);
    const avgAiMatchScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore) : 0;

    res.json({
      success: true,
      stats: {
        jobs: { total: totalJobs, active: activeJobs },
        applications: {
          total: totalApplications,
          new: newApplications,
          shortlisted: shortlistedApplications,
          avgScore: avgAiMatchScore,
        },
        leads: {
          total: totalLeads,
          highPriority: highPriorityLeads,
          new: newLeads,
        },
        blogs: { total: totalBlogs },
        subscribers: { total: totalSubscribers },
      },
      recentActivity: {
        applications: recentApplications,
        leads: recentLeads,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
