import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendOTPEmail } from '../services/emailService';

// Generate a 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request OTP
export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Find user or create new one
    const user = await User.findOneAndUpdate(
      { email },
      { 
        otp,
        otpExpiresAt,
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true, new: true }
    );

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otp);
    
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    return res.json({ 
      message: 'OTP sent successfully',
      email
    });
  } catch (error) {
    console.error('Error in requestOTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify OTP and return JWT
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    return res.json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 