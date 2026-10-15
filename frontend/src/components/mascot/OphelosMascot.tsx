'use client';

import React, { useState } from 'react';
import { playChipChirp } from '../../lib/sound';

export type OphelosMood =
  | 'happy'
  | 'sad'
  | 'moody'
  | 'informing'
  | 'skeptical'
  | 'energetic'
  | 'celebration'
  | 'official'
  | 'neutral';

export interface OphelosMascotProps {
  mood?: OphelosMood;
  speech?: string;
  tag?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  avatarOnly?: boolean;
  className?: string;
}

const DEFAULT_QUOTES: Record<OphelosMood, string[]> = {
  happy: [
    "Here is everything you are working toward.",
    "Ready to stash more acorns today?",
    "Every small step compounds your wealth!",
  ],
  informing: [
    "Add your first goal and I will break it into steps.",
    "Did you know? Even ₦5,000 saved weekly builds an emergency shield.",
    "Knowledge pays the highest dividend.",
  ],
  celebration: [
    "Goal complete! You are compounding like a pro!",
    "Streak ignited! Day 1 is in the vault!",
    "Outstanding progress! Look at that metric soar!",
  ],
  skeptical: [
    "Setting aside ₦50,000 more each month would finish this 3 months sooner.",
    "Notice how unexpected fees can eat away your returns?",
    "Are you sure this pace matches your monthly income?",
  ],
  energetic: [
    "You are on fire today! Keep this momentum rolling!",
    "Double XP active! Crush this challenge!",
    "One more lesson to level up your standing!",
  ],
  sad: [
    "Looks like your goal fell behind schedule. Let's create a fresh plan together.",
    "Your streak shield was consumed. Let's recharge it today!",
    "Don't worry, every financial journey has setbacks.",
  ],
  moody: [
    "Inflation is 15.93%. Cash sitting under the mattress loses value every day.",
    "Leaving money idle? We should put it to work.",
  ],
  official: [
    "Notification active: I'll remind you at 9:00 AM to preserve your streak.",
    "Official benchmark: Nigerian minimum wage signed at ₦70,000.",
  ],
  neutral: [
    "Tracking your progress in real-time.",
    "Select a goal to manage or review your roadmap.",
  ],
};

