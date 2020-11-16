import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    login: String
    avatar_url: String
    html_url: String
  }

  type MongoUser {
    _id: ID!
    name: String
  }

  type Query {
    getUsers: [User]
    getUser(name: String!): User!
    getMongoUsers: [MongoUser]
  }
`;
