import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function BookList({ books, syncBooks }) {
  return (
    <ul>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </ul>
  );
}

function Book({ book }) {
  return (
    <li className="book">
      <figure id="bookImage">
        <img
          className="bookImage"
          alt={"Cover image of " + book.title}
          src={book.coverimage}
        />
      </figure>
      <div>
        <Link className="bookListing" to={"/books/" + book.id}>
          {book.title}
        </Link>
        <p id="author">Written by: {book.author}</p>
        <p>{book.description}</p>
      </div>
    </li>
  );
}
