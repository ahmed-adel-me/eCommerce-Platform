import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export default function Auth({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  function login(token, user) {
    setToken(token);
    setUser(user);
  }
  function logout() {
    setToken(null);
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
