# Project Status: Learn Finance Platform

A gamified financial literacy application for Nigeria (`en-NG`, currency `NGN`), built with Next.js 16 + Tailwind CSS (frontend) and Express + TypeScript (backend) using **pnpm workspaces**. Designed for Nigerian secondary school and college students with a clean, minimal dark UI using an emerald + zinc block color system.

---

## 1. Project Overview & Architecture

### Workspace Layout
- `backend/` (Express + TypeScript, Port 5000)
  - Loads curriculum from `app_info/curriculum_patched.json` (resolves 4 completed widgets: `L01.CT1.G2.I02`, `L01.CT1.G4.I04`, `L17.CT2.G1.I02`, `L18.CT1.G1.I03`)
  - User Authentication with `bcryptjs` and `jsonwebtoken` (`/api/auth/*`)
  - Serves REST APIs for curriculum hierarchy, glossary, misconceptions, and 30 interaction examples
  - Persists learner progress, attempts, concept mastery, and goals conforming strictly to `evaluation_track.data_contracts`
  - Auto-grades 5 question types (`single_choice`, `true_false`, `numeric`, `classify`, `short_answer`), rubric scoring (0–3), concept mastery weighted algorithm across last 8 responses, misconception detection, and goal recalculation
  - Storage: Structured file-backed repository (`backend/data/store.json`) designed for seamless drop-in migration to MongoDB/Mongoose.
- `frontend/` (Next.js 16 App Router + Turbopack + Tailwind CSS v4, Port 3000)
  - Authentication flow (`AuthProvider`, `/login`, `/register`, user badge, and logout)
  - Interactive `ModuleMap` roadmap on `/` for Module 1 (Foundations) and Module 2 (Budgeting & Cash Flow)
  - Card-based `GroupPlayer` running slides, case studies, interactive widgets, quizzes, and challenges with progress bar and backend persistence
  - Author's **30 reusable interaction components** (`InteractionKit.tsx` & `InteractionRenderer.tsx`)
  - Evaluation Track screens: `MasteryDashboard` (`/mastery`), `GoalsAndTasksBoard` (`/goals`), `Glossary` (`/glossary`), and `Interaction Sandbox` (`/gallery`)
- `app_info/`: Authoritative curriculum data files:
  - `curriculum_patched.json`: Completed source of truth with 4 completed widgets
  - `InteractionKit.tsx`: Author's reference 30-component interaction library
  - `Financial_Interaction_Behavior_Guide.md` & `Four_Completed_Widget_Configs.md`: Behavioral documentation

---

## 2. Completed Milestones

### Milestone 1: Monolith Scaffolding
- [x] Initialized pnpm monorepo structure with `pnpm-workspace.yaml`.
- [x] Created root `package.json` with parallel development scripts (`pnpm dev`, `pnpm dev:frontend`, `pnpm dev:backend`, `pnpm build`).
- [x] Scaffolded `backend/` with Express, TypeScript (`tsc`), `tsx` watch mode, and CORS.
- [x] Scaffolded `frontend/` with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, and TypeScript.
- [x] Verified build processes and live communication between frontend and backend.

### Milestone 2: Backend Curriculum & Evaluation Engine
- [x] Database repository implementing `data_contracts` (`learner_profile`, `item_progress`, `attempt`, `concept_mastery`, `goal_progress`) with persistence in `backend/data/store.json`.
- [x] Curriculum loader reading `app_info/curriculum_patched.json` and indexing modules, lessons, groups, and assessments.
- [x] Evaluation service: auto-grading (5 question types), rubric scoring (challenges/capstone), concept mastery weighting algorithm, and misconception detection.
- [x] REST API routes (`/api/curriculum/*` and `/api/learner/*`).

