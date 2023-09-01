import API from "../API";
export const getMyProfile = async () => {
  const { data } =await API.get("/users/my-profile");
  return data.user;
};
