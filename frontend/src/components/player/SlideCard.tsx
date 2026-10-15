'use client';

import React from 'react';
import { SlideItem, ContentBlock } from '../../types/curriculum';
import { BookOpen, Lightbulb, Sparkles, ArrowRight, Bookmark } from 'lucide-react';
import { playButtonTap } from '../../lib/sound';
import GoldenAcorn from '../mascot/GoldenAcorn';

interface SlideCardProps {
  item: SlideItem;
  onComplete: () => void;
}

export default function SlideCard({ item, onComplete }: SlideCardProps) {
  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-sm sm:text-base leading-relaxed text-neutral-300">
            {block.text}
          </p>
        );

      case 'bullet_list':
        return (
          <ul key={index} className="space-y-2 pl-1">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="leading-snug">{it}</span>
              </li>
            ))}
          </ul>
        );

      case 'numbered_list':
        return (
          <ol key={index} className="space-y-2 pl-1">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <span className="text-xs font-mono font-bold text-primary w-4 shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                <span className="leading-snug">{it}</span>
              </li>
            ))}
          </ol>
        );

      case 'callout':
        return (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200"
          >
            <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">{block.text}</p>
          </div>
        );

      case 'example':
        return (
          <div
            key={index}
            className="p-4 rounded-xl border border-primary/20 bg-primary/10 text-emerald-200 space-y-1.5"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-World Scenario</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-200">{block.text}</p>
          </div>
        );

      case 'definition':
        return (
          <div
            key={index}
            className="p-4 rounded-xl border border-white/10 bg-white/[0.04] text-neutral-200 space-y-2"
          >
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-mono font-bold">
              {block.term}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-300">{block.text}</p>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.06] border-b border-white/10 text-neutral-300">
                <tr>
                  {block.columns.map((col, i) => (
                    <th key={i} className="p-3 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/[0.02]">
                {block.rows.map((row, r) => (
                  <tr key={r} className="hover:bg-white/[0.04]">
                    {row.map((cell, c) => (
                      <td key={c} className="p-3 text-neutral-300 font-mono text-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-6 shadow-xl space-y-5">
      {/* Header */}
      <header className="space-y-1.5 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <BookOpen className="h-4 w-4" />
            <span>Core Financial Concept</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
            <GoldenAcorn size={14} />
            <span>+10 XP</span>
          </div>
        </div>
        <h2 className="text-lg sm:text-2xl font-bold font-display tracking-tight text-white">{item.title}</h2>
        {item.subtitle && <p className="text-xs sm:text-sm text-neutral-400">{item.subtitle}</p>}
      </header>

      {/* Body Blocks */}
      <div className="space-y-3.5">
        {(item.body || []).map((b, idx) => renderBlock(b, idx))}
      </div>

      {/* Key Takeaway */}
      {item.key_takeaway && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/[0.06] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Key Takeaway</span>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
            {item.key_takeaway}
          </p>
        </div>
      )}

      {/* Concept Tags */}
      {item.concepts && item.concepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.concepts.map((c) => {
            const cleanLabel = c.replace(/^c_/, '').replace(/_/g, ' ');
            return (
              <span
                key={c}
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold capitalize bg-white/[0.06] text-primary border border-white/10"
              >
                {cleanLabel}
              </span>
            );
          })}
        </div>
      )}

      {/* Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            playButtonTap();
            onComplete();
          }}
          className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

