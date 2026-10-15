# Interaction Behavior Guide

## Shared behavior contract

All 30 interactions are exported from `src/components/InteractionKit.tsx` and registered by `widget_type`. The lesson config supplies the title, subtitle/prompt, items, values, constraints, and expected answers. The component owns temporary UI state. When the learner submits or completes an activity, the component emits `onComplete({ completed: true, answers, score?, total? })`.

Recommended event lifecycle for the production app:

1. **Mount** — validate the widget config and initialize state from defaults.
2. **Input/change** — update local state and clear any stale validation message.
3. **Check/submit** — validate required fields and constraints, then calculate score/result if objective scoring exists.
4. **Feedback** — show a specific explanation or a next-step prompt; avoid only showing “correct/wrong”.
5. **Complete** — emit the result payload to the app shell; the app can save it, update progress, and unlock the next activity.
6. **Retry** — reset the component state or remount it with a new attempt key. Do not overwrite the prior attempt in analytics.

## The 30 components

### 1. `choice_with_reflection`
**Component:** `ChoiceWithReflection`  
**Learner action:** Select one option and explain the reasoning in free text.  
**Behavior:** Submit is disabled until an option and explanation are provided. The response is recorded without automatic right/wrong scoring.  
**Config:** `prompt`, `options: [{id, label}]`, optional `follow_up_prompt`.  
**Event data:** `{choice, reflection}`.

### 2. `drag_drop_trade`
**Component:** `DragDropTrade`  
**Learner action:** Assign an available item to each trader.  
**Behavior:** The learner chooses the item each character receives; the check compares it with the item that character wants. Feedback reports the number of satisfied wants and reinforces the double coincidence of wants. The current accessible implementation uses selects rather than pointer-only drag-and-drop.  
**Config:** `people: [{id, name, has, wants}]` or compatible `characters`.  
**Event data:** `{matches}`; score is the number of satisfied recipients.

### 3. `simulation_compare_rounds`
**Component:** `SimulationCompareRounds`  
**Learner action:** Run through two or more rounds, recording failed attempts and successful exchanges.  
**Behavior:** Each round has its own counters. After the final round, the learner submits a comparison reflection.  
**Config:** `rounds: [{id, label, task}]`.  
**Event data:** `{attempts, success, reflection}`.

### 4. `allocation_basket`
**Component:** `AllocationBasket`  
**Learner action:** Add or remove quantities from a priced catalogue.  
**Behavior:** Total and remaining budget update live. Submission is disabled when the basket is empty or over budget.  
**Config:** `budget`, `unit`, `catalogue: [{id, name, price}]`.  
**Event data:** `{qty, total, remaining}`.

### 5. `sort_into_buckets`
**Component:** `SortIntoBuckets`  
**Learner action:** Assign each card to a category.  
**Behavior:** Requires an answer for every card, then provides item-level feedback and an objective score.  
**Config:** `buckets: [{id, label}]`, `cards: [{id?, label, bucket, feedback?}]`.  
**Event data:** `{answers}`.

### 6. `numeric_calculator`
**Component:** `NumericCalculator`  
**Learner action:** Change numeric inputs and inspect a derived value.  
**Behavior:** Recalculates when inputs change. Formula evaluation uses a small allowlist of named formulas, not arbitrary JavaScript from content JSON.  
**Config:** `inputs: [{id, label, default}]`, `formula`, optional `unit`. Supported formulas in this starter: `balance - pre_payday - bill`, `ceil(target / contribution)`, `income - expenses`, `assets - liabilities`, and `target - saved`.  
**Event data:** `{values, result}`.

### 7. `allocation_slider`
**Component:** `AllocationSlider`  
**Learner action:** Allocate an available total across categories using sliders.  
**Behavior:** Shows allocated and remaining/over-budget totals. Submission is blocked if the allocation exceeds the available amount. No fixed recommended split is imposed.  
**Config:** `total`, `categories`, optional `defaults`, `step`, `unit`.  
**Event data:** `{alloc, sum, left}`.

### 8. `scenario_simulator`
**Component:** `ScenarioSimulator`  
**Learner action:** Apply a shock event and edit allocations to fit the changed income or costs.  
**Behavior:** Applies the selected shock, updates available income and affected allocations, then requires a balanced revised plan.  
**Config:** `start_state: {income, allocations}`, `shock_events: [{id, label, delta?, incomeDelta?}]`.  
**Event data:** `{shockId, alloc, newIncome, total}`.

