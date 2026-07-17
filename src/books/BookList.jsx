import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router";

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
      <NavLink to={"/books/" + book.id}>{book.name}</NavLink>
    </li>
  );
}