### Milestone 3: Frontend Interaction Kit & Players
- [x] TypeScript types matching `curriculum.schema.json` and `widget-config.schema.json` in `frontend/src/types/curriculum.ts`.
- [x] Ported and styled the author's 30 interaction components in `frontend/src/components/interactions/InteractionKit.tsx` with accessible controls and `onComplete` lifecycle.
- [x] Dynamic `InteractionRenderer` with `widgetType` routing and fallback for `tbd` ("Coming soon") and unknown types.
- [x] Card players:
  - `SlideCard`: renders paragraph, bullet_list, numbered_list, callout, example, definition, and table content blocks.
  - `CaseStudyPlayer`: Nigerian characters, financial data chips, sequential prompts, and debrief.
  - `QuizPlayer`: auto-grading for 5 question types, instant feedback sheet, misconception tips, and confetti celebration.
  - `ChallengePlayer`: DIY scenarios, multi-stage prompts, and 0–3 self-check rubric.
  - `OutlinePlaceholder`: graceful preview for Module 1, Lessons 2–15 outlined topics.
  - `GroupPlayer`: card-by-card orchestrator with progress bar, active timer, keyboard/click navigation, and backend persistence.

### Milestone 4: Views & Evaluation Track Screens
- [x] `ModuleMap` roadmap on `/`: visual progress and difficulty bands for M1 and M2.
- [x] Lesson overview on `/lesson/[lessonId]`: learning units, group links, and evaluation objectives.
- [x] Group runner on `/group/[groupId]`: card-by-card runner hosting `GroupPlayer` with Next.js 16 Suspense partial prerendering.
- [x] `MasteryDashboard` on `/mastery`: Mastered (≥ 80%), Proficient (60–80%), and Learning (< 60%) bands + misconception catalog.
- [x] `GoalsAndTasksBoard` on `/goals`: unit goals, completion percentages, and Module 2 Capstone launcher.
- [x] `InteractionSandbox` on `/gallery`: live playground for all 30 interaction types with real-time `onComplete` event stream inspector and author payload viewer.
- [x] `Glossary` on `/glossary`: searchable and tag-filtered financial concepts with Nigerian context examples and mastery tags.

### Milestone 5: Authentication & Strict Authorization (Per-User Data Isolation)
- [x] Installed `bcryptjs` and `jsonwebtoken` in backend.
- [x] Refactored `backend/src/db/database.ts` into strictly partitioned per-user collections: `users`, `userProfiles`, `userProgress`, `userAttempts`, `userConceptMastery`, and `userGoalProgress`.
- [x] Implemented `authMiddleware.ts` with cryptographic token verification (`requireAuth`).
- [x] Created `authRoutes.ts` with `POST /register`, `POST /login`, and `GET /me`.
- [x] Strictly authorized `/api/learner/*` endpoints: `userId` is exclusively extracted from the validated JWT token, preventing IDOR or cross-user data tampering.
- [x] Ensured user data isolation: User A's progress, attempts, concept mastery, and goals are physically separated from User B's, guaranteeing neither can view or modify the other's progress.
- [x] Created `frontend/src/context/AuthContext.tsx` and updated `api.ts` with token injection and graceful guest fallbacks.
- [x] Built `/login` and `/register` route pages with client-side validation and error alerts.
- [x] Updated `Navbar.tsx`, `MasteryDashboard.tsx`, `GoalsAndTasksBoard.tsx`, and `Home` hero banner with account privacy badges and guest sign-in prompts.
- [x] Verified full monorepo build and ran automated multi-user isolation test script (`test_user_isolation.ts`) confirming 0 data leakage.

### Milestone 6: Minimal Redesign & Duolingo-Style Learning Road
- [x] **Target Audience Realignment**: Re-tailored UI for Nigerian secondary school and college students (clean typography, emerald/Naira currency theme, distraction-free cards, relatable language).
- [x] **Removed Clutter & Developer Metadata**:
  - Removed internal widget IDs (`L01.CT1.G2.I02`), raw lesson codes (`L01`), and group IDs from user-facing screens.
  - Eliminated "Brilliant-style..." references and clinical evaluative jargon.
  - Removed developer sandbox links from the primary student navigation.
  - Formatted concept tags and misconception callouts into friendly, encouraging advice.
- [x] **Duolingo-Style Learning Road (`LearningRoad.tsx`)**:
  - Replaced dense lesson lists with a visual, meandering winding road path of chapter "Stops" (Stop 1, Stop 2, Stop 3...).
  - Grouped by Modules (Module 1 Foundations, Module 2 Budgeting & Cash Flow) with an instant tab switcher.
  - Organized into distinct Submodule Units with clear descriptions and stop counts.
  - 3D circular stop nodes with dynamic states:
    - **Completed**: Emerald glow with checkmark `✓`.
    - **Active / Current**: Pulsing ring with animated bouncing "START" speech bubble.
    - **Upcoming**: Clean slate node with chapter number.
  - Golden Trophy Milestone stop at the end for the Module 2 Capstone challenge.
