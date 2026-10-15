'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchGoals, fetchModules, fetchLesson } from '../../lib/api';
import { GoalProgress, Module, EvaluationGoal } from '../../types/curriculum';
import { useAuth } from '../../context/AuthContext';
import ChipMascot from '../mascot/ChipMascot';
import GoldenAcorn from '../mascot/GoldenAcorn';
import { playButtonTap } from '../../lib/sound';
import {
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  LogIn,
  Lock,
  Sparkles,
  Shield,
  Flame,
} from 'lucide-react';

export default function GoalsAndTasksBoard() {
  const { user } = useAuth();
  const [goalsMap, setGoalsMap] = useState<Record<string, GoalProgress>>({});
  const [modules, setModules] = useState<Module[]>([]);
  const [goalsList, setGoalsList] = useState<Array<{ goal: EvaluationGoal; lessonId: string; lessonTitle: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [gRes, mRes] = await Promise.all([fetchGoals(), fetchModules()]);
        setGoalsMap(gRes.goals || {});
        setModules(mRes.modules || []);

        const sampleLessonIds = ['L01', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21'];
        const collectedGoals: Array<{ goal: EvaluationGoal; lessonId: string; lessonTitle: string }> = [];

        await Promise.all(
          sampleLessonIds.map(async (lid) => {
            try {
              const { lesson } = await fetchLesson(lid);
              for (const g of lesson.evaluation?.goals || []) {
                collectedGoals.push({
                  goal: g,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                });
              }
            } catch {}
          })
        );

        setGoalsList(collectedGoals);
      } catch (err) {
        console.error('Failed to load goals:', err);
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
        <span>Loading milestone targets...</span>
      </div>
    );
  }

  const metGoalsCount = goalsList.filter((g) => goalsMap[g.goal.id]?.status === 'met').length;
  const overallPercent = goalsList.length > 0 ? Math.round((metGoalsCount / goalsList.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 select-none">
      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-primary border border-white/10">
          <Target className="h-3.5 w-3.5" />
          <span>Milestone Tracks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Goals & Achievements
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Track financial goals across each unit and earn golden acorns upon completion.
        </p>

        {user ? (
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs text-neutral-300 flex items-center justify-between gap-2 shadow-sm">
            <span>
              Tracking goals for <strong className="text-white">{user.displayName}</strong>
            </span>
            <span className="text-[10px] text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-full font-bold">
              Active
            </span>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-amber-200 flex items-center justify-between gap-2">
            <span className="text-[11px]">
              Guest Preview mode • Sign in to save unit goals
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
        state="cheering"
        tag="Chip the Mentor"
        speech={
          metGoalsCount > 0
            ? "Great progress on your milestones! Discipline compounds exponentially."
            : "Welcome to your milestone board! Complete your first unit to check off goals and earn golden acorns."
        }
        size="sm"
      />

      {/* Progress Metric Hero Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl space-y-3 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-bold text-primary block">
            Overall Curriculum Goal Progress
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
            <GoldenAcorn size={14} />
            <span>+{metGoalsCount * 25} Acorns</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            {metGoalsCount} of {goalsList.length} Goals Reached
          </h3>
          <span className="text-lg font-bold text-primary font-mono">{overallPercent}%</span>
        </div>

        <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(75,226,119,0.5)]"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Goals List */}
      <section className="space-y-3">
        <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <span>Unit Learning Milestones</span>
        </h2>

        <div className="space-y-3">
          {goalsList.map(({ goal, lessonId, lessonTitle }) => {
            const progress = goalsMap[goal.id];
            const percent = progress ? Math.round(progress.progress * 100) : 0;
            const status = progress?.status || 'not_started';

            return (
              <div
                key={goal.id}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl space-y-2.5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-primary truncate block">
                      {lessonTitle}
                    </span>
                    <h3 className="text-sm font-bold text-white font-display mt-0.5 truncate">
                      {goal.statement || goal.name || goal.id}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                      status === 'met'
                        ? 'bg-primary/20 text-primary border-primary/30'
                        : 'bg-white/10 text-neutral-300 border-white/20'
                    }`}
                  >
                    {status === 'met' ? 'Achieved' : 'In Progress'}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{goal.description || goal.statement}</p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                    <span>Task completion</span>
                    <span className="font-bold text-white">{percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        status === 'met' ? 'bg-primary' : 'bg-primary/70'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <span className="text-neutral-500 font-mono text-[10px]">
                    Passing Mark: {Math.round((goal.threshold ?? goal.mastery_threshold ?? 0.8) * 100)}%
                  </span>
                  <Link
                    href={`/lesson/${lessonId}`}
                    onClick={() => playButtonTap()}
                    className="text-primary hover:underline font-bold inline-flex items-center gap-1 text-xs"
                  >
                    <span>Practice Lesson</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capstone Challenge Section (Stitch Amber Accent) */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-white/[0.04] p-5 space-y-3 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Award className="h-4 w-4" />
            <span>Module Capstone Challenge</span>
          </div>
          <GoldenAcorn size={20} />
        </div>

        <div className="relative z-10 space-y-1">
          <h2 className="text-base sm:text-lg font-bold font-display text-white">
            Full Household Financial Rebalance
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Synthesize budgeting, emergency funds, debt management, and financial planning across realistic Nigerian household shocks.
          </p>
        </div>

        <div className="relative z-10 pt-1">
          <Link
            href="/group/M2.CAP"
            onClick={() => playButtonTap()}
            className="w-full py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 hover:bg-amber-300"
          >
            <span>Launch Capstone Challenge</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

