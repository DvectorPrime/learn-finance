import { prisma } from './prisma';

export interface LearnerProfile {
  learner_id: string;
  display_name: string;
  created_at: string;
  current_lesson_id: string | null;
  total_xp_earned?: number;
  acorn_balance?: number;
  current_streak_days?: number;
  longest_streak_days?: number;
  streak_shields_count?: number;
}

export type ItemState = 'locked' | 'available' | 'in_progress' | 'completed';

export interface ItemProgress {
  learner_id: string;
  item_id: string;
  state: ItemState;
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

export type MasteryBand = 'learning' | 'proficient' | 'mastered';

export interface ConceptMastery {
  learner_id: string;
  concept_id: string;
  mastery: number; // 0..1
  band: MasteryBand;
  updated_at: string;
  evidence_count: number;
}

export type GoalStatus = 'not_started' | 'in_progress' | 'met';

export interface GoalProgress {
  learner_id: string;
  goal_id: string;
  progress: number; // 0..1
  status: GoalStatus;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  display_name: string;
  created_at: string;
  learner_id: string;
}

class DatabaseStore {
  // Users
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      password_hash: user.passwordHash,
      display_name: user.displayName,
      created_at: user.createdAt.toISOString(),
      learner_id: user.id,
    };
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      password_hash: user.passwordHash,
      display_name: user.displayName,
      created_at: user.createdAt.toISOString(),
      learner_id: user.id,
    };
  }

  async createUser(data: { email: string; password_hash: string; display_name: string }): Promise<User> {
    const email = data.email.toLowerCase().trim();
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: data.password_hash,
        displayName: data.display_name,
        profile: {
          create: {
            displayName: data.display_name,
            currentLessonId: 'L01',
          },
        },
      },
    });

    return {
      id: user.id,
      email: user.email,
      password_hash: user.passwordHash,
      display_name: user.displayName,
      created_at: user.createdAt.toISOString(),
      learner_id: user.id,
    };
  }

  // Learner Profiles
  async getLearner(userId: string): Promise<LearnerProfile | null> {
    const profile = await prisma.learnerProfile.findUnique({
      where: { userId },
    });
    if (!profile) return null;
    return {
      learner_id: profile.userId,
      display_name: profile.displayName,
      current_lesson_id: profile.currentLessonId,
      created_at: profile.createdAt.toISOString(),
      total_xp_earned: profile.totalXpEarned,
      acorn_balance: profile.acornBalance,
      current_streak_days: profile.currentStreakDays,
      longest_streak_days: profile.longestStreakDays,
      streak_shields_count: profile.streakShieldsCount,
    };
  }

  async updateLearner(
    userId: string,
    updates: { display_name?: string; current_lesson_id?: string }
  ): Promise<LearnerProfile> {
    const profile = await prisma.learnerProfile.upsert({
      where: { userId },
      update: {
        ...(updates.display_name ? { displayName: updates.display_name } : {}),
        ...(updates.current_lesson_id ? { currentLessonId: updates.current_lesson_id } : {}),
      },
      create: {
        userId,
        displayName: updates.display_name || 'Learner',
        currentLessonId: updates.current_lesson_id || 'L01',
      },
    });
    return {
      learner_id: profile.userId,
      display_name: profile.displayName,
      current_lesson_id: profile.currentLessonId,
      created_at: profile.createdAt.toISOString(),
      total_xp_earned: profile.totalXpEarned,
      acorn_balance: profile.acornBalance,
      current_streak_days: profile.currentStreakDays,
      longest_streak_days: profile.longestStreakDays,
      streak_shields_count: profile.streakShieldsCount,
    };
  }

  // Item Progress (Strictly isolated by userId)
  async getAllItemProgress(userId: string): Promise<Record<string, ItemProgress>> {
    const records = await prisma.itemProgress.findMany({
      where: { userId },
    });
    const map: Record<string, ItemProgress> = {};
    for (const r of records) {
      map[r.itemId] = {
        learner_id: r.userId,
        item_id: r.itemId,
        state: r.state as ItemState,
        completed_at: r.completedAt ? r.completedAt.toISOString() : null,
        active_seconds: r.activeSeconds,
      };
    }
    return map;
  }

  async setItemProgress(
    userId: string,
    itemId: string,
    state: ItemState = 'completed',
    activeSeconds: number = 0
  ): Promise<ItemProgress> {
    const record = await prisma.itemProgress.upsert({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
      update: {
        state,
        activeSeconds: { increment: activeSeconds },
        completedAt: state === 'completed' ? new Date() : undefined,
      },
      create: {
        userId,
        itemId,
        state,
        activeSeconds,
        completedAt: state === 'completed' ? new Date() : null,
      },
    });

    return {
      learner_id: record.userId,
      item_id: record.itemId,
      state: record.state as ItemState,
      completed_at: record.completedAt ? record.completedAt.toISOString() : null,
      active_seconds: record.activeSeconds,
    };
  }

  // Attempts
  async getAttempts(userId: string, assessmentId?: string): Promise<Attempt[]> {
    const records = await prisma.assessmentAttempt.findMany({
      where: {
        userId,
        ...(assessmentId ? { assessmentId } : {}),
      },
      orderBy: { startedAt: 'asc' },
    });

    return records.map((r) => ({
      attempt_id: r.id,
      learner_id: r.userId,
      assessment_id: r.assessmentId,
      attempt_no: r.attemptNo,
      started_at: r.startedAt.toISOString(),
      submitted_at: r.submittedAt.toISOString(),
      responses: JSON.parse(r.responses || '[]'),
      score: r.score,
      passed: r.passed,
    }));
  }

  async recordAttempt(attempt: Attempt): Promise<void> {
    await prisma.assessmentAttempt.create({
      data: {
        id: attempt.attempt_id,
        userId: attempt.learner_id,
        assessmentId: attempt.assessment_id,
        attemptNo: attempt.attempt_no,
        startedAt: new Date(attempt.started_at),
        submittedAt: new Date(attempt.submitted_at),
        responses: JSON.stringify(attempt.responses || []),
        score: attempt.score,
        passed: attempt.passed,
      },
    });
  }

  // Concept Mastery (Strictly isolated by userId)
  async getConceptMastery(userId: string): Promise<Record<string, ConceptMastery>> {
    const records = await prisma.conceptMastery.findMany({
      where: { userId },
    });
    const map: Record<string, ConceptMastery> = {};
    for (const r of records) {
      map[r.conceptId] = {
        learner_id: r.userId,
        concept_id: r.conceptId,
        mastery: r.mastery,
        band: r.band as MasteryBand,
        updated_at: r.updatedAt.toISOString(),
        evidence_count: r.evidenceCount,
      };
    }
    return map;
  }

  async updateConceptMastery(
    userId: string,
    conceptId: string,
    mastery: number,
    band: MasteryBand,
    evidenceCount: number
  ): Promise<ConceptMastery> {
    const record = await prisma.conceptMastery.upsert({
      where: {
        userId_conceptId: {
          userId,
          conceptId,
        },
      },
      update: {
        mastery,
        band,
        evidenceCount,
      },
      create: {
        userId,
        conceptId,
        mastery,
        band,
        evidenceCount,
      },
    });

    return {
      learner_id: record.userId,
      concept_id: record.conceptId,
      mastery: record.mastery,
      band: record.band as MasteryBand,
      updated_at: record.updatedAt.toISOString(),
      evidence_count: record.evidenceCount,
    };
  }

  // Goal Progress (Strictly isolated by userId)
  async getAllGoalProgress(userId: string): Promise<Record<string, GoalProgress>> {
    const records = await prisma.goalProgress.findMany({
      where: { userId },
    });
    const map: Record<string, GoalProgress> = {};
    for (const r of records) {
      map[r.goalId] = {
        learner_id: r.userId,
        goal_id: r.goalId,
        progress: r.progress,
        status: r.status as GoalStatus,
      };
    }
    return map;
  }

  async updateGoalProgress(
    userId: string,
    goalId: string,
    progress: number,
    status: GoalStatus
  ): Promise<GoalProgress> {
    const record = await prisma.goalProgress.upsert({
      where: {
        userId_goalId: {
          userId,
          goalId,
        },
      },
      update: {
        progress: Math.min(1, Math.max(0, progress)),
        status,
      },
      create: {
        userId,
        goalId,
        progress: Math.min(1, Math.max(0, progress)),
        status,
      },
    });

    return {
      learner_id: record.userId,
      goal_id: record.goalId,
      progress: record.progress,
      status: record.status as GoalStatus,
    };
  }

  // Reset progress and virtual stats for clean testing (Strictly for specified userId)
  async resetLearner(userId: string): Promise<void> {
    await prisma.$transaction([
      prisma.goalContribution.deleteMany({ where: { goal: { userId } } }),
      prisma.goalStep.deleteMany({ where: { goal: { userId } } }),
      prisma.goal.deleteMany({ where: { userId } }),
      prisma.dailyQuest.deleteMany({ where: { userId } }),
      prisma.leagueMembership.deleteMany({ where: { userId } }),
      prisma.itemProgress.deleteMany({ where: { userId } }),
      prisma.assessmentAttempt.deleteMany({ where: { userId } }),
      prisma.conceptMastery.deleteMany({ where: { userId } }),
      prisma.goalProgress.deleteMany({ where: { userId } }),
      prisma.learnerProfile.updateMany({
        where: { userId },
        data: {
          totalXpEarned: 0,
          acornBalance: 0,
          currentStreakDays: 1,
          longestStreakDays: 1,
          streakShieldsCount: 2,
          currentLessonId: 'L01',
          lastActiveDate: new Date(),
        },
      }),
    ]);
  }

  // Clear all users, profiles, progress, goals, leagues, and history (Full slate reset)
  async clearAll(): Promise<void> {
    await prisma.$transaction([
      prisma.goalContribution.deleteMany(),
      prisma.goalStep.deleteMany(),
      prisma.goal.deleteMany(),
      prisma.dailyQuest.deleteMany(),
      prisma.leagueMembership.deleteMany(),
      prisma.leagueCohort.deleteMany(),
      prisma.goalProgress.deleteMany(),
      prisma.conceptMastery.deleteMany(),
      prisma.assessmentAttempt.deleteMany(),
      prisma.itemProgress.deleteMany(),
      prisma.learnerProfile.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  }
}

export const db = new DatabaseStore();
