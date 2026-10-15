'use client';

import React from 'react';
import { playButtonTap } from '../../lib/sound';

interface AppleAuthButtonProps {
  label?: string;
  variant?: 'full' | 'compact';
  className?: string;
}

export default function AppleAuthButton({
  label = 'Continue with Apple',
  variant = 'full',
  className = '',
}: AppleAuthButtonProps) {
  const handleClick = () => {
    playButtonTap();
    alert('Apple Sign-In is configured for iOS Native App Bundle. Use Google or Email for web demo.');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Continue with Apple"
      className={`rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-sm font-semibold cursor-pointer ${
        variant === 'full'
          ? 'w-full h-12 px-4 bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm'
          : 'w-full py-2.5 px-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-xs'
      } ${className}`}
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" viewBox="0 0 170 170">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.31-6.74-10.32-11.89-21.99-15.46-35.01-3.57-13.02-5.36-25.13-5.36-36.33 0-14.77 3.73-26.85 11.19-36.23 7.46-9.39 16.63-14.19 27.5-14.4 5.34 0 11.08 1.41 17.21 4.23 6.14 2.82 10.22 4.3 12.24 4.45 1.57-.15 5.92-1.68 13.06-4.59 7.13-2.91 13.06-4.21 17.78-3.9 13.03.63 23.36 5.16 31 13.58-11.51 6.96-17.15 16.42-16.92 28.37.23 9.4 3.82 17.28 10.77 23.63 6.95 6.36 15.22 10.05 24.81 11.07-2.22 6.94-4.87 13.54-7.96 19.8zm-26.69-106.65c.08 3.59-1.04 7.28-3.37 11.08-2.33 3.8-5.39 6.81-9.18 9.03-3.08 1.77-6.39 2.91-9.92 3.42-.31-3.48.79-7.07 3.31-10.77 2.52-3.7 5.71-6.78 9.58-9.24 3.09-1.98 6.28-3.15 9.58-3.52z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
