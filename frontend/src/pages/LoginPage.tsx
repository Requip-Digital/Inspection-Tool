import React, { useState } from 'react';
import { requestOtp, verifyOtp } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAppContext();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');
    try {
      await requestOtp(email);
      setStep('otp');
      setInfo('OTP sent to your email');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const data = await verifyOtp(email, otp);
      login(data.user, data.token);
      setInfo('OTP verified! Redirecting...');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login with Email OTP</h2>
        {step === 'email' && (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <label className="block mb-2 font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
              placeholder="Enter the OTP sent to your email"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              className="w-full mt-2 text-blue-600 hover:underline"
              onClick={() => setStep('email')}
              disabled={loading}
            >
              Change Email
            </button>
          </form>
        )}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {info && <div className="mt-4 text-green-600 text-center">{info}</div>}
      </div>
    </div>
  );
};

export default LoginPage; 