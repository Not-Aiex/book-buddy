import { useState } from "react";
import { useAuth } from "./AuthContext";

import { Link, useNavigate } from "react-router";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [error, setError] = useState(null);
  const tryLogin = async (formData) => {
    setError(null);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      nav("/books");
    } catch (error) {
      console.log("here");
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <p>{error}</p>}
      </form>
      <Link to="/register">Register here.</Link>
    </>
  );
}
