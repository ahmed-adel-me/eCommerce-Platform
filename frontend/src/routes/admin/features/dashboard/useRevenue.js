import { useSuspenseQuery } from "@tanstack/react-query";
import { getRevenue } from "../../../../api/endpoints/orders";

export default function useRevenue() {
  return useSuspenseQuery({
    queryKey: ["revenue"],
    queryFn: getRevenue,
  });
}
