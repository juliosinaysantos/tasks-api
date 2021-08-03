import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { TasksAPI } from './tasks/tasksAPI';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  dataSources: () => ({
    tasksAPI: new TasksAPI(),
  }),
});
