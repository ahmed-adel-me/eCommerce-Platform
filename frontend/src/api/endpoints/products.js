import API from "../API";

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
  console.log(queryString);
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
  const { data } = await API.get(`/products/categorized/${id}?color=white`);
  return data.data;
};

export const getFeaturedProduct = async () => {
  const { data } = await API.get("/products/featured");
  return data.data.featuredProduct;
};
