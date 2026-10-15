# Financial Literacy Interaction Kit

A config-driven React + TypeScript interaction library for the Nigerian financial-literacy app. It includes **30 reusable interaction components**, a preview app, example configs, the four completed partial widget configs from the curriculum JSON, and a patched curriculum JSON copy.

## What is included

- `src/components/InteractionKit.tsx` — 30 named React interaction components and the `interactionRegistry`.
- `src/components/InteractionRenderer.tsx` — renders a component by `widget_type`.
- `src/configs/interaction_examples.json` — one working sample configuration per component type.
- `src/configs/curriculum_patched.json` — source curriculum JSON with the four partial widgets completed.
- `docs/INTERACTION_GUIDE.md` — behavior, events, config expectations, and implementation notes for all 30 interaction types.
- `docs/FOUR_WIDGETS.md` — the four formerly partial widgets and their finalized configs/learning behavior.
- `src/App.tsx` — local interaction preview app.

## Run the preview locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Select any of the 30 interaction types in the dropdown. Complete the activity and inspect the emitted completion event.

To create a production build:

```bash
npm run build
```

## Render an interaction inside the app

```tsx
import InteractionRenderer from './components/InteractionRenderer';

<InteractionRenderer
  widgetType="allocation_basket"
  config={widget.config}
  onComplete={(result) => {
    // Persist attempt, score, completion state, and answers through your app API.
    console.log(result);
  }}
/>
```

The renderer expects a `widget_type` string and a JSON-compatible `config`. Keep behavior in the component and lesson-specific content in the config; this lets content authors change prices, options, examples, and expected answers without changing React code.

## Completion event contract

Every component can call `onComplete` with:

```ts
{
  completed: true,
  answers: unknown,
  score?: number,
  total?: number
}
```

`answers` contains the submitted choices or calculated values. Components without a single objectively correct answer omit a score; use rubric-based assessment on the server if required. The current kit does not transmit, persist, or request sensitive personal financial information.

## Curriculum integration

The patched curriculum is a **copy**; the original source file is unchanged. Four widgets that had `authoring_status: "partial"` now have completed example data and component-compatible config:

1. `L01.CT1.G2.I02` — `drag_drop_trade` / **Make the Trade Work**
2. `L01.CT1.G4.I04` — `allocation_basket` / **Build a ₦10,000 Basket**
3. `L17.CT2.G1.I02` — `scenario_simulator` / **Budget Shock Simulator**
4. `L18.CT1.G1.I03` — `option_comparison` / **Pick a Realistic Starting Point**

## Important inventory note

The supplied `curriculum.json` contains **97 widget nodes** when counted by `kind: "widget"` or `widget_type`: 12 already have concrete widget types, 4 were partial, and 81 are still outline entries with `widget_type: "tbd"`. Your earlier project note mentions 108 widgets. This file therefore does not contain all 108 as fully enumerated widget nodes, or the counts use different counting rules. The 30 components are **reusable interaction types**, not 30 authored widget instances. They provide a component layer that can power many instances, but the 81 outline widgets still need specific data/configs before they can be rendered as authored activities.

## Production work still needed

- Connect `onComplete` to your authentication, progress, and analytics services.
- Add server-side validation and scoring for assessments; never trust client scores for high-stakes evaluation.
- Add unit/integration tests for all component types and verify all curriculum configs against a schema.
- Review educational answer keys and calculations with the curriculum owner.
- Confirm mobile accessibility, keyboard operation, screen-reader labels, localization, and reduced-motion behavior.
- Decide how to represent free-text answers, partial credit, retries, hints, and explanations consistently.
- Author the remaining `tbd` widgets and any missing quiz/case-study content separately; components cannot replace missing instructional data.

## Financial safety and accuracy

All sample amounts are fictional instructional values. Calculators are simplified educational models, not financial recommendations. In particular, the loan calculator uses simple interest, and the savings projection is only as reliable as its assumptions.
