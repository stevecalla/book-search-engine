import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';

import { ADD_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import decode from 'jwt-decode';

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return saveBookIds(savedBookIds);
  }, [savedBookIds]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || "No description available.",
        image: book.volumeInfo.imageLinks?.thumbnail || "https://placehold.jp/16/0000FF/ffffff/300x500.png?text=No%20Image%20Available",
        publishedDate: book.volumeInfo.publishedDate || "No publish date",
        previewLink: book.volumeInfo.previewLink || "No preview link",
        infoLink: book.volumeInfo.infoLink || "No info link",
      }));

      console.log(bookData);

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const [addBook] = useMutation(ADD_BOOK);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const user = token && decode(token);
  const userId = token && user.data._id;
  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    console.log(bookToSave);

    try {
      const { data } = await addBook({
        variables: {
          id: userId,
          ...bookToSave
        }
      });

      console.log(data); //to eliminate console warning

      // if book saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' style={{height: "500px", width: "100%", objectFit: "cover", objectPosition: "top", overflow: "scroll"}}/>
                ) : null}
                <Card.Body>
                  <Card.Title className='mb-0'>{book.title}</Card.Title>
                  <p className='small mb-0'>Authors: {book.authors}</p>
                  <p className='small mt-0'>Published Date: {book.publishedDate}</p>
                  <Card.Text style={{ height: "500px", overflow: "scroll"}}>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <>
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'Book Already Saved!'
                        : 'Save this Book!'}
                    </Button>
                    <div className="d-flex justify-content-between">
                      <Button 
                        className="btn-block btn-info mt-1 mr-1" 
                        size="sm" 
                        target="_blank"
                        href={book.infoLink}
                        >Google Info
                      </Button>
                      <Button 
                        className="btn-block btn-info mt-1 ml-1" 
                        size="sm" 
                        target="_blank"
                        href={book.previewLink}
                        >Google Preview
                      </Button>
                    </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;

