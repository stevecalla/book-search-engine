import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import BookList from '../components/BookListSaved';

import { getUserId  } from '../utils/getUserId'; //get user id from jwt token

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_TEST } from '../utils/queries';

import { REMOVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // get userId from jwt token to use in query/mutation
  let userId = getUserId();

  // setup remove book graphql mutation
  const [removeBook] = useMutation(REMOVE_BOOK);
  
  // get all user saved book info to render to page
  let savedBooks = [];
  const { loading, data } = useQuery(QUERY_ME, {
    // variables: { id: '636f2bdf0a1a38271a7e9b8a' },
    variables: { id: userId },
  });

  // using loading paramater to wait for response from useQuery QUERY_ME
  if (loading) {
    return <div>Loading...</div>;
  } else if (userId) { //section is this if statement necessary? if userId is valid from token then 
    // userData = data;
    console.log(data)
    savedBooks = data.me.savedBooks;

    // if local storage doesn't contain saved books, then set
    if (!localStorage.getItem('saved_books') && savedBooks.length > 0) {
      localStorage.setItem('saved_books', JSON.stringify(savedBooks.map(element => element.bookId)));
    }
  }

  // delete book
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: {
          id: userId,
          bookId: bookId
        }
      });

      console.log(data); //to eliminate console warning

      removeBookId(bookId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>

      <BookList savedBooks={savedBooks} handleDeleteBook={handleDeleteBook} source={"saved"}/>
    </>
  );
};

export default SavedBooks;
