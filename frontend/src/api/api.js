import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});


export default instance;
