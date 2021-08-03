import { taskMutationResolvers } from './tasks/graphql/resolvers/mutation';
import { taskQueryResolvers } from './tasks/graphql/resolvers/query';

export const resolvers = {
  Query: {
    hello: (): string => `Hello World! 👋`,
    ...taskQueryResolvers,
  },
  Mutation: {
    ...taskMutationResolvers,
  },
};
