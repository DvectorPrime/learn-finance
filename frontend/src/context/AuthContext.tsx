'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser } from '../types/auth';
import {
  loginUser,
  registerUser,
  loginWithGoogle,
  fetchCurrentUser,
  getAuthToken,
  removeAuthToken,
} from '../lib/api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  loginWithGoogleAuth: (data: {
    idToken?: string;
    accessToken?: string;
    email?: string;
    displayName?: string;
    googleId?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { user: currentUser } = await fetchCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.warn('Session expired or invalid token:', err);
        removeAuthToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password });
    setUser(res.user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learn_finance_has_account', 'true');
      localStorage.setItem('learn_finance_last_email', email);
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    const res = await registerUser({ email, password, displayName });
    setUser(res.user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learn_finance_has_account', 'true');
      localStorage.setItem('learn_finance_last_email', email);
    }
  };

  const loginWithGoogleAuth = async (data: {
    idToken?: string;
    accessToken?: string;
    email?: string;
    displayName?: string;
    googleId?: string;
  }) => {
    const res = await loginWithGoogle(data);
    setUser(res.user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learn_finance_has_account', 'true');
      if (res.user.email) {
        localStorage.setItem('learn_finance_last_email', res.user.email);
      }
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('guest_progress');
      localStorage.removeItem('learn_finance_token');
      localStorage.removeItem('learn_finance_has_account');
      localStorage.removeItem('learn_finance_last_email');
      localStorage.removeItem('learn_finance_last_streak');
      localStorage.removeItem('learn_finance_last_lesson');
      sessionStorage.removeItem('learn_finance_guest_preview');
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogleAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
