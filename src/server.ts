import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { TasksAPI } from './tasks/tasksAPI';
import { UsersAPI } from './users/usersAPI';
import { Token } from './shared/Token';

const tasksAPI = new TasksAPI();
const usersAPI = new UsersAPI();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  dataSources: () => ({
    tasksAPI,
    usersAPI,
  }),
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1] || '';
    if (token) {
      try {
        const email = await Token.verifyAuthenticationToken(token);
        const user = await usersAPI.getUserByEmail(email);
        return { user };
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    return {};
  },
});