export default function OphelosMascot({
  mood = 'happy',
  speech,
  tag = 'Ophelos the Mentor',
  size = 'md',
  interactive = true,
  avatarOnly = false,
  className = '',
}: OphelosMascotProps) {
  const [customQuote, setCustomQuote] = useState<string | null>(null);

  const quotes = DEFAULT_QUOTES[mood] || DEFAULT_QUOTES.happy;
  const displayQuote = customQuote || speech || quotes[0];

  const handleTap = () => {
    if (!interactive) return;
    playChipChirp();
    const nextIdx = Math.floor(Math.random() * quotes.length);
    setCustomQuote(quotes[nextIdx]);
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  // Vector graphics for Ophelos with Fur: #FF7A1A, Belly: #FFDBCA, Acorn cap: #22C55E, nut: #FFB020
  const renderPoseSvg = () => {
    switch (mood) {
      case 'celebration':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg select-none" fill="none">
            {/* Sparkles */}
            <circle cx="18" cy="20" r="2" fill="#FFB020" className="animate-ping" style={{ animationDuration: '2s' }} />
            <path d="M18 15L19.5 19L23.5 20.5L19.5 22L18 26L16.5 22L12.5 20.5L16.5 19L18 15Z" fill="#FFD700" />
            <path d="M82 22L83 24.5L85.5 25.5L83 26.5L82 29L81 26.5L78.5 25.5L81 24.5L82 22Z" fill="#FFB020" />
            <circle cx="84" cy="65" r="2" fill="#FFD700" />
            {/* Bushy Puffed Tail */}
            <path d="M58 80C74 80 90 70 92 50C94 30 78 12 60 14C51 15 46 21 48 29C52 38 65 41 65 54C65 67 52 70 45 75" fill="#FF7A1A" />
            <path d="M63 76C73 74 85 66 85 50C85 35 74 20 62 18C57 17 54 21 56 27C58 34 68 38 68 52C68 63 60 69 53 74" fill="#FFB020" opacity="0.65" />
            {/* Body & Belly */}
            <ellipse cx="45" cy="62" rx="22" ry="25" fill="#FF7A1A" />
            <ellipse cx="42" cy="64" rx="15" ry="18" fill="#FFDBCA" />
            {/* Ears */}
            <path d="M31 27C31 20 36 17 40 20C43 23 42 30 38 33L31 27Z" fill="#FF7A1A" />
            <path d="M34 25C34 22 37 20 39 22C41 24 40 27 38 29L34 25Z" fill="#FFB68E" />
            <path d="M53 27C53 20 48 17 44 20C41 23 42 30 46 33L53 27Z" fill="#FF7A1A" />
            <path d="M50 25C50 22 47 20 45 22C43 24 44 27 46 29L50 25Z" fill="#FFB68E" />
            {/* Head */}
            <circle cx="43" cy="38" r="18" fill="#FF7A1A" />
            <ellipse cx="40" cy="43" rx="8" ry="6" fill="#FFDBCA" />
            {/* Happy Eyes */}
            <path d="M35 37C37 34 40 34 42 37" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M44 37C46 34 49 34 51 37" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M39 42C41 45 44 45 46 42" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            {/* Raised Celebration Arms holding acorn */}
            <path d="M28 58L22 42" stroke="#FF7A1A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M54 58L60 42" stroke="#FF7A1A" strokeWidth="4.5" strokeLinecap="round" />
            {/* Golden Acorn overhead */}
            <ellipse cx="42" cy="22" rx="7" ry="8.5" fill="#FFB020" />
            <path d="M35 18C35 15 38 14 42 14C46 14 49 15 49 18L35 18Z" fill="#22C55E" />
            <path d="M42 14V11" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'sad':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Drooping Tail */}
            <path d="M55 75C68 76 78 82 82 92C72 95 60 90 52 82" stroke="#FF7A1A" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="48" cy="68" rx="20" ry="22" fill="#FF7A1A" />
            <ellipse cx="48" cy="70" rx="13" ry="15" fill="#FFDBCA" />
            <circle cx="48" cy="45" r="17" fill="#FF7A1A" />
            {/* Drooping Ears */}
            <path d="M34 38L24 35L32 46Z" fill="#FF7A1A" />
            <path d="M62 38L72 35L64 46Z" fill="#FF7A1A" />
            {/* Sad Eyes */}
            <path d="M40 43L46 46" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M56 46L50 43" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Flat/Sad Mouth */}
            <path d="M44 52C46 50 50 50 52 52" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            {/* Drooping Acorn in Lap */}
            <ellipse cx="48" cy="74" rx="7" ry="8" fill="#FFB020" />
            <path d="M41 71C41 68 44 67 48 67C52 67 55 68 55 71L41 71Z" fill="#22C55E" />
          </svg>
        );

      case 'informing':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Tail */}
            <path d="M30 75C12 70 8 45 18 30C28 15 42 22 36 40C32 52 36 65 42 70" stroke="#FF7A1A" strokeWidth="11" strokeLinecap="round" />
            <ellipse cx="50" cy="65" rx="19" ry="22" fill="#FF7A1A" />
            <ellipse cx="50" cy="68" rx="12" ry="15" fill="#FFDBCA" />
            <circle cx="50" cy="40" r="17" fill="#FF7A1A" />
            {/* Ears */}
            <path d="M38 30L34 16L46 24Z" fill="#FF7A1A" />
            <path d="M62 30L66 16L54 24Z" fill="#FF7A1A" />
            {/* Attentive Eyes */}
            <circle cx="44" cy="39" r="2.8" fill="#0A0A0A" />
            <circle cx="45" cy="38" r="1" fill="white" />
            <circle cx="56" cy="39" r="2.8" fill="#0A0A0A" />
            <circle cx="57" cy="38" r="1" fill="white" />
            <path d="M47 46C49 48 51 48 53 46" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" />
            {/* Pointing Right Paw */}
            <path d="M62 58L78 48" stroke="#FF7A1A" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="78" cy="48" r="3" fill="#22C55E" />
            {/* Left Hand holding Card */}
            <rect x="25" y="52" width="14" height="18" rx="2" fill="#F5F5F5" stroke="#2A2A2A" strokeWidth="1.5" />
            <line x1="28" y1="56" x2="36" y2="56" stroke="#22C55E" strokeWidth="1.5" />
            <line x1="28" y1="60" x2="34" y2="60" stroke="#9E9E9E" strokeWidth="1.2" />
          </svg>
        );

      case 'skeptical':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Tail */}
            <path d="M30 75C12 70 8 45 18 30C28 15 42 22 36 40C32 52 36 65 42 70" stroke="#FF7A1A" strokeWidth="11" strokeLinecap="round" />
            <ellipse cx="50" cy="65" rx="19" ry="22" fill="#FF7A1A" />
            <ellipse cx="50" cy="68" rx="12" ry="15" fill="#FFDBCA" />
            {/* Head tilted slightly */}
            <g transform="rotate(8 50 40)">
              <circle cx="50" cy="40" r="17" fill="#FF7A1A" />
              <path d="M38 30L34 16L46 24Z" fill="#FF7A1A" />
              <path d="M62 30L66 16L54 24Z" fill="#FF7A1A" />
              {/* One raised eyebrow, one narrow eye */}
              <line x1="40" y1="34" x2="48" y2="36" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
              <line x1="53" y1="32" x2="61" y2="35" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="44" cy="40" r="2.5" fill="#0A0A0A" />
              <line x1="53" y1="40" x2="59" y2="40" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M46 47L54 46" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* Hand on Chin */}
            <path d="M54 62L52 50" stroke="#FF7A1A" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="52" cy="50" r="3.5" fill="#FFDBCA" />
          </svg>
        );

      case 'energetic':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Motion Lines */}
            <path d="M18 64L12 60" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 70L10 68" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M19 76L13 77" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            {/* High Arc Tail */}
            <path d="M42 65C30 50 25 25 45 15C55 10 65 18 60 30" stroke="#FF7A1A" strokeWidth="12" strokeLinecap="round" />
            {/* Mid-hop Body */}
            <ellipse cx="50" cy="55" rx="18" ry="20" fill="#FF7A1A" />
            <ellipse cx="50" cy="57" rx="11" ry="13" fill="#FFDBCA" />
            <circle cx="50" cy="35" r="16" fill="#FF7A1A" />
            {/* Wide grin with teeth */}
            <circle cx="45" cy="33" r="2.5" fill="#0A0A0A" />
            <circle cx="55" cy="33" r="2.5" fill="#0A0A0A" />
            <path d="M44 39C46 44 54 44 56 39H44Z" fill="#F5F5F5" stroke="#0A0A0A" strokeWidth="1.5" />
            {/* Acorn held high */}
            <path d="M50 48L52 20" stroke="#FF7A1A" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="52" cy="14" rx="6" ry="7" fill="#FFB020" />
            <path d="M46 11C46 8 49 7 52 7C55 7 58 8 58 11L46 11Z" fill="#22C55E" />
          </svg>
        );

      case 'official':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Calm, upright tail */}
            <path d="M35 72C22 68 20 48 26 35C32 22 44 26 40 40C37 50 38 60 42 66" stroke="#FF7A1A" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="50" cy="62" rx="19" ry="24" fill="#FF7A1A" />
            <ellipse cx="50" cy="65" rx="12" ry="16" fill="#FFDBCA" />
            <circle cx="50" cy="38" r="17" fill="#FF7A1A" />
            {/* Calm, steady eyes */}
            <ellipse cx="44" cy="37" rx="2.5" ry="3" fill="#0A0A0A" />
            <ellipse cx="56" cy="37" rx="2.5" ry="3" fill="#0A0A0A" />
            <line x1="47" y1="45" x2="53" y2="45" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            {/* Official Green Badge on chest */}
            <circle cx="50" cy="58" r="4.5" fill="#22C55E" stroke="#15803D" strokeWidth="1.2" />
            <path d="M48.5 58L49.5 59.5L52 56.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      // Default happy / neutral
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Bushy Tail */}
            <path d="M32 75C12 70 8 45 18 30C28 15 42 22 36 40C32 52 36 65 42 70" stroke="#FF7A1A" strokeWidth="11" strokeLinecap="round" />
            <ellipse cx="50" cy="66" rx="20" ry="22" fill="#FF7A1A" />
            <ellipse cx="50" cy="70" rx="13" ry="15" fill="#FFDBCA" />
            <circle cx="50" cy="42" r="18" fill="#FF7A1A" />
            {/* Ears */}
            <path d="M36 32L32 18L44 26Z" fill="#FF7A1A" />
            <path d="M37 29L34 20L42 25Z" fill="#FFB68E" />
            <path d="M64 32L68 18L56 26Z" fill="#FF7A1A" />
            <path d="M63 29L66 20L58 25Z" fill="#FFB68E" />
            {/* Friendly Eyes */}
            <circle cx="44" cy="41" r="2.8" fill="#0A0A0A" />
            <circle cx="45" cy="40" r="1" fill="white" />
            <circle cx="56" cy="41" r="2.8" fill="#0A0A0A" />
            <circle cx="57" cy="40" r="1" fill="white" />
            <path d="M47 47C49 50 51 50 53 47" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            {/* Acorn at Chest */}
            <ellipse cx="50" cy="65" rx="8" ry="9" fill="#FFB020" />
            <path d="M42 61C42 57 46 56 50 56C54 56 58 57 58 61L42 61Z" fill="#22C55E" />
            <path d="M50 56V53" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  if (avatarOnly) {
    return (
      <button
        type="button"
        onClick={handleTap}
        aria-label="Ophelos the squirrel mascot"
        className={`relative shrink-0 ${sizeClasses} flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${className}`}
      >
        {renderPoseSvg()}
      </button>
    );
  }

  return (
    <div className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#131313]/90 border border-[#2A2A2A] relative overflow-hidden backdrop-blur-md shadow-lg ${className}`}>
      {/* Subtle ambient glow behind Ophelos */}
      <div className="absolute -left-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Ophelos Avatar Button */}
      <button
        type="button"
        onClick={handleTap}
        aria-label="Tap Ophelos the squirrel mentor for tips"
        className={`relative shrink-0 ${sizeClasses} flex items-center justify-center cursor-pointer active:scale-95 transition-transform`}
        title="Tap Ophelos for financial advice"
      >
        {renderPoseSvg()}
      </button>

      {/* Dynamic Speech Bubble */}
      <div className="relative flex-1 p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm shadow-md">
        {/* Pointer Notch */}
        <div className="absolute -left-1.5 top-4 w-3 h-3 bg-[#171717] border-l border-b border-white/10 rotate-45 pointer-events-none" />

        {tag && (
          <span className="block font-headline text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
            {tag}
          </span>
        )}
        <p className="text-zinc-200 leading-snug font-body">
          {displayQuote}
        </p>
      </div>
    </div>
  );
}
