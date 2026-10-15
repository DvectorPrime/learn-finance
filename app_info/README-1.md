# Financial Literacy App: Curriculum JSON (Modules 1 and 2)

Developer handoff. This explains what `curriculum.json` contains, how to read it, and how to turn it into the **Learning Track** and **Evaluation Track** screens.

| File | What it is |
|---|---|
| `curriculum.json` | The single source of truth: all content, interaction configs, quiz questions, evaluation rules, glossary, and a validation report |
| `curriculum.schema.json` | JSON Schema (draft 2020-12). Validate the content file with it in CI. It currently passes with 0 errors |
| `README.md` | This file |

---

## 1. The idea in one picture

A Brilliant-style app: short mobile "cards" that teach through doing. Learners read a little, then immediately use it (sort, calculate, decide), and are evaluated as they go.

```
 LEARNING TRACK                                   EVALUATION TRACK
 (what the learner does)                          (how we measure it)

 Module                                           Group quiz        (after each Group)
  └ Submodule                                     Practice quiz     (extra help, never blocks)
     └ Chapter                                    Content final     (whole unit)
        └ Lesson ───────────────────────────────► Challenge        (open reasoning, rubric)
           └ Content                              Lesson assessment (integrated task)
              └ Group                             Module capstone
                 └ Items (ordered):
                    slide | case_study |          + concept mastery, misconceptions,
                    widget | quiz | challenge       goals & tasks, completion metrics
```

Every quiz/challenge in the Learning Track is also listed in `evaluation_track.assessment_index`, so the Evaluation Track can be built without walking the tree.

---

## 2. Top-level keys of `curriculum.json`

| Key | Purpose |
|---|---|
| `meta` | Version, scope, locale (`en-NG`), currency (NGN), provenance notes |
| `conventions` | **Read this first.** ID scheme, item kinds, widget types, question types, content-block types, status values, suggested screens |
| `design_rules` | Product/pedagogy rules from the syllabus (structure, mobile-first, privacy, feedback) |
| `difficulty_framework` | Planned depth by difficulty level (Low to Very High) |
| `learning_track.modules[]` | The actual curriculum tree |
| `evaluation_track` | Scoring, gating, mastery model, metrics, misconception catalogue, data contracts, `assessment_index` |
| `glossary.concepts[]` | Concept IDs used as tags on slides, widgets and questions |
| `references` | Academic and Nigerian official sources (edition not yet confirmed) |
| `source_conflicts_and_gaps` | Decisions taken and open questions (**read before building**) |
| `validation_report` | Counts, structural gaps, arithmetic checks |

---

## 3. The Learning Track tree

```
module (M1)
 └ submodules[] (SM1.1)
    └ chapters[] (CH01)
       └ lessons[] (L01)               ← difficulty, evaluation{}, lesson_assessment{}
          └ contents[] (L01.CT1)       ← objective, groups[], final_quiz, practice_quizzes[]
             └ groups[] (L01.CT1.G3)   ← objective, items[]  (ordered)
                └ items[] (L01.CT1.G3.I04)  ← discriminated by "kind"
```

Module 2 also has `module.capstone` (`M2.CAP`).

### ID scheme

`M1` · `SM1.1` · `CH01` · `L01` · `L01.CT1` · `L01.CT1.G3` · `L01.CT1.G3.I04` · `L01.CT1.G3.I04.Q1` · `L16.CT2.FQ` (content final quiz) · `L01.LA` (lesson assessment).
Lessons and chapters are numbered globally across modules (Module 2 starts at Chapter 5 / Lesson 16). **Use these IDs as primary keys for progress tracking**; do not rely on titles.

### Rendering rule (important)

`group.items` is an **ordered array and the order is the intended sequence**. The syllabus deliberately has no fixed order: a Group may start with a case study, a widget, or a slide. Just render in order and switch on `item.kind`.

### Item kinds

