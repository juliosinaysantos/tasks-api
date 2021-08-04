import { User } from '@prisma/client';
import { TasksAPI } from './tasks/tasksAPI';
import { UsersAPI } from './users/usersAPI';

export interface IContext {
  dataSources: {
    tasksAPI: TasksAPI;
    usersAPI: UsersAPI;
  };
  user: User;
}
