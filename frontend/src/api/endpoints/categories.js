import withErrorHandling from "../../utils/withErrorHandling";
import API from "../API";
export const getAllCategories = async () => {
  const { data } = await API.get(`/categories`);
  return data;
};
export const getCategoryById = async ({ categoryId, filter, sortBy }) => {
  const { data } = await API.get(
    `/products/categorized/${categoryId}?sort=${sortBy}${
      filter && "&" + filter
    }`
  );
  return data;
};

export const createCategory = withErrorHandling(async (props) => {
  const { data } = await API.post(`/categories`, props);
  return data;
});

export const deleteCategory = withErrorHandling(async (categoryId) => {
  await API.delete(`/categories/${categoryId}`);
});