| `kind` | Component | Key fields |
|---|---|---|
| `slide` | `SlideCard` | `title`, `subtitle`, `body[]` (blocks), `key_takeaway?`, `concepts[]` |
| `slide_set` | placeholder | `topics[]` (outline only, see section 9) |
| `case_study` | `CaseStudyPlayer` | `scenario{narrative, characters, data}`, `prompts[]`, `debrief`, `key_takeaway` |
| `widget` | `WidgetHost` | `widget_type`, `config{}`, `feedback` |
| `quiz` | `QuizPlayer` | `quiz_mode`, `questions[]` |
| `challenge` / `capstone` | `ChallengePlayer` | `task`, `stages?`, `fields?`, `rubric[]` |

Every item has `id`, `order`, `title`, `subtitle` (the one-sentence learning purpose, show it under the title), and `authoring_status`.

### Slide body blocks

`body` is an array of typed blocks, so your renderer controls the look:

```json
{ "kind": "slide", "title": "Welcome to Barter",
  "subtitle": "Learn the name for exchanging goods and services directly without money.",
  "body": [
    { "type": "paragraph", "text": "This arrangement is called barter." },
    { "type": "definition", "term": "Barter", "text": "The direct exchange of goods or services…" },
    { "type": "bullet_list", "items": ["A farmer exchanging yams for fish.", "…"] }
  ],
  "concepts": ["barter"] }
```

Block types: `paragraph`, `bullet_list`, `numbered_list`, `callout`, `example`, `definition`, `table{columns, rows}`.

### Case study

```
 ┌───────────────────────────────┐
 │ The Data-and-Snack Mystery    │  title + subtitle
 │ ───────────────────────────── │
 │ scenario.narrative            │  story card
 │ scenario.data  (table/chips)  │  numbers to show
 │ prompts[0..n]                 │  one at a time; learner answers/reflects
 │ debrief                       │  shown after the last prompt
 └───────────────────────────────┘
```

`prompts[].response_type` is `reflection` (free thought, unscored) or `text_or_numeric` / `numeric` with an `expected_answer` you can compare against. Case studies have `assessed: false`: they teach, they do not affect scores, unless you choose to.

### Widgets

`widget_type` selects the UI component; `config` holds the data. Types in this release:

| `widget_type` | Interaction | Main `config` keys |
|---|---|---|
| `sort_into_buckets` | Drag cards into buckets | `buckets[]`, `cards[{label,bucket,feedback}]` |
| `numeric_calculator` | Inputs → formula → result | `inputs[]`, `formula`, `outputs[]`, `expected_result` |
| `allocation_slider` | Split a total across categories | `total`, `categories[]`, `constraints[]` |
| `allocation_basket` | Pick priced items within a budget | `budget`, `catalogue`, `constraint` |
| `option_comparison` | Compare options, benefits/risks | `scenario`, `options[]`, `learner_task` |
| `scenario_simulator` | Apply a shock, then re-plan | `start_state`, `shock_events[]` |
| `choose_path` | Decide → simulated delay → reflect | `setup`, `choices[]`, `after_pause_questions[]` |
| `progress_tracker` | Step through contributions | `target`, `start`, `contributions[]`, `expected_balances[]` |
| `simulation_compare_rounds` | Same task under two systems; compare counts | `rounds[]`, `tracked_metrics` |
| `drag_drop_trade` | Drag items between characters | `characters_spec`, `success_condition` |
| `choice_with_reflection` | Pick one, then short reflection | `options[]`, `follow_up_prompt` |
| `tbd` | Outline placeholder | (none) |

Example, a calculator (`L16.CT2.G1`):

```json
{ "widget_type": "numeric_calculator",
  "config": {
    "inputs": [{"id":"balance","label":"Available balance","default":35000,"unit":"NGN"},
               {"id":"pre_payday","default":8000,"unit":"NGN"}, {"id":"bill","default":12000,"unit":"NGN"}],
    "formula": "balance - pre_payday - bill",
    "expected_result": 15000 } }
```

