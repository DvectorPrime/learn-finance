import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database';
import { generateToken, requireAuth } from '../middleware/authMiddleware';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const name = displayName && typeof displayName === 'string' && displayName.trim().length > 0
      ? displayName.trim()
      : email.split('@')[0];

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await db.createUser({
      email,
      password_hash,
      display_name: name,
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      learnerId: user.learner_id,
      displayName: user.display_name,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        learnerId: user.learner_id,
        createdAt: user.created_at,
      },
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create account.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      learnerId: user.learner_id,
      displayName: user.display_name,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        learnerId: user.learner_id,
        createdAt: user.created_at,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to authenticate.' });
  }
});

// POST /api/auth/google
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { idToken, accessToken } = req.body;

    if (!idToken && !accessToken) {
      return res.status(400).json({ error: 'Google OAuth token or credential is required.' });
    }

    let userEmail: string | undefined;
    let userName: string | undefined;

    // 1. Verify idToken with Google tokeninfo endpoint if present
    if (idToken && typeof idToken === 'string') {
      try {
        const verifyRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
        );
        if (verifyRes.ok) {
          const tokenInfo = (await verifyRes.json()) as any;
          if (tokenInfo.email && (tokenInfo.email_verified === 'true' || tokenInfo.email_verified === true)) {
            userEmail = tokenInfo.email;
            userName = tokenInfo.name || tokenInfo.given_name;
          }
        }
      } catch (e) {
        console.warn('[GoogleAuth] Could not verify Google ID token with Google endpoint:', e);
      }
    }

    // 2. Verify accessToken with Google userinfo endpoint if present
    if (accessToken && typeof accessToken === 'string' && !userEmail) {
      try {
        const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (userRes.ok) {
          const userInfo = (await userRes.json()) as any;
          if (userInfo.email) {
            userEmail = userInfo.email;
            userName = userInfo.name || userInfo.given_name;
          }
        }
      } catch (e) {
        console.warn('[GoogleAuth] Could not fetch Google userinfo:', e);
      }
    }

    if (!userEmail) {
      return res.status(401).json({ error: 'Google authentication could not be verified. Please try again.' });
    }

    const normalizedEmail = userEmail.toLowerCase().trim();
    let user = await db.findUserByEmail(normalizedEmail);
    if (!user) {
      // Create user automatically with Google OAuth identity
      user = await db.createUser({
        email: normalizedEmail,
        password_hash: 'GOOGLE_OAUTH_PROVIDER',
        display_name: userName || normalizedEmail.split('@')[0],
      });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      learnerId: user.learner_id,
      displayName: user.display_name,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        learnerId: user.learner_id,
        createdAt: user.created_at,
      },
    });
  } catch (err: any) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Failed to authenticate with Google.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  const user = await db.findUserById(req.user!.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      learnerId: user.learner_id,
      createdAt: user.created_at,
    },
  });
});

// POST /api/auth/reset (Reset all user data)
router.post('/reset', async (_req: Request, res: Response) => {
  await db.clearAll();
  res.json({ message: 'All user data wiped successfully.', ok: true });
});

export default router;
