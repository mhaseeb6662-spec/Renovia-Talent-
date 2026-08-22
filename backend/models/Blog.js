import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    image: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
    },
    author: {
      name: { type: String, default: 'Renovia Talent Editorial' },
      role: { type: String, default: 'Tech & Talent Strategist' },
      avatar: { type: String, default: '' },
    },
    seoTitle: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
