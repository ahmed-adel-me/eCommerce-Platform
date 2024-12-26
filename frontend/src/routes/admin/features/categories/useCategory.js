import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../../../api/endpoints/categories";

export default function useCategory(id) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });
}
