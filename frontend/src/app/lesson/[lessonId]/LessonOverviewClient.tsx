'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchLesson, fetchModules, fetchProgress } from '../../../lib/api';
import { Lesson, ItemProgress, Module } from '../../../types/curriculum';
import LessonPlayer from '../../../components/player/LessonPlayer';
import { ArrowLeft, Loader2, Lock, ArrowRight } from 'lucide-react';

interface Props {
  lessonId: string;
}

interface RequiredLessonInfo {
  id: string;
  number: number;
  title: string;
}

export default function LessonOverviewClient({ lessonId }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialIdx, setInitialIdx] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [requiredLesson, setRequiredLesson] = useState<RequiredLessonInfo | null>(null);
  const [activeLesson, setActiveLesson] = useState<RequiredLessonInfo | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [lRes, mRes, pRes] = await Promise.all([
          fetchLesson(lessonId).catch(() => ({ lesson: null as any })),
          fetchModules().catch(() => ({ modules: [] as Module[] })),
          fetchProgress().catch(() => ({ progress: {} })),
        ]);

        const l = lRes.lesson;
        setLesson(l);

        const progressMap: Record<string, ItemProgress> = pRes.progress || {};
        const modules: Module[] = mRes.modules || [];

        // Flatten all lessons across Module 1 and Module 2 in canonical order
        const allLessons: Array<{ id: string; number: number; title: string }> = [];
        modules.forEach((mod) => {
          (mod.submodules || []).forEach((sm) => {
            (sm.chapters || []).forEach((ch) => {
              (ch.lessons || []).forEach((ls) => {
                allLessons.push({
                  id: ls.id,
                  number: ls.number,
                  title: ls.title,
                });
              });
            });
          });
        });

        // Determine sequential gating
        const currentIdx = allLessons.findIndex((item) => item.id === lessonId);
        const isPreviewUnlocked =
          typeof window !== 'undefined' &&
          sessionStorage.getItem('learn_finance_preview_unlocked') === 'true';

        if (currentIdx > 0 && !isPreviewUnlocked) {
          const prevLesson = allLessons[currentIdx - 1];
          const isPrevDone =
            progressMap[`lesson_${prevLesson.id}`]?.state === 'completed' ||
            progressMap[prevLesson.id]?.state === 'completed';

          if (!isPrevDone) {
            setIsLocked(true);
            setRequiredLesson(prevLesson);

            // Find current active lesson (first incomplete unlocked)
            let foundActive: RequiredLessonInfo = allLessons[0];
            for (let i = 0; i < allLessons.length; i++) {
              const checkId = allLessons[i].id;
              const isDone =
                progressMap[`lesson_${checkId}`]?.state === 'completed' ||
                progressMap[checkId]?.state === 'completed';
              if (!isDone) {
                foundActive = allLessons[i];
                break;
              }
            }
            setActiveLesson(foundActive);
          }
        }

        // Resume at first incomplete item if unlocked
        if (l && l.items) {
          const firstIncomplete = l.items.findIndex(
            (it: any) => progressMap[it.id]?.state !== 'completed'
          );
          if (firstIncomplete > 0) {
            setInitialIdx(firstIncomplete);
          }
        }
      } catch (err) {
        console.error('Failed to load lesson:', err);
      } finally {
        setLoading(false);
      }
    }
    if (lessonId) loadData();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <span className="text-sm">Setting up interactive lesson...</span>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-2xl border border-zinc-800 bg-zinc-900 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Lesson not found</h2>
        <p className="text-sm text-zinc-400">
          The requested lesson could not be loaded.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Learning Road
        </Link>
      </div>
    );
  }

  // Sequential lock gate enforcement
  if (isLocked && requiredLesson) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
          <Lock className="h-7 w-7" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
            Prerequisite Required
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Lesson {lesson.number} is Locked
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
            To build compounding financial knowledge, complete{' '}
            <strong className="text-white">
              Lesson {requiredLesson.number}: {requiredLesson.title}
            </strong>{' '}
            first.
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          {activeLesson && (
            <Link
              href={`/lesson/${activeLesson.id}`}
              className="w-full h-12 px-4 rounded-xl bg-primary text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all active:scale-95"
            >
              <span>Go to Lesson {activeLesson.number}: {activeLesson.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <Link
            href="/"
            className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/[0.06] text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Learning Road</span>
          </Link>
        </div>
      </div>
    );
  }

  return <LessonPlayer lesson={lesson} initialIdx={initialIdx} />;
}

