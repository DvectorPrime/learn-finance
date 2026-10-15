import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/database';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-naija-finance-jwt-key';

export interface AuthUserPayload {
  userId: string;
  email: string;
  learnerId: string;
  displayName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
      learnerId?: string;
    }
  }
}

export function generateToken(payload: AuthUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUserPayload;
  } catch {
    return null;
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }

  const user = await db.findUserById(payload.userId);
  if (!user) {
    return res.status(401).json({ error: 'User no longer exists.' });
  }

  req.user = payload;
  req.learnerId = payload.learnerId;
  next();
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (payload) {
      req.user = payload;
      req.learnerId = payload.learnerId;
    }
  }

  // If no auth, default learnerId to 'learner-default' so guests can still preview learning
  if (!req.learnerId) {
    req.learnerId = 'learner-default';
  }

  next();
}
