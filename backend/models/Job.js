import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      default: 'Remote / Global',
    },
    type: {
      type: String,
      required: [true, 'Employment type is required'],
      default: 'Full-time',
    },
    workplaceType: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site'],
      default: 'Remote',
    },
    experienceLevel: {
      type: String,
      default: 'Mid-Senior Level',
    },
    salaryRange: {
      type: String,
      default: 'Competitive / Based on Experience',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: [
      {
        type: String,
      },
    ],
    responsibilities: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    screeningQuestions: [
      {
        type: String,
      },
    ],
    deadline: {
      type: String,
      default: 'Open until filled',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
