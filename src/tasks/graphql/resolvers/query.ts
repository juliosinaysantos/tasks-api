import { Task } from '@prisma/client';
import { IContext } from '../../../interfaces';

export const taskQueryResolvers = {
  getAllTasks: async (
    _root: null,
    _args: Record<string, never>,
    { dataSources }: IContext,
  ): Promise<Task[]> => {
    try {
      const tasks = dataSources.tasksAPI.getAllTasks();
      return tasks;
    } catch (e) {
      console.log(`[Error on retrieve all tasks] ${e}`);
      throw new Error('Internal Server Error');
    }
  },

  getTaskById: async (
    _root: null,
    { taskId }: { taskId: string },
    { dataSources }: IContext,
  ): Promise<Task | null> => {
    try {
      const task = dataSources.tasksAPI.getTaskById(taskId);
      return task;
    } catch (e) {
      console.log(`[Error on retrieve a single tasks by id] ${e}`);
      throw new Error('Internal Server Error');
    }
  },
};
