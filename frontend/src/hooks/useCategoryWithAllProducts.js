import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryWithAllProducts } from "../api/endpoints/products";

export default function useCategoryWithAllProducts(categoryId) {
  const [searchParams] = useSearchParams();

  // Extracting the "sortBy" parameter
  const sortBy = searchParams.get("sortBy") || "date-desc";

  // Extracting and decoding the "filter" parameter
  const filter = searchParams.get("filter") || "";

  // Concatenate all filter values into a single string

  return useQuery({
    queryKey: ["products", categoryId, sortBy, filter],
    queryFn: () =>
      getCategoryWithAllProducts({ categoryId, sortBy, filter: filter }),
  });
}
