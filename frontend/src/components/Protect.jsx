import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function Protect({ children }) {
  const { token } = useAuth();

  return token ? children : <Navigate to={"/login"} />;
}
