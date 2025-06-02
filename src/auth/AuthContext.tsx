import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import httpClient from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!token;

  const login = async (email: string, password: string) => {
    try {
      const response = await httpClient.post("/users/auth", { email, password });
      const receivedToken = response.data.token || response.data.token;
      const receivedUser = response.data.user || response.data.user;

      if (receivedToken && receivedUser) {
        localStorage.setItem("authToken", receivedToken);
        localStorage.setItem("authUser", JSON.stringify(receivedUser));
        setToken(receivedToken);
        setUser(receivedUser);
      } else {
        throw new Error("Token ou usuário não recebido");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string = "user") => {
    try {
      const response = await httpClient.post("/users/create", {
        name,
        email,
        password,
        role
      });

      // Opcional: fazer login automaticamente após o registro
      if (response.data) {
        await login(email, password);
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    function handleStorageChange() {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");
      setToken(storedToken);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}