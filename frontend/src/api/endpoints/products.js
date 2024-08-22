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

export const getAllProducts = async (queries) => {
  let queryString = "";
  if (queries) {
    const queryArray = [];
    for (const key in queries) {
      queryArray.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`
      );
    }
    queryString = queryArray.join("&");
  }
  const { data } = await API.get(`/products?${queryString}`);
  const products = data.data.products;
  return products;
};

export const getProductById = async (productId) => {
  const { data } = await API.get(`/products/${productId}`);
  return data.data.product;
};

export const getCategorizedProducts = async (limit) => {
  const { data } = await API.get(
    `/products/categorized${limit ? `?limit=${limit}` : ""}`
  );
  return data.data;
};

export const getCategoryById = async (id) => {
  const { data } = await API.get(`/products/categorized/${id}`);
  return data.data;
};

export const getFeaturedProduct = async () => {
  const { data } = await API.get("/products/featured");
  return data.data.featuredProduct;
};
