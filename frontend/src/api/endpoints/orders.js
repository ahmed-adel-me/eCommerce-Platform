import API from "../API";

export const createOrder = async (props) => {
  const { data } = await API.post("/orders", props);
  return data.url;
};

export const getMyOrders = async () => {
  const { data } = await API.get("/orders");
  return data.orders;
};
