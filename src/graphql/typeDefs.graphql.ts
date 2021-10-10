import { gql } from 'apollo-server';

export const typeDefs = gql`
  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }
  
  
  type Post {
    id: ID!
    body: String!
    createdAt: String!
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  
  
  type Query {
    getPosts: [Post]
  }
  
  
  type Mutation {
    register(registerInput: RegisterInput!): User!
  }
`
