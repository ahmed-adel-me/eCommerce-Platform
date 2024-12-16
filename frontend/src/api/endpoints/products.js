import uploadImages from "../../utils/uploadImages";
import API from "../API";

export const createProduct = async (props) => {
  const { images, ...productData } = props;
  let imageUrls = [];
  if (images.length > 0) {
    imageUrls = await uploadImages(images);
  }
  const { data } = await API.post(`/products`, {
    ...productData,
    images: imageUrls,
  });
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