- [x] **Unified Chapter Learning Flow (`ChapterPlayer.tsx` & `/chapter/[chapterId]`)**:
  - Built `GET /api/curriculum/chapters/:chapterId` endpoint combining all lessons, groups, and cards into one unified interaction sequence.
  - Seamless card-by-card runner: moves from lesson 1 to lesson x in one go without bouncing between nested menus.
  - Minimal Duolingo-style top bar: clean `✕` exit button, smooth animated progress line, flame streak indicator, and optional quick lesson-jump drawer.
  - Automatic background persistence to backend and celebratory confetti screen upon chapter completion.
- [x] **Streamlined Navigation & Evaluation Screens**:
  - `Navbar.tsx`: Minimal student header with Learning Road, Progress, Goals, and Dictionary.
  - `MasteryDashboard.tsx`: Friendly "My Financial Skills" overview without raw concept IDs.
  - `GoalsAndTasksBoard.tsx` & `GlossaryPage`: Clean terms and human-readable lesson titles.

### Milestone 7: Individual Lesson Learning Sessions
- [x] **Separated Lessons onto Their Own Stops**:
  - Re-anchored the Duolingo-style learning road stops to individual **Lessons** rather than multi-lesson chapters.
  - Each stop represents one discrete lesson (e.g. Lesson 1: "Wetin Money Actually Dey Do", Lesson 2: "Money, Income & Wealth").
  - Students progress stop-by-stop through bite-sized, manageable lesson sessions (~15-25 cards).
- [x] **Dedicated Lesson Player (`LessonPlayer.tsx`)**:
  - Automatically loads and chains all groups and items for that specific lesson in order.
  - Minimal Duolingo-style top bar: exit (`✕`) button, smooth 0–100% progress line, streak flame (`🔥 3`), and current card indicator.
  - Completion celebration: triggers confetti, grants +30 XP, marks the lesson stop as mastered (`✓`), and unlocks the next lesson stop on the road.
- [x] **Backend Support**:
  - Updated `getLesson(lessonId)` in `curriculumLoader.ts` to return flat `items` array with all activities across groups in that lesson.
  - Updated `LessonOverviewClient.tsx` to directly launch the interactive `LessonPlayer` at `/lesson/[lessonId]`.
### Milestone 8: Continuous Road, Strict Sequential Gating & Store Reset
- [x] **Continuous Road (No Tab Switcher)**:
  - Removed top module tabs from `LearningRoad.tsx`.
  - Module 2 is now physically rendered directly beneath Module 1 on a single, continuous winding road.
  - Added a road checkpoint bridge between Module 1 and Module 2 that visually celebrates completion or explains the lock requirement.
- [x] **Strict Sequential Lesson Gating**:
  - Only Lesson 1 is unlocked for a new learner.
  - Every subsequent lesson (Lesson 2 through Lesson 21) is strictly locked until the immediately preceding lesson is marked as completed (`isUnlocked = idx === 0 || allOrderedLessons[idx - 1].isCompleted`).
  - Locked stops render with a lock icon (`🔒`), muted styling, and display prerequisites in their details modal.
  - Modal provides a quick shortcut button to jump directly to the learner's current active lesson.
- [x] **Module 2 Lock Gate**:
  - Module 2 is locked and completely inaccessible until all 15 lessons of Module 1 are finished.
  - Capstone Challenge (`M2.CAP`) is locked until all 21 lessons across both modules are finished.
- [x] **Route-Level URL Protection**:
  - `LessonOverviewClient.tsx`: If a user attempts to bypass the road by directly typing a URL like `/lesson/L05`, the route validates progression and displays a friendly locked gate screen ("🔒 Prerequisite Required - Complete Lesson X first") with a button directing them to their active lesson.
  - `GroupRunnerClient.tsx`: Direct navigation to `/group/M2.CAP` is gated until Lesson 21 is completed.
