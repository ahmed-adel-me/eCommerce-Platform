import { useAuth } from "../../context/Auth";
import API from "../API";

export const loginUser = async (email, password) => {
  const {data} = await API.post("/users/login", { email, password });

  return data;
};
