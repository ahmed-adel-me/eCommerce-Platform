import withErrorHandling from "../../utils/withErrorHandling";
import API from "../API";

export const loginUser = withErrorHandling(async (email, password) => {
  const { data } = await API.post("/users/login", { email, password });
  return data;
});
export const getUser = async () => {
  const { data } = await API.get("/users/my-profile");
  return data;
};
export const signupUser = withErrorHandling(async (props) => {
  const { data } = await API.post("/users/signup", props);
  return data;
});
export const updateMyProfile = async (userData) => {
  const { data } = await API.patch("/users/my-profile", userData);
  return data.user;
};

export const createAdmin = withErrorHandling(async (userData) => {
  const { data } = await API.post("/users/admin/signup", userData);
  return data;
});

export const getUsers = async (role) => {
  const { data } = await API.get("/users/admin/users", { params: { role } });
  return data;
};

export const logoutUser = async () => {
  await API.get("/users/logout");
};
