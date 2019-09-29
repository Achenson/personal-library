import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";

/*

App ( F dispComents F addBook)  | 2x state -> books, comments to disply (for clicked book)
    NewBookForm (-> addBook F. handleSubmit)to add a book    | 1x state (value for input)
    BooksDisplay (-> dispComments ->index ->book) | stateless
    Comments (-> comments state) | 1x state
*/

function NewBookForm({ addBook }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) return;
    addBook(value);
    setValue("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Book Title"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <br></br>
        <button style={{ width: "148px", height: "25px" }}>
          Submit New Book!
        </button>
      </form>
    </div>
  );
}

function Comments({ comments, addComment, deleteBook, books }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) return;
    addComment(value);
    setValue("");
  }

  if (comments.isHidden) {
    return null;
  }

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <p>
        <b>{books[comments.indexOfDisplayedBook].title}</b>
        {` (id: ${books[comments.indexOfDisplayedBook]._id})`}
      </p>
      {comments.isDeleted ? (
        <div>
          <p>delete successful</p>
          <br></br>
          <br></br>
          <p>Refresh the page</p>
        </div>
      ) : (
        <div>
          <ul>
            {books[comments.indexOfDisplayedBook].arrOfComments.map(
              (comment, index) => (
                <li key={index}>{comment}</li>
              )
            )}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="New Comment"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <br></br>
            <button style={{ width: "148px", height: "25px" }}>
              Add Comment
            </button>
          </form>
          <button
            style={{ width: "148px", height: "25px" }}
            onClick={deleteBook}
          >
            Delete Book
          </button>
        </div>
      )}
    </div>
  );
}

function BooksDisplay({ index, book, dispComments }) {
  return (
    <div>
      <div className="BooksDisplay">
        <p onClick={() => dispComments(index)}>
          {book.title}
          {` - ${book.arrOfComments.length} comments`}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([
    { _id: uuid(), title: "New book", arrOfComments: ["first comment"] },
    { _id: uuid(), title: "1984", arrOfComments: [] },
    { _id: uuid(), title: "Test Book ", arrOfComments: ["one", "two"] },
    {
      _id: uuid(),
      title: " Wikipedia offline",
      arrOfComments: ["test comment"]
    }
  ]);

  const [comments, setComments] = useState({
    isHidden: true,
    idDeleted: false,
    indexOfDisplayedBook: 0
  });

  console.log(setBooks);
  console.log(books);

  function dispComments(index) {
    const newComments = {
      isHidden: false,
      isDeleted: false,
      indexOfDisplayedBook: index
    };

    setComments(newComments);
  }

  function addBook(value) {
    const newBooks = [
      ...books,
      { _id: uuid(), title: value, arrOfComments: [] }
    ];
    setBooks(newBooks);
  }

  function addComment(value) {
    const booksWithNewComments = [...books];
    booksWithNewComments[comments.indexOfDisplayedBook].arrOfComments.push(
      value
    );
    setBooks(booksWithNewComments);
  }

  function deleteBook() {
    const newBooks = [...books];

    const newBooks2 = newBooks.splice(
      newBooks[comments.indexOfDisplayedBook],
      1
    );

    setBooks(newBooks2);

    const newComments = {
      isHidden: false,
      isDeleted: true,
      indexOfDisplayedBook: comments.indexOfDisplayedBook
    };

    setComments(newComments);
  }

  return (
    <div className="App">
      <h1>Sample Front-End</h1>
      <NewBookForm addBook={addBook} />
      <div className="book-list">
        {books.map((book, index) => (
          <BooksDisplay
            index={index}
            key={index}
            book={book}
            dispComments={dispComments}
          />
        ))}
      </div>
      <Comments
        comments={comments}
        addComment={addComment}
        deleteBook={deleteBook}
        books={books}
      />
    </div>
  );
}

export default App;
