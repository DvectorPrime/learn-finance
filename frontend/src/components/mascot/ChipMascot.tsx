'use client';

import React, { useState } from 'react';
import GoldenAcorn from './GoldenAcorn';

export interface ChipMascotProps {
  state?: 'idle' | 'cheering' | 'cheer' | 'thinking';
  speech?: string;
  tag?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  avatarOnly?: boolean;
  className?: string;
}

const DEFAULT_QUOTES = [
  "Welcome back! Even 5 minutes today boosts your money confidence.",
  "Notice how emergency buffers protect you from unexpected debts?",
  "Compound interest is money working for you while you sleep!",
  "1 lesson today keeps your streak active and unlocks new skills!",
  "Check the terms before any digital loan — avoid sneaky fees!"
];

export default function ChipMascot({
  state = 'idle',
  speech,
  tag = 'Chip the Mentor',
  size = 'md',
  interactive = true,
  avatarOnly = false,
  className = '',
}: ChipMascotProps) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [customQuote, setCustomQuote] = useState<string | null>(null);

  const displayQuote = customQuote || speech || DEFAULT_QUOTES[quoteIdx];

  const handleTap = () => {
    if (!interactive) return;
    setQuoteIdx((prev) => (prev + 1) % DEFAULT_QUOTES.length);
    setCustomQuote(null);
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
  }[size];

  if (avatarOnly) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <button
          type="button"
          onClick={handleTap}
          aria-label="Chip the squirrel mascot"
          className={`relative shrink-0 ${sizeClasses} flex items-center justify-center cursor-pointer active:scale-95 transition-transform`}
        >
          {state === 'cheer' || state === 'cheering' ? (
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)] select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Acorn in celebration */}
              <g className="animate-acorn" transform="translate(42, 6)">
                <path d="M4 10C4 4 16 4 16 10H4Z" fill="#78350F" />
                <path d="M10 4V0" stroke="#78350F" strokeLinecap="round" strokeWidth="2" />
                <path d="M4 10C4 20 10 24 10 24C10 24 16 20 16 10H4Z" fill="#FBBF24" />
                <path d="M6 17L9 13L11 15L14 10" stroke="#15803D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>

              {/* Bushy Squirrel Tail with bounce */}
              <path
                d="M32 75C12 70 8 45 18 30C28 15 42 22 36 40C32 52 36 65 42 70"
                stroke="#D97706"
                strokeWidth="11"
                strokeLinecap="round"
                className="animate-tail"
              />

              {/* Chubby Body */}
              <ellipse cx="50" cy="66" rx="20" ry="22" fill="#F97316" />
              <ellipse cx="50" cy="70" rx="13" ry="15" fill="#FED7AA" />

              {/* Cheerful Raised Arms */}
              <path d="M30 64C22 55 18 42 22 36" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
              <circle cx="22" cy="36" r="4" fill="#FED7AA" />
              <path d="M70 64C78 55 82 42 78 36" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
              <circle cx="78" cy="36" r="4" fill="#FED7AA" />

              {/* Squirrel Head */}
              <circle cx="50" cy="42" r="18" fill="#F97316" />

              {/* Perky Ears with Inner Pink */}
              <path d="M36 32L32 18L44 26Z" fill="#EA580C" />
              <path d="M37 29L34 20L42 25Z" fill="#FBCFE8" />
              <path d="M64 32L68 18L56 26Z" fill="#EA580C" />
              <path d="M63 29L66 20L58 25Z" fill="#FBCFE8" />

              {/* Cute Happy Arched Eyes */}
              <path d="M42 41C44 38 47 38 49 41" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M51 41C53 38 56 38 58 41" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Rosy Cheeks */}
              <circle cx="39" cy="46" r="3" fill="#FB7185" fillOpacity="0.7" />
              <circle cx="61" cy="46" r="3" fill="#FB7185" fillOpacity="0.7" />

              {/* Nose & Big Smile */}
              <ellipse cx="50" cy="44" rx="2" ry="1.5" fill="#1E293B" />
              <path d="M46 47C48 51 52 51 54 47" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-md select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tail */}
              <path
                d="M32 75C12 70 8 45 18 30C28 15 42 22 36 40C32 52 36 65 42 70"
                stroke="#D97706"
                strokeWidth="11"
                strokeLinecap="round"
                className="animate-tail"
              />
              <ellipse cx="50" cy="66" rx="20" ry="22" fill="#F97316" />
              <ellipse cx="50" cy="70" rx="13" ry="15" fill="#FED7AA" />
              <circle cx="50" cy="42" r="18" fill="#F97316" />
              <path d="M36 32L32 18L44 26Z" fill="#EA580C" />
              <path d="M37 29L34 20L42 25Z" fill="#FBCFE8" />
              <path d="M64 32L68 18L56 26Z" fill="#EA580C" />
              <path d="M63 29L66 20L58 25Z" fill="#FBCFE8" />
              <circle cx="44" cy="41" r="2.8" fill="#1E293B" />
              <circle cx="45" cy="40" r="1" fill="white" />
              <circle cx="56" cy="41" r="2.8" fill="#1E293B" />
              <circle cx="57" cy="40" r="1" fill="white" />
              <circle cx="39" cy="45" r="2.5" fill="#FB7185" fillOpacity="0.6" />
              <circle cx="61" cy="45" r="2.5" fill="#FB7185" fillOpacity="0.6" />
              <ellipse cx="50" cy="44" rx="2" ry="1.5" fill="#1E293B" />
              <path d="M47 47C49 49 51 49 53 47" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl glass-panel relative overflow-hidden ${className}`}>
      {/* Glow highlight behind Chip */}
      <div className="absolute -left-4 -top-4 w-24 h-24 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Chip Avatar Vector */}
      <button
        type="button"
        onClick={handleTap}
        aria-label="Tap Chip the squirrel mascot for a financial tip"
        className={`relative shrink-0 ${sizeClasses} flex items-center justify-center cursor-pointer active:scale-95 transition-transform`}
        title="Tap Chip for tips"
      >
        {state === 'cheering' || state === 'cheer' ? (
          // Cheering Chip with raised arms and bouncing Golden Acorn
          <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tail */}
            <path d="M18 48C14 42 12 32 16 22C19 14 26 12 28 18C30 24 24 30 22 34" stroke="#ffb68e" strokeLinecap="round" strokeWidth="4" />
            {/* Body */}
            <ellipse cx="36" cy="46" rx="14" ry="16" fill="#eb6b01" />
            <ellipse cx="36" cy="48" rx="8" ry="11" fill="#ffdbca" />
            {/* Head */}
            <circle cx="36" cy="27" r="13" fill="#eb6b01" />
            {/* Ears */}
            <path d="M26 18L29 25" stroke="#eb6b01" strokeLinecap="round" strokeWidth="3" />
            <path d="M46 18L43 25" stroke="#eb6b01" strokeLinecap="round" strokeWidth="3" />
            {/* Cheerful Eyes */}
            <path d="M30 26C31 24 33 24 34 26" stroke="#003915" strokeLinecap="round" strokeWidth="2" />
            <path d="M38 26C39 24 41 24 42 26" stroke="#003915" strokeLinecap="round" strokeWidth="2" />
            {/* Smile */}
            <circle cx="36" cy="29" r="1.5" fill="#331200" />
            <path d="M34 32C35 34 37 34 38 32" stroke="#331200" strokeLinecap="round" strokeWidth="1.5" />
            {/* Cheering Arms */}
            <path d="M25 40L18 28" stroke="#eb6b01" strokeLinecap="round" strokeWidth="3.5" />
            <path d="M47 40L54 28" stroke="#eb6b01" strokeLinecap="round" strokeWidth="3.5" />
          </svg>
        ) : (
          // Idle Chip with Gamer Headset, Cyan Goggles & Golden Acorn with chart trendline
          <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Fluffy Tail */}
            <path d="M22 68C12 62 10 42 22 28C32 16 46 22 42 34C39 42 30 46 32 58C33 63 36 67 38 70C30 73 25 71 22 68Z" fill="#D97706" />
            <path d="M20 58C14 50 14 36 24 26C31 18 41 22 38 31C35 38 27 43 28 52C28 55 30 58 32 60C26 62 22 61 20 58Z" fill="#F59E0B" />
            {/* Body */}
            <ellipse cx="52" cy="62" rx="22" ry="24" fill="#F59E0B" />
            {/* Tummy */}
            <ellipse cx="54" cy="65" rx="14" ry="16" fill="#FEF3C7" />
            {/* Head */}
            <circle cx="56" cy="40" r="18" fill="#F59E0B" />
            {/* Muzzle */}
            <ellipse cx="61" cy="44" rx="9" ry="7" fill="#FEF3C7" />
            {/* Nose */}
            <ellipse cx="66" cy="42" rx="2.5" ry="2" fill="#1C1917" />
            {/* Smile */}
            <path d="M63 46C64.5 48 67.5 47.5 69 45.5" stroke="#1C1917" strokeLinecap="round" strokeWidth="1.5" />
            {/* Ears */}
            <path d="M46 26C45 20 50 20 53 25C54 27 52 30 50 30Z" fill="#D97706" />
            <path d="M57 24C58 18 64 19 65 24C65 27 63 29 61 29Z" fill="#D97706" />
            {/* Headset Band */}
            <path d="M41 39C40 26 68 23 71 37" stroke="#334155" strokeLinecap="round" strokeWidth="3" />
            {/* Earcups with Emerald Trim */}
            <rect x="38" y="34" width="6" height="12" rx="3" fill="#1E293B" />
            <rect x="39" y="36" width="2" height="8" rx="1" fill="#22C55E" />
            <rect x="68" y="34" width="6" height="12" rx="3" fill="#1E293B" />
            {/* Mic boom */}
            <path d="M41 43C42 49 50 51 58 50" stroke="#334155" strokeLinecap="round" strokeWidth="1.8" />
            <circle cx="59" cy="50" r="2.2" fill="#22C55E" />
            {/* Cyan Gamer Goggles */}
            <path d="M47 36H70C72 36 73 38 73 40C73 42 71 44 69 44H48C46 44 45 42 45 40C45 38 46 36 47 36Z" fill="#06B6D4" fillOpacity="0.9" />
            <path d="M49 38H58V42H49V38Z" fill="#A5F3FC" fillOpacity="0.8" />
            <path d="M60 38H69V42H60V38Z" fill="#A5F3FC" fillOpacity="0.8" />
            <rect x="44" y="38" width="28" height="2" fill="#E0F2FE" fillOpacity="0.6" />
            {/* Golden Acorn in Hand */}
            <g transform="translate(62, 54)">
              <path d="M2 5C2 2 14 2 14 5H2Z" fill="#78350F" />
              <path d="M8 2V0" stroke="#78350F" strokeLinecap="round" strokeWidth="1.5" />
              <path d="M2 5C2 12 8 16 8 16C8 16 14 12 14 5H2Z" fill="#FBBF24" />
              <path d="M4 11L7 8L9 10L12 6" stroke="#15803D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </g>
            {/* Paw */}
            <path d="M54 58C58 60 62 60 66 57" stroke="#D97706" strokeLinecap="round" strokeWidth="3.5" />
          </svg>
        )}
      </button>

      {/* Speech Bubble */}
      <div className="relative flex-1 p-3 sm:p-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm shadow-md">
        {/* Left pointer notch */}
        <div className="absolute -left-1.5 top-4 w-3 h-3 bg-white/[0.05] border-l border-b border-white/10 rotate-45 pointer-events-none" />
        
        {tag && (
          <span className="block font-headline text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
            {tag}
          </span>
        )}
        <p className="text-zinc-200 leading-snug">
          {displayQuote}
        </p>
      </div>
    </div>
  );
}
