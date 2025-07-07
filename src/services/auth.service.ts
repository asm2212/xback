import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from "../config/auth.config";

const prisma = new PrismaClient();

class AuthService {
    async validateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) throw new Error('User not found');

        const isValid = await bcrypt.compare(password, user.password || '');
        return isValid ? user : null;
    }

    async generateToken(userId: string): Promise<string> {
        return jwt.sign(
            { id: userId }, 
            authConfig.jwtSecret, 
            { expiresIn: authConfig.jwtExpiration }
        );
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, authConfig.bcryptSaltRounds);
    }

    verifyToken(token: string): string | JwtPayload {
        return jwt.verify(token, authConfig.jwtSecret);
    }
}

export default new AuthService();