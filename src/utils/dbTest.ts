import { PrismaClient } from "../generated/prisma";

const prisma =  new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect
        console.log('Database connected successfully');

            // Create test user if none exists
            const testUser = await prisma.user.upsert({
                where: {
                    email: 'test@example.com' 
                },
                update: {},
                create: {
                    email: 'test@example.com',
                    name: 'Test User',
                },
            });
            console.log('Test user:', testUser);
    } catch (error) {
            console.error('Database connection error:', error);
    }finally{
        await prisma.$disconnect();
    }
}

testConnection();

