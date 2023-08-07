import axios from "axios";
import Cookies from "js-cookie";
export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization:
    `Bearer ${Cookies.get("jwt")}`,
  },
});
