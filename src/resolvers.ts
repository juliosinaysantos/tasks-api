import { taskMutationResolvers } from './tasks/graphql/resolvers/mutation';
import { taskQueryResolvers } from './tasks/graphql/resolvers/query';
import { userMutationResolvers } from './users/graphql/resolvers/mutation';
import { userQueryResolvers } from './users/graphql/resolvers/query';

export const resolvers = {
  Query: {
    hello: (): string => `Hello World! 👋`,
    ...taskQueryResolvers,
    ...userQueryResolvers,
  },
  Mutation: {
    ...taskMutationResolvers,
    ...userMutationResolvers,
  },
};
