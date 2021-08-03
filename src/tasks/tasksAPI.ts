import { Task } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import { prisma } from '../../prisma';

export interface ITaskCreateInput {
  content: string;
  completed?: boolean;
}

export interface ITaskUpdateInput {
  content?: string;
  completed?: boolean;
}

export class TasksAPI extends DataSource {
  public async getAllTasks(): Promise<Task[]> {
    return await prisma.task.findMany();
  }

  public async getTaskById(taskId: string): Promise<Task | null> {
    return await prisma.task.findUnique({ where: { id: taskId } });
  }

  public async createTask(taskInput: ITaskCreateInput): Promise<Task> {
    return await prisma.task.create({
      data: taskInput,
    });
  }

  public async updateTask(
    taskId: string,
    taskInput: ITaskUpdateInput,
  ): Promise<Task> {
    return await prisma.task.update({
      where: { id: taskId },
      data: taskInput,
    });
  }
}
