const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: String
  }

  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    books(username: String): [Book]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: ID!, authors: [String], description: String, image: String, link: String, title: String): Book
    removeBook(userId: ID!, bookId: ID!): Book
  }
`;

module.exports = typeDefs;

// me: User