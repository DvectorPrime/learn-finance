'use client';

import React, { useState } from 'react';
import { ChallengeItem } from '../../types/curriculum';
import { Award, CheckCircle, Scale, ArrowRight, Sparkles } from 'lucide-react';
import { playButtonTap, playSuccessChime, playAcornCollect } from '../../lib/sound';
import GoldenAcorn from '../mascot/GoldenAcorn';
import confetti from 'canvas-confetti';

interface ChallengePlayerProps {
  item: ChallengeItem;
  onComplete: (result: { score: number; total: number; answers: any; completed: boolean }) => void;
}

export default function ChallengePlayer({ item, onComplete }: ChallengePlayerProps) {
  const [fieldAnswers, setFieldAnswers] = useState<Record<string, string>>({});
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const rubric = item.rubric || [];
  const maxPossible = rubric.reduce((sum, r) => sum + (r.max_score || 3), 0);
  const currentTotal = rubric.reduce((sum, r) => sum + (rubricScores[r.criterion] || 0), 0);
  const scoreRatio = maxPossible > 0 ? currentTotal / maxPossible : 1;
  const passed = scoreRatio >= 0.6;

  const handleSubmit = () => {
    playButtonTap();
    setSubmitted(true);
    if (passed) {
      playAcornCollect();
      playSuccessChime();
      try {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      } catch {}
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-6 shadow-xl space-y-5">
      {/* Header */}
      <header className="space-y-1.5 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="h-3.5 w-3.5" />
            <span>{item.kind === 'capstone' ? 'Module Capstone Challenge' : 'DIY Reasoning Challenge'}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
            <GoldenAcorn size={14} />
            <span>+50 XP</span>
          </div>
        </div>
        <h2 className="text-lg sm:text-2xl font-bold font-display tracking-tight text-white">{item.title}</h2>
        {item.subtitle && <p className="text-xs sm:text-sm text-neutral-400">{item.subtitle}</p>}
      </header>

      {/* Task Description */}
      <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Challenge Objective</span>
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
          {item.task}
        </p>
      </div>

      {/* Stages / Fields */}
      {Array.isArray(item.stages) && item.stages.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">Challenge Stages</h3>
          {item.stages.map((st) => (
            <div key={st.stage_no} className="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-2">
              <strong className="text-xs font-mono text-primary block font-bold">
                Stage {st.stage_no}: {st.title}
              </strong>
              <p className="text-xs text-neutral-300 leading-relaxed">{st.prompt}</p>
              <textarea
                value={fieldAnswers[`stage_${st.stage_no}`] || ''}
                onChange={(e) =>
                  setFieldAnswers((prev) => ({ ...prev, [`stage_${st.stage_no}`]: e.target.value }))
                }
                rows={2}
                placeholder="Enter your calculation or analysis for this stage..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          ))}
        </div>
      )}

      {Array.isArray(item.fields) && item.fields.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">Analysis Inputs</h3>
          {item.fields.map((f) => (
            <label key={f.id} className="block space-y-1">
              <span className="text-xs text-neutral-300 font-medium">{f.label}</span>
              <input
                type={f.type || 'text'}
                placeholder={f.placeholder}
                value={fieldAnswers[f.id] || ''}
                onChange={(e) => setFieldAnswers((prev) => ({ ...prev, [f.id]: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
              />
            </label>
          ))}
        </div>
      )}

      {/* Rubric Self-Assessment */}
      <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Scale className="h-4 w-4" /> Self-Assessment Rubric
          </span>
          <span className="text-xs font-mono text-neutral-400">
            Score: <strong className="text-white">{currentTotal}</strong> / {maxPossible} (
            {Math.round(scoreRatio * 100)}%)
          </span>
        </div>

        <div className="space-y-2.5">
          {rubric.map((crit) => {
            const currentScore = rubricScores[crit.criterion] ?? 0;
            const max = crit.max_score || 3;

            return (
              <div key={crit.criterion} className="p-3.5 rounded-xl border border-white/10 bg-white/[0.04] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-white font-bold">{crit.criterion}</strong>
                  <span className="text-primary font-mono font-bold">
                    {currentScore} / {max} pts
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{crit.description}</p>
                <div className="flex gap-1.5 pt-1">
                  {Array.from({ length: max + 1 }, (_, i) => (
                    <button
                      type="button"
                      key={i}
                      disabled={submitted}
                      onClick={() => {
                        playButtonTap();
                        setRubricScores((prev) => ({ ...prev, [crit.criterion]: i }));
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        currentScore === i
                          ? 'bg-primary border-primary text-black shadow-md shadow-primary/20'
                          : 'bg-white/[0.06] border-white/10 text-neutral-300 hover:bg-white/[0.1]'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission */}
      {!submitted ? (
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Submit Challenge Review</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-2 animate-in fade-in">
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              passed
                ? 'bg-primary/10 border-primary/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            <CheckCircle className="h-5 w-5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="block text-white font-bold">
                {passed ? 'Challenge Successfully Completed!' : 'Challenge Submitted for Review'}
              </strong>
              <span>
                Your self-evaluated rubric score is {Math.round(scoreRatio * 100)}%. Great effort in applying
                reasoning!
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                playButtonTap();
                onComplete({
                  score: scoreRatio,
                  total: 1,
                  answers: { fieldAnswers, rubricScores },
                  completed: true,
                });
              }}
              className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Finish & Save Progress</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

