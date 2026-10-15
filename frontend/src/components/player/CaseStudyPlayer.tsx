'use client';

import React, { useState } from 'react';
import { CaseStudyItem } from '../../types/curriculum';
import { Users, FileSpreadsheet, CheckCircle2, ArrowRight, ArrowLeft, Award, AlertTriangle, Check } from 'lucide-react';
import { playButtonTap, playSuccessChime } from '../../lib/sound';
import GoldenAcorn from '../mascot/GoldenAcorn';
import confetti from 'canvas-confetti';

interface CaseStudyPlayerProps {
  item: CaseStudyItem;
  onComplete: (answers: any) => void;
}

export default function CaseStudyPlayer({ item, onComplete }: CaseStudyPlayerProps) {
  const prompts = item.prompts || [];
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checkedPrompts, setCheckedPrompts] = useState<Record<number, boolean>>({});
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const [showDebrief, setShowDebrief] = useState(prompts.length === 0);

  const currentPrompt = prompts[currentPromptIdx];

  if (!item.scenario) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 text-center space-y-4 shadow-xl">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Case Study Preview
        </div>
        <h2 className="text-xl font-bold font-display text-white">{item.title}</h2>
        {item.subtitle && <p className="text-sm text-neutral-400">{item.subtitle}</p>}
        <p className="text-xs text-neutral-400 max-w-sm mx-auto">
          This case study scenario is outlined. You can review the topic and continue to the next activity.
        </p>
        <button
          type="button"
          onClick={() => {
            playButtonTap();
            onComplete({ completed: true });
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer hover:brightness-105"
        >
          <span>Continue Activity</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const isChecked = checkedPrompts[currentPromptIdx] || false;
  const userAns = answers[currentPromptIdx] || '';
  const options = (currentPrompt as any)?.options && Array.isArray((currentPrompt as any).options)
    ? (currentPrompt as any).options
    : [];
  const hasOptions = options.length > 0;
  const expectedAnswer = (currentPrompt as any)?.expected_answer || (currentPrompt as any)?.correct_answer || (currentPrompt as any)?.correct || '';

  const isOptCorrect = (opt: any) => {
    if (!expectedAnswer) return false;
    const optId = typeof opt === 'string' ? opt : (opt.id || '');
    const optVal = typeof opt === 'string' ? opt : (opt.label || opt.text || opt.id);
    return (
      String(optId).trim().toUpperCase() === String(expectedAnswer).trim().toUpperCase() ||
      String(optVal).trim().toLowerCase() === String(expectedAnswer).trim().toLowerCase()
    );
  };

  const isOptSelected = (opt: any) => {
    const optId = typeof opt === 'string' ? opt : (opt.id || '');
    const optVal = typeof opt === 'string' ? opt : (opt.label || opt.text || opt.id);
    return userAns === optId || userAns === optVal;
  };

  const isUserCorrect = hasOptions
    ? options.some((opt: any) => isOptSelected(opt) && isOptCorrect(opt))
    : userAns.trim().length > 3;

  const handleCheckAnswer = () => {
    if (!userAns.trim()) return;
    if (isUserCorrect) {
      playSuccessChime();
      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      playButtonTap();
    }
    setCheckedPrompts((prev) => ({ ...prev, [currentPromptIdx]: true }));
    if (!completedPrompts.includes(currentPromptIdx)) {
      setCompletedPrompts((prev) => [...prev, currentPromptIdx]);
    }
  };

  const handleNextPromptOrDebrief = () => {
    playButtonTap();
    if (currentPromptIdx < prompts.length - 1) {
      setCurrentPromptIdx((prev) => prev + 1);
    } else {
      playSuccessChime();
      setShowDebrief(true);
    }
  };

  const financialFigures: Array<{ label: string; value: string | number; unit?: string }> = React.useMemo(() => {
    if (Array.isArray(item.scenario.data) && item.scenario.data.length > 0) {
      return item.scenario.data;
    }
    const rawObj =
      !Array.isArray(item.scenario.data) && typeof item.scenario.data === 'object' && item.scenario.data !== null
        ? item.scenario.data
        : typeof item.scenario.financial_data === 'object' && item.scenario.financial_data !== null
        ? item.scenario.financial_data
        : null;

    if (rawObj && Object.keys(rawObj).length > 0) {
      return Object.entries(rawObj).map(([key, val]) => ({
        label: key.replace(/_/g, ' '),
        value: String(val),
      }));
    }
    return [];
  }, [item.scenario]);

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-6 shadow-xl space-y-5">
      {/* Header */}
      <header className="space-y-1.5 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="h-3.5 w-3.5" />
            <span>Real-World Case Study</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
            <GoldenAcorn size={14} />
            <span>+25 XP</span>
          </div>
        </div>
        <h2 className="text-lg sm:text-2xl font-bold font-display tracking-tight text-white">{item.title}</h2>
        {item.subtitle && <p className="text-xs sm:text-sm text-neutral-400">{item.subtitle}</p>}
      </header>

      {/* Scenario Narrative */}
      <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] space-y-3.5">
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
          {item.scenario.narrative}
        </p>

        {/* Characters */}
        {Array.isArray(item.scenario.characters) && item.scenario.characters.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 mb-2">
              <Users className="h-3.5 w-3.5 text-primary" /> Key Participants:
            </span>
            <div className="flex flex-wrap gap-2">
              {item.scenario.characters.map((char, i) => (
                <div key={i} className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-neutral-300">
                  <strong className="text-white font-bold">{char.name}</strong> {char.role ? `(${char.role})` : ''}
                  {(char.income_source || char.details) && (
                    <span className="text-neutral-400"> · {char.income_source || char.details}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Data / Figures Summary */}
        {financialFigures.length > 0 && (
          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              <FileSpreadsheet className="h-3.5 w-3.5 text-primary" /> Financial Metrics:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {financialFigures.map((d, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs">
                  <span className="text-neutral-400 capitalize block text-[10px] truncate">{d.label}</span>
                  <span className="font-mono font-bold text-white text-xs">{String(d.value)} {d.unit || ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prompts Section */}
      {!showDebrief && currentPrompt && (
        <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] space-y-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider text-[11px]">
              Prompt {currentPromptIdx + 1} of {prompts.length}
            </span>
            <span className="text-neutral-500 font-mono text-[10px]">ID: {currentPrompt.id}</span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-white">{currentPrompt.prompt}</p>

          {hasOptions ? (
            <div className="space-y-2">
              {options.map((opt: any) => {
                const optVal = typeof opt === 'string' ? opt : (opt.label || opt.text || opt.id);
                const optId = typeof opt === 'string' ? opt : (opt.id || optVal);
                const isSelected = isOptSelected(opt);
                const isCorrect = isOptCorrect(opt);

                let optClass = 'border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]';
                if (!isChecked) {
                  if (isSelected) {
                    optClass = 'border-primary bg-primary/20 text-white font-semibold ring-1 ring-primary';
                  }
                } else {
                  if (isCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-500/20 text-white font-semibold ring-1 ring-emerald-500';
                  } else if (isSelected && !isUserCorrect) {
                    optClass = 'border-rose-500 bg-rose-500/20 text-rose-200 font-semibold ring-1 ring-rose-500';
                  } else {
                    optClass = 'border-white/5 bg-white/[0.02] text-neutral-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={optId}
                    type="button"
                    disabled={isChecked}
                    onClick={() => {
                      playButtonTap();
                      setAnswers((prev) => ({ ...prev, [currentPromptIdx]: optId }));
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${optClass}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {typeof opt === 'object' && opt.id ? opt.id : ''}
                      </span>
                      <span className="leading-snug">{optVal}</span>
                    </div>

                    {isChecked ? (
                      isCorrect ? (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold inline-flex items-center gap-1">
                          <Check className="h-3 w-3 stroke-[3]" /> Correct
                        </span>
                      ) : isSelected ? (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                          Selected
                        </span>
                      ) : null
                    ) : (
                      isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea
              disabled={isChecked}
              value={userAns}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [currentPromptIdx]: e.target.value }))}
              placeholder="Type your response or analysis here..."
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] p-3 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-80"
            />
          )}

          {/* Feedback Drawer (Visible when checked) */}
          {isChecked && (
            <div
              className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 ${
                isUserCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                {isUserCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">Spot on! Your analysis is accurate.</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span className="text-rose-300">Key Economic Principle:</span>
                  </>
                )}
              </div>
              <p className="text-neutral-300">
                {hasOptions
                  ? isUserCorrect
                    ? 'Your selection accurately applies the core financial mechanics of this situation.'
                    : `The optimal choice is: ${
                        options.find((o: any) => isOptCorrect(o))?.label || expectedAnswer
                      }.`
                  : 'Your reasoning has been recorded. Review the expert debrief below to compare key trade-offs.'}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-between items-center pt-2 gap-2">
            <button
              type="button"
              disabled={currentPromptIdx === 0}
              onClick={() => {
                playButtonTap();
                setCurrentPromptIdx((prev) => Math.max(0, prev - 1));
              }}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </button>

            {!isChecked ? (
              <button
                type="button"
                disabled={!userAns.trim()}
                onClick={handleCheckAnswer}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-black disabled:opacity-40 font-bold text-xs shadow-md active:scale-95 cursor-pointer hover:brightness-105"
              >
                <span>Check Answer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextPromptOrDebrief}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md active:scale-95 cursor-pointer transition-all"
              >
                <span>{currentPromptIdx < prompts.length - 1 ? 'Next Prompt' : 'Reveal Debrief & Expert Insights'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Debrief & Key Takeaway */}
      {showDebrief && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {item.debrief && (
            <div className="p-4 sm:p-5 rounded-xl border border-primary/20 bg-primary/[0.08] space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Expert Debrief
              </span>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">{item.debrief}</p>
            </div>
          )}

          {item.key_takeaway && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.04] space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Key Takeaway</span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                {item.key_takeaway}
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                playButtonTap();
                onComplete(answers);
              }}
              className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Complete Case Study & Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
