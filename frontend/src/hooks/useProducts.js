import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/endpoints/products";

export default function useProducts(search) {
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts({ search }),
  });

  return { products, isLoading, isSuccess };
}
