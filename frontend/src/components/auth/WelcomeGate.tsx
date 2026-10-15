'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import GoldenAcorn from '../mascot/GoldenAcorn';
import ChipMascot from '../mascot/ChipMascot';
import GoogleAuthButton from './GoogleAuthButton';
import AppleAuthButton from './AppleAuthButton';
import { playButtonTap } from '../../lib/sound';
import {
  TrendingUp,
  Sparkles,
  Landmark,
  ArrowRight,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Flame,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from 'lucide-react';

interface WelcomeGateProps {
  onContinueAsGuest?: () => void;
  defaultMode?: 'welcome' | 'login' | 'register';
}

export default function WelcomeGate({
  onContinueAsGuest,
  defaultMode,
}: WelcomeGateProps) {
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<'welcome' | 'login' | 'register'>(
    defaultMode || 'welcome'
  );

  // Form states for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Form states for register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Quote state for Welcome screen
  const [bubbleQuote, setBubbleQuote] = useState(
    'Ready to stash your first acorns and master corporate finance?'
  );
  const [streakCount, setStreakCount] = useState<number | null>(null);
  const [lastLesson, setLastLesson] = useState<string | null>(null);

  const quotes = [
    'Ready to stash your first acorns and master corporate finance?',
    "Today's forecast: High returns with a 100% chance of mastery!",
    "Balance sheets don't bite. Tap 'Create account' to begin!",
    "I've got your gaming headset tuned to EBITDA and cash flow!",
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('learn_finance_last_email');
      const hasAccount =
        localStorage.getItem('learn_finance_has_account') === 'true' ||
        !!savedEmail;

      if (savedEmail) {
        setLoginEmail(savedEmail);
      }

      const streak = localStorage.getItem('learn_finance_last_streak');
      if (streak) setStreakCount(parseInt(streak, 10));

      const lesson = localStorage.getItem('learn_finance_last_lesson');
      if (lesson) setLastLesson(lesson);

      if (!defaultMode) {
        // If returning user, start in login mode (Frame 04)
        // If first-time visitor, start in welcome mode (Frame 02)
        setMode(hasAccount ? 'login' : 'welcome');
      }
    }
  }, [defaultMode]);

  const handleBubbleTap = () => {
    playButtonTap();
    setBubbleQuote((prev) => {
      const idx = quotes.indexOf(prev);
      return quotes[(idx + 1) % quotes.length];
    });
  };

  const handleGuestExplore = () => {
    playButtonTap();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('learn_finance_guest_preview', 'true');
    }
    onContinueAsGuest?.();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSubmitting(true);
    playButtonTap();

    try {
      await login(loginEmail, loginPassword);
      router.push('/');
    } catch (err: any) {
      setLoginError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setRegError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setRegSubmitting(true);
    playButtonTap();

    try {
      await register(regEmail, regPassword, regName);
      router.push('/');
    } catch (err: any) {
      setRegError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setRegSubmitting(false);
    }
  };

  const getStrength = () => {
    if (!regPassword) return { label: 'Empty', level: 0 };
    if (regPassword.length < 6) return { label: 'Weak', level: 1 };
    if (regPassword.length < 10) return { label: 'Medium', level: 2 };
    if (/[A-Z]/.test(regPassword) && /[0-9]/.test(regPassword)) return { label: 'Strong', level: 4 };
    return { label: 'Good', level: 3 };
  };

  const strength = getStrength();

  // -------------------------------------------------------------
  // RENDER: FRAME 02 (WELCOME SCREEN)
  // -------------------------------------------------------------
  if (mode === 'welcome') {
    return (
      <div className="relative flex flex-col w-full px-4 pb-12 pt-2 overflow-hidden select-none animate-in fade-in duration-300">
        {/* Ambient Radial Glows */}
        <div className="absolute -top-12 -left-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-44 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Tag & Brand Header */}
        <section className="flex flex-col items-center pt-2 pb-3 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 shadow-sm backdrop-blur-md mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] text-neutral-300 font-medium">Finance Gamified</span>
            <span className="text-[11px] text-amber-400 font-bold">⚡ Tier 1</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
              <GoldenAcorn size={20} withTrendline={true} />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">
              LearnFinance
            </h1>
          </div>
          <p className="text-xs text-neutral-400 max-w-xs">
            Institutional capital flow. Zero corporate snoozing.
          </p>
        </section>

        {/* Chip Mascot & Speech Bubble */}
        <section className="flex flex-col items-center my-2 relative z-10 w-full max-w-sm mx-auto">
          <div
            onClick={handleBubbleTap}
            className="w-full bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl text-left relative transition-all duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[11px] text-primary font-bold uppercase tracking-wider">
                  Chip the Mentor
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">Tap Chip</span>
            </div>
            <p className="font-display text-sm text-white font-semibold leading-snug">
              {bubbleQuote}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-4 w-4 h-4 bg-white/[0.06] border-r border-b border-white/10 rotate-45 pointer-events-none" />
          </div>

          <div className="mt-3">
            <ChipMascot state="cheer" size="lg" interactive={true} avatarOnly={true} />
          </div>
        </section>

        {/* 3 Stat Tiles */}
        <section className="grid grid-cols-3 gap-2 my-2 max-w-sm mx-auto w-full z-10">
          <div className="bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs text-white font-bold">3-Min</span>
            <span className="text-[10px] text-neutral-400">Bite modules</span>
          </div>

          <div className="bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs text-white font-bold">+150 XP</span>
            <span className="text-[10px] text-neutral-400">First stash</span>
          </div>

          <div className="bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-1">
              <Landmark className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs text-white font-bold">Wall St</span>
            <span className="text-[10px] text-neutral-400">Curriculum</span>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col gap-2.5 mt-3 max-w-sm mx-auto w-full z-10">
          <button
            type="button"
            onClick={() => {
              playButtonTap();
              setMode('register');
            }}
            className="group relative w-full h-13 py-3 px-4 rounded-xl bg-primary text-black font-headline-sm text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] hover:brightness-105 transition-all flex items-center justify-center gap-2 overflow-hidden text-center cursor-pointer"
          >
            <UserPlus className="h-4 w-4 stroke-[2.5]" />
            <span>Create account</span>
            <ArrowRight className="h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => {
              playButtonTap();
              setMode('login');
            }}
            className="w-full h-12 py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 backdrop-blur-md text-white font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm text-center cursor-pointer"
          >
            <LogIn className="h-4 w-4 text-neutral-300" />
            <span>Log in</span>
          </button>

          <GoogleAuthButton variant="full" label="Continue with Google" onSuccess={() => router.push('/')} />
        </section>

        <footer className="mt-4 text-center z-10 space-y-2">
          <button
            type="button"
            onClick={handleGuestExplore}
            className="text-neutral-400 hover:text-white text-xs inline-flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <span>Continue exploring as guest</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          <p className="text-[11px] text-neutral-500">
            Already learning with us?{' '}
            <button
              type="button"
              onClick={() => {
                playButtonTap();
                setMode('login');
              }}
              className="text-primary font-medium hover:underline ml-1 cursor-pointer"
            >
              Direct sign-in
            </button>
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={async () => {
                if (typeof window !== 'undefined' && window.confirm('Reset all user data and start with a fresh slate?')) {
                  const { resetAllData } = await import('../../lib/api');
                  await resetAllData();
                  window.location.href = '/';
                }
              }}
              className="text-[10px] text-neutral-600 hover:text-neutral-400 underline transition-colors cursor-pointer"
            >
              Reset data & start fresh
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: FRAME 04 (LOG IN SCREEN FOR RETURNING USERS)
  // -------------------------------------------------------------
  if (mode === 'login') {
    return (
      <div className="relative flex flex-col w-full px-4 pb-12 pt-2 overflow-hidden select-none animate-in fade-in duration-300">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-44 right-2 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Streak & XP Motivation Pill Banner */}
        <div className="flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-400 fill-orange-400" />
            <span className="font-mono text-xs font-bold text-orange-400">
              {streakCount !== null && streakCount > 0 ? streakCount : 'Daily'}
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">
              {streakCount !== null && streakCount > 0 ? 'day streak intact' : 'streak waiting'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <GoldenAcorn size={14} />
            <span className="text-[11px] text-amber-300 font-bold">+50 XP waiting</span>
          </div>
        </div>

        {/* Mascot & Speech Bubble */}
        <div className="flex items-end gap-3 mb-4">
          <div className="shrink-0 flex flex-col items-center">
            <ChipMascot state="idle" size="md" />
          </div>
          <div className="relative flex-1 p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-md">
            <div className="absolute -left-2 bottom-3 w-0 h-0 border-y-6 border-y-transparent border-r-8 border-r-white/10" />
            <p className="text-xs text-neutral-200 leading-snug font-medium">
              &ldquo;Welcome back, investor! Let&apos;s resume compounding.&rdquo;
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] text-primary font-bold">Daily Track ready</span>
            </div>
          </div>
        </div>

        {/* Header Block */}
        <div className="space-y-1 mb-4">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Log in to continue your daily tracks and streak.
          </p>
        </div>

        {/* Glass Form Card */}
        <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
          {loginError && (
            <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between" htmlFor="welcome-login-email">
                <span>Email address</span>
                {loginEmail && (
                  <span className="text-[10px] text-primary flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Saved Profile
                  </span>
                )}
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
                <input
                  id="welcome-login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300 block" htmlFor="welcome-login-password">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
                <input
                  id="welcome-login-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-16 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-2 px-2 py-1 rounded-md text-[11px] font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {showLoginPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{showLoginPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full h-12 rounded-xl bg-primary text-black font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] hover:brightness-105 disabled:opacity-50 transition-all cursor-pointer mt-2"
            >
              {loginSubmitting ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Log in</span>
                  <Zap className="h-4 w-4 fill-black" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-center">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="text-[11px] text-neutral-400">
              {lastLesson
                ? `Last lesson completed: ${lastLesson}`
                : 'Course track ready: Foundations of Finance'}
            </span>
          </div>
        </div>

        {/* Divider: Quick Connect */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-white/10" />
          </div>
          <div className="relative px-3 bg-[#0A0A0A] text-neutral-400 text-xs lowercase">
            or quick connect
          </div>
        </div>

        {/* Apple & Google Connect */}
        <div className="grid grid-cols-2 gap-3">
          <AppleAuthButton variant="compact" label="Apple" />
          <GoogleAuthButton variant="compact" label="Google" onSuccess={() => router.push('/')} />
        </div>

        <div className="mt-5 text-center text-xs text-neutral-400 space-y-2">
          <p>
            Don&apos;t have an account yet?{' '}
            <button
              type="button"
              onClick={() => {
                playButtonTap();
                setMode('register');
              }}
              className="text-primary hover:underline font-bold cursor-pointer"
            >
              Create Account
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={handleGuestExplore}
              className="text-neutral-500 hover:text-neutral-300 inline-flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <span>Continue exploring as guest</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: FRAME 03 (CREATE ACCOUNT STREAMLINED)
  // -------------------------------------------------------------
  return (
    <div className="relative flex flex-col w-full px-4 pb-12 pt-2 overflow-hidden select-none animate-in fade-in duration-300">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-44 right-2 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Community Motivation Pill */}
      <div className="flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-[11px] text-neutral-300 font-medium">Join 1,420+ learners</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GoldenAcorn size={14} />
          <span className="text-[11px] text-amber-300 font-bold">+50 Welcome XP</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Start compounding your financial IQ today.
          </p>
        </div>
        <div className="shrink-0">
          <ChipMascot state="cheer" size="sm" />
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-2 mb-4 shadow-sm">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <span className="text-xs text-neutral-300 font-medium">
          Your data is encrypted with bank-grade security protocols.
        </span>
      </div>

      {/* Tier 1 Social Sign-Up */}
      <div className="flex flex-col gap-2.5 mb-4">
        <AppleAuthButton variant="full" label="Continue with Apple" />
        <GoogleAuthButton variant="full" label="Continue with Google" onSuccess={() => router.push('/')} />
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="w-full h-px bg-white/10" />
        <span className="absolute px-3 bg-[#0A0A0A] text-xs text-neutral-400 tracking-wide">
          or continue with email
        </span>
      </div>

      {regError && (
        <div className="mb-4 p-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{regError}</span>
        </div>
      )}

      <form onSubmit={handleRegisterSubmit} className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-300 block" htmlFor="welcome-reg-name">
            Full name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
            <input
              id="welcome-reg-name"
              type="text"
              required
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              placeholder="e.g. Morgan Vance"
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
            {regName.trim().length > 1 && (
              <CheckCircle2 className="absolute right-3 text-primary h-4 w-4 pointer-events-none" />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-300 block" htmlFor="welcome-reg-email">
            Work or personal email
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
            <input
              id="welcome-reg-email"
              type="email"
              required
              autoComplete="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
            {regEmail.includes('@') && regEmail.includes('.') && (
              <CheckCircle2 className="absolute right-3 text-primary h-4 w-4 pointer-events-none" />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-300 block" htmlFor="welcome-reg-password">
              Create password
            </label>
            <span className="text-[11px] font-bold text-primary">
              {strength.label}
            </span>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
            <input
              id="welcome-reg-password"
              type={showRegPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full pl-10 pr-16 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowRegPassword(!showRegPassword)}
              className="absolute right-2 px-2 py-1 rounded-md text-[11px] font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {showRegPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              <span>{showRegPassword ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  step <= strength.level ? 'bg-primary' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <label className="relative flex items-center justify-center w-11 h-11 shrink-0 cursor-pointer -ml-2 -mt-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded-md border border-white/20 bg-white/[0.06] peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
              {agreeTerms && <CheckCircle2 className="h-3.5 w-3.5 text-black stroke-[3]" />}
            </div>
          </label>
          <span className="text-xs text-neutral-400 select-none pt-0.5 leading-snug">
            I agree to the{' '}
            <a href="#" className="text-white underline hover:text-primary transition-colors">
              Terms of service
            </a>{' '}
            and{' '}
            <a href="#" className="text-white underline hover:text-primary transition-colors">
              Privacy policy
            </a>
            .
          </span>
        </div>

        <button
          type="submit"
          disabled={regSubmitting}
          className="w-full h-12 rounded-xl bg-primary text-black font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] hover:brightness-105 disabled:opacity-50 transition-all cursor-pointer"
        >
          {regSubmitting ? (
            <span>Creating account...</span>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-neutral-400 text-[11px] pt-1">
          <Lock className="h-3 w-3" />
          <span>256-bit TLS protocol protection</span>
        </div>
      </form>

      <div className="mt-5 text-center text-xs text-neutral-400">
        <p>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => {
              playButtonTap();
              setMode('login');
            }}
            className="text-primary hover:underline font-bold cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
