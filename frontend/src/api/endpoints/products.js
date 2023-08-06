import API from "../API";

export const getAllProducts = async () => {
  const { data } = await API.get("/products");
  const products = data.data.products;
  return products;
};

export const getProductById = async (productId) => {
  const { data } = await API.get(`/products/${productId}`);
  return data.data.product;
};

export const getProductsByCategory = async (limit) => {
  const { data } = await API.get(
    `/products/categorized${limit ? `?limit=${limit}` : ""}`
  );
  return data.data;
};