Computation-type widgets give `formula` as a plain arithmetic string over input ids. Evaluate it with a safe expression parser, never `eval`.

### Question types

| `type` | Answer UI | Grading |
|---|---|---|
| `single_choice` | option buttons | `correct` = option id (`"A"`…) |
| `true_false` | two buttons | `correct` = boolean |
| `numeric` | number field | `abs(answer - correct) <= tolerance`; `unit` is `NGN` for money |
| `classify` | choose one of `categories[]` | `correct` = category string |
| `short_answer` | text box | `model_answer` + `key_points[]`; see Evaluation Track |

Every question has `explanation`. **Show it after each answer.** The design rule is explanatory feedback, never just "correct/wrong". Questions may carry `concepts[]` and `misconception` (see section 5).

### Challenges (DIY reasoning) and capstone

Open-ended tasks scored against `rubric[]` (`criterion`, `description`, `max_score: 3`). They may have `stages[]` (multi-step) and/or `fields[]` (a structured form). No single right answer is expected; the rubric measures reasoning. See section 5 for how to score.

---

## 4. Learning Track runtime behaviour (suggested)

```
Lesson list ─► Group ─► item 1 ─► item 2 ─► … ─► Group quiz ─► next Group … ─► Content final quiz ─► next Content
                         │
          item states:  locked → available → in_progress → completed
```

- A Group's items play in `order`. "Next" is enabled when the current item is completed (slide: viewed; widget/case: finished; quiz: submitted).
- Next Group unlocks when the previous Group is done. Next Content unlocks when the previous `final_quiz` passes (thresholds in section 5).
- Show a progress bar per Group (items done / items total).
- `authoring_status: "outline"` items must render a graceful **"Coming soon"** card and be auto-skippable or locked (see section 9).

---

## 5. Evaluation Track

> **Provenance.** The syllabus defines *what* is assessed (a quiz per Group, a final quiz per Content, challenges, a capstone, application over recall). Numbers below (weights, pass marks, mastery formula) are **proposed defaults** (`status: "proposed_default"` in the JSON). Make them configurable and let the product team tune them.

### 5.1 Assessment types

| Type | Where in JSON | Weight | Blocks progress? |
|---|---|---|---|
| `group_quiz` | `group.items[kind=quiz]` | 1.0 | gentle gate |
| `practice_quiz` | `quiz_mode=practice_quiz` | 0.8 | never |
| `content_final` | `content.final_quiz` | 1.5 | yes (≥ 0.75) |
| `challenge` | `group.items[kind=challenge]` | 2.0 | no |
| `lesson_assessment` | `lesson.lesson_assessment` | 2.0 | no |
| `module_capstone` | `module.capstone` | 3.0 | no |

### 5.2 Scoring

- Auto-graded types (`single_choice`, `true_false`, `numeric`, `classify`): 1 or 0 × `points`.
- Rubric-graded (`challenge`, `capstone`): each criterion 0–3; `score = sum / (3 × criteria)`.
- `short_answer`: coverage of `key_points` (≥ 0.67 counts as correct; otherwise partial credit). How you detect coverage is up to you: keyword match, self-check checklist, or an LLM grader later.
- Store first-attempt and best score separately. Retries are unlimited.

### 5.3 Concept mastery

Every slide, widget, question and challenge is tagged with `concepts[]` (IDs defined in `glossary.concepts`). That makes mastery computable per concept, not just per quiz:

```
mastery(concept) = Σ( weight_of_assessment × question_score ) / Σ( weight )   over the last 8 tagged responses
bands:  < 0.6 learning   ·   0.6–0.8 proficient   ·   ≥ 0.8 mastered
```

### 5.4 Misconceptions

`evaluation_track.misconception_catalog` lists common wrong beliefs (for example *"money and wealth are the same"*, *"a discount means I saved money"*). Questions that probe one carry `misconception: "<id>"`. A wrong answer increments that misconception's counter; the dashboard can say *"You tend to treat discounts as savings. Revisit L20 → Discount No Mean Free."*

