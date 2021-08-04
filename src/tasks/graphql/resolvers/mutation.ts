import { Task } from '@prisma/client';
import { AuthenticationError } from 'apollo-server';
import { IContext } from '../../../interfaces';
import { ITaskCreateInput, ITaskUpdateInput } from '../../tasksAPI';

export const taskMutationResolvers = {
  createTask: async (
    _root: null,
    {
      taskInput: { content, completed = false },
    }: { taskInput: ITaskCreateInput },
    { dataSources, user }: IContext,
  ): Promise<Task | null> => {
    try {
      if (!user) {
        throw new AuthenticationError('UnAuthenticated');
      }
      console.log(user);
      // TODO: implement validation input.
      const createdTask = await dataSources.tasksAPI.createTask({
        content,
        completed,
        userId: user.id,
      });
      return createdTask;
    } catch (e) {
      console.log(`[Error on task creation] ${e}`);
      throw new Error('Internal Server Error');
    }
  },

  updateTask: async (
    _root: null,
    {
      taskId,
      taskInput: { content, completed },
    }: { taskId: string; taskInput: ITaskUpdateInput },
    { dataSources, user }: IContext,
  ): Promise<Task | null> => {
    try {
      if (!user) {
        throw new AuthenticationError('UnAuthenticated');
      }
      // TODO: ensure the task exists.
      // TODO: implement validation input.
      const updatedTask = await dataSources.tasksAPI.updateTask(taskId, {
        content,
        completed,
      });
      return updatedTask;
    } catch (e) {
      console.log(`[Error updating task] ${e}`);
      throw new Error('Internal Server Error');
    }
  },
};
