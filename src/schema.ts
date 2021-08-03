import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String!
    getAllTasks: [Task!]!
    getTaskById(taskId: ID!): Task
  }

  type Mutation {
    createTask(taskInput: TaskCreateInput!): Task
    updateTask(taskId: String!, taskInput: TaskUpdateInput!): Task
  }

  type Task {
    id: ID!
    content: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
    userId: Int
  }

  input TaskCreateInput {
    content: String!
    completed: Boolean
  }

  input TaskUpdateInput {
    content: String
    completed: Boolean
  }
`;
