import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import BooksPage from "./books/BooksPage.jsx";
import Error404 from "./Error404.jsx";
import Layout from "./layout/Layout.jsx";
import Book from "./books/Book.jsx";

import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
