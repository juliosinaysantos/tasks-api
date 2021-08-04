import { Task } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import { prisma } from '../../prisma';
import { IContext } from '../interfaces';

export interface ITaskCreateInput {
  content: string;
  completed?: boolean;
  userId: number;
}

export interface ITaskUpdateInput {
  content?: string;
  completed?: boolean;
}

export class TasksAPI extends DataSource {
  private context: IContext | null;

  public constructor() {
    super();
    this.context = null;
  }

  public initialize({ context }: { context: IContext }): void {
    this.context = context;
  }

  public async getAllTasks(): Promise<Task[]> {
    const userId = this.context?.user.id;
    return await prisma.task.findMany({ where: { userId } });
  }

  public async getTaskById(taskId: string): Promise<Task | null> {
    const userId = this.context?.user.id;
    return await prisma.task.findFirst({
      where: {
        AND: [{ id: taskId }, { userId }],
      },
    });
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
