import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: 'Individual / Confidential',
    },
    service: {
      type: String,
      default: 'Technology & Software Development',
    },
    budget: {
      type: String,
      default: 'Flexible / Undisclosed',
    },
    message: {
      type: String,
      required: [true, 'Message / requirement details required'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'],
      default: 'New',
    },
    aiPriority: {
      type: String,
      enum: ['High', 'Medium', 'General', 'Spam'],
      default: 'Medium',
    },
    aiAnalysis: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'Website Contact Form',
    },
    assignedTo: {
      type: String,
      default: 'Sales Team',
    },
    internalNotes: [
      {
        note: String,
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
