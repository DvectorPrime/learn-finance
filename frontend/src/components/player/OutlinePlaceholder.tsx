'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface OutlinePlaceholderProps {
  title: string;
  subtitle?: string;
  topics?: string[];
  onComplete: () => void;
}

export default function OutlinePlaceholder({
  title,
  subtitle,
  topics = [],
  onComplete,
}: OutlinePlaceholderProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 text-center space-y-6 shadow-sm">
      <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
        <Clock className="h-8 w-8" />
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
          Curriculum Topic
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-400 leading-relaxed">{subtitle}</p>}
      </div>

      {topics && topics.length > 0 && (
        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-850 max-w-md mx-auto text-left space-y-2.5">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Core Concepts in this lesson:
          </span>
          <ul className="space-y-2 pl-1">
            {topics.map((t, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
