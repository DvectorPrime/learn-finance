'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchGlossary, fetchMastery } from '@/lib/api';
import { GlossaryConcept, ConceptMastery } from '@/types/curriculum';
import GoldenAcorn from '@/components/mascot/GoldenAcorn';
import ChipMascot from '@/components/mascot/ChipMascot';
import { playButtonTap } from '@/lib/sound';
import {
  BookMarked,
  Search,
  ArrowRight,
  Award,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function GlossaryPage() {
  const [concepts, setConcepts] = useState<GlossaryConcept[]>([]);
  const [masteryMap, setMasteryMap] = useState<Record<string, ConceptMastery>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [gRes, mRes] = await Promise.all([fetchGlossary(), fetchMastery()]);
        setConcepts(gRes.concepts || []);
        setMasteryMap(mRes.mastery || {});
      } catch (err) {
        console.error('Failed to load glossary:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const tags = ['all', 'budgeting', 'savings', 'cashflow', 'debt', 'banking', 'planning'];

  const filtered = concepts.filter((c) => {
    const termMatch =
      c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === 'all' ||
      c.id.toLowerCase().includes(selectedTag) ||
      c.definition.toLowerCase().includes(selectedTag);

    return termMatch && matchesTag;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-neutral-400 text-xs sm:text-sm gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span>Loading curriculum dictionary...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 select-none">
      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-primary border border-white/10">
          <BookMarked className="h-3.5 w-3.5" />
          <span>Financial Glossary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Curriculum Dictionary
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Search clear definitions and practical Nigerian examples across your learning road.
        </p>
      </header>

      {/* Chip Mascot Tip Bubble */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
        <div className="shrink-0">
          <ChipMascot state="idle" size="sm" />
        </div>
        <p className="text-xs text-neutral-300 leading-snug">
          &ldquo;Every complex financial product is just simple cash flows in disguise! Look up terms anytime.&rdquo;
        </p>
      </div>

      {/* Search and Tag Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search financial terms (e.g. emergency fund, interest rate)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary shadow-sm transition-colors"
          />
        </div>

        <div className="flex overflow-x-auto pb-1 gap-1.5 no-scrollbar">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => {
                playButtonTap();
                setSelectedTag(t);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                selectedTag === t
                  ? 'bg-primary text-black font-bold shadow-md shadow-primary/20'
                  : 'bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Stack */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const rec = masteryMap[item.id];
          const hasMastery = Boolean(rec);
          const band = rec?.band || 'learning';

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl space-y-2.5 shadow-sm hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold font-display text-white truncate">
                    {item.term}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500">{item.id}</span>
                </div>
                {hasMastery ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                      band === 'mastered'
                        ? 'bg-primary/20 text-primary border-primary/30'
                        : 'bg-white/10 text-neutral-300 border-white/20'
                    }`}
                  >
                    {band}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] text-neutral-400 border border-white/10 shrink-0">
                    Not Started
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {item.definition}
              </p>

              {item.references && item.references.length > 0 && (
                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1">
                  {item.references.map((ref) => (
                    <span
                      key={ref}
                      className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

