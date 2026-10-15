'use client';

import React, { useEffect, useState } from 'react';
import { fetchInteractionExamples } from '@/lib/api';
import InteractionRenderer from '@/components/interactions/InteractionRenderer';
import { Sparkles, Code2, RotateCcw, CheckCircle2, Play, Search, Layers } from 'lucide-react';

interface WidgetMeta {
  key: string;
  name: string;
  category: string;
  description: string;
}

const WIDGET_METAS: WidgetMeta[] = [
  // Decisions & Choices
  { key: 'choice_with_reflection', name: 'Choice with Reflection', category: 'Decisions', description: 'Radio selection followed by reflective open prompt.' },
  { key: 'choose_path', name: 'Choose Path', category: 'Decisions', description: 'Action choice leading to follow-up reflective questions.' },
  { key: 'decision_tree', name: 'Decision Tree', category: 'Decisions', description: 'Interactive multi-node path traversal to determine prudence.' },
  { key: 'option_comparison', name: 'Option Comparison', category: 'Decisions', description: 'Comparative cards displaying trade-offs, risks, and benefits.' },
  { key: 'branching_scenario', name: 'Branching Scenario', category: 'Decisions', description: 'Multi-step scenario flow reacting to adaptive circumstances.' },

  // Allocation & Budgeting
  { key: 'allocation_basket', name: 'Allocation Basket', category: 'Allocation', description: 'Item quantity selector with real-time budget depletion.' },
  { key: 'allocation_slider', name: 'Allocation Slider', category: 'Allocation', description: 'Multi-category budget sliders with auto-balanced total.' },
  { key: 'budget_prioritizer', name: 'Budget Prioritizer', category: 'Allocation', description: 'Priority ranking from highest urgency to discretionary.' },
  { key: 'need_want_sorter', name: 'Need vs Want Sorter', category: 'Allocation', description: 'Categorization into Need, Want, or Depends.' },

  // Sorting & Matching
  { key: 'sort_into_buckets', name: 'Sort into Buckets', category: 'Sorting', description: 'Categorize cards into predefined money buckets with feedback.' },
  { key: 'cash_flow_classifier', name: 'Cash Flow Classifier', category: 'Sorting', description: 'Classify items as Income, Expense, Transfer, or Borrowing.' },
  { key: 'drag_drop_trade', name: 'Double Coincidence Trade', category: 'Sorting', description: 'Cycle through barter trades to solve the double coincidence of wants.' },
  { key: 'match_pairs', name: 'Match Pairs', category: 'Sorting', description: 'Pair financial definitions and concepts together.' },
  { key: 'sequence_ordering', name: 'Sequence Ordering', category: 'Sorting', description: 'Arrange financial steps into the logical chronological order.' },

  // Calculators & Projections
  { key: 'numeric_calculator', name: 'Numeric Calculator', category: 'Calculators', description: 'Step-by-step financial formula solver with live inputs.' },
  { key: 'range_estimator', name: 'Range Estimator', category: 'Calculators', description: 'Slider or input estimation against tolerance bounds.' },
  { key: 'goal_planner', name: 'Goal Planner', category: 'Calculators', description: 'Target, monthly contribution, and time horizon calculator.' },
  { key: 'net_worth_calculator', name: 'Net Worth Calculator', category: 'Calculators', description: 'Assets minus Liabilities balance sheet calculator.' },
  { key: 'inflation_calculator', name: 'Inflation Calculator', category: 'Calculators', description: 'Calculates purchasing power erosion over time.' },
  { key: 'loan_repayment_calculator', name: 'Loan Repayment Calculator', category: 'Calculators', description: 'Principal, interest rate, and total cost of borrowing.' },
  { key: 'savings_growth_calculator', name: 'Savings Growth Calculator', category: 'Calculators', description: 'Visualizes compound savings balance accumulation.' },
  { key: 'progress_tracker', name: 'Progress Tracker', category: 'Calculators', description: 'Visual tracker toward a savings milestone.' },

  // Simulations & Analysis
  { key: 'scenario_simulator', name: 'Scenario Shock Simulator', category: 'Simulation', description: 'Simulates financial shocks (transport spike, income drop).' },
  { key: 'simulation_compare_rounds', name: 'Simulation Compare Rounds', category: 'Simulation', description: 'Compares barter vs money economy friction rounds.' },
  { key: 'risk_reward_comparison', name: 'Risk & Reward Comparison', category: 'Simulation', description: 'Evaluates certainty vs volatility scenarios.' },
  { key: 'timeline_builder', name: 'Timeline Builder', category: 'Simulation', description: 'Milestone journey with months and steps.' },

  // Assessment & Reflection
  { key: 'multiple_choice_quiz', name: 'Multiple Choice Quiz', category: 'Assessment', description: 'Classic single-choice assessment with explanation.' },
  { key: 'multi_select', name: 'Multi-Select', category: 'Assessment', description: 'Select all qualifying answers with instant checking.' },
  { key: 'true_false', name: 'True / False Statements', category: 'Assessment', description: 'Evaluates financial assertions with feedback.' },
  { key: 'confidence_reflection', name: 'Confidence Reflection', category: 'Assessment', description: 'Self-assessed metacognition slider & thoughts.' },
];