### 9. `option_comparison`
**Component:** `OptionComparison`  
**Learner action:** Compare options and justify one choice.  
**Behavior:** Shows configured benefit, risk, and trade-off notes. Requires both a selected option and a written reason. Does not assume that one choice is universally correct.  
**Config:** `scenario`, `options: [{id, label, benefit?, risk?, tradeoff?}]`.  
**Event data:** `{choice, reason}`.

### 10. `choose_path`
**Component:** `ChoosePath`  
**Learner action:** Choose a route and answer follow-up reflection questions.  
**Behavior:** Displays the selected route and prompts. Use configured `outcomes` for specific consequences.  
**Config:** `setup`, `choices`, optional `outcomes`, `after_pause_questions` or `follow_up_questions`.  
**Event data:** `{choice, follow}`.

### 11. `progress_tracker`
**Component:** `ProgressTracker`  
**Learner action:** Record a contribution toward a target.  
**Behavior:** Shows amount saved, goal, amount remaining, and percentage progress; flags when the goal is reached.  
**Config:** `target`, `start`, optional `unit`.  
**Event data:** `{balance, target, remaining, percentage}`.

### 12. `multiple_choice_quiz`
**Component:** `MultipleChoiceQuiz`  
**Learner action:** Answer one multiple-choice question at a time.  
**Behavior:** Locks feedback until the learner checks the answer, displays the explanation, then moves to the next question. Final submit emits the score.  
**Config:** `questions: [{question, options: [{id, label}], correct_answer, explanation}]`.  
**Event data:** `{answers}`, `score`, `total`.

### 13. `multi_select`
**Component:** `MultiSelect`  
**Learner action:** Select all answers that apply.  
**Behavior:** Compares selected IDs with `correct_answers`; feedback makes clear that extra selections can be incorrect even when correct options were selected.  
**Config:** `prompt`, `options: [{id, label}]`, `correct_answers: string[]`.  
**Event data:** `{selected}`, `score`, `total`.

### 14. `sequence_ordering`
**Component:** `SequenceOrdering`  
**Learner action:** Move steps up/down to create a sequence.  
**Behavior:** Check compares the resulting order with `correct_order`; keyboard-accessible buttons are provided instead of requiring drag-only input.  
**Config:** `items`, `correct_order`.  
**Event data:** `{order}`, `score`, `total`.

### 15. `match_pairs`
**Component:** `MatchPairs`  
**Learner action:** Match each prompt with one of the available concepts.  
**Behavior:** Each left-side prompt has a select control populated by the right-side concepts; feedback reports correct matches.  
**Config:** `pairs: [{left, right}]`.  
**Event data:** `{answers}`, `score`, `total`.

### 16. `true_false`
**Component:** `TrueFalse`  
**Learner action:** Judge each statement as true or false.  
**Behavior:** The learner checks all statements together and receives each statement's explanation.  
**Config:** `statements: [{id, text, answer: boolean, explanation}]`.  
**Event data:** `{answers}`, `score`, `total`.

### 17. `range_estimator`
**Component:** `RangeEstimator`  
**Learner action:** Estimate a value, then compare it with a configured reference range.  
**Behavior:** Checks whether the entered estimate falls within the accepted range. This is intended for estimates where a tolerance is pedagogically appropriate.  
**Config:** `input_label`, `prompt`, `default_value`, `expected_min`, `expected_max`.  
**Event data:** `{value, low, high}` plus a binary score.

### 18. `budget_prioritizer`
**Component:** `BudgetPrioritizer`  
**Learner action:** Build an ordered priority list and explain why.  
**Behavior:** Items are added one at a time and can be removed. Feedback should compare the learner's order with scenario constraints, not blindly enforce one order for every household.  
**Config:** `items`, optional `priority_order`.  
**Event data:** `{ranked, reason}`.

### 19. `need_want_sorter`
**Component:** `NeedWantSorter`  
**Learner action:** Classify spending examples as a need, want, or context-dependent item.  
**Behavior:** Compares each selection to the author's suggested answer but feedback emphasizes context, purpose, and available alternatives.  
**Config:** `buckets`, `cards: [{id, label, answer}]`.  
**Event data:** `{answers}`, `score`, `total`.

### 20. `risk_reward_comparison`
**Component:** `RiskRewardComparison`  
**Learner action:** Rate potential reward, downside, and confidence in the information.  
**Behavior:** Records subjective ratings; the component intentionally does not declare a financial choice objectively correct.  
**Config:** `options: [{id, label}]`.  
**Event data:** `{ratings}`.

### 21. `decision_tree`
**Component:** `DecisionTree`  
**Learner action:** Select an option at each node in a configured tree.  
**Behavior:** The next node is selected by the chosen option's `next_node`; terminal options emit completion. The path can be reviewed in a details panel.  
**Config:** `start_node`, `nodes: {id: {prompt, options: [{id, label, next_node?, outcome?}]}}`.  
**Event data:** `{path, outcome}`.

