import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookApi.css';


const App = () => {
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", { 
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => {
      setBookData(response.data.books);
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setError("404: Not Found");
      } else {
        setError("Error fetching data");
      }
    });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {bookData.map(book => (
        <div key={book.id} className="book-container">
          <h2 className="book-title">{book.title}</h2>
          <div className="book-info">
            <div>
              {book.imageLinks && book.imageLinks.thumbnail && (
                <img src={book.imageLinks.thumbnail} alt="Book Cover" className="book-image" />
              )}
              <p className="book-author">Authors: {book.authors ? book.authors.join(", ") : "Unknown"}</p>
            </div>
            <div>
              <p>{book.description}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;