import API from "../API";

export const getShippingPrice = async () => {
  const { data } = await API.get("/settings/shipping-price");
  return data?.shippingPrice;
};
export const updateShippingPrice = async (shippingPrice) => {
  const { data } = await API.put("/settings/shipping-price", { shippingPrice });
  return data;
};
