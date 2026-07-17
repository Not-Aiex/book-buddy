import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { reserveBook, getBook } from "../api/books";
import { useAuth } from "../auth/AuthContext";

export default function Book() {
  const { token } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    syncBook();
  }, [id]);

  const tryReserve = async () => {
    setError(null);
    try {
      await reserveBook(token, book.id);
      nav("/account"); //navigate to reservation list later
    } catch (error) {
      setError(error.message);
    }
  };
  if (!book) {
    return <p>Loading...</p>;
  }
  // Formatting for the book page
  return (
    <div id="book">
      <figure>
        <img className="bookImage" src={book.coverimage} />
      </figure>
      <section>
        <h1>{book.name}</h1>
        <p>Written by {book.author}</p>
        <p>{book.description}</p>
        {token && <button onClick={tryReserve}>Reserve this book</button>}
        {error && <p>{error}</p>}
      </section>
    </div>
  );
}
