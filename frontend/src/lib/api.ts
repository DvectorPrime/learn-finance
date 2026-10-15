import {
  Module,
  ChapterDetail,
  Lesson,
  Group,
  LearnerProfile,
  ItemProgress,
  ConceptMastery,
  GoalProgress,
  GlossaryConcept,
  Misconception,
  Attempt,
} from '../types/curriculum';
import { AuthUser, AuthResponse } from '../types/auth';

function resolveApiBase(): string {
  const rawEnvUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, '');
  if (rawEnvUrl) {
    return rawEnvUrl.endsWith('/api') ? rawEnvUrl : `${rawEnvUrl}/api`;
  }
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://learn-finance-cta6.onrender.com/api';
  }
  return 'http://localhost:5000/api';
}

const API_BASE = resolveApiBase();

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('learn_finance_token');
  }
  return null;
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('learn_finance_token', token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('learn_finance_token');
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message = `API error ${res.status}`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.error) message = parsed.error;
    } catch {
      if (errorText) message = errorText;
    }
    throw new Error(message);
  }

  return res.json();
}

// Authentication
export async function registerUser(data: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.token) {
    setAuthToken(res.token);
  }
  return res;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.token) {
    setAuthToken(res.token);
  }
  return res;
}

export async function loginWithGoogle(data: {
  idToken?: string;
  accessToken?: string;
  email?: string;
  displayName?: string;
  googleId?: string;
}): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/google', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.token) {
    setAuthToken(res.token);
  }
  return res;
}

export async function fetchCurrentUser(): Promise<{ user: AuthUser }> {
  return request('/auth/me');
}

// Curriculum
export async function fetchMeta(): Promise<{ meta: any; counts: any }> {
  return request('/curriculum/meta');
}

export async function fetchModules(): Promise<{ modules: Module[] }> {
  return request('/curriculum/modules');
}

export async function fetchChapter(chapterId: string): Promise<{ chapter: ChapterDetail }> {
  return request(`/curriculum/chapters/${chapterId}`);
}

export async function fetchLesson(lessonId: string): Promise<{ lesson: Lesson }> {
  return request(`/curriculum/lessons/${lessonId}`);
}

export async function fetchGroup(groupId: string): Promise<{ group: Group }> {
  return request(`/curriculum/groups/${groupId}`);
}

export async function fetchGlossary(): Promise<{ concepts: GlossaryConcept[] }> {
  return request('/curriculum/glossary');
}

export async function fetchMisconceptions(): Promise<{ misconceptions: Misconception[] }> {
  return request('/curriculum/misconceptions');
}

export async function fetchInteractionExamples(): Promise<{ examples: Record<string, any> }> {
  return request('/curriculum/interaction-examples');
}

// Learner (Private user data endpoints)
export async function fetchLearnerProfile(): Promise<{ profile: LearnerProfile | null }> {
  if (!getAuthToken()) {
    return { profile: null };
  }
  return request('/learner/profile');
}

export async function updateLearnerProfile(updates: Partial<LearnerProfile>): Promise<{ profile: LearnerProfile }> {
  return request('/learner/profile', {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function fetchProgress(): Promise<{ progress: Record<string, ItemProgress> }> {
  if (!getAuthToken()) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('guest_progress');
        if (stored) {
          return { progress: JSON.parse(stored) };
        }
      } catch (e) {
        console.error('Failed to parse guest_progress', e);
      }
    }
    return { progress: {} };
  }
  return request('/learner/progress');
}

export async function saveItemProgress(
  itemId: string,
  state: 'locked' | 'available' | 'in_progress' | 'completed',
  activeSeconds = 0
): Promise<{ itemProgress: ItemProgress }> {
  if (!getAuthToken()) {
    const itemProgress: ItemProgress = {
      learner_id: 'guest',
      item_id: itemId,
      state,
      completed_at: new Date().toISOString(),
      active_seconds: activeSeconds,
    };
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('guest_progress');
        const current = stored ? JSON.parse(stored) : {};
        current[itemId] = itemProgress;
        localStorage.setItem('guest_progress', JSON.stringify(current));
      } catch (e) {
        console.error('Failed to save guest_progress', e);
      }
    }
    return { itemProgress };
  }
  return request(`/learner/progress/items/${itemId}`, {
    method: 'POST',
    body: JSON.stringify({ state, activeSeconds }),
  });
}

