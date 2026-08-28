import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: false,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    portfolio: {
      type: String,
      default: '',
    },
    yearsExperience: {
      type: String,
      default: '',
    },
    currentRole: {
      type: String,
      default: '',
    },
    expectedSalary: {
      type: String,
      default: '',
    },
    noticePeriod: {
      type: String,
      default: 'Immediate / 30 Days',
    },
    employmentPreference: {
      type: String,
      default: 'Full-time',
    },
    currentCompany: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    consentGiven: {
      type: Boolean,
      default: false,
    },
    coverLetter: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume file is required'],
    },
    resumeOriginalName: {
      type: String,
      default: 'resume.pdf',
    },
    status: {
      type: String,
      enum: [
        'New', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected',
        'Connected', 'No Answer', 'Busy', 'Call Back', 'Interested', 'Not Interested', 
        'Wrong Number', 'Number Not Reachable', 'Interview Scheduled', 'Selected', 'Joined'
      ],
      default: 'New',
    },
    aiMatchScore: {
      type: Number,
      default: 75,
      min: 0,
      max: 100,
    },
    aiScoreBreakdown: {
      technicalSkills: { type: Number, default: 80 },
      experience: { type: Number, default: 75 },
      roleRelevance: { type: Number, default: 70 },
    },
    aiParsedSkills: [
      {
        type: String,
      },
    ],
    aiStrongMatches: [
      {
        type: String,
      },
    ],
    aiMissingSkills: [
      {
        type: String,
      },
    ],
    aiSummary: {
      type: String,
      default: '',
    },
    screeningAnswers: [
      {
        question: String,
        answer: String,
      },
    ],
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

export default mongoose.model('Application', applicationSchema);
