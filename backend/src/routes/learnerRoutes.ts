import { Router, Request, Response } from 'express';
import { db, ItemState } from '../db/database';
import { prisma } from '../db/prisma';
import { evaluationService } from '../services/evaluationService';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Strictly enforce authentication & authorization across all learner data routes
router.use(requireAuth);

function getAuthorizedUserId(req: Request): string {
  // Authorization guarantee: userId is exclusively from the verified JWT payload,
  // preventing IDOR (Insecure Direct Object Reference) and cross-user data leakage.
  return req.user!.userId;
}

// GET /api/learner/profile
router.get('/profile', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  let profile = await db.getLearner(userId);
  if (!profile) {
    profile = await db.updateLearner(userId, {
      display_name: req.user!.displayName,
      current_lesson_id: 'L01',
    });
  }
  res.json({ profile });
});

// PATCH /api/learner/profile
router.patch('/profile', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const { display_name, current_lesson_id } = req.body;
  const updated = await db.updateLearner(userId, {
    ...(display_name ? { display_name } : {}),
    ...(current_lesson_id ? { current_lesson_id } : {}),
  });
  res.json({ profile: updated });
});

// GET /api/learner/progress
router.get('/progress', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const items = await db.getAllItemProgress(userId);
  res.json({ progress: items });
});

// GET /api/learner/state (Aggregate learner state)
router.get('/state', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const profile = (await db.getLearner(userId)) || (await db.updateLearner(userId, {
    display_name: req.user!.displayName,
    current_lesson_id: 'L01',
  }));
  const items = await db.getAllItemProgress(userId);
  const mastery = await db.getConceptMastery(userId);
  const goals = await db.getAllGoalProgress(userId);

  res.json({
    profile,
    items_progress: items,
    concept_mastery: mastery,
    goals_progress: goals,
    total_xp_earned: profile.total_xp_earned || 0,
    acorn_balance: profile.acorn_balance || 0,
  });
});

// POST /api/learner/progress/items/:itemId
router.post('/progress/items/:itemId', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const { itemId } = req.params;
  const { state = 'completed', activeSeconds = 0 } = req.body as { state: ItemState; activeSeconds: number };

  const updated = await db.setItemProgress(userId, itemId, state, activeSeconds);

  if (state === 'completed') {
    try {
      // Award XP and Acorns
      await prisma.learnerProfile.update({
        where: { userId },
        data: {
          totalXpEarned: { increment: 25 },
          acornBalance: { increment: 5 },
          lastActiveDate: new Date(),
        },
      });

      // Advance daily quest
      const todayKey = new Date().toISOString().slice(0, 10);
      const quest = await prisma.dailyQuest.findUnique({
        where: { userId_questDate_questType: { userId, questDate: todayKey, questType: 'LESSON_COMPLETE' } },
      });
      if (quest && !quest.isCompleted) {
        const nextCount = quest.currentCount + 1;
        await prisma.dailyQuest.update({
          where: { id: quest.id },
          data: {
            currentCount: nextCount,
            isCompleted: nextCount >= quest.targetCount,
          },
        });
      }
    } catch (e) {
      console.error('Error awarding item progress rewards:', e);
    }
  }

  res.json({ itemProgress: updated });
});

// POST /api/learner/assessments/:assessmentId/submit
router.post('/assessments/:assessmentId/submit', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const { assessmentId } = req.params;
  const { responses = [], activeSeconds = 0 } = req.body;

  try {
    const result = await evaluationService.submitAssessment({
      learnerId: userId,
      assessmentId,
      responses,
      activeSeconds,
    });

    // Gamification rewards on passing assessment
    if (result.attempt?.passed) {
      const score = result.attempt.score || 0;
      const xpEarned = Math.round(score * 35);
      const acornsEarned = score >= 1 ? 15 : 10;

      await prisma.learnerProfile.update({
        where: { userId },
        data: {
          totalXpEarned: { increment: xpEarned },
          acornBalance: { increment: acornsEarned },
          lastActiveDate: new Date(),
        },
      });

      // If perfect score, advance daily quest
      if (score >= 1) {
        const todayKey = new Date().toISOString().slice(0, 10);
        const quest = await prisma.dailyQuest.findUnique({
          where: { userId_questDate_questType: { userId, questDate: todayKey, questType: 'PERFECT_SCORE' } },
        });
        if (quest && !quest.isCompleted) {
          await prisma.dailyQuest.update({
            where: { id: quest.id },
            data: { currentCount: 1, isCompleted: true },
          });
        }
      }
    }

    res.json(result);
  } catch (err: any) {
    console.error('Error submitting assessment:', err);
    res.status(500).json({ error: err.message || 'Failed to grade assessment' });
  }
});

// GET /api/learner/attempts
router.get('/attempts', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const assessmentId = req.query.assessmentId as string | undefined;
  const attempts = await db.getAttempts(userId, assessmentId);
  res.json({ attempts });
});

// GET /api/learner/mastery
router.get('/mastery', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const mastery = await db.getConceptMastery(userId);
  res.json({ mastery });
});

// GET /api/learner/goals
router.get('/goals', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  const goals = await db.getAllGoalProgress(userId);
  res.json({ goals });
});

// POST /api/learner/reset
router.post('/reset', async (req: Request, res: Response) => {
  const userId = getAuthorizedUserId(req);
  await db.resetLearner(userId);
  res.json({ success: true, message: `Progress reset for user ${userId}` });
});

export default router;