- [x] **Store Reset & Guest Storage**:
  - Confirmed `backend/data/store.json` is clean and empty (`users: {}`, `userProfiles: {}`, `userProgress: {}`, etc.).
  - Added `resetAllData()` API and a "Start Fresh" reset button on the Learning Road header so learners/testers can reset progress anytime with one click.
  - Supported `guest_progress` in `localStorage` so non-authenticated users can test sequential progress cleanly without losing state on reload.
### Milestone 9: Full UI Revamp — Block Colors, Lucide Icons & Responsive Layouts
- [x] **Color System Overhaul**:
  - Removed all `slate-*`, `indigo-*`, `cyan-*`, `blue-*` Tailwind classes across every `.tsx` file in the frontend.
  - Removed all multi-color gradients (`bg-gradient-to-*`, `from-*`, `to-*`, `via-*`).
  - Adopted a strict **block color palette**:
    - Canvas: `bg-zinc-950`
    - Cards / Containers: `bg-zinc-900 border border-zinc-800`
    - Secondary / Inputs: `bg-zinc-950 border border-zinc-800`
    - Primary Action / Success: `bg-emerald-600 hover:bg-emerald-500 text-white`
    - Milestone / Streak: `bg-amber-500 border border-amber-500/20 text-zinc-950`
  - **Zero blue** used anywhere as a primary brand or interactive element.
- [x] **Lucide React Icons (Zero Emojis)**:
  - Replaced every raw emoji (`🎉`, `🚧`, `🔒`, `₦`, `🔥`) with Lucide React icons (`Sparkles`, `Lock`, `Wallet`, `Flame`, etc.).
  - Replaced all raw Unicode arrow symbols (`→`, `←`) with Lucide `ArrowRight`, `ArrowLeft`, `ChevronLeft`, `ChevronRight`.
  - Updated all 30 interaction components in `InteractionKit.tsx` (169 class replacements).
- [x] **Responsive Adaptive Layouts**:
  - `LearningRoad.tsx`: On desktop (≥1024px), uses a 12-column grid with an 8-column winding road + 4-column sticky Study Companion sidebar (Next Up card, Daily Streak, XP metrics, Milestone progress, Study shortcuts).
  - `Navbar.tsx`: On mobile (<768px), renders a fixed bottom navigation bar with thumb-reach icons for Learning Road, Progress, Goals, and Dictionary.
  - Cards, modals, and player screens adapt layout (not just resize) at `sm:`, `md:`, and `lg:` breakpoints.
- [x] **Files Updated (17 components)**:
  - `layout.tsx`, `page.tsx` (home), `Navbar.tsx`, `LearningRoad.tsx`
  - `LessonPlayer.tsx`, `SlideCard.tsx`, `QuizPlayer.tsx`, `CaseStudyPlayer.tsx`, `ChallengePlayer.tsx`, `OutlinePlaceholder.tsx`, `GroupPlayer.tsx`, `ChapterPlayer.tsx`
  - `InteractionKit.tsx`, `InteractionRenderer.tsx`
  - `MasteryDashboard.tsx`, `GoalsAndTasksBoard.tsx`, `GlossaryPage.tsx`
  - `LessonOverviewClient.tsx`, `ChapterPlayerClient.tsx`, `GroupRunnerClient.tsx`
  - Auth pages: `login/page.tsx`, `register/page.tsx`, `gallery/page.tsx`
  - Suspense fallback pages: `chapter/page.tsx`, `lesson/page.tsx`, `group/page.tsx`
- [x] **TypeScript Type Enhancements**:
  - Extended `CaseStudyItem.scenario` with `income_source` on characters and `financial_data` record.
  - Extended `EvaluationGoal` with optional `name`, `description`, `threshold` aliases.
  - Extended `Misconception` with optional `name`, `description`, `correction` aliases.
- [x] **Next.js 16 Compatibility & Hydration Resilience**:
  - Wrapped `Navbar` in `<Suspense>` in `layout.tsx` to resolve `usePathname()` prerender blocking with `cacheComponents`.
  - Added `mounted` lifecycle hook and `suppressHydrationWarning` to `Navbar.tsx` auth container to eliminate server/client initial render hydration mismatch.
  - Added robust financial data figure normalization in `CaseStudyPlayer.tsx` to handle arrays, dictionary objects, and empty `{}` objects safely without runtime `map is not a function` errors.
