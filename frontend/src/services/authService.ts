import { config } from '../config';

const API_BASE = config.apiUrl;

export async function requestOtp(email: string) {
  const res = await fetch(`${API_BASE}/auth/request-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to send OTP');
  }
  return res.json();
}

export async function verifyOtp(email: string, otp: string) {
  const res = await fetch(`${API_BASE}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to verify OTP');
  }
  return res.json();
} 