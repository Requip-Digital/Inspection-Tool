import express from 'express';
import { requestOTP, verifyOTP } from '../controllers/authController';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiter for OTP requests: 5 requests per 15 minutes per IP
const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: { message: 'Too many OTP requests, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes
router.post('/request-otp', otpRequestLimiter, requestOTP);
router.post('/verify-otp', verifyOTP);

export default router; 