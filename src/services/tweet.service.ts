import { CreateTweetDto } from "../dto/create-tweet.dto";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient;

class TweetService{
   async createTweet(tweetData:CreateTweetDto){
    return await prisma.tweet.create({
        data: {
            content: tweetData.content,
            userId: tweetData.userId
        }
    });
   }

     async getTweetsByUserId(userId: string) {
        return await prisma.tweet.findMany({
            where: {userId},
            orderBy: { createdAt: 'desc' }
        });
     }

    async getTweetById(id: string) {
        const tweet = await prisma.tweet.findUnique({
            where: {id},
            include: { user: true }
        });
        if (!tweet) throw new Error('Tweet not found');
        return tweet;
    }
}

export default new TweetService();