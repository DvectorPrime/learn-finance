import { Router, Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.use(requireAuth);

// Helper to calculate months difference
function getMonthsBetween(d1: Date, d2: Date): number {
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return Math.max(1, months <= 0 ? 1 : months);
}

// 1. GET /api/goals - List user's goals
router.get('/', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { type, status } = req.query;

  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
        ...(type ? { type: String(type) as any } : {}),
        ...(status ? { status: String(status) as any } : {}),
      },
      include: {
        steps: { orderBy: { stepNumber: 'asc' } },
        contributions: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const enrichedGoals = goals.map(g => {
      const target = g.targetAmount || 0;
      const current = g.currentAmount || 0;
      const progressPercent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
      return {
        ...g,
        progressPercent,
        completedSteps: g.steps.filter(s => s.isCompleted).length,
        totalSteps: g.steps.length,
      };
    });

    res.json({ goals: enrichedGoals });
  } catch (err: any) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch goals' });
  }
});

// 2. POST /api/goals - Create new goal
router.post('/', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const {
    type,
    title,
    targetAmount,
    monthlyContribution,
    targetDate,
    targetModuleId,
    lessonsPerWeek = 3,
    autoGenerateSteps = true,
  } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({ error: 'Goal title must be at least 3 characters long' });
  }

  if (!type || !['LEARNING', 'SAVINGS', 'LONG_TERM'].includes(type)) {
    return res.status(400).json({ error: 'Valid goal type (LEARNING, SAVINGS, LONG_TERM) is required' });
  }

  try {
    const parsedTargetDate = targetDate ? new Date(targetDate) : null;
    const parsedAmount = targetAmount !== undefined && targetAmount !== null ? Number(targetAmount) : null;
    let parsedMonthly = monthlyContribution !== undefined && monthlyContribution !== null ? Number(monthlyContribution) : null;

    if (type === 'SAVINGS' || type === 'LONG_TERM') {
      if (parsedAmount !== null && (isNaN(parsedAmount) || parsedAmount < 5000)) {
        return res.status(400).json({ error: 'Target amount must be at least ₦5,000 for savings goals' });
      }
      if (parsedTargetDate && (isNaN(parsedTargetDate.getTime()) || parsedTargetDate.getTime() <= Date.now())) {
        return res.status(400).json({ error: 'Target date must be set in the future' });
      }
      if (parsedMonthly !== null && (isNaN(parsedMonthly) || parsedMonthly <= 0)) {
        return res.status(400).json({ error: 'Monthly contribution must be greater than ₦0' });
      }
    }

    // Auto-calculate monthly requirement if target date and amount provided but monthly omitted
    if (parsedAmount && parsedTargetDate && !parsedMonthly) {
      const months = getMonthsBetween(new Date(), parsedTargetDate);
      parsedMonthly = Math.ceil(parsedAmount / months);
    }

    const goal = await prisma.goal.create({
      data: {
        userId,
        type,
        title,
        targetAmount: parsedAmount,
        monthlyContribution: parsedMonthly,
        targetDate: parsedTargetDate,
        targetModuleId,
        lessonsPerWeek: Number(lessonsPerWeek),
      },
    });

    // Auto-generate realistic steps if long-term or requested
    if (autoGenerateSteps) {
      const defaultSteps = type === 'LONG_TERM'
        ? [
            { stepNumber: 1, title: 'Save a deposit', actionText: `Set aside initial 15% equity reserve` },
            { stepNumber: 2, title: 'Check credit readiness', actionText: 'Review debt-to-income and credit standing' },
            { stepNumber: 3, title: 'Research the area', actionText: 'Survey asking prices and historical appreciation' },
            { stepNumber: 4, title: 'Verify property legal title', actionText: 'Perform governor consent and survey verification' },
            { stepNumber: 5, title: 'Complete the purchase', actionText: 'Finalize escrow and stamp duty closing' },
          ]
        : type === 'SAVINGS'
        ? [
            { stepNumber: 1, title: 'First Milestone (20%)', actionText: `Accumulate first ${(parsedAmount ? (parsedAmount * 0.2).toLocaleString() : 'starter fund')}` },
            { stepNumber: 2, title: 'Midpoint Buffer (50%)', actionText: 'Maintain consistent monthly contributions' },
            { stepNumber: 3, title: 'Final Stretch (100%)', actionText: 'Complete full liquidity reserve' },
          ]
        : [
            { stepNumber: 1, title: 'Foundations Check', actionText: 'Complete first 3 lessons of Module' },
            { stepNumber: 2, title: 'Mid-term Mastery', actionText: 'Pass diagnostic capstone quiz' },
            { stepNumber: 3, title: 'Module Finish', actionText: 'Earn module certificate and XP badge' },
          ];

      await prisma.goalStep.createMany({
        data: defaultSteps.map(s => ({
          goalId: goal.id,
          stepNumber: s.stepNumber,
          title: s.title,
          actionText: s.actionText,
          isCompleted: false,
        })),
      });
    }

    const completeGoal = await prisma.goal.findUnique({
      where: { id: goal.id },
      include: { steps: { orderBy: { stepNumber: 'asc' } } },
    });

    res.status(201).json({ goal: completeGoal });
  } catch (err: any) {
    console.error('Error creating goal:', err);
    res.status(500).json({ error: err.message || 'Failed to create goal' });
  }
});

