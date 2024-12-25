import withErrorHandling from "../../utils/withErrorHandling";
import API from "../API";

export const getAllOrders = async () => {
  const { data } = await API.get("/orders");
  return data;
};
export const createOrder = async (props) => {
  const { data } = await API.post("/orders", props);
  return data.url;
};

export const confirmOrder = withErrorHandling(async (sessionId) => {
  const { data } = await API.post("/orders/confirm-order", null, {
    params: { session_id: sessionId },
  });
  return data;
});

export const getMyOrders = async () => {
  const { data } = await API.get("/orders/my-orders");
  return data;
};

export const getOrderCount = async () => {
  const { data } = await API.get(`/orders/order-count-stats`);
  return data;
};

export const getRevenue = async () => {
  const { data } = await API.get(`/orders/revenue-stats`);
  return data;
};
