// src/services/authServices.ts
import { config } from '../config';

const API_BASE = config.apiUrl;

// Types
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: Record<string, unknown>;
    expiresIn?: number;
  };
}

export interface ErrorResponse {
  message: string;
  status?: number;
}

export interface ApiError extends Error {
  status?: number;
}

// Generic request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json() as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      const error: ApiError = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json() as T;
    }
    
    // For non-JSON responses
    return { success: true, message: 'Operation completed successfully' } as T;
  } catch (error) {
    // Network errors or other issues
    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
}

// Auth services
export async function requestOtp(email: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/api/auth/request-otp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function verifyOtp(email: string, otp: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
}

// Optional: Add token management
export class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default {
  requestOtp,
  verifyOtp,
  AuthService,
};