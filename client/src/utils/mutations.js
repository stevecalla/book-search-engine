import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($thoughtText: String!) {
    addBook(bookId: ID!, authors: [String], description: String, image: String, link: String, title: String) {
      bookId
      authors,
      description
      image
      link
      title
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookID: ID!) {
    removeBook(userID: $userId, bookID: $bookID) {
      _id
      bookId
      authors
      description
      image
      link
      title
    }
  }
`;
