import { CreateUserDto } from "../dto/create-user.dto";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

class UserService{
    async createUser(userData: CreateUserDto){
      if(!userData.email) throw new Error('Email is required');

      return await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name,
            password: userData.password,
        }
      });
    }

    async getAllUsers(){
        return await prisma.user.findMany();
    }

    async getUserById(id:string){
        const user = await prisma.user.findUnique({
            where: {id},
            include: {tweets: true}
        });

        if (!user) throw new Error('User not found');
        return user;
    }
}

export default new UserService();