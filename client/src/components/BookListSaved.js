import React from "react";
import { Container, Button, Card, CardColumns } from "react-bootstrap";

const BookListSaved = ({ savedBooks, handleDeleteBook, source }) => {
  return (
    <>
      <Container>
        <h2>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${
                savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      overflow: "scroll",
                    }}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title className="mb-0">{book.title}</Card.Title>
                  <p className="small mb-0">Authors: {book.authors}</p>
                  <p className="small mt-0">
                    Published Date: {book.publishedDate}
                  </p>
                  <Card.Text style={{ height: "500px", overflow: "scroll" }}>
                    {book.description}
                  </Card.Text>

                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>

                  <div className="d-flex justify-content-between">
                    <Button
                      className="btn-block btn-info mt-1 mr-1"
                      size="sm"
                      target="_blank"
                      href={book.infoLink}
                    >
                      Google Info
                    </Button>
                    <Button
                      className="btn-block btn-info mt-1 ml-1"
                      size="sm"
                      target="_blank"
                      href={book.previewLink}
                    >
                      Google Preview
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

export default BookListSaved;
