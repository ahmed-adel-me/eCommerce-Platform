import API from "../API";

export const loginUser = async (email, password) => {
  const { data } = await API.post("/users/login", { email, password });

  return data;
};

export const signupUser = async (props) => {
  const { data } = await API.post("/users/signup", props);
  return data;
};
