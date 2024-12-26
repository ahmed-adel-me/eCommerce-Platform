import { useSuspenseQuery } from "@tanstack/react-query";
import { getOrderCount } from "../../../../api/endpoints/orders";

export default function useOrderCount() {
  return useSuspenseQuery({
    queryKey: ["ordersCount"],
    queryFn: getOrderCount,
  });
}