// 3. GET /api/goals/:id - Goal detail & pacing analytics
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    const goal = await prisma.goal.findFirst({
      where: { id, userId },
      include: {
        steps: { orderBy: { stepNumber: 'asc' } },
        contributions: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const target = goal.targetAmount || 0;
    const current = goal.currentAmount || 0;
    const progressPercent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
    const remaining = Math.max(0, target - current);

    let monthsRemaining = 12;
    if (goal.targetDate) {
      monthsRemaining = getMonthsBetween(new Date(), new Date(goal.targetDate));
    }

    const requiredMonthlyRate = Math.ceil(remaining / Math.max(1, monthsRemaining));
    const isBehindSchedule = goal.monthlyContribution
      ? goal.monthlyContribution < requiredMonthlyRate
      : false;

    const suggestedIncrease = isBehindSchedule && goal.monthlyContribution
      ? Math.max(10000, requiredMonthlyRate - goal.monthlyContribution)
      : 50000;

    res.json({
      goal: {
        ...goal,
        progressPercent,
        remainingAmount: remaining,
        monthsRemaining,
        requiredMonthlyRate,
        isBehindSchedule,
        suggestedIncrease,
        nextMilestone: target > 0 ? Math.min(target, current + Math.ceil(target * 0.25)) : 0,
      },
    });
  } catch (err: any) {
    console.error('Error fetching goal details:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch goal detail' });
  }
});

// 4. PATCH /api/goals/:id - Update goal
router.patch('/:id', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const { title, targetAmount, monthlyContribution, targetDate, status } = req.body;

  try {
    const existing = await prisma.goal.findFirst({ where: { id, userId } });
    if (!existing) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const updated = await prisma.goal.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(targetAmount !== undefined ? { targetAmount: Number(targetAmount) } : {}),
        ...(monthlyContribution !== undefined ? { monthlyContribution: Number(monthlyContribution) } : {}),
        ...(targetDate ? { targetDate: new Date(targetDate) } : {}),
        ...(status ? { status } : {}),
      },
      include: { steps: true, contributions: true },
    });

    res.json({ goal: updated });
  } catch (err: any) {
    console.error('Error updating goal:', err);
    res.status(500).json({ error: err.message || 'Failed to update goal' });
  }
});

// 5. DELETE /api/goals/:id - Delete goal
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    const existing = await prisma.goal.findFirst({ where: { id, userId } });
    if (!existing) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    await prisma.goal.delete({ where: { id } });
    res.json({ success: true, message: 'Goal deleted successfully' });
  } catch (err: any) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ error: err.message || 'Failed to delete goal' });
  }
});