### 22. `goal_planner`
**Component:** `GoalPlanner`  
**Learner action:** Set a target, current savings, and number of months remaining.  
**Behavior:** Calculates remaining amount and a simple required monthly contribution. It excludes interest, fees, and target-price changes.  
**Config:** `target`, `saved`, `months`.  
**Event data:** `{target, saved, months, remaining, monthly}`.

### 23. `cash_flow_classifier`
**Component:** `CashFlowClassifier`  
**Learner action:** Classify transactions as income, expense, transfer, or borrowing.  
**Behavior:** Provides objective feedback and reinforces that borrowing can create cash inflow and a repayment liability.  
**Config:** `categories`, `items: [{id, label, answer}]`.  
**Event data:** `{answers}`, `score`, `total`.

### 24. `net_worth_calculator`
**Component:** `NetWorthCalculator`  
**Learner action:** Edit asset and liability values.  
**Behavior:** Sums each side and calculates net worth as assets minus liabilities.  
**Config:** `assets: {name: value}`, `liabilities: {name: value}`.  
**Event data:** `{assets, liabilities, netWorth}`.

### 25. `inflation_calculator`
**Component:** `InflationCalculator`  
**Learner action:** Enter an earlier basket price, current basket price, and money amount.  
**Behavior:** Calculates the percentage price change and compares the number of baskets the same amount can buy at both prices.  
**Config:** `old_price`, `new_price`, `amount`.  
**Event data:** `{oldPrice, newPrice, amount, rate, oldUnits, newUnits}`.

### 26. `loan_repayment_calculator`
**Component:** `LoanRepaymentCalculator`  
**Learner action:** Enter principal, annual rate, and months.  
**Behavior:** Estimates simple interest, total repayment, and average monthly amount. The UI warns that real loan products may use different methods and fees.  
**Config:** `principal`, `annual_rate_percent`, `months`.  
**Event data:** `{principal, rate, months, interest, total, payment}`.

### 27. `savings_growth_calculator`
**Component:** `SavingsGrowthCalculator`  
**Learner action:** Enter starting balance, contribution per period, number of periods, and an assumed rate.  
**Behavior:** Projects repeated contributions with an optional assumed periodic rate. Default rate is zero; this is not a promised return.  
**Config:** `start`, `contribution`, `periods`, `periodic_rate_percent`.  
**Event data:** `{start, contribution, periods, rate, balance, contributed}`.

### 28. `timeline_builder`
**Component:** `TimelineBuilder`  
**Learner action:** Select milestones and note what might delay the plan.  
**Behavior:** Captures a simple goal timeline; a production version can visualize dates and dependencies.  
**Config:** `milestones: [{id, label, month, description?}]`.  
**Event data:** `{selected, notes}`.

### 29. `confidence_reflection`
**Component:** `ConfidenceReflection`  
**Learner action:** Rate confidence, explain uncertainty, and identify useful missing information.  
**Behavior:** Encourages metacognition; not scored automatically.  
**Config:** optional title and subtitle metadata.  
**Event data:** `{confidence, reason, next}`.

### 30. `branching_scenario`
**Component:** `BranchingScenario`  
**Learner action:** Make decisions in a multi-step story.  
**Behavior:** The selected option moves to the next configured step or produces an outcome. A history list lets the learner inspect earlier decisions.  
**Config:** `steps: [{id, prompt, options: [{id, label, next?, outcome?}]}]`.  
**Event data:** `{path, outcome}`.

## Config authoring conventions

- Use stable IDs for every option, card, category, node, and question. Never use the display title as a database key.
- Keep prices, amounts, labels, answer keys, and feedback in JSON, not hard-coded in the component.
- Store all currency amounts as numbers in naira; render them as currency in the UI.
- Include meaningful `subtitle`/`prompt`, specific feedback, and accessibility-friendly labels.
- Use fictional scenarios unless the curriculum explicitly cites a real event and the source is verified.
- Avoid asking learners to enter bank account numbers, PINs, passwords, or personal balances.
- Validate configs at build time. Unknown `widget_type` values should be reported as authoring errors before release, not silently displayed as blank screens.

## Known implementation limitations to address before release

This is a working starter kit, not a production-certified assessment platform. Some activities use simple text/select interactions rather than advanced drag/drop visuals. The numeric calculator intentionally supports an allowlist of formulas. Add schema validation, unit tests, localization checks, persisted attempt IDs, retry policy, robust accessibility tests, and server-side score verification before shipping.
