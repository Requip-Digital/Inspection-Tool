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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg flex items-center flex-col justify-center">
        {/* Inline SVG for Requip logo with blue color */}
        <svg width="180" height="40" viewBox="0 0 124 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 mx-auto mb-8" style={{ maxWidth: '100%' }}>
          <path d="M20.336 13.88L23.288 17H16.64L13.064 12.752H5.432V17H0.464V8.792H14.432C15.968 8.792 17.168 8.096 17.168 6.992C17.168 5.744 16.136 5.12 14.432 5.12H0.464L3.704 0.943999H14.024C17.672 0.943999 22.28 2.096 22.28 6.68C22.28 9.176 20.72 11.24 18.08 11.768C18.632 12.176 19.232 12.752 20.336 13.88ZM30.0665 12.872H43.7225L40.5305 17H25.0745V0.943999H43.6745L40.4585 5.12H30.0665V7.04H42.7865L39.9305 10.688H30.0665V12.872ZM60.2983 10.112L68.6743 17H54.6103C49.1623 17 44.9143 14.24 44.9143 8.96C44.9143 3.224 48.8263 0.68 56.6503 0.68C64.4503 0.68 68.3863 3.224 68.3863 8.96C68.3863 9.968 68.1462 10.904 67.6903 11.648H62.3623C63.1303 11.072 63.4423 10.16 63.4423 8.96C63.4423 5.504 61.6423 4.856 56.6503 4.856C51.6583 4.856 49.8583 5.504 49.8583 8.96C49.8583 11.936 51.6583 12.872 54.6103 12.872H55.6423C56.2903 12.872 57.0103 12.896 57.5863 12.944C57.1063 12.632 56.4103 12.128 55.8583 11.696L53.8183 10.112H60.2983ZM91.7508 0.943999V9.992C91.7508 14.84 88.4148 17.264 81.7428 17.264C74.0148 17.264 70.6788 14.84 70.6788 9.992V0.943999H75.6228V9.992C75.6228 12.368 76.6308 13.136 81.7428 13.136C85.5588 13.136 86.7588 12.248 86.7588 9.992V0.943999H91.7508ZM99.6067 0.943999V17H94.6387V0.943999H99.6067ZM123.892 6.968C123.892 10.52 120.988 12.896 115.996 12.896H107.596V17H102.652V8.792H116.476C118.012 8.792 118.9 8.048 118.9 6.944C118.9 5.816 118.012 5.12 116.476 5.12H102.652L105.94 0.943999H116.02C120.988 0.943999 123.892 3.392 123.892 6.968Z" fill="#3E82F8"/>
        </svg>
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Login with Email OTP</h2>
          {step === 'email' && (
            <form onSubmit={handleSendOtp}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Enter the OTP sent to your email"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
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
      </main>
    </div>
  );
};

export default LoginPage; 