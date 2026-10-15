'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Module, ItemProgress, DifficultyLevel, AuthoringStatus } from '../../types/curriculum';
import { useAuth } from '../../context/AuthContext';
import { resetAllData } from '../../lib/api';
import { soundFx } from '../../lib/sound';
import GoldenAcorn from '../mascot/GoldenAcorn';
import {
  Check,
  Play,
  Lock,
  Sparkles,
  ArrowRight,
  X,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Clock,
} from 'lucide-react';

interface LearningRoadProps {
  modules: Module[];
  progressMap: Record<string, ItemProgress>;
}

export interface LessonStop {
  id: string;
  number: number;
  title: string;
  difficulty: DifficultyLevel;
  authoring_status: AuthoringStatus;
  groups_count: number;
  chapterTitle: string;
  submoduleCode: string;
  submoduleTitle: string;
  moduleId: string;
  moduleNumber: number;
  globalIndex: number;
  stopNumber: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  isLocked: boolean;
  isActive: boolean;
  inProgress: boolean;
  completedActivitiesCount: number;
  requiresLesson?: { number: number; title: string };
}

export default function LearningRoad({ modules, progressMap }: LearningRoadProps) {
  const { user } = useAuth();
  const router = useRouter();

  // Selected lesson modal
  const [selectedLesson, setSelectedLesson] = useState<LessonStop | null>(null);
  const [resetting, setResetting] = useState(false);

  // Separate Module 1 and Module 2
  const module1 = modules.find((m) => m.id === 'M1' || m.number === 1) || modules[0];
  const module2 = modules.find((m) => m.id === 'M2' || m.number === 2) || modules[1];

  if (!module1) return null;

  // Flatten lessons from both modules in strict sequential order
  const rawOrderedLessons: Array<{
    id: string;
    number: number;
    title: string;
    difficulty: DifficultyLevel;
    authoring_status: AuthoringStatus;
    groups_count: number;
    chapterTitle: string;
    submoduleCode: string;
    submoduleTitle: string;
    moduleId: string;
    moduleNumber: number;
  }> = [];

  const extractLessons = (mod: Module) => {
    (mod.submodules || []).forEach((sm) => {
      (sm.chapters || []).forEach((ch) => {
        (ch.lessons || []).forEach((l) => {
          rawOrderedLessons.push({
            id: l.id,
            number: l.number,
            title: l.title,
            difficulty: l.difficulty,
            authoring_status: l.authoring_status,
            groups_count: l.groups_count,
            chapterTitle: ch.title,
            submoduleCode: sm.code,
            submoduleTitle: sm.title,
            moduleId: mod.id,
            moduleNumber: mod.number,
          });
        });
      });
    });
  };

  extractLessons(module1);
  if (module2) {
    extractLessons(module2);
  }

  // Pre-calculate completion status for all lessons
  const completionStatus: Record<string, boolean> = {};
  const completedCountMap: Record<string, number> = {};

  rawOrderedLessons.forEach((l) => {
    const hasLessonCompletedToken =
      progressMap[`lesson_${l.id}`]?.state === 'completed' ||
      progressMap[l.id]?.state === 'completed';

    let count = 0;
    Object.entries(progressMap).forEach(([itemId, prog]) => {
      if (itemId.startsWith(l.id) && itemId !== l.id && prog.state === 'completed') {
        count++;
      }
    });

    completionStatus[l.id] = Boolean(hasLessonCompletedToken);
    completedCountMap[l.id] = count;
  });

  // Calculate sequential progression across the entire road
  let firstIncompleteFound = false;
  let activeStopId: string | null = null;

  const lessonStops: LessonStop[] = rawOrderedLessons.map((l, idx) => {
    const isCompleted = completionStatus[l.id];
    const completedActivitiesCount = completedCountMap[l.id];
    const inProgress = completedActivitiesCount > 0 && !isCompleted;

    let isUnlocked = false;
    let isActive = false;
    let requiresLesson: { number: number; title: string } | undefined;

    if (idx === 0) {
      isUnlocked = true;
      if (!isCompleted) {
        isActive = true;
        firstIncompleteFound = true;
        activeStopId = l.id;
      }
    } else {
      const prevLesson = rawOrderedLessons[idx - 1];
      const prevCompleted = completionStatus[prevLesson.id];

      if (prevCompleted && l.moduleNumber !== 2) {
        isUnlocked = true;
        if (!isCompleted && !firstIncompleteFound) {
          isActive = true;
          firstIncompleteFound = true;
          activeStopId = l.id;
        }
      } else {
        isUnlocked = false;
        requiresLesson = {
          number: prevLesson.number,
          title: prevLesson.title,
        };
      }
    }

    return {
      ...l,
      globalIndex: idx,
      stopNumber: idx + 1,
      isCompleted,
      isUnlocked,
      isLocked: !isUnlocked,
      isActive,
      inProgress,
      completedActivitiesCount,
      requiresLesson,
    };
  });

  const currentActiveStop =
    lessonStops.find((s) => s.id === activeStopId) ||
    lessonStops.find((s) => s.isUnlocked && !s.isCompleted) ||
    lessonStops[0];

  const module1Stops = lessonStops.filter((s) => s.moduleNumber === 1);
  const module2Stops = lessonStops.filter((s) => s.moduleNumber === 2);

  const module1CompletedCount = module1Stops.filter((s) => s.isCompleted).length;
  const isModule1Completed = module1Stops.length > 0 && module1CompletedCount === module1Stops.length;

  const module2CompletedCount = module2Stops.filter((s) => s.isCompleted).length;
  const isModule2Unlocked = isModule1Completed;

  const totalCompleted = lessonStops.filter((s) => s.isCompleted).length;

  // Winding offset pattern for mobile Duolingo curve
  const getWindingOffset = (index: number) => {
    const pos = index % 4;
    switch (pos) {
      case 0:
        return 'translate-x-0';
      case 1:
        return 'translate-x-8 sm:translate-x-12';
      case 2:
        return 'translate-x-0';
      case 3:
        return '-translate-x-8 sm:-translate-x-12';
      default:
        return 'translate-x-0';
    }
  };

  const handleResetData = async () => {
    if (!window.confirm('Are you sure you want to start fresh? This will reset your progress to Lesson 1.')) {
      return;
    }
    setResetting(true);
    try {
      await resetAllData();
      window.location.reload();
    } catch (e) {
      console.error(e);
      setResetting(false);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* ======================================================================= */}
      {/* MODULE 1: FOUNDATIONS OF PERSONAL FINANCE                               */}
      {/* ======================================================================= */}
      <section className="space-y-8">
        {/* Module 1 Header Block */}
        <div className="rounded-2xl glass-panel p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className="inline-flex items-center gap-1 font-headline text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Module 1 • Foundations
              </span>
              <h3 className="font-headline text-base font-bold text-white tracking-tight">
                {module1.title}
              </h3>
              <p className="font-body text-[11px] text-zinc-400 leading-relaxed">
                Budgeting, money choices, and emergency buffer habits.
              </p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 shrink-0">
              {module1CompletedCount}/{module1Stops.length}
            </div>
          </div>
        </div>

        {/* Module 1 Stops */}
        <div className="relative space-y-12 pt-1">
          {/* Connecting Road Line */}
          <div className="absolute top-6 bottom-10 left-1/2 -translate-x-1/2 w-1.5 bg-white/10 rounded-full z-0" />

          {(module1.submodules || []).map((sm, smIdx) => {
            const subModuleLessons = module1Stops.filter((l) => l.submoduleCode === sm.code);
            if (subModuleLessons.length === 0) return null;

            return (
              <div key={sm.id} className="relative z-10 space-y-8">
                {/* Unit Header Pill */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-md">
                  <span className="font-headline text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Unit {smIdx + 1} • {sm.title}
                  </span>
                  <span className="font-body text-[10px] text-zinc-400 font-medium">
                    {subModuleLessons.length} {subModuleLessons.length === 1 ? 'Lesson' : 'Lessons'}
                  </span>
                </div>

                {/* Stops Stack */}
                <div className="space-y-10">
                  {subModuleLessons.map((item, idx) => {
                    const offsetClass = getWindingOffset(idx);
                    return renderLessonStopButton(item, offsetClass);
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ROAD BRIDGE CHECKPOINT: MODULE 1 -> MODULE 2                            */}
      {/* ======================================================================= */}
      <div className="relative z-10 py-2">
        {isModule1Completed ? (
          <div className="p-4 rounded-2xl glass-panel border-emerald-500/30 text-center space-y-2 shadow-sm">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto">
              <Check className="h-5 w-5 stroke-[3]" />
            </div>
            <div className="space-y-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400">
                <Sparkles className="h-3 w-3" />
                Checkpoint Cleared
              </span>
              <h3 className="font-headline text-sm font-bold text-white">
                Module 1 Completed! Road to Module 2 Unlocked
              </h3>
              <p className="font-body text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                You have mastered basic money habits. You can now cross to modern banking and cyber safety.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl glass-panel text-center space-y-2 shadow-sm">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/[0.06] border border-white/10 text-amber-400 mx-auto">
              <Lock className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] text-amber-400">
                Road Checkpoint
              </span>
              <h3 className="font-headline text-sm font-bold text-white">
                Module 2 Currently Locked
              </h3>
              <p className="font-body text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Complete all {module1Stops.length} lessons in Module 1 to cross over.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] text-amber-300 text-[10px] font-semibold">
              <span>{module1Stops.length - module1CompletedCount} lessons left to unlock</span>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================= */}
      {/* MODULE 2: BANKING & DIGITAL SERVICES                                   */}
      {/* ======================================================================= */}
      {module2 && (
        <section className={`space-y-8 transition-opacity duration-300 ${!isModule2Unlocked ? 'opacity-80' : 'opacity-100'}`}>
          {/* Module 2 Header */}
          <div className="rounded-2xl glass-panel p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 font-headline text-[10px] uppercase tracking-wider font-extrabold text-amber-400">
                  <Lock className="h-3.5 w-3.5 text-amber-400" />
                  Module 2 • Coming Soon
                </span>
                <h3 className="font-headline text-base font-bold text-white tracking-tight">
                  {module2.title}
                </h3>
                <p className="font-body text-[11px] text-zinc-400 leading-relaxed">
                  Nigerian banking, apps, avoiding predatory debt traps, and scam defense.
                </p>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/20 text-[10px] font-bold text-amber-300 shrink-0">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Module 2 Stops */}
          <div className="relative space-y-12 pt-1">
            <div className="absolute top-6 bottom-10 left-1/2 -translate-x-1/2 w-1.5 bg-white/10 rounded-full z-0" />

            {(module2.submodules || []).map((sm, smIdx) => {
              const subModuleLessons = module2Stops.filter((l) => l.submoduleCode === sm.code);
              if (subModuleLessons.length === 0) return null;

              return (
                <div key={sm.id} className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-md">
                    <span className={`font-headline text-[10px] font-bold uppercase tracking-wider ${
                      isModule2Unlocked ? 'text-emerald-400' : 'text-zinc-500'
                    }`}>
                      Unit {smIdx + 1} • {sm.title}
                    </span>
                    <span className="font-body text-[10px] text-zinc-400 font-medium">
                      {subModuleLessons.length} {subModuleLessons.length === 1 ? 'Lesson' : 'Lessons'}
                    </span>
                  </div>

                  <div className="space-y-10">
                    {subModuleLessons.map((item, idx) => {
                      const offsetClass = getWindingOffset(idx);
                      return renderLessonStopButton(item, offsetClass);
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Reset Progress Helper Option */}
      <div className="pt-4 flex justify-center">
        <button
          type="button"
          onClick={handleResetData}
          disabled={resetting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[10px] font-medium text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <RotateCcw className={`h-3 w-3 ${resetting ? 'animate-spin' : ''}`} />
          <span>Reset road progress (Test mode)</span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* LESSON DETAILS MODAL                                                    */}
      {/* ======================================================================= */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-5 space-y-4 shadow-2xl relative border border-white/15 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playTap();
                setSelectedLesson(null);
              }}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="space-y-1 pr-6">
              <span className={`font-headline text-[10px] font-bold uppercase tracking-wider ${
                selectedLesson.isLocked ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                Stop {selectedLesson.stopNumber} • Lesson {selectedLesson.number}
              </span>
              <h2 className="font-headline text-lg font-extrabold text-white leading-snug">
                {selectedLesson.title}
              </h2>
              <p className="font-body text-xs text-zinc-400">
                {selectedLesson.submoduleTitle} • {selectedLesson.chapterTitle}
              </p>
            </div>

            {/* Reward & Duration Pills */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] text-xs">
                <Clock className="h-3 w-3 text-zinc-400" />
                <span className="font-body text-[11px] text-zinc-300">~6 min</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-xs">
                <Sparkles className="h-3 w-3 text-emerald-400" />
                <span className="font-body text-[11px] font-semibold text-emerald-400">+50 XP</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-xs">
                <GoldenAcorn size={13} withTrendline={true} />
                <span className="font-body text-[11px] font-semibold text-amber-400">1 Coin</span>
              </div>
            </div>

            {/* Lock Guidance */}
            {selectedLesson.isLocked && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1 font-bold text-amber-300">
                  <Lock className="h-3.5 w-3.5" />
                  <span>{selectedLesson.moduleNumber === 2 ? 'Coming Soon' : 'Prerequisite Required'}</span>
                </div>
                {selectedLesson.moduleNumber === 2 ? (
                  <p className="text-[11px]">
                    Module 2 is currently coming soon! Complete all 15 lessons in Module 1 to master the financial foundations.
                  </p>
                ) : (
                  <p className="text-[11px]">
                    Please complete <strong>Lesson {selectedLesson.requiresLesson?.number}: {selectedLesson.requiresLesson?.title}</strong> first.
                  </p>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 space-y-2">
              {selectedLesson.isUnlocked ? (
                <Link
                  href={`/lesson/${selectedLesson.id}`}
                  onClick={() => soundFx.playSuccess()}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-extrabold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-center"
                >
                  <span>
                    {selectedLesson.isCompleted
                      ? `Review Lesson ${selectedLesson.number}`
                      : selectedLesson.inProgress
                      ? `Continue Lesson ${selectedLesson.number}`
                      : `Start Lesson ${selectedLesson.number}`}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] text-zinc-500 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed border border-white/5"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Locked</span>
                  </button>

                  <Link
                    href={`/lesson/${currentActiveStop.id}`}
                    onClick={() => {
                      soundFx.playTap();
                      setSelectedLesson(null);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1 border border-emerald-500/20 transition-colors"
                  >
                    <span>Jump to Active: Lesson {currentActiveStop.number}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Helper render for stop button
  function renderLessonStopButton(item: LessonStop, offsetClass: string) {
    const isCurrent = item.isActive;
    const isDone = item.isCompleted;
    const isLock = item.isLocked;

    return (
      <div
        key={item.id}
        className={`relative flex flex-col items-center transition-transform duration-300 ${offsetClass}`}
      >
        {/* Active Speech Bubble */}
        {isCurrent && (
          <div className="mb-2 animate-bounce">
            <div className="px-3 py-1 rounded-full bg-emerald-400 text-black font-headline text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(34,197,94,0.5)] flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>{item.inProgress ? `Continue ${item.number}` : `Start ${item.number}`}</span>
            </div>
          </div>
        )}

        {/* Round Stop Node */}
        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setSelectedLesson(item);
          }}
          aria-label={`Lesson ${item.number}: ${item.title}`}
          className={`group relative h-16 w-16 sm:h-18 sm:w-18 rounded-full flex items-center justify-center transition-all cursor-pointer select-none ${
            isDone
              ? 'bg-emerald-500 shadow-[0_4px_0_#065f46,0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-400 active:translate-y-1 active:shadow-[0_1px_0_#065f46] text-black'
              : isCurrent
              ? 'bg-emerald-400 shadow-[0_4px_0_#047857,0_0_20px_rgba(34,197,94,0.5)] hover:bg-emerald-300 ring-4 ring-emerald-400/20 active:translate-y-1 active:shadow-[0_1px_0_#047857] text-black'
              : isLock
              ? 'bg-white/[0.04] shadow-[0_4px_0_#18181b] border border-white/10 hover:bg-white/[0.08] active:translate-y-1 active:shadow-[0_1px_0_#18181b] text-zinc-500'
              : 'bg-white/[0.06] shadow-[0_4px_0_#18181b] border border-white/10 hover:bg-white/10 active:translate-y-1 active:shadow-[0_1px_0_#18181b] text-zinc-200'
          }`}
        >
          {isDone ? (
            <Check className="h-7 w-7 text-black stroke-[3]" />
          ) : isCurrent ? (
            <Play className="h-6 w-6 text-black fill-black ml-0.5" />
          ) : isLock ? (
            <div className="flex flex-col items-center">
              <Lock className="h-4 w-4 text-zinc-500" />
              <span className="text-[9px] font-mono font-bold text-zinc-500 mt-0.5">
                {item.number}
              </span>
            </div>
          ) : (
            <span className="font-headline text-base font-bold text-zinc-200">
              {item.number}
            </span>
          )}
        </button>

        {/* Stop Label Below */}
        <div className="mt-2 text-center max-w-[130px] sm:max-w-[160px]">
          <span className={`block font-headline text-[11px] font-bold transition-colors line-clamp-2 leading-tight ${
            isLock ? 'text-zinc-500' : 'text-zinc-200 group-hover:text-emerald-400'
          }`}>
            {item.title}
          </span>
          <span className="font-body text-[9px] text-zinc-500 flex items-center justify-center gap-1 mt-0.5">
            Lesson {item.number}
            {isLock && <Lock className="h-2 w-2 text-zinc-500 inline" />}
          </span>
        </div>
      </div>
    );
  }
}
