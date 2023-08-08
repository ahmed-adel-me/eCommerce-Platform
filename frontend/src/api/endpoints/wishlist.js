import API from "../API";

export const getWishlist = async () => {
  const { data } = await API.get("/products/wishlist");
  return data.data.wishList;
};

export const addWishlistProduct = async (productId) => {
  const { data } = await API.post(`/products/${productId}/wishlist`);
  return data;
};
export const deleteWishlistProduct = async (productId) => {
  const { data } = await API.delete(`/products/${productId}/wishlist`);
  return data;
};
