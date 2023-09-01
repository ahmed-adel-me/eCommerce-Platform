import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export default function Auth({ children }) {
  const [token, setToken] = useState(() => Cookies.get("jwt"));

  function login(token) {
    setToken(token);
    Cookies.set("jwt", token);
  }
  function logout() {
    setToken(null);
    Cookies.remove("jwt");
  }
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
