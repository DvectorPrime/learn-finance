'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserGoal } from '@/lib/api';
import OphelosMascot from '@/components/mascot/OphelosMascot';
import { soundFx, playSuccessChime } from '@/lib/sound';
import {
  ArrowLeft,
  BookOpen,
  PiggyBank,
  Flag,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

type GoalTypeSelection = 'LEARNING' | 'SAVINGS' | 'LONG_TERM';

export default function NewGoalPage() {
  const router = useRouter();

  // Step 1: Type selection, Step 2: Configuration
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<GoalTypeSelection | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [targetDate, setTargetDate] = useState('2027-12-31');
  const [lessonsPerWeek, setLessonsPerWeek] = useState(3);
  const [breakdownNow, setBreakdownNow] = useState(true);

  // Validation & Submission state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const parsedTarget = Number(targetAmount) || 0;
  const parsedMonthly = Number(monthlyContribution) || 0;

  const calculateMonths = () => {
    if (!targetDate) return 12;
    const now = new Date();
    const target = new Date(targetDate);
    const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    return Math.max(1, months);
  };

  const calculatedRequiredMonthly = () => {
    if (parsedTarget <= 0) return 0;
    const months = calculateMonths();
    return Math.ceil(parsedTarget / months);
  };

  const handleChipSelect = (text: string) => {
    soundFx.playTap();
    setTitle(text);
    if (validationErrors.title) {
      setValidationErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!selectedType) {
      errors.type = 'Please select a goal type.';
    }

    if (!title.trim() && selectedType !== 'LEARNING') {
      errors.title = 'Goal name is required (minimum 3 characters).';
    } else if (title.trim() && title.trim().length < 3) {
      errors.title = 'Goal name must be at least 3 characters.';
    }

    if (selectedType === 'SAVINGS' || selectedType === 'LONG_TERM') {
      if (!targetAmount || isNaN(parsedTarget) || parsedTarget <= 0) {
        errors.targetAmount = 'Target amount must be a positive number greater than ₦0.';
      } else if (parsedTarget < 5000) {
        errors.targetAmount = 'Minimum target amount is ₦5,000.';
      }

      if (!targetDate) {
        errors.targetDate = 'Please select a valid target date.';
      } else {
        const target = new Date(targetDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (target <= today) {
          errors.targetDate = 'Target date must be in the future.';
        }
      }

      if (monthlyContribution && (isNaN(parsedMonthly) || parsedMonthly <= 0)) {
        errors.monthlyContribution = 'Monthly contribution must be greater than ₦0.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveGoal = async () => {
    soundFx.playTap();
    if (!validateForm()) return;

    const finalTitle = title.trim() || 'Module 1: Know Your Money';
    const finalTarget = parsedTarget > 0 ? parsedTarget : selectedType === 'SAVINGS' ? 500000 : 79500000;
    const finalMonthly = parsedMonthly > 0 ? parsedMonthly : calculatedRequiredMonthly();

    try {
      setSaving(true);
      setApiError(null);

      const res = await createUserGoal({
        type: selectedType!,
        title: finalTitle,
        targetAmount: finalTarget,
        monthlyContribution: finalMonthly,
        targetDate: selectedType === 'LEARNING' ? undefined : targetDate,
        targetModuleId: selectedType === 'LEARNING' ? 'M01' : undefined,
        lessonsPerWeek,
        autoGenerateSteps: breakdownNow,
      });

      playSuccessChime();
      router.push(`/goals/${res.goal.id}`);
    } catch (err: any) {
      console.error('Failed to create goal:', err);
      setApiError(err.message || 'Failed to create goal. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Sub-Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {step === 1 ? (
            <Link
              href="/goals"
              onClick={() => soundFx.playTap()}
              className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundFx.playTap();
                setStep(1);
              }}
              className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="font-headline font-bold text-lg text-white leading-tight">
              {step === 1 ? 'New Financial Goal' : `Configure ${selectedType?.replace('_', ' ')}`}
            </h1>
            <span className="text-[10px] text-zinc-400 font-medium">
              Step {step} of 2
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STEP 1: TYPE SELECTION                                         */}
      {/* ============================================================== */}
      {step === 1 && (
        <div className="space-y-3.5">
          <OphelosMascot
            mood="informing"
            tag="Ophelos"
            speech="What would you like to work toward? Pick a target and I will formulate the action steps."
            size="sm"
          />

          <div className="space-y-2.5">
            {/* Learning Goal */}
            <button
              type="button"
              onClick={() => {
                soundFx.playTap();
                setSelectedType('LEARNING');
                setTitle('Module 1: Know Your Money');
                setValidationErrors({});
              }}
              className={`w-full p-4 rounded-2xl glass-panel text-left flex items-start gap-3 transition-all active:scale-[0.99] ${
                selectedType === 'LEARNING'
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(75,226,119,0.15)]'
                  : 'hover:bg-white/[0.08]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-headline font-bold text-sm text-white">Learning Goal</h3>
                <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                  Finish a curriculum module of financial skills, one bite-sized lesson at a time.
                </p>
              </div>
            </button>

            {/* Savings Goal */}
            <button
              type="button"
              onClick={() => {
                soundFx.playTap();
                setSelectedType('SAVINGS');
                setTitle('');
                setValidationErrors({});
              }}
              className={`w-full p-4 rounded-2xl glass-panel text-left flex items-start gap-3 transition-all active:scale-[0.99] ${
                selectedType === 'SAVINGS'
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(75,226,119,0.15)]'
                  : 'hover:bg-white/[0.08]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-headline font-bold text-sm text-white">Savings Goal</h3>
                <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                  Save a set Naira amount by a target date. Ophelos tracks your liquidity with an interactive gauge meter.
                </p>
              </div>
            </button>

            {/* Long-term Goal */}
            <button
              type="button"
              onClick={() => {
                soundFx.playTap();
                setSelectedType('LONG_TERM');
                setTitle('');
                setValidationErrors({});
              }}
              className={`w-full p-4 rounded-2xl glass-panel text-left flex items-start gap-3 transition-all active:scale-[0.99] ${
                selectedType === 'LONG_TERM'
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(75,226,119,0.15)]'
                  : 'hover:bg-white/[0.08]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Flag className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-headline font-bold text-sm text-white">Long-term Goal</h3>
                <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                  A multi-phase plan with sequential checkpoints, such as purchasing a home or funding a venture.
                </p>
              </div>
            </button>
          </div>

          <button
            type="button"
            disabled={!selectedType}
            onClick={() => {
              soundFx.playTap();
              setStep(2);
            }}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-98"
          >
            Continue
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 2: CONFIGURATION & VALIDATION                             */}
      {/* ============================================================== */}
      {step === 2 && selectedType === 'LEARNING' && (
        <div className="space-y-4">
          <OphelosMascot
            mood="happy"
            tag="Ophelos"
            speech="Module 1 covers barter collapse, cowrie currency, inflation, and cash liquidity."
            size="sm"
          />

          <div className="p-4 rounded-2xl glass-panel space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Active Curriculum Track
            </span>
            <h3 className="font-headline font-bold text-white text-base">
              Module 1: Know Your Money
            </h3>
            <p className="text-xs text-zinc-300">
              8 interactive lessons with real-world case studies and diagnostic checks.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Lessons per week
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 5].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => {
                    soundFx.playTap();
                    setLessonsPerWeek(cnt);
                  }}
                  className={`py-2.5 rounded-xl text-center font-bold text-xs transition-all border ${
                    lessonsPerWeek === cnt
                      ? 'bg-emerald-500 text-black border-emerald-500'
                      : 'glass-panel text-zinc-300 hover:bg-white/[0.08]'
                  }`}
                >
                  {cnt} lessons
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={handleSaveGoal}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-sm transition-all shadow-md active:scale-98"
          >
            {saving ? 'Creating Learning Goal...' : 'Start Learning Goal'}
          </button>
        </div>
      )}

      {step === 2 && (selectedType === 'SAVINGS' || selectedType === 'LONG_TERM') && (
        <div className="space-y-4">
          <OphelosMascot
            mood="happy"
            tag="Ophelos"
            speech="Enter your target figures below. I will calculate the required monthly pacing."
            size="sm"
          />

          <div className="space-y-3">
            {/* Goal Title */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Goal Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (validationErrors.title) setValidationErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder={selectedType === 'SAVINGS' ? 'e.g. Emergency Liquidity Reserve' : 'e.g. Buy a 3-bedroom home in Ibadan'}
                className={`w-full h-11 px-3.5 rounded-xl glass-panel text-white focus:outline-none text-xs ${
                  validationErrors.title ? 'border-red-500 focus:border-red-400' : 'focus:border-emerald-400'
                }`}
              />
              {validationErrors.title && (
                <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.title}
                </span>
              )}

              {/* Suggestion Chips for Long-term */}
              {selectedType === 'LONG_TERM' && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    'Home deposit in Ibadan',
                    'Start an agribusiness',
                    'Emergency liquidity vault',
                    'Debt snowball elimination',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipSelect(chip)}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px] hover:border-emerald-400 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Target Amount (₦) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">₦</span>
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  value={targetAmount}
                  onChange={(e) => {
                    setTargetAmount(e.target.value);
                    if (validationErrors.targetAmount) setValidationErrors((prev) => ({ ...prev, targetAmount: '' }));
                  }}
                  placeholder={selectedType === 'SAVINGS' ? '500,000' : '79,500,000'}
                  className={`w-full h-11 pl-8 pr-3.5 rounded-xl glass-panel text-white focus:outline-none text-xs font-mono ${
                    validationErrors.targetAmount ? 'border-red-500 focus:border-red-400' : 'focus:border-emerald-400'
                  }`}
                />
              </div>
              {validationErrors.targetAmount ? (
                <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.targetAmount}
                </span>
              ) : (
                <p className="text-[10px] text-zinc-400 mt-1">
                  National minimum wage benchmark: ₦70,000/month.
                </p>
              )}
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Target Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => {
                  setTargetDate(e.target.value);
                  if (validationErrors.targetDate) setValidationErrors((prev) => ({ ...prev, targetDate: '' }));
                }}
                className={`w-full h-11 px-3.5 rounded-xl glass-panel text-white focus:outline-none text-xs ${
                  validationErrors.targetDate ? 'border-red-500 focus:border-red-400' : 'focus:border-emerald-400'
                }`}
              />
              {validationErrors.targetDate && (
                <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.targetDate}
                </span>
              )}
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Monthly Contribution (₦) <span className="text-zinc-500 text-[10px]">(Optional, calculated if blank)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">₦</span>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={monthlyContribution}
                  onChange={(e) => {
                    setMonthlyContribution(e.target.value);
                    if (validationErrors.monthlyContribution) setValidationErrors((prev) => ({ ...prev, monthlyContribution: '' }));
                  }}
                  placeholder={calculatedRequiredMonthly().toString()}
                  className={`w-full h-11 pl-8 pr-3.5 rounded-xl glass-panel text-white focus:outline-none text-xs font-mono ${
                    validationErrors.monthlyContribution ? 'border-red-500 focus:border-red-400' : 'focus:border-emerald-400'
                  }`}
                />
              </div>
              {validationErrors.monthlyContribution && (
                <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.monthlyContribution}
                </span>
              )}
            </div>

            {/* Dynamic Calculated Card */}
            {parsedTarget > 0 && !validationErrors.targetAmount && (
              <div className="p-3.5 rounded-2xl glass-panel border-emerald-500/30 bg-emerald-500/10 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Ophelos Pacing Plan
                </span>
                <p className="text-xs text-zinc-200">
                  You need <strong className="font-mono text-emerald-400 text-sm">₦{calculatedRequiredMonthly().toLocaleString()}</strong> / month over {calculateMonths()} months to reach ₦{parsedTarget.toLocaleString()}.
                </p>
              </div>
            )}
          </div>

          {apiError && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={handleSaveGoal}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-sm disabled:opacity-50 transition-all shadow-md active:scale-98"
          >
            {saving ? 'Creating Goal...' : 'Create Goal'}
          </button>
        </div>
      )}
    </div>
  );
}
