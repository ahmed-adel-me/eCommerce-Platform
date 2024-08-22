import { useQuery } from "react-query";
import { getFeaturedProduct } from "../api/endpoints/featuredProduct";

export default function useFeaturedProduct() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["featuredProduct"],
    queryFn: getFeaturedProduct,
  });

  const product = data?.product || data;
  return { product, isLoading, isSuccess };
}
