import express from 'express';
import Blog from '../models/Blog.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all published blogs (or all if admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, includeDrafts } = req.query;
    const query = {};

    if (!includeDrafts) {
      query.status = 'published';
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Increment views safely
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    // Also fetch 2 related posts
    const relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      status: 'published',
    }).limit(2);

    res.json({ success: true, data: blog, relatedPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post
// @access  Private (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, slug, category, readTime, image, excerpt, content, status, seoTitle, seoDescription, tags } = req.body;

    const cleanSlug = (slug || title)
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const blog = await Blog.create({
      title,
      slug: cleanSlug,
      category: category || 'Technology',
      readTime: readTime || '5 min read',
      image: image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      excerpt,
      content,
      status: status || 'published',
      author: {
        name: req.user.name,
        role: 'Tech & Talent Strategist',
        avatar: req.user.avatar,
      },
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      tags: tags || [category],
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog post
// @access  Private (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
// @access  Private (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
