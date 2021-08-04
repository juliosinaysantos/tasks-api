import { Task } from '@prisma/client';
import { AuthenticationError } from 'apollo-server';
import { IContext } from '../../../interfaces';

export const taskQueryResolvers = {
  getAllTasks: async (
    _root: null,
    _args: Record<string, never>,
    { dataSources, user }: IContext,
  ): Promise<Task[]> => {
    if (!user) {
      throw new AuthenticationError('UnAuthenticated');
    }
    try {
      const tasks = await dataSources.tasksAPI.getAllTasks();
      return tasks;
    } catch (e) {
      console.log(`[Error on retrieve all tasks] ${e}`);
      throw new Error('Internal Server Error');
    }
  },

  getTaskById: async (
    _root: null,
    { taskId }: { taskId: string },
    { dataSources, user }: IContext,
  ): Promise<Task | null> => {
    if (!user) {
      throw new AuthenticationError('UnAuthenticated');
    }
    try {
      const task = await dataSources.tasksAPI.getTaskById(taskId);
      return task;
    } catch (e) {
      console.log(`[Error on retrieve a single tasks by id] ${e}`);
      throw new Error('Internal Server Error');
    }
  },
};
