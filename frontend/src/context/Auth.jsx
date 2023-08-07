import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export default function Auth({ children }) {
  const [token, setToken] = useState(Cookies.get("jwt"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  function login(token, user) {
    setToken(token);
    Cookies.set("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  function logout() {
    setToken(null);
    Cookies.remove("jwt");
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
