"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const User = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        setEmail("");
        setPassword("");
      } else {
        setError("Please provide both email address and password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="container mb">
      <h3>Identifying the User </h3>
      <p>
        When the user is logged in, their identity will be linked in the
        AuthContext handler.
      </p>
      {user ? (
        <>
          <p>Current user: {user?.email}</p>
          <button className="btn btn-logout" onClick={() => logout()}>
            Logout
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter any email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};
