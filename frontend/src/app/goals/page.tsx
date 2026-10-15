'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchUserGoals, GoalDetailItem } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import OphelosMascot from '@/components/mascot/OphelosMascot';
import { soundFx } from '@/lib/sound';
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  Target,
  PiggyBank,
  Flag,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export default function AcornInventoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [selectedSegment, setSelectedSegment] = useState<'LEARNING' | 'SAVINGS' | 'LONG_TERM'>('SAVINGS');
  const [goals, setGoals] = useState<GoalDetailItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetchUserGoals();
      setGoals(res.goals || []);
    } catch (err) {
      console.error('Failed to load goals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      loadGoals();
    }
  }, [authLoading]);

  const learningGoals = goals.filter((g) => g.type === 'LEARNING' && g.status === 'ACTIVE');
  const savingsGoals = goals.filter((g) => g.type === 'SAVINGS' && g.status === 'ACTIVE');
  const longTermGoals = goals.filter((g) => g.type === 'LONG_TERM' && g.status === 'ACTIVE');

  const displayedGoals = goals.filter((g) => g.type === selectedSegment && g.status === 'ACTIVE');

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Sub-Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            onClick={() => soundFx.playTap()}
            className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-headline font-bold text-lg text-white leading-tight">
              AcornInventory
            </h1>
            <span className="text-[10px] text-zinc-400 font-medium">
              Goal &amp; Liquidity Tracker
            </span>
          </div>
        </div>

        <Link
          href="/goals/new"
          onClick={() => soundFx.playTap()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-xs shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>New Goal</span>
        </Link>
      </div>

      {/* Ophelos Mentor Guidance */}
      <OphelosMascot
        mood="informing"
        tag="Ophelos • Guide"
        speech={
          goals.length === 0
            ? "Your AcornInventory is empty. Tap 'New Goal' to establish your first savings buffer or learning path."
            : "Here is everything you are working toward. Consistent deposits compound into financial resilience."
        }
        size="sm"
      />

      {/* 3-Way Segmented Control */}
      <div className="grid grid-cols-3 h-10 p-1 rounded-xl bg-white/[0.04] border border-white/10">
        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setSelectedSegment('LEARNING');
          }}
          className={`rounded-lg font-headline text-xs font-semibold transition-all ${
            selectedSegment === 'LEARNING'
              ? 'bg-emerald-500 text-black font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Learning
        </button>
        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setSelectedSegment('SAVINGS');
          }}
          className={`rounded-lg font-headline text-xs font-semibold transition-all ${
            selectedSegment === 'SAVINGS'
              ? 'bg-emerald-500 text-black font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Savings
        </button>
        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setSelectedSegment('LONG_TERM');
          }}
          className={`rounded-lg font-headline text-xs font-semibold transition-all ${
            selectedSegment === 'LONG_TERM'
              ? 'bg-emerald-500 text-black font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Long-term
        </button>
      </div>

      {/* Stat Tiles Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-2xl glass-panel text-center">
          <span className="block text-xl font-bold font-mono text-emerald-400">
            {learningGoals.length}
          </span>
          <span className="text-[10px] text-zinc-400 font-medium leading-tight">Learning</span>
        </div>
        <div className="p-3 rounded-2xl glass-panel text-center">
          <span className="block text-xl font-bold font-mono text-amber-400">
            {savingsGoals.length}
          </span>
          <span className="text-[10px] text-zinc-400 font-medium leading-tight">Savings</span>
        </div>
        <div className="p-3 rounded-2xl glass-panel text-center">
          <span className="block text-xl font-bold font-mono text-blue-400">
            {longTermGoals.length}
          </span>
          <span className="text-[10px] text-zinc-400 font-medium leading-tight">Long-term</span>
        </div>
      </div>

      {/* Goals Content */}
      {loading ? (
        <div className="space-y-2.5 py-4">
          <div className="h-20 bg-white/[0.04] rounded-2xl animate-pulse" />
          <div className="h-20 bg-white/[0.04] rounded-2xl animate-pulse" />
        </div>
      ) : displayedGoals.length === 0 ? (
        /* Empty State */
        <div className="py-10 px-4 rounded-2xl glass-panel text-center space-y-3">
          <div className="flex justify-center">
            <OphelosMascot mood="informing" avatarOnly size="md" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-headline">
              No {selectedSegment.toLowerCase().replace('_', '-')} goals active
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              {goals.length === 0
                ? 'Create your first goal and Ophelos will break it down into achievable milestones.'
                : `You currently have goals in other categories. Tap below to create a ${selectedSegment.toLowerCase().replace('_', '-')} goal.`}
            </p>
          </div>
          <Link
            href="/goals/new"
            onClick={() => soundFx.playTap()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all active:scale-95 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Create Goal</span>
          </Link>
        </div>
      ) : (
        /* List of Real Active Goals */
        <div className="space-y-2.5">
          {displayedGoals.map((goal) => {
            const target = goal.targetAmount || 0;
            const current = goal.currentAmount || 0;
            const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

            return (
              <Link
                key={goal.id}
                href={`/goals/${goal.id}`}
                onClick={() => soundFx.playTap()}
                className="block p-3.5 rounded-2xl glass-panel hover:bg-white/[0.08] active:scale-[0.99] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1 mr-2">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400 block mb-0.5">
                      {goal.type.replace('_', ' ')}
                    </span>
                    <h3 className="font-headline font-bold text-sm text-white group-hover:text-emerald-300 transition-colors truncate">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                      {goal.type === 'LEARNING'
                        ? `${goal.lessonsPerWeek || 3} lessons / week`
                        : `₦${current.toLocaleString()} of ₦${target.toLocaleString()}`}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0 mt-1" />
                </div>

                {/* Progress Track */}
                <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1.5 font-mono">
                  <span>{pct}% complete</span>
                  {goal.monthlyContribution && (
                    <span>₦{goal.monthlyContribution.toLocaleString()}/mo</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
