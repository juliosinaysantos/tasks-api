import { TasksAPI } from './tasks/tasksAPI';

export interface IContext {
  dataSources: {
    tasksAPI: TasksAPI;
  };
}
