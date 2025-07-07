import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router(); 

router.get('/', userController.getAllUsers);
router.get('/:id',authenticate, userController.getUserById);
router.post('/create', userController.createUser);

export default router;
