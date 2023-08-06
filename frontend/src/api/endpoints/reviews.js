import API from "../API";

export const createReview = async (props) => {
  const { data } = await API.post(`/products/${props.product}/reviews`, props);

  return data;
};
