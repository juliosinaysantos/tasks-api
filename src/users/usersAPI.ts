import { User } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import { prisma } from '../../prisma';

export interface IUserInput {
  email: string;
  password: string;
}

export class UsersAPI extends DataSource {
  public async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  public async createUser(userInput: IUserInput): Promise<User> {
    return await prisma.user.create({
      data: userInput,
    });
  }
}
