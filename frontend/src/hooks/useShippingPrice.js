import { useQuery } from "@tanstack/react-query";
import { getShippingPrice } from "../api/endpoints/settings";

export default function useShippingPrice() {
  const {
    data: shippingPrice,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["shippingPrice"],
    queryFn: getShippingPrice,
  });

  return { shippingPrice, isLoading, isSuccess };
}
