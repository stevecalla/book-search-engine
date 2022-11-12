// section 
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

//section
import { getUserId } from '../utils/getUserId'; //get user id from jwt token

// section Remove the useEffect() Hook that sets the state for UserData.
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import { REMOVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // get userId from jwt token to use in query/mutation
  let userId = getUserId();

  // setup remove book graphql mutation
  const [removeBook] = useMutation(REMOVE_BOOK);
  
  // get user saved book info to render to page
  let savedBooks = [];
  const { loading, data } = useQuery(QUERY_ME, {
    // variables: { id: '636c6732dd1ce92e610cd132' },
    variables: { id: userId },
  });

  // using loading paramater to wait for response from useQuery QUERY_ME
  if (loading) {
    return <div>Loading...</div>;
  } else if (userId) {
    // userData = data;
    console.log(data)
    savedBooks = data.me[0].savedBooks;
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
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' style={{height: "500px", width: "100%", objectFit: "cover", objectPosition: "top", overflow: "scroll"}}/> : null}
                <Card.Body>
                  <Card.Title className='mb-0'>{book.title}</Card.Title>
                  <p className='small mb-0'>Authors: {book.authors}</p>
                  <p className='small mt-0'>Published Date: {book.publishedDate}</p>
                  <Card.Text style={{ height: "500px", overflow: "scroll"}}>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
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
