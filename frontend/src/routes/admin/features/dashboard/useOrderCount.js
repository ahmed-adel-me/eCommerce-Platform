import { useQuery } from "react-query";
import { getOrderCount } from "../../../../api/endpoints/orders";

export default function useOrderCount() {
  return useQuery({
    queryKey: ["ordersCount"],
    queryFn: getOrderCount,
    suspense: true,
  });
}