export default function GalleryPage() {
  const [examples, setExamples] = useState<Record<string, any>>({});
  const [selectedKey, setSelectedKey] = useState<string>('choice_with_reflection');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lastEvent, setLastEvent] = useState<{ timestamp: string; payload: any } | null>(null);
  const [renderNonce, setRenderNonce] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchInteractionExamples();
        setExamples(res.examples || {});
      } catch (err) {
        console.error('Failed to load examples:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['all', 'Decisions', 'Allocation', 'Sorting', 'Calculators', 'Simulation', 'Assessment'];

  const filteredWidgets = WIDGET_METAS.filter((w) => {
    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedMeta = WIDGET_METAS.find((w) => w.key === selectedKey) || WIDGET_METAS[0];
  const currentConfig = examples[selectedKey] || { title: selectedMeta.name };

  const handleComplete = (payload: any) => {
    setLastEvent({
      timestamp: new Date().toLocaleTimeString(),
      payload,
    });
  };

  const handleReset = () => {
    setLastEvent(null);
    setRenderNonce((n) => n + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-zinc-400 text-sm">
        Loading 30-Widget Sandbox catalog...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive Component Library • 30 Widgets
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Author Interaction Sandbox
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl">
          Test, preview, and inspect all 30 custom financial interaction components created by the curriculum author. Test state changes and observe live <code className="text-emerald-400">onComplete</code> lifecycle callbacks.
        </p>
      </header>

      {/* Main Sandbox Layout: Sidebar + Canvas + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Widget Selector */}
        <div className="lg:col-span-4 space-y-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search 30 widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List of widgets */}
          <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
            {filteredWidgets.map((w) => {
              const isSelected = w.key === selectedKey;
              return (
                <button
                  key={w.key}
                  onClick={() => {
                    setSelectedKey(w.key);
                    setLastEvent(null);
                    setRenderNonce((n) => n + 1);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-emerald-600/20 border border-emerald-500/40 text-white shadow-sm'
                      : 'hover:bg-zinc-800/60 text-zinc-300 border border-transparent'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate">{w.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 block truncate">
                      {w.key}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 shrink-0">
                    {w.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Live Interactive Canvas + Inspector */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Widget Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedMeta.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  widget_type: <strong>{selectedMeta.key}</strong>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1">{selectedMeta.name}</h2>
              <p className="text-xs text-zinc-400 mt-0.5">{selectedMeta.description}</p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 text-xs font-medium text-zinc-200 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset State
            </button>
          </div>

          {/* Interactive Renderer Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl relative overflow-hidden">
            <InteractionRenderer
              key={`${selectedKey}-${renderNonce}`}
              widgetType={selectedKey}
              config={currentConfig}
              onComplete={handleComplete}
            />
          </div>

          {/* Event Inspector & Config Payload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* onComplete Event Inspector */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <Play className="h-3.5 w-3.5 text-emerald-400" /> onComplete Event Stream
                </h3>
                {lastEvent ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Fired at {lastEvent.timestamp}
                  </span>
                ) : (
                  <span className="text-[11px] text-zinc-500 font-mono">Awaiting user action...</span>
                )}
              </div>

              <pre className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-emerald-400/90 overflow-x-auto max-h-48">
                {lastEvent ? JSON.stringify(lastEvent.payload, null, 2) : '// Complete the interaction above to view callback data'}
              </pre>
            </div>

            {/* Input Config Payload */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <Code2 className="h-3.5 w-3.5 text-emerald-400" /> Author Config Payload
                </h3>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {Object.keys(currentConfig).length} properties
                </span>
              </div>

              <pre className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-48">
                {JSON.stringify(currentConfig, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
