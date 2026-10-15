'use client';

import React from 'react';
import { interactionRegistry, InteractionProps } from './InteractionKit';

export interface InteractionRendererProps extends InteractionProps {
  widgetType: string;
}

export default function InteractionRenderer({ widgetType, config, onComplete }: InteractionRendererProps) {
  if (widgetType === 'tbd') {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 p-8 text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Interaction Coming Soon
        </div>
        <h3 className="text-base font-bold text-white">{config?.title || 'Interactive Activity'}</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          This activity is currently being authored by the curriculum team. You can continue to the next item.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onComplete?.({ completed: true, answers: null })}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-xs font-semibold text-zinc-200 border border-zinc-700 cursor-pointer transition-colors"
          >
            Mark Activity as Reviewed
          </button>
        </div>
      </div>
    );
  }

  const Component = interactionRegistry[widgetType];

  if (!Component) {
    return (
      <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-6 text-center space-y-2">
        <h3 className="text-sm font-bold text-rose-300">Unsupported interaction</h3>
        <p className="text-xs text-zinc-400">
          No component is registered for &ldquo;<code className="text-rose-400">{widgetType}</code>&rdquo;.
        </p>
      </div>
    );
  }

  return <Component config={config} onComplete={onComplete} />;
}
