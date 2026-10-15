export type DifficultyLevel =
  | 'Low'
  | 'Low-Medium'
  | 'Medium'
  | 'Medium-High'
  | 'High'
  | 'Very High';

export type AuthoringStatus = 'authored' | 'outline' | 'partial';

// Content Blocks for Slides
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullet_list'; items: string[] }
  | { type: 'numbered_list'; items: string[] }
  | { type: 'callout'; text: string; style?: string }
  | { type: 'example'; text: string }
  | { type: 'definition'; term: string; text: string }
  | { type: 'table'; columns: string[]; rows: string[][] };

// Slide Item
export interface SlideItem {
  id: string;
  kind: 'slide';
  order?: number;
  title: string;
  subtitle?: string;
  body: ContentBlock[] | null;
  key_takeaway?: string;
  concepts?: string[];
  authoring_status: AuthoringStatus;
}

// Slide Set (Outline)
export interface SlideSetItem {
  id: string;
  kind: 'slide_set';
  order?: number;
  title: string;
  subtitle?: string;
  topics: string[];
  authoring_status: AuthoringStatus;
}

// Case Study Item
export interface CaseStudyPrompt {
  id?: string;
  prompt: string;
  response_type?: 'reflection' | 'text_or_numeric' | 'numeric' | 'select_one' | string;
  expected_answer?: string | number;
  options?: Array<{ id?: string; label?: string; text?: string }> | string[];
}

export interface CaseStudyItem {
  id: string;
  kind: 'case_study';
  order?: number;
  title: string;
  subtitle?: string;
  scenario: {
    narrative: string;
    characters?: Array<{ name: string; role?: string; details?: string; income_source?: string }>;
    data?: Array<{ label: string; value: string | number; unit?: string }>;
    financial_data?: Record<string, any>;
  };
  prompts?: CaseStudyPrompt[];
  debrief?: string;
  key_takeaway?: string;
  assessed?: boolean;
  concepts?: string[];
  authoring_status: AuthoringStatus;
}

// 30 Reusable Widget Types + tbd placeholder
export type WidgetType =
  | 'choice_with_reflection'
  | 'drag_drop_trade'
  | 'simulation_compare_rounds'
  | 'allocation_basket'
  | 'sort_into_buckets'
  | 'numeric_calculator'
  | 'allocation_slider'
  | 'scenario_simulator'
  | 'option_comparison'
  | 'choose_path'
  | 'progress_tracker'
  | 'multiple_choice_quiz'
  | 'multi_select'
  | 'sequence_ordering'
  | 'match_pairs'
  | 'true_false'
  | 'range_estimator'
  | 'budget_prioritizer'
  | 'need_want_sorter'
  | 'risk_reward_comparison'
  | 'decision_tree'
  | 'goal_planner'
  | 'cash_flow_classifier'
  | 'net_worth_calculator'
  | 'inflation_calculator'
  | 'loan_repayment_calculator'
  | 'savings_growth_calculator'
  | 'timeline_builder'
  | 'confidence_reflection'
  | 'branching_scenario'
  | 'tbd';

export interface WidgetItem {
  id: string;
  kind: 'widget';
  order?: number;
  title: string;
  subtitle?: string;
  widget_type: WidgetType;
  config: Record<string, any>;
  concepts?: string[];
  feedback?: string;
  authoring_status: AuthoringStatus;
}

// Question Types
export interface BaseQuestion {
  id: string;
  prompt: string;
  explanation?: string;
  concepts?: string[];
  misconception?: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single_choice';
  options: Array<{ id: string; text: string }>;
  correct: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correct: boolean;
}

export interface NumericQuestion extends BaseQuestion {
  type: 'numeric';
  correct: number;
  unit: string;
  tolerance: number;
}

export interface ClassifyQuestion extends BaseQuestion {
  type: 'classify';
  categories: string[];
  correct: string;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
  model_answer: string;
  key_points: string[];
}

export type QuizQuestion =
  | SingleChoiceQuestion
  | TrueFalseQuestion
  | NumericQuestion
  | ClassifyQuestion
  | ShortAnswerQuestion;

export interface QuizItem {
  id: string;
  kind: 'quiz';
  order?: number;
  title: string;
  subtitle?: string;
  quiz_mode: 'group_quiz' | 'practice_quiz' | 'content_final' | 'lesson_final';
  questions: QuizQuestion[];
  concepts?: string[];
  authoring_status: AuthoringStatus;
}

