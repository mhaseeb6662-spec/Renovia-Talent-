import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { seedDatabase } from './seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads (Resumes and Images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      family: 4, // Use IPv4, skip trying IPv6
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    // Auto-seed default admin & data
    await seedDatabase();
  } catch (err) {
    console.warn('⚠️ MongoDB Initial Connection Warning:', err.message);
    console.log('ℹ️ Server will continue running and retry connection in background.');
  }
};

connectDB();

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Renovia Talent Full-Stack & AI API Server is running.',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stats', statsRoutes);

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Endpoint '${req.originalUrl}' not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Renovia Talent API Server running on http://localhost:${PORT}`);
});
