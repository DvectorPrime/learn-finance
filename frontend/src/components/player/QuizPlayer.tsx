'use client';

import React, { useState } from 'react';
import { QuizItem, QuizQuestion } from '../../types/curriculum';
import ChipMascot from '../mascot/ChipMascot';
import GoldenAcorn from '../mascot/GoldenAcorn';
import { playButtonTap, playSuccessChime, playAcornCollect } from '../../lib/sound';
import {
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizPlayerProps {
  item: QuizItem;
  onComplete: (result: { score: number; total: number; answers: any; completed: boolean }) => void;
}

export default function QuizPlayer({ item, onComplete }: QuizPlayerProps) {
  const questions = item.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 text-center space-y-4 shadow-xl">
        <h2 className="text-xl font-bold font-display text-white">{item.title}</h2>
        <p className="text-sm text-neutral-400">
          This quiz is currently being authored. You can proceed to the next activity.
        </p>
        <button
          type="button"
          onClick={() => {
            playButtonTap();
            onComplete({ score: 1, total: 1, answers: {}, completed: true });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer hover:brightness-105"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];
  const currentAnswer = selectedAnswers[currentIdx];
  const isRevealed = revealed[currentIdx] || false;

  // Check correctness of current question
  const checkCorrectness = (question: QuizQuestion, ans: any): boolean => {
    if (ans === undefined || ans === null) return false;
    switch (question.type) {
      case 'single_choice':
        return String(ans).trim() === String(question.correct).trim();
      case 'true_false':
        return (ans === true || ans === 'true') === question.correct;
      case 'numeric': {
        const num = Number(ans);
        return !isNaN(num) && Math.abs(num - Number(question.correct)) <= (question.tolerance ?? 0);
      }
      case 'classify':
        return String(ans).trim().toLowerCase() === String(question.correct).trim().toLowerCase();
      case 'short_answer':
        return String(ans).trim().length > 5;
      default:
        return true;
    }
  };

  const isCurrentCorrect = checkCorrectness(q, currentAnswer);

  const handleSelectOption = (value: any) => {
    if (isRevealed) return;
    playButtonTap();
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: value }));
  };

  const handleCheckAnswer = () => {
    setRevealed((prev) => ({ ...prev, [currentIdx]: true }));
    if (isCurrentCorrect) {
      playSuccessChime();
      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      } catch {}
    } else {
      playButtonTap();
    }
  };

  const handleNext = () => {
    playButtonTap();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setFinished(true);
      let correctCount = 0;
      questions.forEach((qu, i) => {
        if (checkCorrectness(qu, selectedAnswers[i])) {
          correctCount++;
        }
      });
      if (correctCount / questions.length >= 0.75) {
        playAcornCollect();
        try {
          confetti({ particleCount: 90, spread: 75, origin: { y: 0.55 } });
        } catch {}
      }
    }
  };

  const renderAnswerInput = () => {
    switch (q.type) {
      case 'single_choice':
        return (
          <fieldset aria-label="Interactive Answer Options" className="flex flex-col gap-2.5 mb-6" role="radiogroup">
            <legend className="sr-only">Interactive question choices</legend>
            {(q.options || []).map((opt, i) => {
              const selected = currentAnswer === opt.id;
              let containerClass =
                'bg-white/[0.04] border border-white/10 text-neutral-300 hover:bg-white/[0.08] hover:text-white';
              let badgeClass = 'bg-white/10 text-neutral-300';

              if (selected) {
                containerClass = 'bg-white/[0.1] border-2 border-primary text-white shadow-lg shadow-primary/10';
                badgeClass = 'bg-primary text-black font-bold';
              }

              if (isRevealed) {
                if (opt.id === q.correct) {
                  containerClass = 'bg-emerald-500/20 border-2 border-emerald-500 text-white shadow-md shadow-emerald-500/20';
                  badgeClass = 'bg-emerald-500 text-black font-bold';
                } else if (selected && !isCurrentCorrect) {
                  containerClass = 'bg-rose-500/20 border-2 border-rose-500 text-rose-200';
                  badgeClass = 'bg-rose-500 text-white font-bold';
                }
              }

              return (
                <label
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all transform active:scale-[0.99] select-none ${containerClass}`}
                >
                  <input
                    type="radio"
                    name={`quiz-choice-${currentIdx}`}
                    checked={selected}
                    onChange={() => handleSelectOption(opt.id)}
                    className="sr-only"
                    disabled={isRevealed}
                  />
                  {/* Left Circle Badge: Letter or Checkmark */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${badgeClass}`}
                  >
                    {isRevealed && opt.id === q.correct ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : (
                      <span className="text-xs font-bold">{opt.id || String.fromCharCode(65 + i)}</span>
                    )}
                  </div>

                  {/* Option Text */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] sm:text-[15px] font-medium block leading-snug">
                      {opt.text}
                    </span>
                  </div>

                  {/* Optional Formula / Tag */}
                  {opt.id === q.correct && isRevealed && (
                    <div className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[11px] font-semibold">
                      Verified
                    </div>
                  )}
                </label>
              );
            })}
          </fieldset>
        );

      case 'true_false':
        return (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[true, false].map((val) => {
              const selected = currentAnswer === val;
              let btnClass = 'border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]';
              if (selected) {
                btnClass = 'border-2 border-primary bg-primary/20 text-white font-bold shadow-md shadow-primary/20';
              }
              if (isRevealed) {
                if (val === q.correct) {
                  btnClass = 'border-2 border-emerald-500 bg-emerald-500/20 text-white';
                } else if (selected && !isCurrentCorrect) {
                  btnClass = 'border-2 border-rose-500 bg-rose-500/20 text-rose-200';
                }
              }

              return (
                <button
                  type="button"
                  key={String(val)}
                  disabled={isRevealed}
                  onClick={() => handleSelectOption(val)}
                  className={`py-4 rounded-xl border font-bold text-sm text-center transition-all cursor-pointer ${btnClass}`}
                >
                  {val ? 'TRUE' : 'FALSE'}
                </button>
              );
            })}
          </div>
        );

      case 'numeric':
        return (
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-400 font-mono px-3 py-3 rounded-xl bg-white/[0.06] border border-white/10">
                {q.unit || 'NGN'}
              </span>
              <input
                type="number"
                disabled={isRevealed}
                value={currentAnswer ?? ''}
                onChange={(e) => {
                  setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: e.target.value }));
                }}
                placeholder="Enter numerical amount"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {isRevealed && !isCurrentCorrect && (
              <p className="text-xs text-amber-400 flex items-center gap-1.5 font-medium">
                <AlertTriangle className="h-3.5 w-3.5" />
                Correct answer: {q.unit || ''} {q.correct} (±{q.tolerance})
              </p>
            )}
          </div>
        );

      case 'classify':
        return (
          <div className="flex flex-wrap gap-2.5 mb-6">
            {(q.categories || []).map((cat) => {
              const selected = currentAnswer === cat;
              let catClass = 'border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]';
              if (selected) {
                catClass = 'border-2 border-primary bg-primary/20 text-white font-bold';
              }
              if (isRevealed) {
                if (cat === q.correct) {
                  catClass = 'border-2 border-emerald-500 bg-emerald-500/20 text-white';
                } else if (selected && !isCurrentCorrect) {
                  catClass = 'border-2 border-rose-500 bg-rose-500/20 text-rose-200';
                }
              }

              return (
                <button
                  type="button"
                  key={cat}
                  disabled={isRevealed}
                  onClick={() => handleSelectOption(cat)}
                  className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${catClass}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        );

      case 'short_answer':
        return (
          <div className="space-y-3 mb-6">
            <textarea
              disabled={isRevealed}
              value={currentAnswer ?? ''}
              onChange={(e) => {
                setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: e.target.value }));
              }}
              rows={3}
              placeholder="Explain your financial rationale..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
            {isRevealed && q.model_answer && (
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.04] text-xs text-neutral-300 space-y-1">
                <strong className="text-primary block uppercase tracking-wider text-[11px] font-bold">
                  Recommended Model Solution:
                </strong>
                <p className="leading-relaxed">{q.model_answer}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Finished view (Matching Frame 08 victory celebration cards)
  if (finished) {
    let correctCount = 0;
    questions.forEach((qu, i) => {
      if (checkCorrectness(qu, selectedAnswers[i])) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 75;

    return (
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <ChipMascot state={passed ? 'cheer' : 'idle'} size="lg" />

          {/* Result Pill */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-xs font-semibold">
            <GoldenAcorn size={16} />
            <span className={passed ? 'text-primary' : 'text-amber-400'}>
              {passed ? 'Quest Mastered • +25 XP' : 'Practice Challenge'}
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-bold font-display text-white">
            {passed ? 'Evaluation Success' : 'Review & Strengthen'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed mt-1">
            You scored {correctCount} out of {questions.length} questions ({percentage}% accuracy).
          </p>
        </div>

        {/* Reward Metric Chips */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
              Acorns Earned
            </span>
            <span className="text-lg font-bold text-amber-400 font-mono flex items-center justify-center gap-1 mt-0.5">
              <GoldenAcorn size={18} />
              +{passed ? 5 : 2}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
              Skill Score
            </span>
            <span className="text-lg font-bold text-primary font-mono mt-0.5 block">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => {
              playButtonTap();
              setFinished(false);
              setCurrentIdx(0);
              setSelectedAnswers({});
              setRevealed({});
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-neutral-200 cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retry Challenge</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playButtonTap();
              onComplete({
                score: correctCount / questions.length,
                total: questions.length,
                answers: selectedAnswers,
                completed: true,
              });
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-bold text-xs sm:text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Claim Rewards & Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quest Category Meta (Stitch Frame 07) */}
      <div className="flex items-center justify-between gap-2">
        <div className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">
            {item.title || 'Financial Logic Quest'}
          </span>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          Quest {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Primary Question Prompt */}
      <div className="space-y-1.5 pt-1">
        <h1 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight leading-snug">
          {q.prompt}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Select the correct financial mechanism driving this outcome.
        </p>
      </div>

      {/* Answer Form */}
      <div className="pt-2">{renderAnswerInput()}</div>

      {/* Action / Check Answer OR Mascot Instant Feedback Drawer */}
      {!isRevealed ? (
        <div className="pt-2">
          <button
            type="button"
            disabled={currentAnswer === undefined || currentAnswer === ''}
            onClick={handleCheckAnswer}
            className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Check Answer</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* Mascot Instant Feedback Drawer Card (Stitch Frame 07) */
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.06] border border-white/10 p-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Subtle Ambient Green Halo */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start gap-3.5">
            {/* Mascot Avatar: Chip in Cheering or Idle state */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center relative overflow-visible">
                <ChipMascot state={isCurrentCorrect ? 'cheer' : 'idle'} size="sm" />
                <div className="absolute -top-1 -right-1">
                  <GoldenAcorn size={16} />
                </div>
              </div>
              <span className="text-[10px] text-amber-300/90 font-bold mt-1">Chip</span>
            </div>

            {/* Dialogue Bubble */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <div
                  className={`inline-flex items-center gap-1 text-xs font-bold ${
                    isCurrentCorrect ? 'text-primary' : 'text-amber-400'
                  }`}
                >
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Spot on!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4" />
                      <span>Let's review this!</span>
                    </>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold">
                  {isCurrentCorrect ? '+25 XP' : '+5 XP Effort'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {q.explanation || 'Understanding this mechanism is fundamental to managing financial health.'}
              </p>

              {/* Misconception Trap note if incorrect */}
              {!isCurrentCorrect && q.misconception && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                  <span className="font-bold block">💡 Note on Common Traps:</span>
                  This is a common money misconception that learners face. Keep the core principle in mind!
                </div>
              )}
            </div>
          </div>

          {/* Continuation Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleNext}
              className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

