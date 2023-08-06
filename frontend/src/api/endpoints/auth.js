import { useAuth } from "../../context/Auth";
import api from "../api";

export const loginUser = async (email, password) => {
  const {data} = await api.post("/users/login", { email, password });

  return data;
};
