'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ChipMascot from '../../components/mascot/ChipMascot';
import GoldenAcorn from '../../components/mascot/GoldenAcorn';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';
import AppleAuthButton from '../../components/auth/AppleAuthButton';
import { playButtonTap } from '../../lib/sound';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Flame,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [streakCount, setStreakCount] = useState<number | null>(null);
  const [lastLesson, setLastLesson] = useState<string | null>(null);
  const [hasSavedProfile, setHasSavedProfile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('learn_finance_last_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setHasSavedProfile(true);
      }
      const savedStreak = localStorage.getItem('learn_finance_last_streak');
      if (savedStreak) {
        setStreakCount(parseInt(savedStreak, 10));
      }
      const savedLesson = localStorage.getItem('learn_finance_last_lesson');
      if (savedLesson) {
        setLastLesson(savedLesson);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    playButtonTap();

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-4 pb-12 animate-in fade-in duration-300 relative select-none">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-44 right-2 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Streak & XP Motivation Pill Banner (Stitch Frame 04) */}
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

      {/* Mascot & Speech Bubble Section */}
      <div className="flex items-end gap-3 mb-5">
        <div className="shrink-0 flex flex-col items-center">
          <ChipMascot state="idle" size="md" />
        </div>

        {/* Speech Bubble with Directional Pointer */}
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

      {/* Title & Subtitle Header Block */}
      <div className="space-y-1 mb-4">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Log in to continue your daily tracks and streak.
        </p>
      </div>

      {/* Main Glass Form Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email Address Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between" htmlFor="email-input">
              <span>Email address</span>
              {hasSavedProfile && email && (
                <span className="text-[10px] text-primary flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Saved Profile
                </span>
              )}
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
              <input
                id="email-input"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Password Field with Mask Toggle */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-300 block" htmlFor="password-input">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-16 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 px-2 py-1 rounded-md text-[11px] font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
          </div>

          {/* Primary Action CTA Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-xl bg-primary text-black font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] hover:brightness-105 disabled:opacity-50 transition-all cursor-pointer mt-2"
          >
            {submitting ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>Log in</span>
                <Zap className="h-4 w-4 fill-black" />
              </>
            )}
          </button>
        </form>

        {/* Motivational Milestone Footer */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-center">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[11px] text-neutral-400">
            {lastLesson
              ? `Last lesson completed: ${lastLesson}`
              : 'Course track ready: Foundations of Finance'}
          </span>
        </div>
      </div>

      {/* Divider: Quick Connect (Stitch Frame 04) */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-white/10" />
        </div>
        <div className="relative px-3 bg-[#0A0A0A] text-neutral-400 text-xs lowercase">
          or quick connect
        </div>
      </div>

      {/* Social Authentication Buttons: Apple & Google */}
      <div className="grid grid-cols-2 gap-3">
        <AppleAuthButton variant="compact" label="Apple" />
        <GoogleAuthButton variant="compact" label="Google" onSuccess={() => router.push('/')} />
      </div>

      {/* Switch to Register & Guest Mode */}
      <div className="mt-5 text-center text-xs text-neutral-400 space-y-2">
        <p>
          Don&apos;t have an account yet?{' '}
          <Link
            href="/register"
            onClick={() => playButtonTap()}
            className="text-primary hover:underline font-bold"
          >
            Create Account
          </Link>
        </p>
        <p>
          <Link
            href="/"
            onClick={() => {
              playButtonTap();
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('learn_finance_guest_preview', 'true');
              }
            }}
            className="text-neutral-500 hover:text-neutral-300 inline-flex items-center gap-1 font-medium transition-colors"
          >
            <span>Continue exploring as guest</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </p>
        <p className="pt-2">
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
        </p>
      </div>
    </div>
  );
}