export async function submitAssessment(
  assessmentId: string,
  responses: Array<{ questionId: string; answer: any; rubricScores?: Record<string, number> }>,
  activeSeconds = 0
): Promise<{
  attempt: Attempt;
  gradedResponses: any[];
  conceptMasteryUpdates: Record<string, ConceptMastery>;
  triggeredMisconceptions: string[];
}> {
  if (!getAuthToken()) {
    return {
      attempt: {
        attempt_id: `guest_${Date.now()}`,
        learner_id: 'guest',
        assessment_id: assessmentId,
        attempt_no: 1,
        started_at: new Date().toISOString(),
        submitted_at: new Date().toISOString(),
        responses: [],
        score: 1,
        passed: true,
      },
      gradedResponses: [],
      conceptMasteryUpdates: {},
      triggeredMisconceptions: [],
    };
  }
  return request(`/learner/assessments/${assessmentId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ responses, activeSeconds }),
  });
}

export async function fetchMastery(): Promise<{ mastery: Record<string, ConceptMastery> }> {
  if (!getAuthToken()) {
    return { mastery: {} };
  }
  return request('/learner/mastery');
}

export async function fetchGoals(): Promise<{ goals: Record<string, GoalProgress> }> {
  if (!getAuthToken()) {
    return { goals: {} };
  }
  return request('/learner/goals');
}

export async function resetProgress(): Promise<{ success: boolean }> {
  return request('/learner/reset', { method: 'POST' });
}

export async function resetAllData(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
  }
  try {
    const res = await fetch(`${API_BASE}/auth/reset`, { method: 'POST' });
    if (!res.ok) {
      console.warn('Backend reset returned non-OK status:', res.status);
    }
  } catch (err) {
    console.error('Failed to reset backend store:', err);
  }
}

// ==========================================
// NEW STITCH-ALIGNED DYNAMIC API INTERFACES
// ==========================================

export interface DashboardData {
  profile: {
    id: string;
    userId: string;
    displayName: string;
    currentLessonId: string;
    onboardingCompleted: boolean;
    soundEnabled: boolean;
    mainGoal?: string;
    knowledgeLevel?: string;
    dailyCommitmentMinutes: number;
    acornBalance: number;
    totalXpEarned: number;
    currentStreakDays: number;
    longestStreakDays: number;
    streakShieldsCount: number;
  };
  activeGoal: {
    id: string;
    title: string;
    type: 'LEARNING' | 'SAVINGS' | 'LONG_TERM';
    status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
    targetAmount?: number;
    currentAmount: number;
    monthlyContribution?: number;
    targetDate?: string;
    progressPercent: number;
    stepsCount: number;
    completedStepsCount: number;
    isBehindSchedule?: boolean;
  } | null;
  stats: {
    activeLearningGoals: number;
    activeSavingsGoals: number;
    activeLongTermGoals: number;
    totalActiveGoals: number;
  };
  dailyQuests: Array<{
    id: string;
    title: string;
    type: string;
    targetCount: number;
    currentCount: number;
    rewardXp: number;
    rewardAcorns: number;
    isCompleted: boolean;
    isClaimed: boolean;
  }>;
  league: {
    tier: string;
    division: number;
    title: string;
    rank: number;
    totalMembers: number;
    rankDelta: string;
    endsIn: string;
    weeklyXp: number;
    isPromotionZone: boolean;
    isDemotionZone: boolean;
  };
}

export interface GoalStepItem {
  id: string;
  goalId: string;
  stepNumber: number;
  title: string;
  actionText: string;
  targetAmount?: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface GoalContributionItem {
  id: string;
  goalId: string;
  amount: number;
  note?: string;
  createdAt: string;
}

export interface GoalDetailItem {
  id: string;
  userId: string;
  type: 'LEARNING' | 'SAVINGS' | 'LONG_TERM';
  title: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
  targetAmount?: number;
  currentAmount: number;
  monthlyContribution?: number;
  targetDate?: string;
  targetModuleId?: string;
  lessonsPerWeek?: number;
  progressPercent: number;
  remainingAmount: number;
  monthsRemaining: number;
  requiredMonthlyRate: number;
  isBehindSchedule: boolean;
  suggestedIncrease: number;
  nextMilestone: number;
  steps: GoalStepItem[];
  contributions: GoalContributionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface LeagueStandingMember {
  id: string;
  name: string;
  xp: number;
  rank: number;
  isCurrentUser: boolean;
  initials: string;
  isPromotionZone: boolean;
  isDemotionZone: boolean;
}

export interface LeagueResponse {
  cohort: {
    id: string;
    tier: string;
    division: number;
    title: string;
    endsIn: string;
  };
  currentUser: {
    rank: number;
    weeklyXp: number;
    rankDelta: string;
    totalMembers: number;
    isPromotionZone: boolean;
    isDemotionZone: boolean;
  };
  standings: LeagueStandingMember[];
}

// API Calls
export async function fetchDashboard(): Promise<DashboardData> {
  return request<DashboardData>('/dashboard');
}

export async function fetchUserGoals(type?: string, status?: string): Promise<{ goals: GoalDetailItem[] }> {
  const query = new URLSearchParams();
  if (type) query.set('type', type);
  if (status) query.set('status', status);
  const qStr = query.toString();
  return request<{ goals: GoalDetailItem[] }>(`/goals${qStr ? `?${qStr}` : ''}`);
}

export async function fetchGoalDetail(id: string): Promise<{ goal: GoalDetailItem }> {
  return request<{ goal: GoalDetailItem }>(`/goals/${id}`);
}

export async function createUserGoal(data: {
  type: 'LEARNING' | 'SAVINGS' | 'LONG_TERM';
  title: string;
  targetAmount?: number;
  monthlyContribution?: number;
  targetDate?: string;
  targetModuleId?: string;
  lessonsPerWeek?: number;
  autoGenerateSteps?: boolean;
}): Promise<{ goal: GoalDetailItem }> {
  return request<{ goal: GoalDetailItem }>('/goals', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateUserGoal(id: string, updates: Partial<GoalDetailItem>): Promise<{ goal: GoalDetailItem }> {
  return request<{ goal: GoalDetailItem }>(`/goals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deleteUserGoal(id: string): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/goals/${id}`, { method: 'DELETE' });
}

export async function contributeToGoal(id: string, amount: number, note?: string): Promise<{
  contribution: GoalContributionItem;
  goal: GoalDetailItem;
  reward: { acornsEarned: number; xpEarned: number; isCompleted: boolean };
}> {
  return request(`/goals/${id}/contribute`, {
    method: 'POST',
    body: JSON.stringify({ amount, note }),
  });
}

export async function generateGoalBreakdown(id: string): Promise<{ goal: GoalDetailItem }> {
  return request<{ goal: GoalDetailItem }>(`/goals/${id}/breakdown`, { method: 'POST' });
}

export async function toggleGoalStep(id: string, stepId: string, isCompleted: boolean): Promise<{ step: GoalStepItem }> {
  return request<{ step: GoalStepItem }>(`/goals/${id}/steps/${stepId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isCompleted }),
  });
}

export async function fetchLeagueStandings(): Promise<LeagueResponse> {
  return request<LeagueResponse>('/league/current');
}

export async function submitOnboarding(data: {
  mainGoal: string;
  knowledgeLevel: string;
  dailyCommitmentMinutes: number;
  notificationTime?: string;
  soundEnabled?: boolean;
}): Promise<{ success: boolean; profile: any; starterReward: any }> {
  return request('/onboarding', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateOnboardingSettings(data: {
  soundEnabled?: boolean;
  notificationTime?: string;
}): Promise<{ success: boolean; profile: any }> {
  return request('/onboarding/settings', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function claimDailyQuest(id: string): Promise<{
  success: boolean;
  quest: any;
  profile: any;
  claimed: { acorns: number; xp: number };
}> {
  return request(`/quests/${id}/claim`, { method: 'POST' });
}


