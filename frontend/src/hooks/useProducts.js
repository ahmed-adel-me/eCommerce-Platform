import { useQuery } from "react-query";
import { getAllProducts } from "../api/endpoints/products";

export default function useProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { products, isLoading };
}
