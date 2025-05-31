import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';
import machineRoutes from './routes/machineRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://requip-chi.vercel.app', 'https://www.requip-chi.vercel.app'] 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Connect to MongoDB only when a request comes in
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
};

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/machines', machineRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MongoDB service is running' });
});

// Handler for Vercel
const handler = async (req: any, res: any) => {
  await connectDB();
  return app(req, res);
};

export default handler; 