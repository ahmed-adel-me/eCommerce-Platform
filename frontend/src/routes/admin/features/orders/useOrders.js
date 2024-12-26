import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../../api/endpoints/orders";

export default function useOrders() {
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return { orders, isLoading, isSuccess };
}
