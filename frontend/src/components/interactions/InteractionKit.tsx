'use client';

import React, { useMemo, useState } from 'react';

export type InteractionProps = {
  config?: any;
  onComplete?: (result: { score?: number; total?: number; answers?: any; completed: boolean }) => void;
};

type AnyRecord = Record<string, any>;

export const formatMoney = (n: number, unit = 'NGN') =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: unit,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

const complete = (p: InteractionProps, answers: any, score?: number, total?: number) =>
  p.onComplete?.({ completed: true, answers, score, total });

export function InteractionFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md shadow-2xl space-y-6">
      <header className="border-b border-zinc-800 pb-4 space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-400">{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}

export function InteractionFeedback({ text, good }: { text: string; good?: boolean }) {
  return (
    <div
      role="status"
      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium leading-relaxed ${
        good
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
      }`}
    >
      {text}
    </div>
  );
}

export function ActionButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// 1. ChoiceWithReflection
export function ChoiceWithReflection({ config = {}, onComplete }: InteractionProps) {
  const options: AnyRecord[] = Array.isArray(config.options) ? config.options : [];
  const [choice, setChoice] = useState('');
  const [reflection, setReflection] = useState('');
  const [sent, setSent] = useState(false);

  const hasOptions = options.length > 0;
  const canSubmit = hasOptions ? (choice !== '' || reflection.trim().length > 0) : reflection.trim().length > 0;

  return (
    <InteractionFrame
      title={config.title || 'Choose and Explain'}
      subtitle={config.prompt || 'Choose the option that best fits the situation, then explain your reasoning.'}
    >
      <div className="space-y-4">
        {hasOptions && (
          <div className="space-y-2">
            {options.map((o: AnyRecord) => (
              <label
                key={o.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  choice === o.id
                    ? 'border-emerald-500 bg-emerald-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="choice"
                  value={o.id}
                  checked={choice === o.id}
                  onChange={() => {
                    setChoice(o.id);
                    setSent(false);
                  }}
                  className="accent-emerald-500"
                />
                <span className="text-sm font-medium">{o.label}</span>
              </label>
            ))}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">
            {config.follow_up_prompt || 'Why did you choose it?'}
          </label>
          <textarea
            value={reflection}
            onChange={(e) => {
              setReflection(e.target.value);
              setSent(false);
            }}
            placeholder="Explain your financial rationale..."
            rows={3}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {!sent ? (
          <ActionButton
            disabled={!canSubmit}
            onClick={() => {
              setSent(true);
            }}
          >
            Submit reasoning
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text="Response recorded. Review the key trade-offs in this scenario before continuing."
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { choice, reflection });
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 2. DragDropTrade
export function DragDropTrade({ config = {}, onComplete }: InteractionProps) {
  const people: AnyRecord[] =
    config.people ||
    config.characters || [
      { id: 'a', name: 'Rice seller', has: 'Rice', wants: 'Shoes' },
      { id: 'b', name: 'Shoemaker', has: 'Shoes', wants: 'Phone charger' },
      { id: 'c', name: 'Charger seller', has: 'Phone charger', wants: 'Beans' },
      { id: 'd', name: 'Bean farmer', has: 'Beans', wants: 'Rice' },
    ];
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const satisfiedCount = people.filter((p) => {
    const itemReceivedId = matches[p.id];
    const itemReceived = people.find((x) => x.id === itemReceivedId);
    return itemReceived && itemReceived.has === p.wants;
  }).length;

  return (
    <InteractionFrame
      title={config.title || 'Make the Trade Work'}
      subtitle="Assign each trader the item they want. A match works only when the person receives their wanted item."
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {people.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60"
            >
              <div>
                <strong className="text-sm text-white block">{p.name}</strong>
                <span className="text-xs text-zinc-400">
                  Has: <span className="text-amber-300">{p.has}</span> · Wants:{' '}
                  <span className="text-emerald-300">{p.wants}</span>
                </span>
              </div>
              <select
                value={matches[p.id] || ''}
                onChange={(e) => {
                  setMatches((m) => ({ ...m, [p.id]: e.target.value }));
                  setChecked(false);
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Choose item received</option>
                {people.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.has}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {!checked ? (
          <ActionButton
            onClick={() => {
              setChecked(true);
            }}
          >
            Check exchanges
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={satisfiedCount === people.length}
              text={`${satisfiedCount} of ${people.length} exchanges match a trader's wants. Look for the missing link when a trade fails.`}
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { matches }, satisfiedCount, people.length);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 3. SimulationCompareRounds
export function SimulationCompareRounds({ config = {}, onComplete }: InteractionProps) {
  const rounds: AnyRecord[] = config.rounds || [
    { id: 'A', label: 'Barter', task: 'Find a direct exchange.' },
    { id: 'B', label: 'Money', task: 'Sell first, then buy what you need.' },
  ];
  const [round, setRound] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [success, setSuccess] = useState<Record<string, number>>({});
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const current = rounds[round];

  return (
    <InteractionFrame
      title={config.title || 'Two Ways to Trade'}
      subtitle="Try each round, record the outcome, and compare how the systems work."
    >
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Round {round + 1} of {rounds.length}: {current.label}
        </div>
        <p className="text-sm text-zinc-300">{current.task}</p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAttempts((a) => ({ ...a, [current.id]: (a[current.id] || 0) + 1 }))}
            className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 cursor-pointer"
          >
            Record failed attempt
          </button>
          <button
            onClick={() => setSuccess((s) => ({ ...s, [current.id]: (s[current.id] || 0) + 1 }))}
            className="px-3 py-1.5 rounded-lg border border-emerald-600/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs font-medium text-emerald-300 cursor-pointer"
          >
            Record successful exchange
          </button>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-400">
          Attempts: <span className="text-white font-bold">{attempts[current.id] || 0}</span> · Successful exchanges:{' '}
          <span className="text-emerald-400 font-bold">{success[current.id] || 0}</span>
        </div>

        {round < rounds.length - 1 ? (
          <ActionButton onClick={() => setRound((r) => r + 1)}>Next round</ActionButton>
        ) : (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 block">
              What changed between rounds?
              <textarea
                value={reflection}
                onChange={(e) => {
                  setReflection(e.target.value);
                  setSubmitted(false);
                }}
                rows={3}
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
            {!submitted ? (
              <ActionButton
                disabled={!reflection.trim()}
                onClick={() => setSubmitted(true)}
              >
                Submit comparison
              </ActionButton>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-200">
                <InteractionFeedback
                  good
                  text="Comparison recorded. Understanding the friction of barter highlights why money functions as a universal medium of exchange."
                />
                <ActionButton
                  onClick={() => complete({ config, onComplete }, { attempts, success, reflection })}
                >
                  Continue →
                </ActionButton>
              </div>
            )}
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 4. AllocationBasket
export function AllocationBasket({ config = {}, onComplete }: InteractionProps) {
  const budget = Number(config.budget ?? 10000);
  const catalogue: AnyRecord[] = Array.isArray(config.catalogue)
    ? config.catalogue
    : [
        { id: 'rice', name: 'Rice (small bag)', price: 2500 },
        { id: 'beans', name: 'Beans', price: 1800 },
        { id: 'eggs', name: 'Eggs', price: 1500 },
        { id: 'oil', name: 'Cooking oil', price: 2200 },
        { id: 'tomato', name: 'Tomatoes', price: 800 },
        { id: 'bread', name: 'Bread', price: 1200 },
        { id: 'milk', name: 'Milk', price: 1000 },
        { id: 'garri', name: 'Garri', price: 900 },
      ];
  const [qty, setQty] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const total = catalogue.reduce((s, i) => s + (qty[i.id] || 0) * Number(i.price), 0);
  const remaining = budget - total;

  return (
    <InteractionFrame
      title={config.title || 'Build a ₦10,000 Basket'}
      subtitle="Choose quantities, watch the total update, and stay within the spending limit."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {catalogue.map((i) => (
            <div
              key={i.id}
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60"
            >
              <div>
                <strong className="text-xs sm:text-sm text-white block">{i.name}</strong>
                <span className="text-xs text-zinc-400">{formatMoney(Number(i.price))}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Remove one ${i.name}`}
                  onClick={() => {
                    setQty((q) => ({ ...q, [i.id]: Math.max(0, (q[i.id] || 0) - 1) }));
                    setChecked(false);
                  }}
                  className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-bold flex items-center justify-center cursor-pointer"
                >
                  −
                </button>
                <span className="w-5 text-center text-xs font-bold text-white">{qty[i.id] || 0}</span>
                <button
                  type="button"
                  aria-label={`Add one ${i.name}`}
                  onClick={() => {
                    setQty((q) => ({ ...q, [i.id]: (q[i.id] || 0) + 1 }));
                    setChecked(false);
                  }}
                  className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-bold flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm">
          <span>
            Total: <strong className="text-white">{formatMoney(total)}</strong>
          </span>
          <span>
            Remaining:{' '}
            <strong className={remaining < 0 ? 'text-rose-400' : 'text-emerald-400'}>
              {formatMoney(remaining)}
            </strong>
          </span>
        </div>

        {remaining < 0 && (
          <InteractionFeedback
            text={`You are ${formatMoney(-remaining)} over budget. Remove or replace items before checking.`}
          />
        )}

        {!checked ? (
          <ActionButton
            disabled={total === 0 || remaining < 0}
            onClick={() => {
              setChecked(true);
            }}
          >
            Check my basket
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text="Basket fits within the budget! A different combination may also fit; compare what each basket gives you."
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { qty, total, remaining }, 1, 1);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 5. SortIntoBuckets
export function SortIntoBuckets({ config = {}, onComplete }: InteractionProps) {
  const buckets: AnyRecord[] = config.buckets || [
    { id: 'in', label: 'Money in' },
    { id: 'out', label: 'Money out' },
  ];
  const cards: AnyRecord[] = config.cards || [];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const score = cards.filter((c) => answers[c.id || c.label] === c.bucket).length;

  return (
    <InteractionFrame
      title={config.title || 'Sort It Correctly'}
      subtitle="Place each example in the category that best describes it."
    >
      <div className="space-y-4">
        <div className="space-y-2.5">
          {cards.map((c) => {
            const cardKey = c.id || c.label;
            const userChoice = answers[cardKey];
            const isCardCorrect = userChoice === c.bucket;
            const correctBucketLabel = buckets.find((b) => b.id === c.bucket)?.label || c.bucket;

            let cardBorder = 'border-zinc-800 bg-zinc-950/60';
            if (checked) {
              cardBorder = isCardCorrect
                ? 'border-emerald-500/50 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                : 'border-rose-500/50 bg-rose-950/20 ring-1 ring-rose-500/30';
            }

            return (
              <div
                key={cardKey}
                className={`flex flex-col gap-2 p-3.5 rounded-xl border transition-all ${cardBorder}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-zinc-200 font-medium">{c.label}</span>
                  <select
                    value={userChoice || ''}
                    disabled={checked}
                    onChange={(e) => {
                      setAnswers((a) => ({ ...a, [cardKey]: e.target.value }));
                      setChecked(false);
                    }}
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-80"
                  >
                    <option value="">Choose a bucket</option>
                    {buckets.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                {checked && (
                  <div className="flex items-center gap-1.5 text-xs pt-1.5 border-t border-white/5">
                    {isCardCorrect ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        ✓ Correct category ({correctBucketLabel})
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold flex items-center gap-1">
                        ✗ Expected: <strong className="underline text-rose-300">{correctBucketLabel}</strong>
                        {c.feedback ? ` · ${c.feedback}` : ''}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <ActionButton
            disabled={Object.keys(answers).length < cards.length}
            onClick={() => {
              setChecked(true);
            }}
          >
            Check sorting
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={score === cards.length}
              text={`${score}/${cards.length} correct. ${
                score === cards.length
                  ? 'All items are placed in their proper category!'
                  : 'Review the highlighted corrections above.'
              }`}
            />
            <div className="flex items-center gap-2.5">
              {score < cards.length && (
                <button
                  type="button"
                  onClick={() => setChecked(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-zinc-200 cursor-pointer transition-colors"
                >
                  Adjust & Try Again
                </button>
              )}
              <ActionButton
                className="flex-1"
                onClick={() => {
                  complete({ config, onComplete }, { answers }, score, cards.length);
                }}
              >
                Continue →
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 6. NumericCalculator
export function NumericCalculator({ config = {}, onComplete }: InteractionProps) {
  const inputs: AnyRecord[] = config.inputs || [
    { id: 'income', label: 'Income', default: 50000 },
    { id: 'expenses', label: 'Expenses', default: 35000 },
  ];
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(inputs.map((i) => [i.id, Number(i.default || 0)]))
  );
  const [checked, setChecked] = useState(false);
  const formula = String(config.formula || 'income - expenses');

  const result = useMemo(() => {
    const v = (id: string) => Number(values[id] || 0);
    if (formula === 'balance - pre_payday - bill') return v('balance') - v('pre_payday') - v('bill');
    if (formula === 'ceil(target / contribution)')
      return v('contribution') > 0 ? Math.ceil(v('target') / v('contribution')) : 0;
    if (formula === 'income - expenses') return v('income') - v('expenses');
    if (formula === 'assets - liabilities') return v('assets') - v('liabilities');
    if (formula === 'target - saved') return v('target') - v('saved');
    return Object.values(values).reduce<number>((a, b) => a + Number(b || 0), 0);
  }, [values, formula]);

  return (
    <InteractionFrame
      title={config.title || 'Try the Numbers'}
      subtitle="Change the inputs and see how the result changes. The calculation updates using the displayed formula."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {inputs.map((i) => (
            <label key={i.id} className="space-y-1 block">
              <span className="text-xs font-semibold text-zinc-300">{i.label}</span>
              <input
                type="number"
                min="0"
                value={values[i.id] ?? 0}
                onChange={(e) => {
                  setValues((v) => ({ ...v, [i.id]: Number(e.target.value) }));
                  setChecked(false);
                }}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </label>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="text-zinc-400 block text-xs">Formula</span>
            <code className="text-emerald-300 font-mono text-xs">{formula}</code>
          </div>
          <div className="text-right">
            <span className="text-zinc-400 block text-xs">Result</span>
            <strong className="text-white text-base">
              {config.unit === 'periods' ? `${result} periods` : formatMoney(result, config.unit || 'NGN')}
            </strong>
          </div>
        </div>

        {!checked ? (
          <ActionButton onClick={() => setChecked(true)}>
            Use this result
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Result calculated: ${config.unit === 'periods' ? `${result} periods` : formatMoney(result, config.unit || 'NGN')}. Review how changing each input affects the outcome.`}
            />
            <ActionButton onClick={() => complete({ config, onComplete }, { values, result })}>
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 7. AllocationSlider
export function AllocationSlider({ config = {}, onComplete }: InteractionProps) {
  const total = Number(config.total || 0);
  const categories: string[] = config.categories || [];
  const [alloc, setAlloc] = useState<Record<string, number>>(() =>
    Object.fromEntries(categories.map((c) => [c, Number(config.defaults?.[c] ?? 0)]))
  );
  const [saved, setSaved] = useState(false);

  const sum = Object.values(alloc).reduce<number>((a, b) => a + Number(b || 0), 0);
  const left = total - sum;

  return (
    <InteractionFrame
      title={config.title || 'Give Every Naira a Job'}
      subtitle="Allocate the available amount across categories. No universal split is assumed; make the plan fit the scenario."
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {categories.map((c) => (
            <div key={c} className="space-y-1 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-zinc-200 font-semibold">{c}</span>
                <span className="font-mono text-emerald-300 font-bold">{formatMoney(alloc[c] || 0)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={total}
                step={config.step || 500}
                value={alloc[c] || 0}
                onChange={(e) => {
                  setAlloc((a) => ({ ...a, [c]: Number(e.target.value) }));
                  setSaved(false);
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-xs sm:text-sm">
          <span>
            Allocated: <strong className="text-white">{formatMoney(sum)}</strong>
          </span>
          <span>
            {left >= 0 ? 'Remaining: ' : 'Over budget: '}
            <strong className={left >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              {formatMoney(Math.abs(left))}
            </strong>
          </span>
        </div>

        {!saved ? (
          <ActionButton
            disabled={left < 0}
            onClick={() => setSaved(true)}
          >
            Save allocation
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Allocation saved (${formatMoney(sum)} total). Balancing categories ensures every naira has an intentional purpose.`}
            />
            <ActionButton
              onClick={() => complete({ config, onComplete }, { alloc, sum, left })}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 8. ScenarioSimulator
export function ScenarioSimulator({ config = {}, onComplete }: InteractionProps) {
  const start: Record<string, number> =
    config.start_state?.allocations ||
    config.start_allocations || {
      Food: 18000,
      Transport: 8000,
      Housing: 18000,
      Data: 5000,
      Savings: 10000,
      Personal: 4000,
    };
  const income = Number(config.start_state?.income || config.income || 75000);
  const shocks: AnyRecord[] = config.shock_events || [
    { id: 'transport_up', label: 'Transport cost increases', delta: { Transport: 4000 } },
    { id: 'delayed_pay', label: 'A payment is delayed', incomeDelta: -10000 },
    { id: 'income_drop', label: 'Income falls', incomeDelta: -15000 },
  ];

  const [shockId, setShockId] = useState('');
  const [alloc, setAlloc] = useState<Record<string, number>>({ ...start });
  const [newIncome, setNewIncome] = useState(income);
  const [done, setDone] = useState(false);

  const shock = shocks.find((s) => s.id === shockId);
  const total = Object.values(alloc).reduce((a, b) => a + b, 0);

  const applyShock = () => {
    if (!shock) return;
    const delta = shock.delta || {};
    setAlloc((a) => ({
      ...a,
      ...Object.fromEntries(Object.entries(delta).map(([k, v]) => [k, Number(a[k] || 0) + Number(v)])),
    }));
    setNewIncome(income + Number(shock.incomeDelta || 0));
    setDone(false);
  };

  return (
    <InteractionFrame
      title={config.title || 'Budget Shock Simulator'}
      subtitle="A surprise changes the plan. Apply the event, then adjust allocations to fit the new amount available."
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={shockId}
            onChange={(e) => setShockId(e.target.value)}
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Choose an event</option>
            {shocks.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!shockId}
            onClick={applyShock}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold cursor-pointer"
          >
            Apply shock
          </button>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300">
          Available income: <strong className="text-white font-mono">{formatMoney(newIncome)}</strong>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {Object.keys(alloc).map((k) => (
            <label key={k} className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/60 block space-y-1">
              <span className="text-xs text-zinc-400 block">{k}</span>
              <input
                type="number"
                min="0"
                value={alloc[k]}
                onChange={(e) => {
                  setAlloc((a) => ({ ...a, [k]: Math.max(0, Number(e.target.value)) }));
                  setDone(false);
                }}
                className="w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-white font-mono"
              />
            </label>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm">
          Planned: <strong className="text-white font-mono">{formatMoney(total)}</strong> ·{' '}
          <span className={total <= newIncome ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
            {total <= newIncome ? 'Within available income' : `Over by ${formatMoney(total - newIncome)}`}
          </span>
        </div>

        {!done ? (
          <ActionButton
            disabled={total > newIncome}
            onClick={() => {
              setDone(true);
            }}
          >
            Submit revised plan
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text="Your revised allocation fits the available income. Review which priorities you protected and what you changed."
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { shockId, alloc, newIncome, total });
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 9. OptionComparison
export function OptionComparison({ config = {}, onComplete }: InteractionProps) {
  const options: AnyRecord[] = useMemo(() => {
    if (Array.isArray(config.options) && config.options.length > 0) return config.options;
    const list: AnyRecord[] = [];
    if (config.option_a) {
      list.push({
        id: 'option_a',
        label: config.option_a.name || config.option_a.label || 'Option A',
        attributes: config.option_a.attributes,
        benefit: config.option_a.benefit || config.option_a.pros,
        risk: config.option_a.risk || config.option_a.cons,
        tradeoff: config.option_a.tradeoff,
      });
    }
    if (config.option_b) {
      list.push({
        id: 'option_b',
        label: config.option_b.name || config.option_b.label || 'Option B',
        attributes: config.option_b.attributes,
        benefit: config.option_b.benefit || config.option_b.pros,
        risk: config.option_b.risk || config.option_b.cons,
        tradeoff: config.option_b.tradeoff,
      });
    }
    return list;
  }, [config]);

  const [choice, setChoice] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasOptions = options.length > 0;
  const canSubmit = hasOptions ? (choice !== '' || reason.trim().length > 0) : reason.trim().length > 0;

  return (
    <InteractionFrame
      title={config.title || 'Compare Before You Choose'}
      subtitle={config.scenario || 'Compare the benefits, risks, and trade-offs before choosing.'}
    >
      <div className="space-y-4">
        {hasOptions && (
          <div className="grid grid-cols-1 gap-3">
            {options.map((o) => (
              <label
                key={o.id}
                className={`p-4 rounded-xl border cursor-pointer block space-y-2.5 transition-all ${
                  choice === o.id
                    ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="opt_comparison"
                    checked={choice === o.id}
                    onChange={() => {
                      setChoice(o.id);
                      setSubmitted(false);
                    }}
                    className="accent-emerald-500"
                  />
                  <h3 className="text-sm font-bold text-white">{o.label}</h3>
                </div>

                {o.attributes && typeof o.attributes === 'object' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/5">
                    {Object.entries(o.attributes).map(([attrK, attrV]) => (
                      <div key={attrK} className="p-2 rounded-lg bg-white/[0.04] border border-white/5 text-[11px]">
                        <span className="text-zinc-400 block font-medium">{attrK}:</span>
                        <span className="text-zinc-200 font-semibold">{String(attrV)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {o.benefit && (
                  <p className="text-xs text-zinc-400">
                    <b className="text-emerald-400">Benefit:</b> {o.benefit}
                  </p>
                )}
                {o.risk && (
                  <p className="text-xs text-zinc-400">
                    <b className="text-rose-400">Risk:</b> {o.risk}
                  </p>
                )}
                {o.tradeoff && (
                  <p className="text-xs text-zinc-400">
                    <b className="text-amber-400">Trade-off:</b> {o.tradeoff}
                  </p>
                )}
              </label>
            ))}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">
            {config.follow_up_prompt || 'Explain the trade-off'}
          </label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setSubmitted(false);
            }}
            rows={3}
            placeholder="Explain why this option fits the circumstances..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {!submitted ? (
          <ActionButton
            disabled={!canSubmit}
            onClick={() => {
              setSubmitted(true);
            }}
          >
            Submit choice
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text="Choice recorded. A strong financial decision connects the option to constraints, liquidity needs, and long-term consequences."
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { choice, reason });
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 10. ChoosePath
export function ChoosePath({ config = {}, onComplete }: InteractionProps) {
  const choices: string[] = config.choices || ['Buy immediately', 'Compare alternatives', 'Wait'];
  const [choice, setChoice] = useState('');
  const [follow, setFollow] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <InteractionFrame
      title={config.title || 'Choose Your Route'}
      subtitle={config.setup || 'Choose a route and consider what happens next.'}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {choices.map((c) => (
            <button
              key={c}
              onClick={() => {
                setChoice(c);
                setSubmitted(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                choice === c
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {choice && (
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 space-y-3">
            <strong className="text-sm text-white block">Your route: {choice}</strong>
            <p className="text-xs text-zinc-400">
              {config.outcomes?.[choice] ||
                'Consider the immediate result, the cost, and what this choice may prevent you from doing later.'}
            </p>
            {(config.follow_up_questions || config.after_pause_questions || []).map((q: string, i: number) => (
              <label key={i} className="block space-y-1">
                <span className="text-xs text-zinc-300">{q}</span>
                <textarea
                  value={follow[q] || ''}
                  onChange={(e) => {
                    setFollow((f) => ({ ...f, [q]: e.target.value }));
                    setSubmitted(false);
                  }}
                  rows={2}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-xs text-white"
                />
              </label>
            ))}
            {!submitted ? (
              <ActionButton onClick={() => setSubmitted(true)}>
                Finish route
              </ActionButton>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-200">
                <InteractionFeedback
                  good
                  text={`You chose: "${choice}". Reflecting on trade-offs helps anticipate downstream consequences.`}
                />
                <ActionButton onClick={() => complete({ config, onComplete }, { choice, follow })}>
                  Continue →
                </ActionButton>
              </div>
            )}
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 11. ProgressTracker
export function ProgressTracker({ config = {}, onComplete }: InteractionProps) {
  const target = Number(config.target || 50000);
  const [balance, setBalance] = useState(Number(config.start || 0));
  const [contribution, setContribution] = useState(0);
  const [saved, setSaved] = useState(false);
  const pct = Math.min(100, Math.max(0, (balance / target) * 100));

  return (
    <InteractionFrame
      title={config.title || 'Watch Your Goal Grow'}
      subtitle="Record a contribution and see the balance, amount remaining, and percentage of the goal update."
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-400">
            <span>{pct.toFixed(1)}% complete</span>
            <span>Target: {formatMoney(target)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
          <div>
            <span className="text-zinc-400">Saved:</span>{' '}
            <strong className="text-white font-mono">{formatMoney(balance)}</strong>
          </div>
          <div>
            <span className="text-zinc-400">Remaining:</span>{' '}
            <strong className="text-emerald-400 font-mono">{formatMoney(Math.max(0, target - balance))}</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={contribution || ''}
            onChange={(e) => {
              setContribution(Math.max(0, Number(e.target.value)));
              setSaved(false);
            }}
            placeholder="Contribution amount (₦)"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white"
          />
          <button
            type="button"
            disabled={!contribution}
            onClick={() => {
              setBalance((b) => b + contribution);
              setContribution(0);
              setSaved(false);
            }}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white disabled:opacity-40 cursor-pointer"
          >
            Add contribution
          </button>
        </div>

        {!saved ? (
          <ActionButton onClick={() => setSaved(true)}>
            Save progress
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={
                balance >= target
                  ? 'Goal reached! Check whether the money is still needed for any higher-priority obligation.'
                  : `Progress saved: ${pct.toFixed(1)}% of your target reached.`
              }
            />
            <ActionButton
              onClick={() =>
                complete(
                  { config, onComplete },
                  { balance, target, remaining: Math.max(0, target - balance), percentage: pct }
                )
              }
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 12. MultipleChoiceQuiz
export function MultipleChoiceQuiz({ config = {}, onComplete }: InteractionProps) {
  const questions: AnyRecord[] = config.questions || [];
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);

  const q = questions[idx];
  if (!q) {
    return (
      <InteractionFrame title={config.title || 'Quick Quiz'}>
        <p className="text-sm text-zinc-400">No questions configured yet.</p>
      </InteractionFrame>
    );
  }

  const correct = answers[idx] === q.correct_answer;

  return (
    <InteractionFrame
      title={config.title || 'Quick Quiz'}
      subtitle={`Question ${idx + 1} of ${questions.length}`}
    >
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white">{q.question}</h3>
        <div className="space-y-2">
          {(q.options || []).map((o: AnyRecord) => {
            const val = o.id || o.value;
            return (
              <label
                key={val}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs sm:text-sm ${
                  answers[idx] === val
                    ? 'border-emerald-500 bg-emerald-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name={`q${idx}`}
                  checked={answers[idx] === val}
                  onChange={() => {
                    setAnswers((a) => ({ ...a, [idx]: val }));
                    setRevealed(false);
                  }}
                  className="accent-emerald-500"
                />
                <span>{o.label || o.text || val}</span>
              </label>
            );
          })}
        </div>

        {!revealed ? (
          <ActionButton disabled={!answers[idx]} onClick={() => setRevealed(true)}>
            Check answer
          </ActionButton>
        ) : (
          <div className="space-y-3">
            <InteractionFeedback
              good={correct}
              text={`${correct ? 'Correct.' : 'Not quite.'} ${q.explanation || ''}`}
            />
            {idx < questions.length - 1 ? (
              <ActionButton
                onClick={() => {
                  setIdx((i) => i + 1);
                  setRevealed(false);
                }}
              >
                Next question
              </ActionButton>
            ) : (
              <ActionButton
                onClick={() => {
                  const score = questions.filter((x, i) => answers[i] === x.correct_answer).length;
                  complete({ config, onComplete }, { answers }, score, questions.length);
                }}
              >
                Finish quiz
              </ActionButton>
            )}
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 13. MultiSelect
export function MultiSelect({ config = {}, onComplete }: InteractionProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const options: AnyRecord[] = config.options || [];
  const expected: string[] = config.correct_answers || [];
  const score = selected.filter((x) => expected.includes(x)).length;
  const exact = score === expected.length && selected.length === expected.length;

  return (
    <InteractionFrame
      title={config.title || 'Choose Every Correct Answer'}
      subtitle={config.prompt || 'More than one option may be correct.'}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {options.map((o) => (
            <label
              key={o.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs sm:text-sm ${
                selected.includes(o.id)
                  ? 'border-emerald-500 bg-emerald-500/10 text-white'
                  : 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(o.id)}
                onChange={(e) => {
                  setSelected((s) => (e.target.checked ? [...s, o.id] : s.filter((x) => x !== o.id)));
                  setChecked(false);
                }}
                className="accent-emerald-500"
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>

        {!checked ? (
          <ActionButton
            onClick={() => {
              setChecked(true);
            }}
          >
            Check selection
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={exact}
              text={
                exact
                  ? 'All correct choices selected.'
                  : `You selected ${score} correct option(s), but check whether any correct choices are missing or extra choices were selected.`
              }
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { selected }, score, expected.length);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 14. SequenceOrdering
export function SequenceOrdering({ config = {}, onComplete }: InteractionProps) {
  const items: string[] = config.items || [];
  const [order, setOrder] = useState(items);
  const [checked, setChecked] = useState(false);
  const expected: string[] = config.correct_order || items;

  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    setOrder((a) => {
      const n = [...a];
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
    setChecked(false);
  };

  const score = order.filter((x, i) => x === expected[i]).length;

  return (
    <InteractionFrame
      title={config.title || 'Put It in Order'}
      subtitle={config.subtitle || 'Arrange the steps in the most sensible sequence.'}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {order.map((x, i) => (
            <div
              key={`${x}-${i}`}
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 text-xs sm:text-sm"
            >
              <span className="text-zinc-200">
                <span className="text-zinc-500 font-mono mr-2">{i + 1}.</span> {x}
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                  className="h-7 w-7 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-white font-bold cursor-pointer"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === order.length - 1}
                  onClick={() => move(i, 1)}
                  className="h-7 w-7 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-white font-bold cursor-pointer"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>

        {!checked ? (
          <ActionButton
            onClick={() => {
              setChecked(true);
            }}
          >
            Check sequence
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={score === expected.length}
              text={`${score}/${expected.length} items are in the expected positions.`}
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { order }, score, expected.length);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 15. MatchPairs
export function MatchPairs({ config = {}, onComplete }: InteractionProps) {
  const pairs: AnyRecord[] = config.pairs || [];
  const options = pairs.map((p) => p.right);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const score = pairs.filter((p) => answers[p.left] === p.right).length;

  return (
    <InteractionFrame
      title={config.title || 'Connect the Concepts'}
      subtitle="Match each example or definition to the concept it describes."
    >
      <div className="space-y-4">
        <div className="space-y-2.5">
          {pairs.map((p) => (
            <div
              key={p.left}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60"
            >
              <span className="text-xs sm:text-sm text-zinc-200 font-medium">{p.left}</span>
              <select
                value={answers[p.left] || ''}
                onChange={(e) => {
                  setAnswers((a) => ({ ...a, [p.left]: e.target.value }));
                  setChecked(false);
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200"
              >
                <option value="">Choose match</option>
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {!checked ? (
          <ActionButton
            onClick={() => {
              setChecked(true);
            }}
          >
            Check matches
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback good={score === pairs.length} text={`${score}/${pairs.length} matches correct.`} />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { answers }, score, pairs.length);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 16. TrueFalse
export function TrueFalse({ config = {}, onComplete }: InteractionProps) {
  const statements: AnyRecord[] = config.statements || [];
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);
  const score = statements.filter((s) => answers[s.id] === s.answer).length;

  return (
    <InteractionFrame
      title={config.title || 'True or False?'}
      subtitle="Judge each statement, then read the explanation to understand why."
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {statements.map((s) => (
            <div key={s.id} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-2">
              <p className="text-xs sm:text-sm text-zinc-200 font-medium">{s.text}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, [s.id]: true }));
                    setChecked(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    answers[s.id] === true
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  True
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, [s.id]: false }));
                    setChecked(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    answers[s.id] === false
                      ? 'bg-rose-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  False
                </button>
              </div>
              {checked && (
                <div className="text-xs text-zinc-400 mt-1">
                  <span className={answers[s.id] === s.answer ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {answers[s.id] === s.answer ? 'Correct. ' : 'Incorrect. '}
                  </span>
                  {s.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {!checked ? (
          <ActionButton
            disabled={Object.keys(answers).length < statements.length}
            onClick={() => {
              setChecked(true);
            }}
          >
            Check statements
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={score === statements.length}
              text={`${score}/${statements.length} statements answered correctly.`}
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { answers }, score, statements.length);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 17. RangeEstimator
export function RangeEstimator({ config = {}, onComplete }: InteractionProps) {
  const [value, setValue] = useState(Number(config.default_value || 0));
  const [checked, setChecked] = useState(false);
  const low = Number(config.expected_min || 0);
  const high = Number(config.expected_max || 0);
  const ok = value >= low && value <= high;

  return (
    <InteractionFrame
      title={config.title || 'Make an Estimate'}
      subtitle={config.prompt || 'Estimate first, then check how close you are to the reference range.'}
    >
      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-zinc-300">{config.input_label || 'Your estimate'}</span>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(Number(e.target.value));
              setChecked(false);
            }}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-2.5 text-sm text-white font-mono"
          />
        </label>

        {!checked ? (
          <ActionButton
            onClick={() => {
              setChecked(true);
            }}
          >
            Check estimate
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={ok}
              text={
                ok
                  ? `Within the reference range (${low}–${high}). Excellent estimation!`
                  : `Reference range: ${low}–${high}. Compare your assumptions with the explanation.`
              }
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { value, low, high }, ok ? 1 : 0, 1);
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 18. BudgetPrioritizer
export function BudgetPrioritizer({ config = {}, onComplete }: InteractionProps) {
  const items: string[] = config.items || [];
  const [ranked, setRanked] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [reason, setReason] = useState('');
  const [checked, setChecked] = useState(false);
  const expected: string[] = config.priority_order || [];

  return (
    <InteractionFrame
      title={config.title || 'What Comes First?'}
      subtitle="Add each item to your priority list in the order you would handle it, then justify the trade-offs."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-200"
          >
            <option value="">Choose an item to add</option>
            {items
              .filter((x) => !ranked.includes(x))
              .map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
          </select>
          <button
            type="button"
            disabled={!selectedItem}
            onClick={() => {
              if (selectedItem) {
                setRanked((a) => [...a, selectedItem]);
                setSelectedItem('');
                setChecked(false);
              }
            }}
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-semibold text-white cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {ranked.map((x, i) => (
            <div
              key={x}
              className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 bg-zinc-950/60 text-xs text-zinc-200"
            >
              <span>
                <strong className="text-emerald-400 mr-2">{i + 1}.</strong> {x}
              </span>
              <button
                type="button"
                onClick={() => {
                  setRanked((a) => a.filter((y) => y !== x));
                  setChecked(false);
                }}
                className="text-zinc-400 hover:text-rose-400 text-xs cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-300">Why this order?</label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setChecked(false);
            }}
            rows={2}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-2 text-xs text-white"
          />
        </div>

        {!checked ? (
          <ActionButton
            disabled={!ranked.length}
            onClick={() => {
              setChecked(true);
            }}
          >
            Submit ranking
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              text={
                expected.length
                  ? `Compare your order with suggested priorities: ${expected.join(' > ')}.`
                  : 'Review urgency, consequences of delay, and constraints before finalizing your order.'
              }
            />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { ranked, reason });
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 19. NeedWantSorter
export function NeedWantSorter({ config = {}, onComplete }: InteractionProps) {
  const cards: AnyRecord[] = config.cards || [];
  const buckets: string[] = config.buckets || ['Need', 'Want', 'Depends on context'];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const score = cards.filter((c) => answers[c.id] === c.answer).length;

  return (
    <InteractionFrame
      title={config.title || 'Need, Want, or Depends?'}
      subtitle="Classify each expense in context. Some choices depend on the person's circumstances."
    >
      <div className="space-y-4">
        <div className="space-y-2.5">
          {cards.map((c) => {
            const userChoice = answers[c.id];
            const isCorrect = userChoice === c.answer;

            let cardBorder = 'border-zinc-800 bg-zinc-950/60';
            if (checked && c.answer) {
              cardBorder = isCorrect
                ? 'border-emerald-500/50 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                : 'border-rose-500/50 bg-rose-950/20 ring-1 ring-rose-500/30';
            }

            return (
              <div
                key={c.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border transition-all ${cardBorder}`}
              >
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-zinc-200 block">{c.label}</span>
                  {checked && c.answer && !isCorrect && (
                    <span className="text-[11px] text-rose-400 font-medium block mt-1">
                      Expected category: {c.answer}
                    </span>
                  )}
                  {checked && c.answer && isCorrect && (
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                      ✓ Correct classification
                    </span>
                  )}
                </div>
                <select
                  value={answers[c.id] || ''}
                  onChange={(e) => {
                    setAnswers((a) => ({ ...a, [c.id]: e.target.value }));
                    setChecked(false);
                  }}
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200"
                >
                  <option value="">Choose category</option>
                  {buckets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {!checked ? (
          <ActionButton
            disabled={Object.keys(answers).length === 0}
            onClick={() => {
              setChecked(true);
            }}
          >
            Review choices
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={score === cards.length}
              text={`${score}/${cards.length} classified as expected. There may be context-dependent cases. Consider urgency, purpose, available alternatives, and obligations.`}
            />
            <div className="flex items-center gap-2.5">
              {score < cards.length && (
                <button
                  type="button"
                  onClick={() => setChecked(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-zinc-200 cursor-pointer transition-colors"
                >
                  Adjust & Try Again
                </button>
              )}
              <ActionButton
                className="flex-1"
                onClick={() => {
                  complete({ config, onComplete }, { answers }, score, cards.length);
                }}
              >
                Continue →
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 20. RiskRewardComparison
export function RiskRewardComparison({ config = {}, onComplete }: InteractionProps) {
  const options: AnyRecord[] = config.options || [];
  const [ratings, setRatings] = useState<Record<string, { risk: number; reward: number; certainty: number }>>({});
  const [sent, setSent] = useState(false);

  return (
    <InteractionFrame
      title={config.title || 'Risk, Reward, and Uncertainty'}
      subtitle="Rate the possible reward, downside, and how confident you are in the information provided."
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {options.map((o) => (
            <div key={o.id} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-2.5">
              <h3 className="text-sm font-bold text-white">{o.label}</h3>
              {(['reward', 'risk', 'certainty'] as const).map((k) => (
                <label key={k} className="block space-y-1">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>
                      {k === 'reward' ? 'Potential reward' : k === 'risk' ? 'Potential downside' : 'Confidence'}
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">
                      {ratings[o.id]?.[k] ?? 3}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={ratings[o.id]?.[k] ?? 3}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setRatings((a) => {
                        const current = a[o.id] || { risk: 3, reward: 3, certainty: 3 };
                        return {
                          ...a,
                          [o.id]: { ...current, [k]: val },
                        };
                      });
                      setSent(false);
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          ))}
        </div>

        {!sent ? (
          <ActionButton
            onClick={() => {
              setSent(true);
            }}
          >
            Save assessment
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback text="Ratings are judgments, not forecasts. Compare the evidence, possible loss, time horizon, and whether the decision fits the person's goals." />
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { ratings });
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 21. DecisionTree
export function DecisionTree({ config = {}, onComplete }: InteractionProps) {
  const [nodeId, setNodeId] = useState(config.start_node || 'start');
  const [path, setPath] = useState<string[]>([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState('');
  const nodes: Record<string, AnyRecord> = config.nodes || {};
  const node = nodes[nodeId];

  if (!node) {
    return (
      <InteractionFrame title={config.title || 'Decision Tree'}>
        <p className="text-sm text-zinc-400">Decision tree configuration is missing node “{nodeId}”.</p>
      </InteractionFrame>
    );
  }

  return (
    <InteractionFrame
      title={config.title || 'Follow the Consequences'}
      subtitle="Choose an answer at each step and follow the resulting path."
    >
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white">{node.prompt}</h3>
        {node.outcome && <InteractionFeedback good text={node.outcome} />}

        {!reachedEnd ? (
          <div className="flex flex-wrap gap-2">
            {(node.options || []).map((o: AnyRecord) => (
              <ActionButton
                key={o.id}
                onClick={() => {
                  const nextStep = `${node.prompt} > ${o.label}`;
                  const newPath = [...path, nextStep];
                  setPath(newPath);
                  if (o.next_node) {
                    setNodeId(o.next_node);
                  } else {
                    setReachedEnd(true);
                    setFinalOutcome(o.outcome || node.outcome || 'Decision path complete.');
                  }
                }}
              >
                {o.label}
              </ActionButton>
            ))}
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            {finalOutcome && <InteractionFeedback good text={finalOutcome} />}
            <ActionButton
              onClick={() => {
                complete(
                  { config, onComplete },
                  { path, outcome: finalOutcome }
                );
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}

        {path.length > 0 && (
          <details className="text-xs text-zinc-400 mt-2">
            <summary className="cursor-pointer text-emerald-400 font-medium">Review your path</summary>
            <ol className="list-decimal pl-4 mt-2 space-y-1">
              {path.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </details>
        )}
      </div>
    </InteractionFrame>
  );
}

// 22. GoalPlanner
export function GoalPlanner({ config = {}, onComplete }: InteractionProps) {
  const [target, setTarget] = useState(Number(config.target || 50000));
  const [saved, setSaved] = useState(Number(config.saved || 0));
  const [months, setMonths] = useState(Number(config.months || 5));
  const [savedPlan, setSavedPlan] = useState(false);

  const remaining = Math.max(0, target - saved);
  const monthly = months > 0 ? remaining / months : remaining;

  return (
    <InteractionFrame
      title={config.title || 'Turn the Wish into a Plan'}
      subtitle="Set a target and deadline, then check the contribution required to reach it."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Goal amount (₦)</span>
            <input
              type="number"
              min="0"
              value={target}
              onChange={(e) => {
                setTarget(Math.max(0, Number(e.target.value)));
                setSavedPlan(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Already saved (₦)</span>
            <input
              type="number"
              min="0"
              value={saved}
              onChange={(e) => {
                setSaved(Math.max(0, Number(e.target.value)));
                setSavedPlan(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Months remaining</span>
            <input
              type="number"
              min="1"
              value={months}
              onChange={(e) => {
                setMonths(Math.max(1, Number(e.target.value)));
                setSavedPlan(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex justify-between text-xs sm:text-sm">
          <span>
            Still needed: <strong className="text-white font-mono">{formatMoney(remaining)}</strong>
          </span>
          <span>
            Monthly required: <strong className="text-emerald-400 font-mono">{formatMoney(monthly)}</strong>
          </span>
        </div>

        {!savedPlan ? (
          <ActionButton
            onClick={() => setSavedPlan(true)}
          >
            Save goal plan
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Plan saved: Target ${formatMoney(target)} in ${months} months requires ${formatMoney(monthly)} monthly.`}
            />
            <ActionButton
              onClick={() => complete({ config, onComplete }, { target, saved, months, remaining, monthly })}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 23. CashFlowClassifier
export function CashFlowClassifier({ config = {}, onComplete }: InteractionProps) {
  const items: AnyRecord[] = config.items || [];
  const categories = config.categories || ['Income', 'Expense', 'Transfer', 'Borrowing'];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const score = items.filter((i) => answers[i.id] === i.answer).length;

  return (
    <InteractionFrame
      title={config.title || 'Follow the Cash Flow'}
      subtitle="Classify the transaction and notice when cash received also creates an obligation."
    >
      <div className="space-y-4">
        <div className="space-y-2.5">
          {items.map((i) => {
            const userChoice = answers[i.id];
            const isCorrect = userChoice === i.answer;

            let cardBorder = 'border-zinc-800 bg-zinc-950/60';
            if (checked && i.answer) {
              cardBorder = isCorrect
                ? 'border-emerald-500/50 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                : 'border-rose-500/50 bg-rose-950/20 ring-1 ring-rose-500/30';
            }

            return (
              <div
                key={i.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border transition-all ${cardBorder}`}
              >
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-zinc-200 block">{i.label}</span>
                  {checked && i.answer && !isCorrect && (
                    <span className="text-[11px] text-rose-400 font-medium block mt-1">
                      Expected category: {i.answer}
                    </span>
                  )}
                  {checked && i.answer && isCorrect && (
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                      ✓ Correct classification
                    </span>
                  )}
                </div>
                <select
                  value={answers[i.id] || ''}
                  onChange={(e) => {
                    setAnswers((a) => ({ ...a, [i.id]: e.target.value }));
                    setChecked(false);
                  }}
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200"
                >
                  <option value="">Choose type</option>
                  {categories.map((c: string) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {!checked ? (
          <ActionButton
            disabled={Object.keys(answers).length === 0}
            onClick={() => {
              setChecked(true);
            }}
          >
            Check transactions
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good={score === items.length}
              text={`${score}/${items.length} correct. A loan can increase cash available now while also creating a liability.`}
            />
            <div className="flex items-center gap-2.5">
              {score < items.length && (
                <button
                  type="button"
                  onClick={() => setChecked(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-zinc-200 cursor-pointer transition-colors"
                >
                  Adjust & Try Again
                </button>
              )}
              <ActionButton
                className="flex-1"
                onClick={() => {
                  complete({ config, onComplete }, { answers }, score, items.length);
                }}
              >
                Continue →
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 24. NetWorthCalculator
export function NetWorthCalculator({ config = {}, onComplete }: InteractionProps) {
  const [assets, setAssets] = useState<Record<string, number>>(
    config.assets || { Cash: 20000, Savings: 50000, Equipment: 15000 }
  );
  const [liabilities, setLiabilities] = useState<Record<string, number>>(
    config.liabilities || { Loan: 10000, UnpaidBill: 5000 }
  );
  const [saved, setSaved] = useState(false);

  const sum = (x: Record<string, number>) => Object.values(x).reduce((a, b) => a + Number(b || 0), 0);
  const net = sum(assets) - sum(liabilities);

  return (
    <InteractionFrame
      title={config.title || 'What You Own Minus What You Owe'}
      subtitle="Add up the value of assets, subtract liabilities, and remember that net worth is a snapshot—not a cash-flow plan."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Assets</h3>
            {Object.entries(assets).map(([k, v]) => (
              <label key={k} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-zinc-300">{k}</span>
                <input
                  type="number"
                  min="0"
                  value={v}
                  onChange={(e) => {
                    setAssets((a) => ({ ...a, [k]: Math.max(0, Number(e.target.value)) }));
                    setSaved(false);
                  }}
                  className="w-24 rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-white text-right font-mono"
                />
              </label>
            ))}
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Liabilities</h3>
            {Object.entries(liabilities).map(([k, v]) => (
              <label key={k} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-zinc-300">{k}</span>
                <input
                  type="number"
                  min="0"
                  value={v}
                  onChange={(e) => {
                    setLiabilities((a) => ({ ...a, [k]: Math.max(0, Number(e.target.value)) }));
                    setSaved(false);
                  }}
                  className="w-24 rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-white text-right font-mono"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex justify-between text-xs sm:text-sm font-mono">
          <span>
            Assets: <strong className="text-emerald-400">{formatMoney(sum(assets))}</strong>
          </span>
          <span>
            Liabilities: <strong className="text-rose-400">{formatMoney(sum(liabilities))}</strong>
          </span>
          <span>
            Net worth: <strong className="text-emerald-300 font-bold">{formatMoney(net)}</strong>
          </span>
        </div>

        {!saved ? (
          <ActionButton
            onClick={() => setSaved(true)}
          >
            Save calculation
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Net worth calculated: ${formatMoney(net)}. Assets minus liabilities represents your equity snapshot at this point in time.`}
            />
            <ActionButton
              onClick={() => complete({ config, onComplete }, { assets, liabilities, netWorth: net })}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 25. InflationCalculator
export function InflationCalculator({ config = {}, onComplete }: InteractionProps) {
  const [oldPrice, setOld] = useState(Number(config.old_price || 10000));
  const [newPrice, setNew] = useState(Number(config.new_price || 12000));
  const [amount, setAmount] = useState(Number(config.amount || 10000));
  const [saved, setSaved] = useState(false);

  const rate = oldPrice > 0 ? ((newPrice - oldPrice) / oldPrice) * 100 : 0;
  const oldUnits = oldPrice > 0 ? amount / oldPrice : 0;
  const newUnits = newPrice > 0 ? amount / newPrice : 0;

  return (
    <InteractionFrame
      title={config.title || 'Same Naira, Different Basket'}
      subtitle="Compare a basket's old and new price to estimate inflation and see how many baskets the same amount buys."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Earlier price (₦)</span>
            <input
              type="number"
              min="0"
              value={oldPrice}
              onChange={(e) => {
                setOld(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Current price (₦)</span>
            <input
              type="number"
              min="0"
              value={newPrice}
              onChange={(e) => {
                setNew(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Money in hand (₦)</span>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => {
                setAmount(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 grid grid-cols-3 gap-2 text-xs text-center font-mono">
          <div>
            <span className="text-zinc-400 block">Price change</span>
            <strong className="text-amber-300">{rate.toFixed(1)}%</strong>
          </div>
          <div>
            <span className="text-zinc-400 block">Earlier baskets</span>
            <strong className="text-white">{oldUnits.toFixed(2)}</strong>
          </div>
          <div>
            <span className="text-zinc-400 block">Current baskets</span>
            <strong className="text-rose-400">{newUnits.toFixed(2)}</strong>
          </div>
        </div>

        {!saved ? (
          <ActionButton
            onClick={() => setSaved(true)}
          >
            Save comparison
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Price increase of ${rate.toFixed(1)}% reduces your purchasing power from ${oldUnits.toFixed(2)} to ${newUnits.toFixed(2)} baskets.`}
            />
            <ActionButton
              onClick={() =>
                complete({ config, onComplete }, { oldPrice, newPrice, amount, rate, oldUnits, newUnits })
              }
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 26. LoanRepaymentCalculator
export function LoanRepaymentCalculator({ config = {}, onComplete }: InteractionProps) {
  const [principal, setPrincipal] = useState(Number(config.principal || 50000));
  const [rate, setRate] = useState(Number(config.annual_rate_percent || 12));
  const [months, setMonths] = useState(Number(config.months || 6));
  const [saved, setSaved] = useState(false);

  const interest = principal * (rate / 100) * (months / 12);
  const total = principal + interest;
  const payment = months > 0 ? total / months : total;

  return (
    <InteractionFrame
      title={config.title || 'What Will Borrowing Cost?'}
      subtitle="Estimate the cost under a simple-interest assumption. Real products may use different methods and fees."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Amount borrowed (₦)</span>
            <input
              type="number"
              min="0"
              value={principal}
              onChange={(e) => {
                setPrincipal(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Annual rate (%)</span>
            <input
              type="number"
              min="0"
              value={rate}
              onChange={(e) => {
                setRate(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Repayment (months)</span>
            <input
              type="number"
              min="1"
              value={months}
              onChange={(e) => {
                setMonths(Math.max(1, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 grid grid-cols-3 gap-2 text-xs text-center font-mono">
          <div>
            <span className="text-zinc-400 block">Estimated interest</span>
            <strong className="text-amber-400">{formatMoney(interest)}</strong>
          </div>
          <div>
            <span className="text-zinc-400 block">Total repayment</span>
            <strong className="text-rose-400">{formatMoney(total)}</strong>
          </div>
          <div>
            <span className="text-zinc-400 block">Monthly average</span>
            <strong className="text-emerald-300">{formatMoney(payment)}</strong>
          </div>
        </div>

        {!saved ? (
          <ActionButton
            onClick={() => setSaved(true)}
          >
            Save estimate
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Estimated interest: ${formatMoney(interest)} (Total repayment: ${formatMoney(total)}). Always factor in repayment terms and fees.`}
            />
            <ActionButton
              onClick={() =>
                complete({ config, onComplete }, { principal, rate, months, interest, total, payment })
              }
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 27. SavingsGrowthCalculator
export function SavingsGrowthCalculator({ config = {}, onComplete }: InteractionProps) {
  const [start, setStart] = useState(Number(config.start || 0));
  const [contribution, setContribution] = useState(Number(config.contribution || 2000));
  const [periods, setPeriods] = useState(Number(config.periods || 6));
  const [rate, setRate] = useState(Number(config.periodic_rate_percent || 0));
  const [saved, setSaved] = useState(false);

  const balance = Array.from({ length: periods }, (_, i) => i).reduce(
    (b) => b * (1 + rate / 100) + contribution,
    start
  );
  const contributed = start + contribution * periods;

  return (
    <InteractionFrame
      title={config.title || 'Small Contributions Add Up'}
      subtitle="Estimate how repeated contributions and an optional assumed periodic rate affect a savings balance."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Starting (₦)</span>
            <input
              type="number"
              min="0"
              value={start}
              onChange={(e) => {
                setStart(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Periodic (₦)</span>
            <input
              type="number"
              min="0"
              value={contribution}
              onChange={(e) => {
                setContribution(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Periods</span>
            <input
              type="number"
              min="1"
              value={periods}
              onChange={(e) => {
                setPeriods(Math.max(1, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
          <label className="space-y-1 block">
            <span className="text-xs text-zinc-300">Rate (%)</span>
            <input
              type="number"
              min="0"
              value={rate}
              onChange={(e) => {
                setRate(Math.max(0, Number(e.target.value)));
                setSaved(false);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-xs text-white font-mono"
            />
          </label>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex justify-between text-xs sm:text-sm font-mono">
          <span>
            Total contributed: <strong className="text-zinc-200">{formatMoney(contributed)}</strong>
          </span>
          <span>
            Projected balance: <strong className="text-emerald-400 font-bold">{formatMoney(balance)}</strong>
          </span>
        </div>

        {!saved ? (
          <ActionButton
            onClick={() => setSaved(true)}
          >
            Save projection
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Projected balance: ${formatMoney(balance)} after contributing ${formatMoney(contributed)} over ${periods} periods.`}
            />
            <ActionButton
              onClick={() =>
                complete({ config, onComplete }, { start, contribution, periods, rate, balance, contributed })
              }
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 28. TimelineBuilder
export function TimelineBuilder({ config = {}, onComplete }: InteractionProps) {
  const milestones: AnyRecord[] = config.milestones || [
    { id: '1', label: 'Choose target', month: 1 },
    { id: '2', label: 'First contribution', month: 2 },
    { id: '3', label: 'Review progress', month: 3 },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  return (
    <InteractionFrame
      title={config.title || 'Map the Steps'}
      subtitle="Select the milestones that belong in your plan and add a note about what could delay them."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {milestones.map((m) => (
            <label
              key={m.id}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${
                selected.includes(m.id)
                  ? 'border-emerald-500 bg-emerald-500/10 text-white'
                  : 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(m.id)}
                onChange={(e) => {
                  setSelected((s) => (e.target.checked ? [...s, m.id] : s.filter((x) => x !== m.id)));
                  setSaved(false);
                }}
                className="accent-emerald-500 mt-0.5"
              />
              <div className="text-xs sm:text-sm">
                <strong className="text-emerald-300">Month {m.month}:</strong> {m.label}
                {m.description && <p className="text-xs text-zinc-400 mt-0.5">{m.description}</p>}
              </div>
            </label>
          ))}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-300">What could delay the plan?</label>
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setSaved(false);
            }}
            rows={2}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-2 text-xs text-white"
          />
        </div>

        {!saved ? (
          <ActionButton
            disabled={!selected.length}
            onClick={() => setSaved(true)}
          >
            Save timeline
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text={`Timeline saved with ${selected.length} milestone(s). Having clear checkpoints keeps financial plans on track.`}
            />
            <ActionButton
              onClick={() => complete({ config, onComplete }, { selected, notes })}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 29. ConfidenceReflection
export function ConfidenceReflection({ config = {}, onComplete }: InteractionProps) {
  const [confidence, setConfidence] = useState(3);
  const [reason, setReason] = useState('');
  const [next, setNext] = useState('');
  const [saved, setSaved] = useState(false);

  const canSubmit = reason.trim().length > 0 || next.trim().length > 0;

  return (
    <InteractionFrame
      title={config.title || 'How Sure Are You?'}
      subtitle="Rate your confidence, explain what supports it, and identify what you would check next."
    >
      <div className="space-y-4">
        <label className="block space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-300">
            <span>Confidence rating:</span>
            <span className="font-mono text-emerald-400 font-bold">{confidence}/5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={confidence}
            onChange={(e) => {
              setConfidence(Number(e.target.value));
              setSaved(false);
            }}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </label>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-300">What makes you confident or uncertain?</label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setSaved(false);
            }}
            rows={2}
            placeholder="Type your reasoning..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-2 text-xs text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-300">What information would help you decide better?</label>
          <textarea
            value={next}
            onChange={(e) => {
              setNext(e.target.value);
              setSaved(false);
            }}
            rows={2}
            placeholder="Type additional information needed..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-2 text-xs text-white"
          />
        </div>

        {!saved ? (
          <ActionButton
            disabled={!canSubmit}
            onClick={() => setSaved(true)}
          >
            Save reflection
          </ActionButton>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            <InteractionFeedback
              good
              text="Reflection recorded. Acknowledging uncertainty and identifying what data to seek next is a hallmark of sound financial discipline."
            />
            <ActionButton
              onClick={() => complete({ config, onComplete }, { confidence, reason, next })}
            >
              Continue →
            </ActionButton>
          </div>
        )}
      </div>
    </InteractionFrame>
  );
}

// 30. BranchingScenario
export function BranchingScenario({ config = {}, onComplete }: InteractionProps) {
  const steps: AnyRecord[] = config.steps || [
    {
      id: 'start',
      prompt: 'Your income is lower than expected. What do you do first?',
      options: [
        { id: 'review', label: 'Review essential costs', next: 'review' },
        { id: 'ignore', label: 'Keep the original plan', next: 'ignore' },
      ],
    },
    {
      id: 'review',
      prompt: 'You identify a non-urgent purchase. What next?',
      options: [
        {
          id: 'delay',
          label: 'Delay or reduce it',
          outcome: 'The plan may now fit the money actually available.',
        },
      ],
    },
    {
      id: 'ignore',
      prompt: 'The original plan exceeds the money available.',
      options: [
        {
          id: 'reset',
          label: 'Rework the plan',
          outcome: 'Updating the plan is better than assuming unavailable money will appear.',
        },
      ],
    },
  ];
  const [current, setCurrent] = useState(steps[0]?.id || 'start');
  const [path, setPath] = useState<string[]>([]);
  const node = steps.find((s) => s.id === current);
  const [outcome, setOutcome] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <InteractionFrame
      title={config.title || 'Your Choice Changes What Happens Next'}
      subtitle="Make a decision, see the consequence, and continue through the scenario."
    >
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white">{node?.prompt || 'Scenario complete'}</h3>

        {!completed ? (
          <div className="flex flex-wrap gap-2">
            {node?.options?.map((o: AnyRecord) => (
              <ActionButton
                key={o.id}
                onClick={() => {
                  const stepDesc = `${node.prompt} — ${o.label}`;
                  const newPath = [...path, stepDesc];
                  setPath(newPath);
                  if (o.outcome) {
                    setOutcome(o.outcome);
                    setCompleted(true);
                  } else if (o.next) {
                    setCurrent(o.next);
                  }
                }}
              >
                {o.label}
              </ActionButton>
            ))}
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200">
            {outcome && <InteractionFeedback good text={outcome} />}
            <ActionButton
              onClick={() => {
                complete({ config, onComplete }, { path, outcome });
              }}
            >
              Continue →
            </ActionButton>
          </div>
        )}

        {path.length > 0 && (
          <details className="text-xs text-zinc-400 mt-2">
            <summary className="cursor-pointer text-emerald-400 font-medium">Decision history</summary>
            <ol className="list-decimal pl-4 mt-2 space-y-1">
              {path.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </details>
        )}
      </div>
    </InteractionFrame>
  );
}

// Registry mapping the 30 widget types
export const interactionRegistry: Record<string, React.ComponentType<InteractionProps>> = {
  choice_with_reflection: ChoiceWithReflection,
  drag_drop_trade: DragDropTrade,
  simulation_compare_rounds: SimulationCompareRounds,
  allocation_basket: AllocationBasket,
  sort_into_buckets: SortIntoBuckets,
  numeric_calculator: NumericCalculator,
  allocation_slider: AllocationSlider,
  scenario_simulator: ScenarioSimulator,
  option_comparison: OptionComparison,
  choose_path: ChoosePath,
  progress_tracker: ProgressTracker,
  multiple_choice_quiz: MultipleChoiceQuiz,
  multi_select: MultiSelect,
  sequence_ordering: SequenceOrdering,
  match_pairs: MatchPairs,
  true_false: TrueFalse,
  range_estimator: RangeEstimator,
  budget_prioritizer: BudgetPrioritizer,
  need_want_sorter: NeedWantSorter,
  risk_reward_comparison: RiskRewardComparison,
  decision_tree: DecisionTree,
  goal_planner: GoalPlanner,
  cash_flow_classifier: CashFlowClassifier,
  net_worth_calculator: NetWorthCalculator,
  inflation_calculator: InflationCalculator,
  loan_repayment_calculator: LoanRepaymentCalculator,
  savings_growth_calculator: SavingsGrowthCalculator,
  timeline_builder: TimelineBuilder,
  confidence_reflection: ConfidenceReflection,
  branching_scenario: BranchingScenario,
};

export const INTERACTION_TYPES = Object.keys(interactionRegistry);
