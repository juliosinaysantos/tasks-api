import { Task } from '@prisma/client';
import { IContext } from '../../../interfaces';
import { ITaskCreateInput, ITaskUpdateInput } from '../../tasksAPI';

export const taskMutationResolvers = {
  createTask: async (
    _root: null,
    {
      taskInput: { content, completed = false },
    }: { taskInput: ITaskCreateInput },
    { dataSources }: IContext,
  ): Promise<Task | null> => {
    try {
      // TODO: implement validation input.
      const createdTask = dataSources.tasksAPI.createTask({
        content,
        completed,
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
    { dataSources }: IContext,
  ): Promise<Task | null> => {
    try {
      // TODO: ensure the task exists.
      // TODO: implement validation input.
      const updatedTask = dataSources.tasksAPI.updateTask(taskId, {
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