### Milestone 10: Mobile & iPad Responsive Layouts & Visual Shell Verification
- [x] **Viewport Configuration**: Configured Next.js 16 metadata viewport (`width: device-width`, `initialScale: 1`) in `layout.tsx`.
- [x] **Adaptive Mobile & Tablet Navigation**:
  - `Navbar.tsx`: Auto-hides top and bottom bars during active player learning (`/lesson/*`, `/chapter/*`, `/group/*`) giving 100% focused vertical screen real estate to interactive lessons.
  - Tablet (`md:` 768px–1023px): Labels compress from "Learning Road" / "Skills & Progress" to concise "Road" / "Skills" / "Goals" / "Dictionary", avoiding horizontal overflow.
  - Mobile (<768px): Top bar features brand + compact auth pills; bottom navigation bar provides 44px thumb-friendly touch targets with safe area padding.
- [x] **Adaptive Learning Road Grid**:
  - Tablet/iPad (768px): Changed grid from `lg:grid-cols-12` to `md:grid-cols-12`, allowing the Duolingo-style winding road (`md:col-span-7`) and Study Companion (`md:col-span-5`) to comfortably sit side-by-side in portrait mode instead of hiding the companion.
  - Mobile (<768px): Compact top Study Companion banner; winding offsets dialed to `translate-x-6 sm:translate-x-10` preventing stop labels from clipping on 360px–390px screens.
- [x] **Responsive Card & Player Layouts**:
  - Player cards (`SlideCard`, `QuizPlayer`, `CaseStudyPlayer`, `ChallengePlayer`) use responsive padding (`p-4 sm:p-6 md:p-8`), rounded corners (`rounded-2xl sm:rounded-3xl`), and full-width mobile action buttons.
  - Touch targets calibrated to minimum 44px for fingers.
  - Filter tabs in Mastery, Goals, and Glossary feature horizontal scrolling with `overflow-x-auto whitespace-nowrap` on small screens.
- [x] **Visual Verification with Headless Browser**:
  - Tested and captured live rendering across viewports using Chrome headless CDP automation:
    - iPhone/Mobile: `390x844` (`mobile_home.png`, `mobile_home_road.png`, `mobile_lesson.png`, `mobile_mastery.png`)
    - iPad Portrait: `820x1180` (`ipad_home.png`, `ipad_lesson.png`)
    - iPad Landscape: `1024x768` (`ipad_landscape_home.png`)
  - Confirmed 0 horizontal overflows, crisp typography, and adaptive layouts across all screen form factors.

---

## 3. Verification & Build Status

- **Backend Build:** `pnpm --filter backend build` (`tsc`) compiled with **0 errors**.
- **Frontend Build:** `pnpm --filter frontend build` (`next build` with Turbopack) passed with **0 errors**, prerendering all 13 routes (static + partial prerender).
- **Monorepo Build:** `pnpm build` across both packages succeeded with **exit code 0**.
- **Data Persistence:** `backend/data/store.json` confirmed completely clean.
- **Style Audit:** `0` occurrences of `slate-`, `indigo-`, `cyan-`, `blue-`, or `bg-gradient` in any `.tsx` file.

---

## 4. How to Run & Test

```bash
# 1. Install all dependencies across workspaces
pnpm install

# 2. Start both frontend and backend concurrently in dev mode
pnpm dev

# Or start individually:
pnpm dev:backend   # Express API on http://localhost:5000
pnpm dev:frontend  # Next.js app on http://localhost:3000

# 3. Production build
pnpm build
```

---

## 5. Upcoming: Planned MongoDB Migration

When ready to connect MongoDB:
- The database repository methods (`createUser`, `findUserByEmail`, `setItemProgress`, `recordAttempt`, `updateConceptMastery`, `updateGoalProgress`) map 1:1 to Mongoose models.
- Swap out the JSON file read/write methods in `backend/src/db/database.ts` with MongoDB collection calls, keeping all routes and services untouched.

*This file is maintained continuously as development progresses.*
