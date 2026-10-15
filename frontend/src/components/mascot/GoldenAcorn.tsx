import React from 'react';

interface GoldenAcornProps {
  className?: string;
  size?: number;
  withTrendline?: boolean;
}

export default function GoldenAcorn({ className = '', size = 20, withTrendline = false }: GoldenAcornProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
    >
      {/* Acorn Cap */}
      <path
        d="M5 8C5 6.5 7.5 5 12 5C16.5 5 19 6.5 19 8C19 8.8 17.5 9.5 12 9.5C6.5 9.5 5 8.8 5 8Z"
        fill="#78350F"
      />
      {/* Stem */}
      <path
        d="M12 5V2.5"
        stroke="#78350F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Acorn Body */}
      <path
        d="M5.5 9.5C5.5 14.5 8.5 19.5 12 21C15.5 19.5 18.5 14.5 18.5 9.5C18.5 9.5 15.5 10.5 12 10.5C8.5 10.5 5.5 9.5 5.5 9.5Z"
        fill="#FBBF24"
      />
      {/* Optional Financial Trendline on Acorn */}
      {withTrendline && (
        <path
          d="M8 15L10.5 12.5L12.5 14.5L15.5 10.5"
          stroke="#15803D"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
