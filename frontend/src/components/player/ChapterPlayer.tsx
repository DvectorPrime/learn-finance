'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChapterDetail, CurriculumItem } from '../../types/curriculum';
import SlideCard from './SlideCard';
import CaseStudyPlayer from './CaseStudyPlayer';
import QuizPlayer from './QuizPlayer';
import ChallengePlayer from './ChallengePlayer';
import OutlinePlaceholder from './OutlinePlaceholder';
import InteractionRenderer from '../interactions/InteractionRenderer';
import ChipMascot from '../mascot/ChipMascot';
import GoldenAcorn from '../mascot/GoldenAcorn';
import { playButtonTap, playSuccessChime, playAcornCollect, toggleSound, isSoundMuted } from '../../lib/sound';
import { saveItemProgress, submitAssessment } from '../../lib/api';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Award,
  CheckCircle2,
  Flame,
  ArrowRight,
  Volume2,
  VolumeX,
  Timer,
  Shield,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChapterPlayerProps {
  chapter: ChapterDetail;
  initialIdx?: number;
  onChapterComplete?: () => void;
}

export default function ChapterPlayer({
  chapter,
  initialIdx = 0,
  onChapterComplete,
}: ChapterPlayerProps) {
  const router = useRouter();
  const items = chapter.items || [];
  const [currentIdx, setCurrentIdx] = useState(
    Math.min(initialIdx, Math.max(0, items.length - 1))
  );
  const [completedItemIds, setCompletedItemIds] = useState<Set<string>>(new Set());
  const [chapterFinished, setChapterFinished] = useState(false);
  const [showLessonSelector, setShowLessonSelector] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(30);

  useEffect(() => {
    setSoundMuted(isSoundMuted());
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const muted = toggleSound();
    setSoundMuted(muted);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-center space-y-4 shadow-xl">
        <h2 className="text-xl font-bold font-display text-white">Chapter {chapter.number}: {chapter.title}</h2>
        <p className="text-sm text-neutral-400">
          This chapter is currently in preparation. Check back soon!
        </p>
        <Link
          href="/"
          onClick={() => playButtonTap()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs transition-all shadow-md active:scale-95 hover:brightness-105"
        >
          Return to Learning Road
        </Link>
      </div>
    );
  }

  const currentItem = items[currentIdx];

  // Group lessons with their start indices for quick jumps
  const lessonMarkers: Array<{ id: string; number: number; title: string; startIndex: number }> = [];
  const seenLessons = new Set<string>();
  items.forEach((it, idx) => {
    const lId = it.lessonId || `L${it.lessonNumber || 1}`;
    if (!seenLessons.has(lId)) {
      seenLessons.add(lId);
      lessonMarkers.push({
        id: lId,
        number: it.lessonNumber || 1,
        title: it.lessonTitle || `Lesson ${it.lessonNumber || 1}`,
        startIndex: idx,
      });
    }
  });

  const handleItemComplete = async (resultPayload?: any) => {
    if (!currentItem) return;
    setCompletedItemIds((prev) => new Set([...prev, currentItem.id]));

    try {
      await saveItemProgress(currentItem.id, 'completed', 30);

      if (
        (currentItem.kind === 'quiz' || currentItem.kind === 'challenge') &&
        resultPayload?.answers
      ) {
        let responses = [];
        if (currentItem.kind === 'quiz') {
          responses = Object.entries(resultPayload.answers).map(([qIdx, ans]) => ({
            questionId:
              (currentItem as any).questions?.[Number(qIdx)]?.id ||
              `${currentItem.id}.Q${qIdx}`,
            answer: ans,
          }));
        } else {
          responses = [
            {
              questionId: currentItem.id,
              answer: resultPayload.answers.fieldAnswers,
              rubricScores: resultPayload.answers.rubricScores,
            },
          ];
        }
        await submitAssessment(currentItem.id, responses, 60);
      }
    } catch (err) {
      console.warn('Failed to persist chapter item progress:', err);
    }

    if (currentIdx < items.length - 1) {
      playButtonTap();
      setCurrentIdx((prev) => prev + 1);
    } else {
      setChapterFinished(true);
      playAcornCollect();
      playSuccessChime();
      try {
        await saveItemProgress(`chapter_${chapter.id}`, 'completed', 60);
      } catch (err) {
        console.warn('Failed to save chapter completion milestone:', err);
      }
      try {
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 } });
      } catch {}
      onChapterComplete?.();
    }
  };

  const renderCurrentItem = () => {
    if (!currentItem) return null;

    switch (currentItem.kind) {
      case 'slide':
        return <SlideCard item={currentItem} onComplete={() => handleItemComplete()} />;

      case 'case_study':
        return (
          <CaseStudyPlayer
            item={currentItem}
            onComplete={(answers) => handleItemComplete({ answers })}
          />
        );

      case 'widget':
        return (
          <InteractionRenderer
            widgetType={currentItem.widget_type}
            config={currentItem.config}
            onComplete={(res) => handleItemComplete(res)}
          />
        );

      case 'quiz':
        return (
          <QuizPlayer
            item={currentItem}
            onComplete={(res) => handleItemComplete(res)}
          />
        );

      case 'challenge':
      case 'capstone':
        return (
          <ChallengePlayer
            item={currentItem}
            onComplete={(res) => handleItemComplete(res)}
          />
        );

      case 'slide_set':
        return (
          <OutlinePlaceholder
            title={currentItem.title}
            subtitle={currentItem.subtitle}
            topics={currentItem.topics}
            onComplete={() => handleItemComplete()}
          />
        );

      default:
        return (
          <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 text-center space-y-3 shadow-sm">
            <p className="text-sm text-neutral-300">Activity completed.</p>
            <button
              onClick={() => handleItemComplete()}
              className="px-6 py-2 bg-primary text-black rounded-xl text-xs font-bold shadow-md hover:brightness-105"
            >
              Next Activity
            </button>
          </div>
        );
    }
  };

  // Chapter Celebration (Stitch Frame 08)
  if (chapterFinished) {
    return (
      <div className="relative flex flex-col items-center w-full px-2 py-4 pb-12 overflow-hidden select-none animate-in fade-in duration-300">
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-2 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-sm mb-4 animate-bounce">
          <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            Chapter Complete • 100% Accuracy
          </span>
        </div>

        <div className="relative my-2 flex items-center justify-center">
          <div className="relative">
            <ChipMascot state="cheer" size="lg" />
            <div className="absolute -top-2 -right-3 animate-bounce">
              <GoldenAcorn size={28} />
            </div>
          </div>
        </div>

        <div className="mt-3 text-center px-2">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Evaluation Success
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            You finished all {items.length} cards across this chapter. Your financial knowledge is leveling up!
          </p>
        </div>

        {/* Reward Cards */}
        <div className="mt-5 grid grid-cols-1 gap-3 w-full">
          <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl p-4 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.08] shadow-inner shrink-0 border border-white/10">
                  <GoldenAcorn size={28} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold">
                    Chapter treasury bonus
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight font-display">
                    Golden acorns
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0 pl-2">
                <span className="text-xl font-bold text-amber-400 font-mono">+50</span>
                <span className="text-[11px] text-neutral-400 font-medium">Vaulted</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl p-4 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" fill="none" r="18" stroke="#262626" strokeWidth="3.5" />
                    <circle
                      cx="22"
                      cy="22"
                      fill="none"
                      r="18"
                      stroke="#22C55E"
                      strokeDasharray="113.1"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-primary font-bold">{chapter.number}</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white truncate font-display">
                    Chapter {chapter.number} Mastered
                  </span>
                  <div className="mt-0.5 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-xs text-primary truncate font-medium">
                      {chapter.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.08] shrink-0 text-primary">
                <Award className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full space-y-2">
          <Link
            href="/"
            onClick={() => playButtonTap()}
            className="w-full h-12 rounded-xl bg-primary text-black font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] hover:brightness-105 transition-all text-center"
          >
            <span>Continue on Road</span>
            <ArrowRight className="h-4 w-4 stroke-[3]" />
          </Link>
          <button
            type="button"
            onClick={() => {
              playButtonTap();
              setChapterFinished(false);
              setCurrentIdx(0);
            }}
            className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer text-center font-medium"
          >
            Review Chapter from Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Top Bar (Stitch Frame 07) */}
      <div className="flex flex-col gap-2 pt-1 pb-2">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => playButtonTap()}
            aria-label="Exit to Learning Road"
            className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label="Toggle Sound"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs text-neutral-300 transition-colors cursor-pointer"
            >
              {soundMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="text-[11px] text-neutral-400">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] text-white font-medium">Sound on</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
              <Timer className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold">{formatTimer(elapsedSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div
          className="grid gap-1.5 w-full pt-1"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((it, idx) => {
            const isActive = idx === currentIdx;
            const isCompleted = idx < currentIdx || completedItemIds.has(it.id);

            return (
              <div
                key={it.id || idx}
                className={`h-2 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive
                    ? 'bg-primary shadow-[0_0_8px_rgba(75,226,119,0.5)]'
                    : isCompleted
                    ? 'bg-primary/70'
                    : 'bg-white/[0.08]'
                }`}
              />
            );
          })}
        </div>

        {/* Chapter Breadcrumbs */}
        <div className="flex items-center justify-between text-xs px-0.5 text-neutral-400 pt-0.5 font-medium">
          <span className="text-[11px] font-bold text-white truncate max-w-[260px]">
            Chapter {chapter.number}: {chapter.title}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            {currentIdx + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Main Stage */}
      <main className="min-h-[360px]">{renderCurrentItem()}</main>

      {/* Footer Nav */}
      <footer className="pt-2 flex items-center justify-between gap-2 text-xs text-neutral-400 px-1">
        <button
          type="button"
          disabled={currentIdx === 0}
          onClick={() => {
            playButtonTap();
            setCurrentIdx((prev) => Math.max(0, prev - 1));
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all font-semibold text-xs active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <span className="text-[11px] text-neutral-400 font-medium">
          Step {currentIdx + 1} of {items.length}
        </span>

        <button
          type="button"
          disabled={currentIdx === items.length - 1}
          onClick={() => {
            playButtonTap();
            setCurrentIdx((prev) => Math.min(items.length - 1, prev + 1));
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all font-semibold text-xs active:scale-95 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
