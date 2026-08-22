import express from 'express';
import Lead from '../models/Lead.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { scoreLeadPriority } from '../services/aiService.js';
import { sendLeadReceiptEmail } from '../services/emailService.js';

const router = express.Router();

// @route   POST /api/leads
// @desc    Submit contact form / client inquiry & auto-score priority
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, message, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and requirement details.' });
    }

    // 1. AI Lead Scoring Engine
    const aiEvaluation = await scoreLeadPriority({
      name,
      email,
      company: company || '',
      service: service || '',
      budget: budget || '',
      message,
    });

    // 2. Create Lead in CRM
    const lead = await Lead.create({
      name,
      email,
      phone: phone || '',
      company: company || 'Confidential / Individual',
      service: service || 'Technology Development',
      budget: budget || 'Undisclosed',
      message,
      source: source || 'Website Contact Page',
      aiPriority: aiEvaluation.aiPriority,
      aiAnalysis: aiEvaluation.aiAnalysis,
      status: 'New',
    });

    // 3. Send Confirmation Email (Async)
    sendLeadReceiptEmail({
      clientEmail: email,
      clientName: name,
      service,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! Our strategic technology team will contact you within 24 business hours.',
      data: {
        id: lead._id,
        name: lead.name,
      },
    });
  } catch (err) {
    console.error('Error submitting contact lead:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/leads
// @desc    Get all client leads (CRM Dashboard)
// @access  Private (Admin / Sales)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status, aiPriority, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (aiPriority && aiPriority !== 'All') {
      query.aiPriority = aiPriority;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/leads/:id
// @desc    Get single lead details
// @access  Private (Admin / Sales)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/leads/:id/status
// @desc    Update lead pipeline stage
// @access  Private (Admin / Sales)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/leads/:id/notes
// @desc    Add internal sales note to lead
// @access  Private (Admin / Sales)
router.put('/:id/notes', verifyToken, async (req, res) => {
  try {
    const { note } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.internalNotes.push({
      note,
      author: req.user.name,
      createdAt: new Date(),
    });

    await lead.save();
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete lead
// @access  Private (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
