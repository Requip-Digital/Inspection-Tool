import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  otp?: string;
  otpExpiresAt?: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema); 