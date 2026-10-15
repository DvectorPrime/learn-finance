import { Router, Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.use(requireAuth);

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

router.get('/', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const todayKey = getTodayKey();
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const currentYear = now.getFullYear();

  try {
    // 1. Get or initialize LearnerProfile
    let profile = await prisma.learnerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.learnerProfile.create({
        data: {
          userId,
          displayName: req.user!.displayName || 'Learner',
          currentLessonId: 'L01',
          onboardingCompleted: true,
          soundEnabled: true,
          acornBalance: 0,
          totalXpEarned: 0,
          currentStreakDays: 1,
          longestStreakDays: 1,
          streakShieldsCount: 2,
          lastActiveDate: now,
        },
      });
    }

    // 2. Ensure Daily Quests exist for today
    const existingQuests = await prisma.dailyQuest.findMany({
      where: { userId, questDate: todayKey },
    });

    if (existingQuests.length === 0) {
      await prisma.dailyQuest.createMany({
        data: [
          {
            userId,
            questDate: todayKey,
            questType: 'LESSON_COMPLETE',
            title: 'Complete 1 lesson today',
            targetCount: 1,
            currentCount: 0,
            rewardXp: 20,
            rewardAcorns: 10,
          },
          {
            userId,
            questDate: todayKey,
            questType: 'PERFECT_SCORE',
            title: 'Score 100% on a check',
            targetCount: 1,
            currentCount: 0,
            rewardXp: 30,
            rewardAcorns: 15,
          },
        ],
      });
    }

    const dailyQuests = await prisma.dailyQuest.findMany({
      where: { userId, questDate: todayKey },
      orderBy: { createdAt: 'asc' },
    });

    // 3. Goals stats & active goal
    const [activeGoal, learningCount, savingsCount, longTermCount] = await Promise.all([
      prisma.goal.findFirst({
        where: { userId, status: 'ACTIVE' },
        include: { steps: true, contributions: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.goal.count({ where: { userId, type: 'LEARNING', status: 'ACTIVE' } }),
      prisma.goal.count({ where: { userId, type: 'SAVINGS', status: 'ACTIVE' } }),
      prisma.goal.count({ where: { userId, type: 'LONG_TERM', status: 'ACTIVE' } }),
    ]);

    // 4. Real league calculations across real database users
    let cohort = await prisma.leagueCohort.findFirst({
      where: { weekNumber: currentWeek, year: currentYear },
    });

    if (!cohort) {
      const dayOfWeek = now.getUTCDay();
      const daysUntilSunday = (7 - dayOfWeek) % 7;
      const endsAt = new Date(now);
      endsAt.setUTCDate(now.getUTCDate() + daysUntilSunday);
      endsAt.setUTCHours(23, 59, 59, 999);

      cohort = await prisma.leagueCohort.create({
        data: {
          tier: 'Sapling',
          division: 2,
          weekNumber: currentWeek,
          year: currentYear,
          startsAt: new Date(now.setUTCHours(0, 0, 0, 0)),
          endsAt,
        },
      });
    }

    // Compute real rank among actual database users
    const allUsers = await prisma.user.findMany({
      include: { profile: true },
    });

    const sortedUsers = allUsers
      .map((u) => ({ id: u.id, xp: u.profile?.totalXpEarned || 0 }))
      .sort((a, b) => b.xp - a.xp);

    const userRankIndex = sortedUsers.findIndex((u) => u.id === userId);
    const realUserRank = userRankIndex >= 0 ? userRankIndex + 1 : 1;
    const totalMembers = sortedUsers.length;

    // Calculate time remaining until Sunday lock
    const msRemaining = Math.max(0, cohort.endsAt.getTime() - Date.now());
    const daysRemaining = Math.floor(msRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((msRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const endsIn = `${daysRemaining}d ${hoursRemaining}h`;

    res.json({
      profile: {
        id: profile.id,
        userId: profile.userId,
        displayName: profile.displayName,
        currentLessonId: profile.currentLessonId,
        onboardingCompleted: true,
        soundEnabled: profile.soundEnabled,
        mainGoal: profile.mainGoal,
        knowledgeLevel: profile.knowledgeLevel,
        dailyCommitmentMinutes: profile.dailyCommitmentMinutes,
        acornBalance: profile.acornBalance,
        totalXpEarned: profile.totalXpEarned,
        currentStreakDays: profile.currentStreakDays,
        longestStreakDays: profile.longestStreakDays,
        streakShieldsCount: profile.streakShieldsCount,
      },
      activeGoal: activeGoal ? {
        id: activeGoal.id,
        title: activeGoal.title,
        type: activeGoal.type,
        status: activeGoal.status,
        targetAmount: activeGoal.targetAmount,
        currentAmount: activeGoal.currentAmount,
        monthlyContribution: activeGoal.monthlyContribution,
        targetDate: activeGoal.targetDate,
        progressPercent: activeGoal.targetAmount && activeGoal.targetAmount > 0
          ? Math.min(100, Math.round((activeGoal.currentAmount / activeGoal.targetAmount) * 100))
          : 0,
        stepsCount: activeGoal.steps.length,
        completedStepsCount: activeGoal.steps.filter((s) => s.isCompleted).length,
      } : null,
      stats: {
        activeLearningGoals: learningCount,
        activeSavingsGoals: savingsCount,
        activeLongTermGoals: longTermCount,
        totalActiveGoals: learningCount + savingsCount + longTermCount,
      },
      dailyQuests: dailyQuests.map((q) => ({
        id: q.id,
        title: q.title,
        type: q.questType,
        targetCount: q.targetCount,
        currentCount: q.currentCount,
        rewardXp: q.rewardXp,
        rewardAcorns: q.rewardAcorns,
        isCompleted: q.isCompleted,
        isClaimed: q.isClaimed,
      })),
      league: {
        tier: cohort.tier,
        division: cohort.division,
        title: `${cohort.tier} League • Division ${cohort.division === 2 ? 'II' : 'I'}`,
        rank: realUserRank,
        totalMembers,
        rankDelta: '― 0',
        endsIn,
        weeklyXp: profile.totalXpEarned,
        isPromotionZone: totalMembers > 5 ? realUserRank <= 5 : false,
        isDemotionZone: totalMembers > 10 ? realUserRank >= totalMembers - 2 : false,
      },
    });
  } catch (err: any) {
    console.error('Error in /api/dashboard:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch dashboard data' });
  }
});

export default router;
