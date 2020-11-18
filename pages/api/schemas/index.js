import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    login: String
    avatar_url: String
    html_url: String
  }

  type RelationMongoUser {
    _id: ID!
    name: String
    age: Int
  }

  type MongoUser {
    _id: ID!
    name: String
    email: String!
    friends: [RelationMongoUser]
  }

  type Query {
    getUsers: [User]
    getUser(name: String!): User!
    getMongoUsers: [MongoUser]
    getMongoUser(id: ID!): [MongoUser]
  }
`;
