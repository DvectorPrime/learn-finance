'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { soundFx } from '../../lib/sound';
import GoldenAcorn from '../mascot/GoldenAcorn';
import {
  GraduationCap,
  Award,
  Target,
  BookMarked,
  Volume2,
  VolumeX,
  User,
  LogIn,
  LogOut,
  Sparkles,
  Trophy,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setMounted(true);
    setSoundOn(soundFx.isEnabled());
  }, []);

  const toggleSound = () => {
    const newState = soundFx.toggle();
    setSoundOn(newState);
  };

  const isPlayerRoute =
    pathname?.startsWith('/lesson/') ||
    pathname?.startsWith('/chapter/') ||
    pathname?.startsWith('/group/') ||
    pathname === '/onboarding';

  // In full-screen player mode or onboarding, hide global nav bars
  if (isPlayerRoute) {
    return null;
  }

  const tabs = [
    { href: '/', label: 'Learn', icon: GraduationCap },
    { href: '/league', label: 'League', icon: Trophy },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/mastery', label: 'Skills', icon: Award },
    { href: '/glossary', label: 'Dictionary', icon: BookMarked },
  ];

  return (
    <>
      {/* Mobile Top Header (Fixed at top of container) */}
      <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="h-14 px-3 sm:px-4 flex items-center justify-between gap-2">
          {/* Brand Logo & Chip Icon */}
          <Link
            href="/"
            onClick={() => soundFx.playTap()}
            className="flex items-center gap-2 group active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
              <GoldenAcorn size={18} withTrendline={true} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-sm sm:text-base text-zinc-100 tracking-tight">
                LearnFinance
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                AI
              </span>
            </div>
          </Link>

          {/* Quick Actions (Sound Toggle & Auth Pill) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label="Toggle sound effects"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-zinc-300 hover:bg-white/10 active:scale-95 transition-all"
              title={soundOn ? 'Sound on' : 'Muted'}
            >
              {soundOn ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-medium hidden sm:inline">On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[11px] font-medium text-zinc-500 hidden sm:inline">Mute</span>
                </>
              )}
            </button>

            {/* User Profile / Auth State */}
            <div suppressHydrationWarning>
              {!mounted || loading ? (
                <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/mastery"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold truncate max-w-[100px]"
                    title={`Logged in as ${user.displayName}`}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span className="truncate">{user.displayName.split(' ')[0]}</span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    aria-label="Log out"
                    className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-red-400 active:scale-95 transition-colors"
                    title="Log out"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  <LogIn className="h-3 w-3" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Bottom Dock (Constrained to the mobile max-w-[430px] frame) */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="max-w-[430px] mx-auto pointer-events-auto bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
          <div className="h-16 px-2 flex items-center justify-around">
            {tabs.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => soundFx.playTap()}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center min-w-[64px] h-12 rounded-xl transition-all ${
                    isActive
                      ? 'text-emerald-400 font-bold scale-105'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-400 stroke-[2.4]' : 'text-zinc-400'}`} />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    )}
                  </div>
                  <span className="font-body text-[11px] mt-0.5 tracking-tight">
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
