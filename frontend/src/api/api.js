import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzhiZTExYjc0MWNmM2YzOWFlMjUyNiIsImlhdCI6MTY5MTMwNjM2NSwiZXhwIjoxNjkxMzkyNzY1fQ.9WT4t77Dj0AbAU3jW33ePAZr0Tt1XwXQdMMD4161-fo",
  },
});
