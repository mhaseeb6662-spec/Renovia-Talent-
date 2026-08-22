import dns from 'dns';
try {
  // Use custom public DNS on Windows development to resolve SRV records
  if (process.platform === 'win32') {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
} catch (e) {}

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

let lastDbError = null;

const DEFAULT_MONGO_URI = 'mongodb+srv://mhaseeb6662_db_user:tg1hsSl9h6IDjDwI@cluster0.xzb3kqq.mongodb.net/renovia_talent?retryWrites=true&w=majority';
const DIRECT_MONGO_URI = 'mongodb://mhaseeb6662_db_user:tg1hsSl9h6IDjDwI@ac-hicmh5y-shard-00-00.xzb3kqq.mongodb.net:27017,ac-hicmh5y-shard-00-01.xzb3kqq.mongodb.net:27017,ac-hicmh5y-shard-00-02.xzb3kqq.mongodb.net:27017/renovia_talent?ssl=true&replicaSet=atlas-3d2u7s-shard-0&authSource=admin&retryWrites=true&w=majority';

// Database Connection
const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || DEFAULT_MONGO_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 12000,
    });
    lastDbError = null;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    // Auto-seed default admin & data
    await seedDatabase();
  } catch (err) {
    console.warn('⚠️ SRV MongoDB Connection Attempt Failed:', err.message);
    // Fallback to direct replica set hosts
    try {
      console.log('ℹ️ Attempting connection with direct replica set hosts...');
      const directConn = await mongoose.connect(DIRECT_MONGO_URI, {
        serverSelectionTimeoutMS: 12000,
      });
      lastDbError = null;
      console.log(`✅ MongoDB Connected via Direct Hosts: ${directConn.connection.host}`);
      await seedDatabase();
    } catch (directErr) {
      lastDbError = `${directErr.name}: ${directErr.message}`;
      console.error('❌ MongoDB Direct Connection Error:', lastDbError);
      console.log('ℹ️ Retrying MongoDB connection in 6 seconds...');
      setTimeout(connectDB, 6000);
  }
};

connectDB();

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Renovia Talent Full-Stack & AI API Server is running.',
    dbConnected: mongoose.connection.readyState === 1,
    version: '1.0.0',
  });
});

// Diagnostic DB Health Check Route
app.get('/api/health-db', (req, res) => {
  const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI || '';
  res.json({
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    hasMongoUriEnv: !!rawUri,
    mongoUriPrefix: rawUri ? rawUri.substring(0, 16) + '...' : 'NONE',
    lastError: lastDbError,
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