// 6. POST /api/goals/:id/contribute - Log savings contribution
router.post('/:id/contribute', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const { amount, note } = req.body;

  const depositAmount = Number(amount);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    return res.status(400).json({ error: 'A positive contribution amount is required' });
  }

  try {
    const goal = await prisma.goal.findFirst({ where: { id, userId } });
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const newTotal = goal.currentAmount + depositAmount;
    const isCompleted = goal.targetAmount ? newTotal >= goal.targetAmount : false;

    // Record contribution
    const [contribution, updatedGoal, updatedProfile] = await prisma.$transaction([
      prisma.goalContribution.create({
        data: {
          goalId: id,
          amount: depositAmount,
          note: note || 'Contribution deposit',
        },
      }),
      prisma.goal.update({
        where: { id },
        data: {
          currentAmount: newTotal,
          status: isCompleted ? 'COMPLETED' : goal.status,
        },
        include: { steps: true, contributions: true },
      }),
      prisma.learnerProfile.update({
        where: { userId },
        data: {
          acornBalance: { increment: 10 },
          totalXpEarned: { increment: isCompleted ? 120 : 25 },
        },
      }),
    ]);

    res.json({
      contribution,
      goal: updatedGoal,
      reward: {
        acornsEarned: 10,
        xpEarned: isCompleted ? 120 : 25,
        isCompleted,
      },
    });
  } catch (err: any) {
    console.error('Error adding contribution:', err);
    res.status(500).json({ error: err.message || 'Failed to record contribution' });
  }
});

// 7. POST /api/goals/:id/breakdown - Generate or regenerate Ophelos Breakdown (G9)
router.post('/:id/breakdown', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    const goal = await prisma.goal.findFirst({ where: { id, userId } });
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // Clear existing steps and create fresh 5-step breakdown
    await prisma.goalStep.deleteMany({ where: { goalId: id } });

    const target = goal.targetAmount || 1000000;
    const stepTarget = Math.round(target / 5);

    const steps = [
      { stepNumber: 1, title: 'Establish First Reserve', actionText: `Save ₦${stepTarget.toLocaleString()} towards initial buffer.` },
      { stepNumber: 2, title: 'Automate Monthly Stash', actionText: `Set up monthly deposit of ₦${(goal.monthlyContribution || Math.round(stepTarget / 3)).toLocaleString()}.` },
      { stepNumber: 3, title: 'Verify Cost & Inflation Factors', actionText: 'Adjust target benchmark against current 15.93% annual NBS metrics.' },
      { stepNumber: 4, title: '80% Capital Checkpoint', actionText: `Surpass ₦${Math.round(target * 0.8).toLocaleString()} milestone.` },
      { stepNumber: 5, title: 'Goal Execution & Completion', actionText: 'Disburse funds for your specified target milestone.' },
    ];

    await prisma.goalStep.createMany({
      data: steps.map(s => ({
        goalId: id,
        stepNumber: s.stepNumber,
        title: s.title,
        actionText: s.actionText,
        isCompleted: false,
      })),
    });

    const refreshed = await prisma.goal.findUnique({
      where: { id },
      include: { steps: { orderBy: { stepNumber: 'asc' } } },
    });

    res.json({ goal: refreshed });
  } catch (err: any) {
    console.error('Error generating breakdown:', err);
    res.status(500).json({ error: err.message || 'Failed to generate breakdown' });
  }
});

// 8. PATCH /api/goals/:id/steps/:stepId - Toggle step completion
router.patch('/:id/steps/:stepId', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id, stepId } = req.params;
  const { isCompleted } = req.body;

  try {
    const goal = await prisma.goal.findFirst({ where: { id, userId } });
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const updatedStep = await prisma.goalStep.update({
      where: { id: stepId },
      data: {
        isCompleted: Boolean(isCompleted),
        completedAt: isCompleted ? new Date() : null,
      },
    });

    res.json({ step: updatedStep });
  } catch (err: any) {
    console.error('Error toggling goal step:', err);
    res.status(500).json({ error: err.message || 'Failed to update step' });
  }
});

export default router;
