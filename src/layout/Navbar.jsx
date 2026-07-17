import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header id="navbar">
      <img className="navbarImage" src="/books.png" />
      <p>Book Buddy</p>
      <nav id="navlinks">
        <NavLink className="links" to="/books">
          Books
        </NavLink>
        {token ? (
          <>
            <a id="logout" href="#" onClick={() => logout()}>
              Log out
            </a>
            <NavLink className="links" to="/account">
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="links" to="/register">
              Register
            </NavLink>
            <NavLink className="links" to="/login">
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
