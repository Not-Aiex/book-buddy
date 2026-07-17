import { useState } from "react";
import { useAuth } from "./AuthContext";

import { Link, useNavigate } from "react-router";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const tryRegister = async (formData) => {
    setError(null);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, pasword });
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
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p>{error}</p>}
      </form>
      <a onClick={() => setPage("login")}>Log in here.</a>
    </>
  );
}