### 5.5 Goals and tasks

Each lesson has `evaluation.goals[]`, one per Content unit:

```json
{ "id": "L16.CT2.GOAL", "statement": "Build a simple picture of money available…",
  "mastery_threshold": 0.75,
  "linked_assessments": ["L16.CT2.G1.I03", "L16.CT2.FQ", "…"],
  "concept_tags": ["asset", "liability", "net_worth", "cash_flow"] }
```

- **Goal progress** = best weighted score across `linked_assessments` ÷ `mastery_threshold` (capped at 1).
- **Tasks** are challenges, `lesson_assessment`, and the `M2.CAP` capstone. A task is passed when its rubric score ≥ 0.6.
- The **GoalsAndTasksBoard** shows each goal (progress bar) and each task (not started / submitted / passed), plus a "next recommended step".

### 5.6 Metrics

`evaluation_track.metrics[]` defines each metric with scope and formula: `accuracy_first_attempt`, `accuracy_best`, `retry_count`, `concept_mastery`, `misconception_rate`, `rubric_score`, `goal_progress`, `lesson_mastery`, `completion_rate`, `time_on_item` (optional) and `item_difficulty_empirical` (share of learners who get a question right first time; used to check the predicted difficulty tiers against reality).

### 5.7 Data you need to store

`evaluation_track.data_contracts` gives suggested shapes for `learner_profile`, `item_progress`, `attempt`, `concept_mastery`, `goal_progress`. The content JSON is read-only; learner data lives in your backend.

### 5.8 Suggested screens

| Screen | Data it reads |
|---|---|
| **QuizResult** | the attempt + each `question.explanation` + concepts to revisit |
| **MasteryDashboard** | `concept_mastery` + `glossary` + misconception counters |
| **GoalsAndTasksBoard** | `lesson.evaluation.goals`, challenges, capstone |
| **LessonReport** | `lesson_mastery`, strengths, remediation links |

Full list with Learning Track screens is in `conventions.ui_screens`.

---

## 6. Worked example: walking one Group

`L16.CT1.G1` ("Follow the Money"), items in order:

```
I01 slide    Your Balance Has a Backstory      → SlideCard
I02 slide    Money Enter, Money Comot          → SlideCard
I03 widget   Sort Am Correctly (sort_into_buckets) → drag cards to "Money in"/"Money out"
I04 quiz     In or Out? (4 classify questions) → QuizPlayer, explanation after each answer
```

On quiz submit: write an `attempt`, update `concept_mastery` for `income`, `expense`, and `liability` (question 3 is tagged `misconception: borrowing_is_free_cash`), mark the Group complete, unlock `L16.CT1.G2`.

---

## 7. What is in the file, honestly

| Area | State |
|---|---|
| **Module 2** (Lessons 16–21 + capstone) | Fully authored: slides, case studies with numbers, widget configs, challenges, quizzes |
| **Module 1, Lesson 1** | Fully authored (7 Groups, 20 slides, 4 widgets, 5 case studies, 2 group quizzes, 10-question final quiz) |
| **Module 1, Lessons 2–15** | **Outline only**: group titles, case-study titles, slide topic lists, widget and quiz titles. No slide text or questions yet |
| **Evaluation rules** | Structure from the syllabus; thresholds, weights, formulas, gamification are proposed defaults |

Counts (from `validation_report`): 21 lessons, 38 Content units, 108 Groups. 100 items are authored, 4 are partial and 334 are outline items (all in Module 1, Lessons 2–15). 64 authored questions. Every arithmetic example in the authored content is re-checked by the build (`arithmetic_all_ok: true`).

## 8. Known structural gaps (the content team's to-do list)

The syllabus rules say *every Group has a quiz* and *every Content has a final quiz*. The authored text does not fully meet that yet. Exact IDs are in `validation_report.findings`:

