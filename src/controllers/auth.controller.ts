import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import userService from '../services/user.service';

class AuthController {
  async login(req: Request, res: Response,next:NextFunction):Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await authService.validateUser(email, password);

      if (!user) {
         res.status(401).json({ error: 'Invalid credentials' });
         return
      }

      const token = authService.generateToken(user.id);
      res.json({ token });
    } catch (error) {
    //   res.status(500).json({ error: error.message });
    next(error)
    }
  }

  async register(req: Request, res: Response,next:NextFunction) {
    try {
      const hashedPassword = await authService.hashPassword(req.body.password);
      const user = await userService.createUser({
        ...req.body,
        password: hashedPassword
      });
      
      const token = authService.generateToken(user.id);
      res.status(201).json({ token });
    } catch (error) {
    //   res.status(400).json({ error: error.message });
      next(error);
    }
  }
}

export default new AuthController();