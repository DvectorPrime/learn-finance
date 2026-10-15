'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ChipMascot from '../../components/mascot/ChipMascot';
import GoldenAcorn from '../../components/mascot/GoldenAcorn';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';
import AppleAuthButton from '../../components/auth/AppleAuthButton';
import { playButtonTap } from '../../lib/sound';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', level: 0 };
    if (password.length < 6) return { label: 'Weak', level: 1 };
    if (password.length < 10) return { label: 'Medium', level: 2 };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: 'Strong', level: 4 };
    return { label: 'Good', level: 3 };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setSubmitting(true);
    playButtonTap();

    try {
      await register(email, password, displayName);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-4 pb-12 animate-in fade-in duration-300 relative select-none">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-44 right-2 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Community Motivation Pill Banner (Stitch Frame 03) */}
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

      {/* Top Header Block: Title & Chip Avatar */}
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

      {/* Security Reassurance Speech Dialogue Chip */}
      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-2 mb-4 shadow-sm">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <span className="text-xs text-neutral-300 font-medium">
          Your data is encrypted with bank-grade security protocols.
        </span>
      </div>

      {/* Tier 1: Fast Social Sign-Up Options (Apple & Google) */}
      <div className="flex flex-col gap-2.5 mb-4">
        <AppleAuthButton variant="full" label="Continue with Apple" />
        <GoogleAuthButton variant="full" label="Continue with Google" onSuccess={() => router.push('/')} />
      </div>

      {/* Section Divider: or continue with email */}
      <div className="relative flex items-center justify-center my-4">
        <div className="w-full h-px bg-white/10" />
        <span className="absolute px-3 bg-[#0A0A0A] text-xs text-neutral-400 tracking-wide">
          or continue with email
        </span>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Tier 2: Streamlined Direct Email Form (Stitch Frame 03) */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
        {/* Full Name Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-300 block" htmlFor="reg-name">
            Full name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
            <input
              id="reg-name"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Morgan Vance"
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
            {displayName.trim().length > 1 && (
              <CheckCircle2 className="absolute right-3 text-primary h-4 w-4 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-300 block" htmlFor="reg-email">
            Work or personal email
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
            <input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
            {email.includes('@') && email.includes('.') && (
              <CheckCircle2 className="absolute right-3 text-primary h-4 w-4 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Password Input with Strength & Visibility Toggle */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-300 block" htmlFor="reg-password">
              Create password
            </label>
            <span className="text-[11px] font-bold text-primary">
              {strength.label}
            </span>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-neutral-400 h-4 w-4 pointer-events-none" />
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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

          {/* Password Strength Multi-segment Bar */}
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

        {/* Terms & Conditions Checkbox (44x44px touch-target compliant) */}
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

        {/* Primary Call-to-Action */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-12 rounded-xl bg-primary text-black font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] hover:brightness-105 disabled:opacity-50 transition-all cursor-pointer"
        >
          {submitting ? (
            <span>Creating account...</span>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </>
          )}
        </button>

        {/* Institutional Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-neutral-400 text-[11px] pt-1">
          <Lock className="h-3 w-3" />
          <span>256-bit TLS protocol protection</span>
        </div>
      </form>

      {/* Switch to Login Footer */}
      <div className="mt-5 text-center text-xs text-neutral-400">
        <p>
          Already have an account?{' '}
          <Link
            href="/login"
            onClick={() => playButtonTap()}
            className="text-primary hover:underline font-bold"
          >
            Log in
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
