import API from "../API";

export const getWishlist = async () => {
  const { data } =await API.get("/products/wishlist");
  return data.data.wishList;
};
