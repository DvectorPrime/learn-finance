'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  fetchGoalDetail,
  contributeToGoal,
  generateGoalBreakdown,
  toggleGoalStep,
  deleteUserGoal,
  GoalDetailItem,
} from '@/lib/api';
import OphelosMascot from '@/components/mascot/OphelosMascot';
import { soundFx, playSuccessChime, playAcornCollect } from '@/lib/sound';
import {
  ArrowLeft,
  Plus,
  Check,
  CheckCircle2,
  MoreVertical,
  X,
  Trash2,
  AlertCircle,
  GitFork,
  Calendar,
} from 'lucide-react';

function GoalDetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const goalId = params.id as string;

  const [goal, setGoal] = useState<GoalDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals & Sheets
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showBreakdownSheet, setShowBreakdownSheet] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Contribution inputs & validation
  const [depositAmount, setDepositAmount] = useState('');
  const [depositNote, setDepositNote] = useState('');
  const [depositError, setDepositError] = useState<string | null>(null);
  const [submittingDeposit, setSubmittingDeposit] = useState(false);

  const loadGoal = async () => {
    try {
      setLoading(true);
      const res = await fetchGoalDetail(goalId);
      setGoal(res.goal);
    } catch (err: any) {
      console.error('Failed to load goal:', err);
      setErrorMsg(err.message || 'Failed to load goal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (goalId) {
      loadGoal();
    }
  }, [goalId]);

  const handleDeposit = async () => {
    const amount = Number(depositAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      setDepositError('Please enter an amount greater than ₦0.');
      return;
    }
    soundFx.playTap();

    try {
      setSubmittingDeposit(true);
      setDepositError(null);
      const res = await contributeToGoal(goalId, amount, depositNote.trim() || 'Savings stash');
      setGoal(res.goal);
      setShowContributeModal(false);
      setDepositAmount('');
      setDepositNote('');
      playAcornCollect();
      playSuccessChime();
    } catch (err: any) {
      console.error('Failed to record contribution:', err);
      setDepositError(err.message || 'Failed to record contribution');
    } finally {
      setSubmittingDeposit(false);
    }
  };

  const handleToggleStep = async (stepId: string, currentStatus: boolean) => {
    soundFx.playTap();
    try {
      await toggleGoalStep(goalId, stepId, !currentStatus);
      const res = await fetchGoalDetail(goalId);
      setGoal(res.goal);
      if (!currentStatus) {
        playSuccessChime();
      }
    } catch (err: any) {
      console.error('Failed to toggle step:', err);
    }
  };

  const handleRegenerateBreakdown = async () => {
    soundFx.playTap();
    try {
      const res = await generateGoalBreakdown(goalId);
      setGoal(res.goal);
      playSuccessChime();
    } catch (err: any) {
      console.error('Failed to regenerate breakdown:', err);
    }
  };

  const handleDeleteGoal = async () => {
    soundFx.playTap();
    try {
      await deleteUserGoal(goalId);
      router.push('/goals');
    } catch (err: any) {
      alert(err.message || 'Failed to delete goal');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-zinc-400 text-sm">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span className="text-xs">Loading goal metrics...</span>
      </div>
    );
  }

  if (errorMsg || !goal) {
    return (
      <div className="py-12 px-4 text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
        <h2 className="text-base font-bold text-white">Goal Not Found</h2>
        <p className="text-xs text-zinc-400">{errorMsg || 'This goal does not exist or has been deleted.'}</p>
        <Link
          href="/goals"
          className="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
        >
          Return to AcornInventory
        </Link>
      </div>
    );
  }

  const target = goal.targetAmount || 0;
  const current = goal.currentAmount || 0;
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const isCompleted = goal.status === 'COMPLETED' || pct >= 100;

  // Circular gauge math (220px across, 14px track, radius = 95)
  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Sub-Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
          <Link
            href="/goals"
            onClick={() => soundFx.playTap()}
            className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-headline font-bold text-base text-white truncate leading-tight">
              {goal.title}
            </h1>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              {goal.type.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* 3-Dot Manage Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-2xl glass-panel bg-zinc-950/95 border border-white/15 shadow-2xl py-1.5 z-50 animate-in fade-in duration-150">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setShowBreakdownSheet(true);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-zinc-200 hover:bg-white/10 flex items-center gap-2"
              >
                <GitFork className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ophelos Plan</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setShowDeleteConfirm(true);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-red-400 hover:bg-white/10 flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Delete Goal</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Goal Complete Celebration Card */}
      {isCompleted && (
        <div className="p-4 rounded-2xl glass-panel border-amber-500/40 bg-gradient-to-b from-amber-500/15 to-transparent text-center space-y-2">
          <div className="flex justify-center">
            <OphelosMascot mood="celebration" avatarOnly size="md" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
              Goal Complete • 100% Reached
            </span>
            <h2 className="text-base font-bold text-white font-headline mt-1">
              Outstanding Work!
            </h2>
            <p className="text-xs text-zinc-300 max-w-xs mx-auto">
              You saved the full target of ₦{target.toLocaleString()}.
            </p>
          </div>
        </div>
      )}

      {/* G3: Savings Circular Gauge Hero */}
      {goal.type === 'SAVINGS' && (
        <div className="p-5 rounded-3xl glass-panel text-center relative overflow-hidden shadow-lg">
          {/* Circular SVG Gauge */}
          <div className="relative w-[210px] h-[210px] mx-auto flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="14"
                fill="none"
              />
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#22C55E"
                strokeWidth="14"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-extrabold text-white">
                {pct}%
              </span>
              <span className="text-[11px] font-semibold uppercase text-zinc-400 tracking-wider">
                Saved
              </span>
            </div>
          </div>

          {/* Amount Summary */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-xs">
            <div className="text-left">
              <span className="block text-[10px] text-zinc-400">Total Saved</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                ₦{current.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-zinc-400">Target</span>
              <span className="font-mono font-bold text-white text-sm">
                ₦{target.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* G4: Long-Term Checkpoint Roadmap */}
      {goal.type === 'LONG_TERM' && (
        <div className="p-4 rounded-3xl glass-panel space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-headline">
              Milestone Checkpoints
            </h3>
            <span className="font-mono text-xs text-zinc-400 font-semibold">
              {goal.steps.filter((s) => s.isCompleted).length} / {goal.steps.length}
            </span>
          </div>

          {/* Interactive Checkpoint Bar */}
          <div className="relative flex items-center justify-between py-1">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 transition-all duration-500"
              style={{
                width: `${
                  goal.steps.length > 0
                    ? (goal.steps.filter((s) => s.isCompleted).length / (goal.steps.length - 1 || 1)) * 100
                    : 0
                }%`,
              }}
            />

            {goal.steps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => handleToggleStep(step.id, step.isCompleted)}
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step.isCompleted
                    ? 'bg-emerald-500 text-black shadow-[0_0_8px_rgba(75,226,119,0.5)]'
                    : 'bg-[#181818] border border-white/20 text-zinc-400'
                }`}
              >
                {step.isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            {goal.steps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleToggleStep(step.id, step.isCompleted)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  step.isCompleted ? 'bg-emerald-500/10 border-emerald-500/30' : 'glass-panel hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 flex-1 mr-2">
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${
                      step.isCompleted ? 'bg-emerald-500 text-black font-bold' : 'border border-zinc-500'
                    }`}
                  >
                    {step.isCompleted && '✓'}
                  </div>
                  <div className="min-w-0">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        step.isCompleted ? 'line-through text-zinc-400' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{step.actionText}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pacing Info Card */}
      {goal.monthlyContribution && (
        <div className="p-3.5 rounded-2xl glass-panel space-y-1 text-xs">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
            Contribution Pacing
          </span>
          <p className="text-zinc-200">
            Contributing <strong className="font-mono text-emerald-400">₦{goal.monthlyContribution.toLocaleString()}</strong> / month reaches your goal in {goal.monthsRemaining || 12} months.
          </p>
        </div>
      )}

      {/* Ophelos Dynamic Advice */}
      <OphelosMascot
        mood={pct >= 100 ? 'celebration' : 'happy'}
        tag="Ophelos • Advice"
        speech={
          pct >= 100
            ? 'Goal completed! You have built a durable store of value.'
            : 'Stash regularly. Small deposits consistently made are the bedrock of compound interest.'
        }
        size="sm"
      />

      {/* Action Buttons */}
      <div className="flex gap-2 pt-1">
        {goal.type === 'SAVINGS' && (
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setShowContributeModal(true);
            }}
            className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add savings</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setShowBreakdownSheet(true);
          }}
          className={`py-3 px-4 rounded-xl border border-white/10 glass-panel text-white font-headline font-bold text-xs hover:bg-white/[0.08] transition-all flex items-center justify-center gap-1.5 ${
            goal.type !== 'SAVINGS' ? 'flex-1' : ''
          }`}
        >
          <GitFork className="w-3.5 h-3.5 text-emerald-400" />
          <span>Break it down</span>
        </button>
      </div>

      {/* Contribution History Ledger */}
      <div className="p-4 rounded-2xl glass-panel space-y-2">
        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          Contribution History
        </h4>
        {goal.contributions.length === 0 ? (
          <p className="text-xs text-zinc-400 italic py-2">
            No contributions recorded yet. Tap &apos;Add savings&apos; to log your first deposit.
          </p>
        ) : (
          <div className="divide-y divide-white/10">
            {goal.contributions.map((c) => (
              <div key={c.id} className="py-2 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{c.note || 'Deposit'}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400">
                  +₦{c.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: ADD CONTRIBUTION WITH VALIDATION                        */}
      {/* ============================================================== */}
      {showContributeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl glass-panel bg-zinc-950 p-5 space-y-4 shadow-2xl border border-white/15">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm text-white">Log Savings Deposit</h3>
              <button
                type="button"
                onClick={() => setShowContributeModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Amount (₦) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-sm">₦</span>
                  <input
                    type="number"
                    min="100"
                    step="500"
                    value={depositAmount}
                    onChange={(e) => {
                      setDepositAmount(e.target.value);
                      if (depositError) setDepositError(null);
                    }}
                    placeholder="25,000"
                    autoFocus
                    className="w-full h-11 pl-8 pr-3 rounded-xl glass-panel text-white focus:outline-none focus:border-emerald-400 text-sm font-mono"
                  />
                </div>
                {depositError && (
                  <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {depositError}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Note <span className="text-zinc-500 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={depositNote}
                  onChange={(e) => setDepositNote(e.target.value)}
                  placeholder="e.g. Weekly savings deposit"
                  className="w-full h-11 px-3.5 rounded-xl glass-panel text-white focus:outline-none focus:border-emerald-400 text-xs"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex gap-1.5">
                {[5000, 10000, 25000, 50000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setDepositAmount(amt.toString());
                      if (depositError) setDepositError(null);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 hover:border-emerald-400"
                  >
                    +₦{(amt / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={submittingDeposit || !depositAmount}
              onClick={handleDeposit}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-xs disabled:opacity-40 transition-all shadow-md active:scale-98"
            >
              {submittingDeposit ? 'Logging Deposit...' : 'Confirm Deposit'}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DRAWER: G9 OPHELOS BREAK-DOWN SHEET                            */}
      {/* ============================================================== */}
      {showBreakdownSheet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-[430px] max-h-[85vh] rounded-t-3xl glass-panel bg-zinc-950 p-5 overflow-y-auto space-y-4 shadow-2xl border-t border-x border-white/15">
            <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <OphelosMascot mood="informing" avatarOnly size="sm" />
                <div>
                  <h3 className="font-headline font-bold text-sm text-white">Ophelos Step Plan</h3>
                  <span className="text-[10px] text-zinc-400">Sequential Milestones</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBreakdownSheet(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps List */}
            <div className="space-y-2">
              {goal.steps.length === 0 ? (
                <div className="p-4 rounded-xl glass-panel text-center text-xs text-zinc-400">
                  No breakdown steps generated yet. Tap Regenerate below to map out steps.
                </div>
              ) : (
                goal.steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => handleToggleStep(step.id, step.isCompleted)}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      step.isCompleted ? 'bg-emerald-500/10 border-emerald-500/30' : 'glass-panel hover:bg-white/[0.08]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                        step.isCompleted ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {step.isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.stepNumber}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-xs font-semibold ${
                          step.isCompleted ? 'line-through text-zinc-400' : 'text-white'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{step.actionText}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowBreakdownSheet(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-xs transition-all shadow-md"
              >
                Done
              </button>
              <button
                type="button"
                onClick={handleRegenerateBreakdown}
                className="px-3.5 py-2.5 rounded-xl border border-white/10 glass-panel text-xs font-semibold text-zinc-300 hover:bg-white/10"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION: DELETE GOAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl glass-panel bg-zinc-950 p-5 space-y-3 text-center border border-white/15">
            <Trash2 className="w-8 h-8 text-red-400 mx-auto" />
            <h3 className="font-headline font-bold text-sm text-white">Delete Goal?</h3>
            <p className="text-xs text-zinc-400">
              Are you sure you want to delete this goal? All saved contributions and milestones will be removed.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl glass-panel text-white font-bold text-xs hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteGoal}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GoalDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-24 text-white">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <GoalDetailPageContent />
    </React.Suspense>
  );
}
