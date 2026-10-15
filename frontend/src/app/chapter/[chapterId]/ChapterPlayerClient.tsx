'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchChapter, fetchProgress } from '../../../lib/api';
import { ChapterDetail, ItemProgress } from '../../../types/curriculum';
import ChapterPlayer from '../../../components/player/ChapterPlayer';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Props {
  chapterId: string;
}

export default function ChapterPlayerClient({ chapterId }: Props) {
  const [chapter, setChapter] = useState<ChapterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialIdx, setInitialIdx] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [chRes, pRes] = await Promise.all([
          fetchChapter(chapterId),
          fetchProgress().catch(() => ({ progress: {} })),
        ]);
        const ch = chRes.chapter;
        setChapter(ch);

        // Find first incomplete card
        const progressMap: Record<string, ItemProgress> = pRes.progress || {};
        if (ch && ch.items) {
          const firstIncomplete = ch.items.findIndex(
            (it) => progressMap[it.id]?.state !== 'completed'
          );
          if (firstIncomplete > 0) {
            setInitialIdx(firstIncomplete);
          }
        }
      } catch (err) {
        console.error('Failed to load chapter:', err);
      } finally {
        setLoading(false);
      }
    }

    if (chapterId) loadData();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <span className="text-sm">Setting up chapter interaction...</span>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-2xl border border-zinc-800 bg-zinc-900 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Chapter not found</h2>
        <p className="text-sm text-zinc-400">
          The chapter you requested could not be located in the curriculum.
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

  return <ChapterPlayer chapter={chapter} initialIdx={initialIdx} />;
}
