'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchModules, fetchProgress, fetchDashboard, claimDailyQuest, DashboardData } from '../lib/api';
import { Module, ItemProgress } from '../types/curriculum';
import { useAuth } from '../context/AuthContext';
import { soundFx, playChipChirp, playAcornCollect, playSuccessChime } from '../lib/sound';
import OphelosMascot from '../components/mascot/OphelosMascot';
import GoldenAcorn from '../components/mascot/GoldenAcorn';
import LearningRoad from '../components/roadmap/LearningRoad';
import WelcomeGate from '../components/auth/WelcomeGate';
import {
  Flame,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  ChevronRight,
  Compass,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Trophy,
} from 'lucide-react';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, ItemProgress>>({});
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState<boolean>(false);
  const [guestPreview, setGuestPreview] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [claimingQuestId, setClaimingQuestId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isGuest = sessionStorage.getItem('learn_finance_guest_preview') === 'true';
      setGuestPreview(isGuest);
      setAuthChecking(false);
    }
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [mRes, pRes, dRes] = await Promise.all([
        fetchModules(),
        fetchProgress().catch(() => ({ progress: {} })),
        user ? fetchDashboard().catch(() => null) : Promise.resolve(null),
      ]);
      setModules(mRes.modules || []);
      setProgressMap(pRes.progress || {});
      setDashboardData(dRes);
    } catch (err) {
      console.error('Failed to load home data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user && !guestPreview) {
      setLoading(false);
      return;
    }
    loadAllData();
  }, [user, guestPreview]);

  const handleClaimQuest = async (questId: string) => {
    soundFx.playTap();
    try {
      setClaimingQuestId(questId);
      const res = await claimDailyQuest(questId);
      playAcornCollect();
      playSuccessChime();
      // Refresh dashboard payload
      if (dashboardData) {
        setDashboardData({
          ...dashboardData,
          profile: {
            ...dashboardData.profile,
            acornBalance: res.profile.acornBalance,
            totalXpEarned: res.profile.totalXpEarned,
          },
          dailyQuests: dashboardData.dailyQuests.map((q) =>
            q.id === questId ? { ...q, isClaimed: true } : q
          ),
        });
      }
    } catch (err) {
      console.error('Failed to claim quest:', err);
    } finally {
      setClaimingQuestId(null);
    }
  };

  // Initial auth storage detection
  if (authChecking || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400 text-sm">
        <div className="h-9 w-9 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <span className="font-body text-xs">Checking session...</span>
      </div>
    );
  }

  // If user is not logged in and hasn't chosen to explore as guest, show the Welcome / Auth Gate
  if (!user && !guestPreview) {
    return <WelcomeGate onContinueAsGuest={() => setGuestPreview(true)} />;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400 text-sm">
        <div className="h-9 w-9 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <span className="font-body text-xs">Loading Acornlearn AI journey...</span>
      </div>
    );
  }

  // Real Lesson Completion calculation
  const completedLessonIds = new Set<string>();
  for (const [key, prog] of Object.entries(progressMap)) {
    if (prog.state === 'completed') {
      if (key.startsWith('lesson_')) {
        completedLessonIds.add(key.replace('lesson_', ''));
      } else if (/^L\d+$/.test(key)) {
        completedLessonIds.add(key);
      }
    }
  }
  const completedLessonsCount = completedLessonIds.size;

  // Real dynamic user stats from backend DB (fallback to client calc for guest)
  const acornBalance = dashboardData?.profile.acornBalance ?? (completedLessonsCount + Math.floor(Object.keys(progressMap).length / 3));
  const userXP = dashboardData?.profile.totalXpEarned ?? (Object.keys(progressMap).length * 25 + completedLessonsCount * 50);
  const streakDays = dashboardData?.profile.currentStreakDays ?? (completedLessonsCount > 0 ? 1 : 0);
  const streakShields = dashboardData?.profile.streakShieldsCount ?? 2;

  const module1 = modules.find((m) => m.id === 'M1' || m.number === 1) || modules[0];
  const module2 = modules.find((m) => m.id === 'M2' || m.number === 2) || modules[1];

  // Module 1 dynamic completion rate
  let module1TotalLessons = 0;
  let module1CompletedLessons = 0;
  if (module1) {
    for (const sm of module1.submodules || []) {
      for (const ch of sm.chapters || []) {
        for (const l of ch.lessons || []) {
          module1TotalLessons++;
          if (completedLessonIds.has(l.id)) {
            module1CompletedLessons++;
          }
        }
      }
    }
  }
  const module1Pct = module1TotalLessons > 0 ? Math.round((module1CompletedLessons / module1TotalLessons) * 100) : 0;

  // Find next active lesson
  let nextLessonId = 'L01';
  let nextLessonTitle = 'What Money Actually Does';
  let nextLessonNumber = 1;

  if (module1) {
    let found = false;
    for (const sm of module1.submodules || []) {
      for (const ch of sm.chapters || []) {
        for (const l of ch.lessons || []) {
          const isDone = completedLessonIds.has(l.id);
          if (!isDone) {
            nextLessonId = l.id;
            nextLessonTitle = l.title;
            nextLessonNumber = l.number;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }

  const isNextLessonStarted =
    progressMap[`lesson_${nextLessonId}`]?.state === 'in_progress' ||
    progressMap[nextLessonId]?.state === 'in_progress' ||
    Object.keys(progressMap).some((k) => k.startsWith(nextLessonId));

  const itemsInNextLessonCompleted = Object.entries(progressMap).filter(
    ([k, v]) => k.startsWith(nextLessonId) && v.state === 'completed'
  ).length;

  const heroCtaText = completedLessonsCount === 0 && !isNextLessonStarted
    ? 'Start lesson'
    : isNextLessonStarted
    ? 'Resume lesson'
    : 'Continue lesson';

  const userDisplayName = user?.displayName ? user.displayName.split(' ')[0] : 'Learner';

  const ophelosSpeech = user
    ? dashboardData?.activeGoal?.isBehindSchedule
      ? `Notice how unexpected costs add up? Setting aside ₦${dashboardData.activeGoal.monthlyContribution?.toLocaleString()} preserves your target.`
      : completedLessonsCount === 0
      ? `Welcome, ${userDisplayName}! Tap 'Start lesson' below to begin your corporate finance journey and stash your first acorns.`
      : `Welcome back, ${userDisplayName}! You are compounding well. Ready for today's money intelligence session?`
    : 'Welcome to Acornlearn AI! Explore the roadmap or set your first goal in AcornInventory.';

  return (
    <div className="space-y-4 animate-in fade-in duration-300 pb-20">
      {/* 1. Top Micro Bar: Acorn Balance, League Snapshot & XP */}
      <section className="flex items-center justify-between pt-1">
        {/* League Rank Snapshot Pill */}
        {dashboardData?.league ? (
          <Link
            href="/league"
            onClick={() => soundFx.playTap()}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18261E] border border-emerald-500/30 text-xs text-emerald-400 hover:border-emerald-500 transition-colors"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="font-headline font-bold text-[11px]">
              Rank {dashboardData.league.rank} • {dashboardData.league.endsIn}
            </span>
          </Link>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-headline font-bold text-[11px] text-zinc-300">Daily Quest Live</span>
          </div>
        )}

        {/* Currency & XP Counters */}
        <div className="flex items-center gap-1.5">
          {/* Golden Acorn Coins */}
          <Link
            href="/goals"
            onClick={() => soundFx.playTap()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-colors"
            title="View AcornInventory"
          >
            <GoldenAcorn size={15} withTrendline={true} />
            <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
              {acornBalance.toLocaleString()}
            </span>
          </Link>

          {/* XP Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
            <Sparkles className="h-3 w-3" />
            <span className="text-xs font-bold tabular-nums">
              {userXP} XP
            </span>
          </div>
        </div>
      </section>



      {/* 3. Greeting */}
      <section className="space-y-0.5">
        <h1 className="font-headline font-extrabold text-xl sm:text-2xl text-white tracking-tight">
          {user ? `Good morning, ${userDisplayName}.` : 'Welcome, Learner.'}
        </h1>
        <p className="font-body text-xs text-zinc-400">
          {completedLessonsCount === 0
            ? 'Your financial intelligence path starts with Lesson 1.'
            : "Ready for today's financial intelligence session?"}
        </p>
      </section>

      {/* 4. Ophelos the Mascot & Speech Bubble */}
      <section>
        <OphelosMascot
          mood="happy"
          tag="Ophelos • AI Mentor"
          speech={ophelosSpeech}
        />
      </section>

      {/* 5. Module Switcher Card */}
      <section className="w-full">
        <div className="rounded-2xl glass-panel p-3.5 sm:p-4 shadow-sm space-y-3">
          <div
            onClick={() => {
              soundFx.playTap();
              setModuleDropdownOpen(!moduleDropdownOpen);
            }}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
              {/* Radial Progress Ring */}
              <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="3.5"
                    strokeDasharray="113.1"
                    strokeDashoffset={113.1 - (113.1 * (module1Pct / 100))}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-bold text-emerald-400 tabular-nums">
                  {module1Pct}%
                </span>
              </div>

              {/* Module Details */}
              <div className="flex flex-col min-w-0">
                <span className="font-headline text-[10px] uppercase font-bold text-emerald-400 tracking-wider truncate">
                  Module 1 • Active Track
                </span>
                <h2 className="font-headline text-sm font-bold text-white truncate leading-tight">
                  {module1 ? module1.title : 'Know Your Money'}
                </h2>
                <span className="font-body text-[11px] text-zinc-400 truncate">
                  Tap to view curriculum ({modules.length} active)
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-white transition-colors">
              {moduleDropdownOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>

          {moduleDropdownOpen && (
            <div className="pt-2 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide block">
                    Module 1 • Active
                  </span>
                  <span className="text-xs font-bold text-white">
                    {module1?.title || 'Know Your Money'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  {module1Pct === 100 ? 'Completed' : module1Pct > 0 ? 'In Progress' : 'Start'}
                </span>
              </div>

              {module2 && (
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between opacity-80">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">
                      Module 2 • Next Track
                    </span>
                    <span className="text-xs font-bold text-zinc-300">
                      {module2.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. Four Compact Metric Tiles (2x2 Grid) */}
      <section className="w-full grid grid-cols-2 gap-2.5">
        {/* Tile 1: Daily Streak with Battery Shields */}
        <div className="flex flex-col justify-between p-3.5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between">
            <div className={`w-7 h-7 rounded-lg ${streakDays > 0 ? 'bg-orange-500/15 text-orange-400' : 'bg-white/[0.06] text-zinc-500'} flex items-center justify-center`}>
              <Flame className={`h-4 w-4 ${streakDays > 0 ? 'fill-orange-400' : ''}`} />
            </div>
            {/* Battery Shields Indicator */}
            <div className="flex items-center gap-1" title={`${streakShields} streak shield charges available`}>
              <span className={`w-2 h-3 rounded-sm ${streakShields >= 1 ? 'bg-[#FF7A1A]' : 'bg-zinc-800'}`} />
              <span className={`w-2 h-3 rounded-sm ${streakShields >= 2 ? 'bg-[#FF7A1A]' : 'bg-zinc-800'}`} />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="font-headline font-bold text-base text-white tabular-nums block">
              {streakDays} {streakDays === 1 ? 'day' : 'days'}
            </span>
            <span className="font-body text-[10px] text-zinc-400">
              {streakDays > 0 ? `${streakDays}d streak active` : 'Start your streak'}
            </span>
          </div>
        </div>

        {/* Tile 2: Active Goal Card */}
        <Link
          href={dashboardData?.activeGoal ? `/goals/${dashboardData.activeGoal.id}` : '/goals/new'}
          onClick={() => soundFx.playTap()}
          className="flex flex-col justify-between p-3.5 rounded-2xl glass-panel hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Target className="h-4 w-4" />
            </div>
            <span className="font-headline text-[10px] text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
              {dashboardData?.activeGoal ? `${dashboardData.activeGoal.progressPercent}%` : '+ Set Goal'}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="font-headline font-bold text-sm text-white truncate block">
              {dashboardData?.activeGoal ? dashboardData.activeGoal.title : 'AcornInventory'}
            </span>
            <span className="font-body text-[10px] text-zinc-400 truncate block">
              {dashboardData?.activeGoal?.monthlyContribution
                ? `₦${dashboardData.activeGoal.monthlyContribution.toLocaleString()}/mo pace`
                : 'Track savings & learning'}
            </span>
          </div>
        </Link>

        {/* Tile 3: Weekly League Position */}
        <Link
          href="/league"
          onClick={() => soundFx.playTap()}
          className="flex flex-col justify-between p-3.5 rounded-2xl glass-panel hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
              <Trophy className="h-4 w-4" />
            </div>
            <span className="font-headline text-[10px] text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded-full font-bold">
              {dashboardData?.league ? `${dashboardData.league.rankDelta}` : 'Sapling'}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="font-headline font-bold text-base text-white tabular-nums block">
              {dashboardData?.league ? `#${dashboardData.league.rank} in League` : 'Weekly League'}
            </span>
            <span className="font-body text-[10px] text-zinc-400 truncate block">
              {dashboardData?.league ? `Ends in ${dashboardData.league.endsIn}` : 'Division II'}
            </span>
          </div>
        </Link>

        {/* Tile 4: Skills Verified */}
        <Link
          href="/mastery"
          onClick={() => soundFx.playTap()}
          className="flex flex-col justify-between p-3.5 rounded-2xl glass-panel hover:bg-white/[0.08] active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <div className="mt-2.5">
            <span className="font-headline font-bold text-base text-white tabular-nums block">
              {completedLessonsCount * 2} skills
            </span>
            <span className="font-body text-[10px] text-zinc-400 truncate block">
              {completedLessonsCount === 0 ? 'Start Lesson 1' : 'Money & Liquidity'}
            </span>
          </div>
        </Link>
      </section>

      {/* 7. Daily Quests Interactive Section */}
      {dashboardData?.dailyQuests && dashboardData.dailyQuests.length > 0 && (
        <section className="p-4 rounded-2xl glass-panel space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <h3 className="font-headline font-bold text-sm text-white">Daily Quests</h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Resets midnight</span>
          </div>

          <div className="space-y-2">
            {dashboardData.dailyQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white truncate">{quest.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
                    <span className="text-emerald-400 font-mono">+{quest.rewardXp} XP</span>
                    <span>•</span>
                    <span className="text-amber-400 font-mono">+{quest.rewardAcorns} Acorns</span>
                  </div>
                </div>

                {quest.isClaimed ? (
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-500 font-semibold text-[11px]">
                    Claimed
                  </span>
                ) : quest.isCompleted ? (
                  <button
                    type="button"
                    disabled={claimingQuestId === quest.id}
                    onClick={() => handleClaimQuest(quest.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#22C55E] text-[#0A0A0A] font-bold text-[11px] hover:bg-[#16A34A] transition-colors"
                  >
                    {claimingQuestId === quest.id ? 'Claiming...' : 'Claim'}
                  </button>
                ) : (
                  <span className="font-mono text-xs text-zinc-400 font-semibold">
                    {quest.currentCount} / {quest.targetCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. "Continue Learning" Hero Card */}
      <section className="w-full">
        <div className="relative flex flex-col p-4 rounded-2xl glass-panel overflow-hidden space-y-3 shadow-lg">
          <div className="absolute -right-10 -top-10 w-36 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-headline text-[10px] font-bold uppercase tracking-wider">
              Current Track • Lesson {nextLessonNumber}
            </span>
            <div className="flex items-center gap-1 text-zinc-400 text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-body text-[11px]">~6 min</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <h3 className="font-headline font-bold text-base text-white tracking-tight">
              {nextLessonTitle}
            </h3>
            <p className="font-body text-xs text-zinc-400">
              Foundations of cash flow, liquidity &amp; smart spending in Nigeria
            </p>
          </div>

          {/* Segmented Progress Bar (8 segments) */}
          <div className="flex items-center gap-1.5 w-full py-0.5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < itemsInNextLessonCompleted
                    ? 'bg-emerald-500'
                    : i === itemsInNextLessonCompleted && isNextLessonStarted
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          {/* Reward Teaser Row */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-xs">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span className="font-body text-[11px] font-semibold text-zinc-200">+50 XP</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-xs">
              <GoldenAcorn size={13} withTrendline={true} />
              <span className="font-body text-[11px] font-semibold text-zinc-200">1 Acorn coin</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <Link
            href={`/lesson/${nextLessonId}`}
            onClick={() => soundFx.playSuccess()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] transition-all text-black font-headline font-extrabold text-sm shadow-md cursor-pointer"
          >
            <span>{heroCtaText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 9. Concept of the Day Banner */}
      <section className="w-full">
        <Link
          href="/glossary"
          onClick={() => soundFx.playTap()}
          className="flex items-center justify-between p-3.5 rounded-2xl glass-panel hover:bg-white/[0.08] active:scale-[0.99] transition-all group"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Concept of the day
              </span>
              <p className="font-body text-xs text-zinc-200 font-medium line-clamp-1 mt-0.5">
                Operating cash flow vs EBITDA: why cash in hand matters
              </p>
              <span className="font-body text-[10px] text-zinc-400 mt-0.5">
                Quick read (2 min) • Daily bonus eligible
              </span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white shrink-0 ml-2 transition-colors" />
        </Link>
      </section>

      {/* 10. Full Sequential Learning Road */}
      <section className="pt-2">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Compass className="h-4 w-4 text-emerald-400" />
          <h2 className="font-headline font-bold text-sm text-white tracking-tight">
            Learning Road Journey
          </h2>
        </div>
        <LearningRoad modules={modules} progressMap={progressMap} />
      </section>
    </div>
  );
}
