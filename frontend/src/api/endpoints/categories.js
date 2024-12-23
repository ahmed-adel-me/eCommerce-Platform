import withErrorHandling from "../../utils/withErrorHandling";
import API from "../API";
export const getAllCategories = async () => {
  const { data } = await API.get(`/categories`);
  return data;
};
// export const getCategorizedProducts = async ({ categoryId, filter, sortBy }) => {
//   const { data } = await API.get(
//     `/products/categorized/${categoryId}?sort=${sortBy}${
//       filter && "&" + filter
//     }`
//   );
//   return data;
// };
export const getCategoryById = async (categoryId) => {
  const { data } = await API.get(`/categories/${categoryId}`);
  data.brands = data.brands.join(",");
  return data;
};
export const createCategory = withErrorHandling(async (props) => {
  const { data } = await API.post(`/categories`, props);
  return data;
});
export const updateCategory = withErrorHandling(
  async ({ categoryId, values }) => {
    const { data } = await API.patch(`/categories/${categoryId}`, values);
    return data;
  }
);

export const deleteCategory = withErrorHandling(async (categoryId) => {
  await API.delete(`/categories/${categoryId}`);
});
