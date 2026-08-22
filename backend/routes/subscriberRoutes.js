import express from 'express';
import Subscriber from '../models/Subscriber.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/subscribers
// @desc    Subscribe to tech insights newsletter
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed to Renovia Talent Insights!' });
    }

    await Subscriber.create({ email: email.toLowerCase() });
    res.status(201).json({ success: true, message: 'Thank you for subscribing to Renovia Talent Insights!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/subscribers
// @desc    Get all newsletter subscribers
// @access  Private (Admin)
router.get('/', verifyToken, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
