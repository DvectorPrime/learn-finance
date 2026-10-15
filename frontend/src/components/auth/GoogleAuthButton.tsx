'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { playButtonTap, playSuccessChime } from '../../lib/sound';
import { AlertCircle, Loader2 } from 'lucide-react';

interface GoogleAuthButtonProps {
  label?: string;
  variant?: 'full' | 'compact';
  onSuccess?: () => void;
  className?: string;
}

export default function GoogleAuthButton({
  label = 'Continue with Google',
  variant = 'full',
  onSuccess,
  className = '',
}: GoogleAuthButtonProps) {
  const { loginWithGoogleAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '506338474030-289dfhvs3219itnnitn8tl8k28nsc8m7.apps.googleusercontent.com';

  const loadGoogleScript = (): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve();
      if ((window as any).google?.accounts) return resolve();
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existing) {
        if ((window as any).google?.accounts) return resolve();
        existing.addEventListener('load', () => resolve());
        setTimeout(resolve, 1500);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
      setTimeout(resolve, 1500);
    });
  };

  const handleClick = async () => {
    playButtonTap();
    setErrorMessage(null);
    setLoading(true);

    try {
      await loadGoogleScript();
      const g = (window as any).google;

      if (!g?.accounts) {
        throw new Error('Google Sign-In service could not be loaded. Please check your internet connection.');
      }

      // 1. Prefer Google Identity Services OAuth2 Token Client for seamless popup authentication
      if (g.accounts.oauth2) {
        const tokenClient = g.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.error) {
              if (tokenResponse.error === 'popup_closed_by_user') {
                setErrorMessage('Google sign-in was cancelled.');
              } else {
                setErrorMessage(`Google sign-in error: ${tokenResponse.error_description || tokenResponse.error}`);
              }
              setLoading(false);
              return;
            }

            if (!tokenResponse?.access_token) {
              setErrorMessage('Google did not return an access token. Please try again.');
              setLoading(false);
              return;
            }

            try {
              await loginWithGoogleAuth({ accessToken: tokenResponse.access_token });
              playSuccessChime();
              onSuccess?.();
            } catch (err: any) {
              console.error('Google auth backend verification failed:', err);
              setErrorMessage(err.message || 'Failed to authenticate Google account with server.');
            } finally {
              setLoading(false);
            }
          },
          error_callback: (nonOAuthError: any) => {
            console.warn('Google tokenClient error:', nonOAuthError);
            setErrorMessage('Google popup was closed or blocked by browser.');
            setLoading(false);
          },
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      }

      // 2. Fallback to Google ID Token (Credential) prompt
      if (g.accounts.id) {
        g.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            if (!response?.credential) {
              setErrorMessage('Google did not provide credentials.');
              setLoading(false);
              return;
            }
            try {
              await loginWithGoogleAuth({ idToken: response.credential });
              playSuccessChime();
              onSuccess?.();
            } catch (err: any) {
              setErrorMessage(err.message || 'Google account verification failed.');
            } finally {
              setLoading(false);
            }
          },
        });
        g.accounts.id.prompt();
        return;
      }

      throw new Error('Google Sign-In API unavailable.');
    } catch (err: any) {
      console.error('Google Sign-In initialization failed:', err);
      setErrorMessage(err.message || 'Could not launch Google Sign-In. Please sign in with your email.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-label="Continue with Google"
        className={`rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-sm font-semibold cursor-pointer ${
          variant === 'full'
            ? 'w-full h-12 px-4 bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 text-white text-xs sm:text-sm'
            : 'w-full py-2.5 px-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-xs'
        } ${className}`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 animate-spin shrink-0" />
        ) : (
          /* Official Google Multicolored G SVG */
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24">
            <path
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              fill="#4285F4"
            />
            <path
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              fill="#34A853"
            />
            <path
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              fill="#EA4335"
            />
          </svg>
        )}
        <span>{loading ? 'Connecting to Google...' : label}</span>
      </button>

      {errorMessage && (
        <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
