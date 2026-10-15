'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchMastery, fetchGlossary, fetchMisconceptions } from '../../lib/api';
import { ConceptMastery, GlossaryConcept, Misconception } from '../../types/curriculum';
import { useAuth } from '../../context/AuthContext';
import ChipMascot from '../mascot/ChipMascot';
import GoldenAcorn from '../mascot/GoldenAcorn';
import { playButtonTap } from '../../lib/sound';
import {
  Award,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  LogIn,
  Lock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function MasteryDashboard() {
  const { user } = useAuth();
  const [masteryMap, setMasteryMap] = useState<Record<string, ConceptMastery>>({});
  const [glossary, setGlossary] = useState<GlossaryConcept[]>([]);
  const [misconceptions, setMisconceptions] = useState<Misconception[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBand, setFilterBand] = useState<'all' | 'mastered' | 'proficient' | 'learning'>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const [mRes, gRes, mcRes] = await Promise.all([
          fetchMastery(),
          fetchGlossary(),
          fetchMisconceptions(),
        ]);
        setMasteryMap(mRes.mastery || {});
        setGlossary(gRes.concepts || []);
        setMisconceptions(mcRes.misconceptions || []);
      } catch (err) {
        console.error('Failed to load mastery data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-neutral-400 text-xs sm:text-sm gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span>Loading verified competencies...</span>
      </div>
    );
  }

  // Count bands
  const masteredList = glossary.filter((g) => masteryMap[g.id]?.band === 'mastered');
  const proficientList = glossary.filter((g) => masteryMap[g.id]?.band === 'proficient');
  const learningList = glossary.filter(
    (g) => !masteryMap[g.id] || masteryMap[g.id]?.band === 'learning'
  );

  const filteredConcepts = glossary.filter((g) => {
    const record = masteryMap[g.id];
    const band = record?.band || 'learning';
    if (filterBand === 'all') return true;
    return band === filterBand;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 select-none">
      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-primary border border-white/10">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Skills Verified</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Concept Mastery
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Track the financial concepts you have mastered and review practical definitions.
        </p>

        {user ? (
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs text-neutral-300 flex items-center justify-between gap-2 shadow-sm">
            <span>
              Signed in as <strong className="text-white">{user.displayName}</strong>
            </span>
            <span className="text-[10px] text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-full font-bold">
              Synced
            </span>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-amber-200 flex items-center justify-between gap-2">
            <span className="text-[11px]">
              Guest Preview mode • Sign in to save telemetry
            </span>
            <Link
              href="/login"
              onClick={() => playButtonTap()}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-400 text-black font-bold text-[11px] shrink-0"
            >
              Sign In
            </Link>
          </div>
        )}
      </header>

      {/* Chip Mentor Bubble */}
      <ChipMascot
        state="idle"
        tag="Chip the Mentor"
        speech="Every lesson you complete elevates your financial resilience score. Let's keep growing!"
        size="sm"
      />

      {/* Summary KPI Cards (Stitch 3-card grid) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-primary tracking-wider block">
            Mastered
          </span>
          <p className="text-2xl font-bold text-white font-mono">{masteredList.length}</p>
          <span className="text-[10px] text-neutral-400 block truncate">≥ 80%</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-neutral-300 tracking-wider block">
            Proficient
          </span>
          <p className="text-2xl font-bold text-white font-mono">{proficientList.length}</p>
          <span className="text-[10px] text-neutral-400 block truncate">60–80%</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">
            Learning
          </span>
          <p className="text-2xl font-bold text-white font-mono">{learningList.length}</p>
          <span className="text-[10px] text-neutral-400 block truncate">&lt; 60%</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto pb-1 gap-1.5 no-scrollbar">
        {(['all', 'mastered', 'proficient', 'learning'] as const).map((band) => (
          <button
            key={band}
            onClick={() => {
              playButtonTap();
              setFilterBand(band);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              filterBand === band
                ? 'bg-primary text-black font-bold shadow-md shadow-primary/20'
                : 'bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {band} ({band === 'all' ? glossary.length : band === 'mastered' ? masteredList.length : band === 'proficient' ? proficientList.length : learningList.length})
          </button>
        ))}
      </div>

      {/* Concepts List */}
      <div className="space-y-3">
        {filteredConcepts.map((concept) => {
          const record = masteryMap[concept.id];
          const score = record ? Math.round(record.mastery * 100) : 0;
          const band = record?.band || 'learning';

          let bandBadgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
          if (band === 'mastered') bandBadgeClass = 'bg-primary/20 text-primary border-primary/30';
          if (band === 'proficient') bandBadgeClass = 'bg-white/10 text-white border-white/20';

          return (
            <div
              key={concept.id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl space-y-2.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate font-display">{concept.term}</h3>
                  <span className="text-[10px] font-mono text-neutral-500">{concept.id}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${bandBadgeClass}`}
                >
                  {band} ({score}%)
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">{concept.definition}</p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      band === 'mastered'
                        ? 'bg-primary'
                        : band === 'proficient'
                        ? 'bg-emerald-400'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.max(score, 6)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Common Misconceptions Advice */}
      <section className="space-y-3 pt-4 border-t border-white/10">
        <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>Financial Traps & Misconceptions</span>
        </h2>
        <div className="space-y-2.5">
          {misconceptions.map((mc) => (
            <div
              key={mc.id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.04] space-y-1.5 shadow-sm"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Myth vs. Principle
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">{mc.belief || mc.name || mc.id}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{mc.description || mc.belief}</p>
              {(mc.reality || mc.correction) && (
                <div className="p-2.5 rounded-lg bg-primary/[0.08] border border-primary/20 text-xs text-emerald-200">
                  <strong className="block text-primary font-bold text-[11px] mb-0.5">Golden Rule:</strong>
                  {mc.reality || mc.correction}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

