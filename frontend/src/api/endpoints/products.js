import API from "../api";

export const getAllProducts = async () => {
  const { data } = await API.get("/products");
  const products = data.data.products;
  return products;
};
