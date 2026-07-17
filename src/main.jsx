import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import Layout from "./layout/Layout.jsx";

import { AuthProvider } from "./auth/AuthContext.jsx";

import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
);
