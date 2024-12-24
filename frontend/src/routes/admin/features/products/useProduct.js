import { useQuery } from "react-query";
import { getProductById } from "../../../../api/endpoints/products";

export default function useProduct(id) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
  return { product, isLoading };
}
