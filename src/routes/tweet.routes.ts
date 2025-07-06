import { Router } from 'express';
import tweetController from '../controllers/tweet.controller';

const router = Router();

router.post('/create', tweetController.createTweet);
router.get('/user/:userId', tweetController.getTweetsByUserId);
router.get('/:id', tweetController.getTweetById);

export default router;