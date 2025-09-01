// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { registerRoute } from "@/utils/APIRoutes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --------------------------
  // Register
  // --------------------------
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(registerRoute, {
        name,
        email,
        password,
      });

      const data = res.data;
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  // --------------------------
  // Login
  // --------------------------
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = res.data;
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  // --------------------------
  // Logout
  // --------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // --------------------------
  // Get auth header for protected requests
  // --------------------------
  const getAuthHeader = () => {
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, getAuthHeader }}
    >
      {children}
    </AuthContext.Provider>
  );
};
