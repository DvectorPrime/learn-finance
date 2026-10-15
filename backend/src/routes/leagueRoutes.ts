import { Router, Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { optionalAuth } from '../middleware/authMiddleware';

const router = Router();
router.use(optionalAuth);

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

router.get('/current', async (req: Request, res: Response) => {
  const currentUserId = req.user ? req.user.userId : null;
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const currentYear = now.getFullYear();

  try {
    // 1. Ensure or find current week's cohort
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

    // 2. Fetch all real registered users and their actual profiles
    const allUsers = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    // 3. Map into actual standings (ZERO hardcoded or simulated peers)
    const members = allUsers.map((u) => {
      const isCurrentUser = currentUserId ? u.id === currentUserId : false;
      const displayName = u.displayName || u.email.split('@')[0];
      const xp = u.profile?.totalXpEarned || 0;

      return {
        id: u.id,
        name: displayName,
        xp,
        isCurrentUser,
        initials: getInitials(displayName),
      };
    });

    // 4. Sort strictly descending by real XP earned
    members.sort((a, b) => b.xp - a.xp);

    // 5. Assign real ranks
    const totalMembers = members.length;
    const rankedStandings = members.map((m, index) => {
      const rank = index + 1;
      return {
        ...m,
        rank,
        isPromotionZone: totalMembers > 5 ? rank <= 5 : false,
        isDemotionZone: totalMembers > 10 ? rank >= totalMembers - 2 : false,
      };
    });

    // 6. Find current user's entry
    let userEntry = currentUserId ? rankedStandings.find((m) => m.isCurrentUser) : null;

    if (!userEntry && currentUserId) {
      // If user wasn't in allUsers for some reason
      userEntry = {
        id: currentUserId,
        name: req.user!.displayName || 'You',
        xp: 0,
        isCurrentUser: true,
        initials: getInitials(req.user!.displayName || 'You'),
        rank: rankedStandings.length + 1,
        isPromotionZone: false,
        isDemotionZone: false,
      };
      rankedStandings.push(userEntry);
    } else if (!userEntry) {
      // Guest viewer
      userEntry = {
        id: 'guest',
        name: 'Guest Learner',
        xp: 0,
        isCurrentUser: false,
        initials: 'GL',
        rank: 0,
        isPromotionZone: false,
        isDemotionZone: false,
      };
    }

    // Rank delta: neutral 0 delta unless prior history exists
    const rankDeltaString = '― 0';

    // 7. Calculate time remaining until Sunday 23:59:59 UTC
    const msRemaining = Math.max(0, cohort.endsAt.getTime() - Date.now());
    const daysRemaining = Math.floor(msRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((msRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const endsIn = `${daysRemaining}d ${hoursRemaining}h`;

    res.json({
      cohort: {
        id: cohort.id,
        tier: cohort.tier,
        division: cohort.division,
        title: `${cohort.tier} League • Division ${cohort.division === 2 ? 'II' : 'I'}`,
        endsIn,
      },
      currentUser: {
        rank: userEntry.rank,
        weeklyXp: userEntry.xp,
        rankDelta: rankDeltaString,
        totalMembers,
        isPromotionZone: userEntry.isPromotionZone,
        isDemotionZone: userEntry.isDemotionZone,
        isAuthenticated: !!currentUserId,
      },
      standings: rankedStandings,
    });
  } catch (err: any) {
    console.error('Error fetching league standings:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch league' });
  }
});

export default router;
