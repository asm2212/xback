import { Request, Response } from 'express';
import tweetService from '../services/tweet.service';

class TweetController {
  async createTweet(req: Request, res: Response) {
    try {
      const tweet = await tweetService.createTweet(req.body);
      res.status(201).json(tweet);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ error: message });
    }
  }

  async getTweetsByUserId(req: Request, res: Response) {
    try {
      const tweets = await tweetService.getTweetsByUserId(req.params.userId);
      res.status(200).json(tweets);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  }

  async getTweetById(req: Request, res: Response) {
    try {
      const tweet = await tweetService.getTweetById(req.params.id);
      res.status(200).json(tweet);
    } catch (error) {
      if (error instanceof Error && error.message === 'Tweet not found') {
        res.status(404).json({ error: error.message });
      } else {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
      }
    }
  }
}

export default new TweetController();
