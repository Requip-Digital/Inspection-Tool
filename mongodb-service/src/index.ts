import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import projectRoutes from './routes/projectRoutes';
import machineRoutes from './routes/machineRoutes';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

class Server {
  private app: Express;
  private port: string | number;
  private mongodbUri: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5001;
    this.mongodbUri = this.validateEnvironmentVariables();
    
    this.initializeMiddleware();
    this.initializeDatabase();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private validateEnvironmentVariables(): string {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    return mongodbUri;
  }

  private initializeMiddleware(): void {
    // Trust proxy for deployment environments
    this.app.set('trust proxy', 1);

    // CORS configuration
    const corsOptions: cors.CorsOptions = {
      origin: this.getAllowedOrigins(),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    };

    this.app.use(cors(corsOptions));
    this.app.options('*', cors());

    // Rate limiting
    this.initializeRateLimiting();

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging
    this.app.use(this.requestLogger);
  }

  private getAllowedOrigins(): string[] {
    const productionOrigins = [
      'https://inspection-tool-theta.vercel.app',
      'https://www.inspection-tool-theta.vercel.app'
    ];

    const developmentOrigins = [
      'http://localhost:5173',
      'https://localhost:5173',
      'http://127.0.0.1:5173'
    ];

    return process.env.NODE_ENV === 'production' 
      ? productionOrigins 
      : [...productionOrigins, ...developmentOrigins];
  }

  private initializeRateLimiting(): void {
    const generalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
      standardHeaders: true,
      legacyHeaders: false,
    });

    const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // limit each IP to 5 auth requests per windowMs
      message: 'Too many authentication attempts, please try again later',
      standardHeaders: true,
      legacyHeaders: false,
    });

    this.app.use(generalLimiter);
    this.app.use('/api/auth', authLimiter);
  }

  private requestLogger(req: Request, res: Response, next: NextFunction): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
  }

  private initializeDatabase(): void {
    const connectionOptions: mongoose.ConnectOptions = {
      retryWrites: false, // Required for DocumentDB
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    mongoose.connect(this.mongodbUri, connectionOptions)
      .then(() => {
        console.log('✅ Successfully connected to MongoDB');
      })
      .catch((error: mongoose.Error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
      });

    // Database event handlers
    mongoose.connection.on('connected', () => {
      console.log('📊 Mongoose connected to database');
    });

    mongoose.connection.on('error', (error: mongoose.Error) => {
      console.error('📊 Mongoose connection error:', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📊 Mongoose disconnected from database');
    });
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/projects', projectRoutes);
    this.app.use('/api/machines', machineRoutes);

    // Health check endpoint
    this.app.get('/health', this.healthCheck);

    // Root endpoint
    this.app.get('/', this.rootHandler);

    // 404 handler for undefined routes
    this.app.use('*', this.notFoundHandler);
  }

  private healthCheck(req: Request, res: Response): void {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.status(200).json({
      status: 'success',
      message: 'Service is operational',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development'
    });
  }

  private rootHandler(req: Request, res: Response): void {
    res.status(200).json({
      message: 'Inspection Tool API Server',
      version: '1.0.0',
      status: 'active',
      documentation: '/api/docs' // Consider adding API documentation
    });
  }

  private notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({
      status: 'error',
      message: `Route ${req.method} ${req.originalUrl} not found`,
      suggestion: 'Check the API documentation for available endpoints'
    });
  }

  private initializeErrorHandling(): void {
    // Catch-all error handler
    this.app.use(this.errorHandler);
  }

  private errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('🚨 Unhandled Error:', {
      message: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      ip: req.ip
    });

    const isProduction = process.env.NODE_ENV === 'production';
    
    res.status(500).json({
      status: 'error',
      message: isProduction ? 'Internal server error' : error.message,
      ...(isProduction ? {} : { stack: error.stack })
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('\n' + '='.repeat(50));
      console.log(`Server started successfully`);
      console.log(`Port: ${this.port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(` Local: http://localhost:${this.port}`);
      console.log(`Health: http://localhost:${this.port}/health`);
      console.log('='.repeat(50) + '\n');
    });
  }

  public async gracefulShutdown(signal: string): Promise<void> {
    console.log(`\n Received ${signal}. Starting graceful shutdown...`);
    
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      
      console.log('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Create and start server instance
const server = new Server();

// Graceful shutdown handlers
process.on('SIGINT', () => server.gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => server.gracefulShutdown('SIGTERM'));

// Start the server
server.start();

export default server;