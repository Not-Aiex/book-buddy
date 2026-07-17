import { useState } from "react";
import { useAuth } from "./AuthContext";

import { Link, useNavigate } from "react-router";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const tryRegister = async (formData) => {
    setError(null);
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstName, lastName, email, password });
      nav("/books");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          First Name
          <input type="text" name="firstname" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastname" />
        </label>
        <label>
          Email
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p>{error}</p>}
      </form>
      <Link to="/login">Log in here.</Link>
    </>
  );
}
