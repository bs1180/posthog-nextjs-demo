"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import posthog from "posthog-js";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users: Map<string, User> = new Map();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("currentUser");
    if (storedEmail) {
      const existingUser = users.get(storedEmail);
      if (existingUser) {
        setUser(existingUser);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user: userData } = await response.json();

        let localUser = users.get(email);
        if (!localUser) {
          localUser = userData;
          users.set(email, localUser);
        }

        setUser(localUser);
        localStorage.setItem("currentUser", email);

        // Identify user in PostHog using email as the new distinct ID. Because this is on the client, the existing distinct ID will be overwritten, no need to alias.
        posthog.identify(email, {
          email: email,
        });

        // Capture login event
        posthog.capture("user_logged_in", {
          email: email,
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    // Capture logout event before resetting
    posthog.capture("user_logged_out");
    posthog.reset();

    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
