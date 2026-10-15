import { Router, Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.use(requireAuth);

router.post('/:id/claim', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    const quest = await prisma.dailyQuest.findFirst({
      where: { id, userId },
    });

    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    if (quest.isClaimed) {
      return res.status(400).json({ error: 'Quest reward already claimed' });
    }

    if (!quest.isCompleted && quest.currentCount < quest.targetCount) {
      return res.status(400).json({ error: 'Quest is not yet completed' });
    }

    const [updatedQuest, updatedProfile] = await prisma.$transaction([
      prisma.dailyQuest.update({
        where: { id },
        data: { isCompleted: true, isClaimed: true },
      }),
      prisma.learnerProfile.update({
        where: { userId },
        data: {
          acornBalance: { increment: quest.rewardAcorns },
          totalXpEarned: { increment: quest.rewardXp },
        },
      }),
    ]);

    res.json({
      success: true,
      quest: updatedQuest,
      profile: updatedProfile,
      claimed: {
        acorns: quest.rewardAcorns,
        xp: quest.rewardXp,
      },
    });
  } catch (err: any) {
    console.error('Error claiming quest reward:', err);
    res.status(500).json({ error: err.message || 'Failed to claim quest' });
  }
});

export default router;
