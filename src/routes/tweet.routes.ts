import { Router } from 'express';
import tweetController from '../controllers/tweet.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/create',authenticate, tweetController.createTweet);
router.get('/user/:userId', tweetController.getTweetsByUserId);
router.get('/:id', tweetController.getTweetById);

export default router;