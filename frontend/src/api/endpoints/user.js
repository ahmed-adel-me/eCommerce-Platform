import API from "../API";
export const getMyProfile = async () => {
  const { data } = await API.get("/users/my-profile");
  return data.user;
};

export const updateMyProfile = async (userData) => {
  const { data } = await API.patch("/users/my-profile", userData);
  return data.user;
};
