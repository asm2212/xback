import authService from "../services/auth.service";
import { Request,Response,NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
)=> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
 res.status(401).json({ error: 'No token provided' });
 return
  }

  try {
    const decoded = authService.verifyToken(token);
    req.userId = (decoded as any).id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return
  }
};
