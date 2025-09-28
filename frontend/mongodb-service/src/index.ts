import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import projectRoutes from './routes/projectRoutes';
import machineRoutes from './routes/machineRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Rate limiting configuration
// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// // Stricter rate limit for sensitive routes (e.g., auth endpoints)
// const strictLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 30, // Limit each IP to 30 requests per windowMs
//   message: 'Too many authentication attempts from this IP, please try again later.',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // Apply rate limiting to all routes
// app.use(globalLimiter);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://requip-phi.vercel.app', 'https://www.requip-phi.vercel.app'] 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/machines', machineRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MongoDB service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 