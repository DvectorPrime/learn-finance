'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchGroup, fetchProgress } from '../../../lib/api';
import { Group, ItemProgress } from '../../../types/curriculum';
import GroupPlayer from '../../../components/player/GroupPlayer';
import { ArrowLeft, Lock } from 'lucide-react';

interface Props {
  groupId: string;
}

export default function GroupRunnerClient({ groupId }: Props) {
  const [group, setGroup] = useState<Group | null>(null);
  const [lessonId, setLessonId] = useState<string>('L01');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        // Handle special capstone group if needed
        if (groupId === 'M2.CAP') {
          const pRes = await fetchProgress().catch(() => ({ progress: {} as Record<string, ItemProgress> }));
          const progressMap: Record<string, ItemProgress> = pRes.progress || {};
          const isL21Done =
            progressMap['lesson_L21']?.state === 'completed' ||
            progressMap['L21']?.state === 'completed';

          if (!isL21Done) {
            setIsLocked(true);
            setLoading(false);
            return;
          }

          setGroup({
            id: 'M2.CAP',
            title: 'Module 2 Capstone: Comprehensive Financial Assessment',
            objective: 'Synthesize budgeting, emergency funds, debt management, and financial planning.',
            items: [
              {
                id: 'M2.CAP.I01',
                kind: 'capstone',
                title: 'The Full Household Financial Rebalance',
                subtitle: 'Analyze the household scenario and craft a resilient financial plan.',
                task: 'A family with combined monthly income of ₦180,000 experiences a ₦40,000 healthcare shock. Review their essential expenses (₦110,000), debt obligations (₦30,000), and savings. Formulate a 3-month remediation plan that balances recovery without taking predatory high-interest loans.',
                rubric: [
                  {
                    criterion: 'Cash Flow Protection',
                    description: 'Accurately protects essential nutrition and housing while identifying flexible discretionary adjustments.',
                    max_score: 3,
                  },
                  {
                    criterion: 'Debt Avoidance',
                    description: 'Avoids panic borrowing and evaluates realistic payment delays or emergency reserve deployment.',
                    max_score: 3,
                  },
                  {
                    criterion: 'Replenishment Strategy',
                    description: 'Outlines a sustainable 3-month habit to restore the emergency buffer once the shock passes.',
                    max_score: 3,
                  },
                ],
                concepts: ['net_worth', 'cash_flow', 'emergency_fund', 'liability'],
              },
            ],
          });
          setLessonId('L21');
        } else {
          const res = await fetchGroup(groupId);
          setGroup(res.group);
          setLessonId(res.group.lesson?.id || 'L01');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load group');
      } finally {
        setLoading(false);
      }
    }
    if (groupId) loadData();
  }, [groupId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-zinc-400 text-sm">
        Loading interactive group player...
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-3xl border border-zinc-800 bg-zinc-900 text-center space-y-6 shadow-sm">
        <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
          <Lock className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
            Capstone Challenge Locked
          </span>
          <h2 className="text-2xl font-black text-white">
            Integrated Capstone
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The Capstone challenge is locked until you complete all 21 lessons across Module 1 and Module 2.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Learning Road
        </Link>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl border border-zinc-800 bg-zinc-900 text-center space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-rose-400">Error Loading Group</h2>
        <p className="text-xs text-zinc-400">{error || 'Group not found'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Curriculum
        </Link>
      </div>
    );
  }

  return (
    <div className="py-2">
      <GroupPlayer group={group} lessonId={lessonId} />
    </div>
  );
}
