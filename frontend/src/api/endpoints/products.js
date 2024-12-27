import API from "../API";

export const createProduct = async (props) => {
  const { data } = await API.post(`/products`, props);
  return data;
};
export const editProduct = async (id, update) => {
  const { data } = await API.patch(`/products/${id}`, update);

  return data;
};

export const getAllProducts = async ({ search }) => {
  const { data: products } = await API.get(
    `/products${search ? "?search=" + search : ""}`
  );
  return products;
};

export const getProductById = async (productId) => {
  const { data } = await API.get(`/products/${productId}`);
  return data;
};

export const getCategorizedProducts = async (limit) => {
  const { data } = await API.get(
    `/products/categorized${limit ? `?limit=${limit}` : ""}`
  );
  return data;
};

export const deleteProduct = async (productId) => {
  await API.delete(`/products/${productId}`);
};
