// section 
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

//section
import Auth from '../utils/auth';

// section Remove the useEffect() Hook that sets the state for UserData.
import decode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// section Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.

const SavedBooks = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const user = decode(token);
  const userId = user.data._id;

  const { loading, data } = useQuery(QUERY_ME, {
    // variables: { id: '636c6732dd1ce92e610cd132' },
    variables: { id: userId },
  });

  let userData = {};
  let savedBooks = [];

  if (loading) {
    return <div>Loading...</div>;
  } else {
    // userData = data;
    savedBooks = data.me[0].savedBooks;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {/* <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
