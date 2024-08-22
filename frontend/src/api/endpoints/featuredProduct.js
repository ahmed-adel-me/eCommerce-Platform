import API from "../API";
export const getFeaturedProduct = async () => {
  const { data } = await API.get("/products/featured");
  return data;
};

export const setFeaturedProduct = async (productId) => {    
  const { data } = await API.post("/products/featured", {productId});
  return data;
};
