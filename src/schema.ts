import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String!
    getAllTasks: [Task!]!
    getTaskById(taskId: ID!): Task

    me: User
  }

  type Mutation {
    createTask(taskInput: TaskCreateInput!): Task
    updateTask(taskId: String!, taskInput: TaskUpdateInput!): Task

    createUser(userInput: UserInput!): Boolean!
    loginUser(userInput: UserInput!): LoginResponse!
  }

  type Task {
    id: ID!
    content: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
    userId: Int
  }

  type User {
    id: ID!
    email: String!
    tasks: [Task!]!
  }

  type LoginResponse {
    token: String!
  }

  input TaskCreateInput {
    content: String!
    completed: Boolean
  }

  input TaskUpdateInput {
    content: String
    completed: Boolean
  }

  input UserInput {
    email: String!
    password: String!
  }
`;
