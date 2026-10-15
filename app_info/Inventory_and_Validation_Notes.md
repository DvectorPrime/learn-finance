# Inventory and Validation Notes

## Source inventory measured from the supplied `curriculum.json`

- Widget nodes found: **97**.
- Nodes with a concrete `widget_type` before this work: **12**.
- Nodes marked partial before this work: **4**.
- Nodes marked outline with `widget_type: "tbd"`: **81**.
- Reusable React interaction component types built here: **30**.
- Working example configurations supplied: **30**.

The source notes in the request refer to 108 widgets. The supplied JSON copy contains 97 widget nodes under a recursive count of `kind: "widget"` or a `widget_type` field. That difference needs reconciling against the source of the 108 count before treating this as complete coverage of every authored instance.

## Four partial configs resolved

- `L01.CT1.G2.I02` — Make the Trade Work.
- `L01.CT1.G4.I04` — Build a ₦10,000 Basket.
- `L17.CT2.G1.I02` — Budget Shock Simulator.
- `L18.CT1.G1.I03` — Pick a Realistic Starting Point.

## Scope boundary

This work creates the reusable interaction layer and fills those four partial configs. It does **not** author all 81 outline widgets, their questions, or missing lesson content. Those still need content-specific configuration and answer/feedback review.

## Verification performed

- JSON files parsed successfully.
- Registry and sample-config type counts checked.
- React/TypeScript syntax checked for parse errors with TypeScript's transpilation parser.
- A full `npm run build` could not be verified in this environment because package installation did not complete; run `npm install` and `npm run build` in the developer's environment before merging.
