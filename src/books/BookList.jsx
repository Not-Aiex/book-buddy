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
    <li>
      <Link to={"/books/" + book.id}>{book.title}</Link>
    </li>
  );
}
