import { useQuery } from "react-query";
import { getRevenue } from "../../../../api/endpoints/orders";

export default function useRevenue() {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenue,
    suspense: true,
  });
}