// Challenge Item
export interface RubricCriterion {
  criterion: string;
  description: string;
  max_score: number;
}

export interface ChallengeItem {
  id: string;
  kind: 'challenge' | 'capstone';
  order?: number;
  title: string;
  subtitle?: string;
  task: string;
  stages?: Array<{ stage_no: number; title: string; prompt: string }>;
  fields?: Array<{ id: string; label: string; placeholder?: string; type?: string }>;
  rubric: RubricCriterion[];
  concepts?: string[];
  authoring_status?: AuthoringStatus;
}

// Discriminated Item Union
export type CurriculumItem =
  | SlideItem
  | SlideSetItem
  | CaseStudyItem
  | WidgetItem
  | QuizItem
  | ChallengeItem;

// Group
export interface Group {
  id: string;
  title: string;
  objective?: string;
  items: CurriculumItem[];
  lesson?: { id: string; number: number; title: string };
  content?: { id: string; title: string; objective: string };
}

// Content Unit
export interface ContentUnit {
  id: string;
  title: string;
  objective: string;
  groups: Group[];
  final_quiz: QuizItem | null;
  practice_quizzes?: QuizItem[];
}

// Lesson
export interface EvaluationGoal {
  id: string;
  statement?: string;
  name?: string;
  description?: string;
  mastery_threshold?: number;
  threshold?: number;
  linked_assessments?: string[];
  concept_tags?: string[];
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  difficulty: DifficultyLevel;
  contents: ContentUnit[];
  evaluation: {
    goals: EvaluationGoal[];
    mastery_threshold: number;
  };
  lesson_assessment?: ChallengeItem;
  chapter?: { id: string; number: number; title: string };
  submodule?: { id: string; code: string; title: string };
  module?: { id: string; number: number; title: string };
  items?: Array<
    CurriculumItem & {
      groupId?: string;
      groupTitle?: string;
    }
  >;
}

// Chapter, Submodule, Module
export interface Chapter {
  id: string;
  number: number;
  title: string;
  lessons: Array<{
    id: string;
    number: number;
    title: string;
    difficulty: DifficultyLevel;
    contents_count: number;
    groups_count: number;
    authoring_status: AuthoringStatus;
  }>;
}

export interface ChapterDetail {
  id: string;
  number: number;
  title: string;
  submodule: { id: string; code: string; title: string };
  module: { id: string; number: number; title: string };
  lessons: Array<{
    id: string;
    number: number;
    title: string;
    difficulty: DifficultyLevel;
    contents_count: number;
    groups_count: number;
    authoring_status: AuthoringStatus;
  }>;
  items: Array<
    CurriculumItem & {
      lessonId?: string;
      lessonNumber?: number;
      lessonTitle?: string;
      groupId?: string;
      groupTitle?: string;
    }
  >;
}

export interface Submodule {
  id: string;
  code: string;
  title: string;
  chapters: Chapter[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  capstone_id: string | null;
  submodules_count: number;
  submodules: Submodule[];
}

// Learner & Evaluation Contracts
export interface LearnerProfile {
  learner_id: string;
  display_name: string;
  created_at: string;
  current_lesson_id: string | null;
}

export interface ItemProgress {
  learner_id: string;
  item_id: string;
  state: 'locked' | 'available' | 'in_progress' | 'completed';
  completed_at: string | null;
  active_seconds: number;
}

export interface AttemptResponse {
  question_id: string;
  answer: any;
  is_correct?: boolean | null;
  score?: number;
  rubric_scores?: Record<string, number> | null;
  misconception_id?: string | null;
}

export interface Attempt {
  attempt_id: string;
  learner_id: string;
  assessment_id: string;
  attempt_no: number;
  started_at: string;
  submitted_at: string;
  responses: AttemptResponse[];
  score: number;
  passed: boolean;
}

export interface ConceptMastery {
  learner_id: string;
  concept_id: string;
  mastery: number;
  band: 'learning' | 'proficient' | 'mastered';
  updated_at: string;
  evidence_count: number;
}

export interface GoalProgress {
  learner_id: string;
  goal_id: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'met';
}

export interface GlossaryConcept {
  id: string;
  term: string;
  definition: string;
  references?: string[];
  example?: string;
  related_lessons?: string[];
}

export interface Misconception {
  id: string;
  belief?: string;
  reality?: string;
  name?: string;
  description?: string;
  correction?: string;
  remediation_lessons?: string[];
}