- **17 Groups without a quiz.** Includes Lesson 1 Groups 1, 2, 4, 6, 7 and many Module 2 Groups.
- **8 Content units without a final quiz**, all in Module 2 (for example `L16.CT1`, `L17.CT1`, `L18.CT1/CT2`, `L19.CT1`, `L20.CT1/CT2`, `L21.CT1`). The Lesson 16 quiz is labelled "Content 1" in the source but covers both contents, so it is attached to `L16.CT2` with `covers_contents`.
- **4 widgets** still contain `AUTHOR_TODO` text in `config` (paths in `validation_report.findings[author_todo_placeholders]`), marked `authoring_status: "partial"`. Render a generic version or hide them until data is supplied.
- Lesson-level assessments for High/Very High lessons are placeholders (`required_not_authored` / `recommended_not_authored`).

**Your UI should handle empty `questions: []` and `authoring_status: "outline"` gracefully**; the JSON is designed so that authoring more content never needs a code change.

## 9. Handling outline items

For Lessons 2–15, a Group looks like this:

```json
{ "id": "L02.CT1.G1", "title": "Where Your Money Comes From",
  "items": [
    { "kind": "case_study", "title": "A Student Receiving an Allowance", "authoring_status": "outline" },
    { "kind": "slide_set", "topics": ["Allowance", "salary", "sales", "gifts", "and other income"], "authoring_status": "outline" },
    { "kind": "widget", "title": "Identify the Source of Income", "widget_type": "tbd", "authoring_status": "outline" },
    { "kind": "quiz", "title": "Income or Something Else?", "questions": [], "authoring_status": "outline" } ] }
```

Suggested behaviour: show the lesson map and lesson overview from titles (useful for navigation and demos), but mark the lesson **"Coming soon"** and do not let learners enter outline-only Groups. A feature flag like `showOutlineLessons` is handy for internal demos.

## 10. Open decisions (also in `source_conflicts_and_gaps`)

- **SC-01** Lesson 1 exists in two shapes in the source (5 Groups/30 slides vs 7 Groups/20 slides). The JSON uses the 7-Group authored version. The alternative group titles are stored in the conflict entry.
- **SC-05** Overlap between Module 1 (Lessons 2, 12–15) and Module 2 (Lessons 16, 17, 20): income/assets/net worth, needs vs wants, impulse spending, opportunity cost. Both are kept; the curriculum owner should decide whether to merge, or keep for reinforcement.
- **SC-04** Module 2 lesson difficulties are proposed (`difficulty_source: "proposed"`).

## 11. Suggested build order

1. Load JSON, validate with `curriculum.schema.json`.
2. `ModuleMap` → `LessonOverview` → `GroupPlayer` with `SlideCard` (Lesson 16 is the best test: it is complete).
3. `QuizPlayer` with the five question types + explanation sheet; write `attempt` records.
4. Widgets in order of reuse: `sort_into_buckets`, `numeric_calculator`, `allocation_slider`, `progress_tracker`, then the rest.
5. `CaseStudyPlayer` and `ChallengePlayer` (rubric self-check first; automated grading later).
6. Evaluation Track: mastery computation, `QuizResult`, `GoalsAndTasksBoard`, `MasteryDashboard`.
7. Gamification (optional): XP, streaks and badges, see `evaluation_track.gamification_suggestions`.

## 12. Conventions and cautions

- Currency is NGN. Display as `₦15,000`; store numbers as plain integers.
- All money amounts and names in the content are **fictional examples**, not benchmarks or financial advice. Keep that framing in the UI where figures appear.
- **Privacy:** never ask learners for account numbers, PINs or passwords (design rule).
- Text uses Nigerian Pidgin in titles ("Wetin Money Actually Dey Do"). Keep it as written; use UTF-8 throughout.
- Academic references (`references`) are not yet edition-verified. Do not show chapter numbers in the UI.
- Unknown `kind`, `widget_type` or block `type` values should fall back to a harmless placeholder rather than crash, because new content will add types.
