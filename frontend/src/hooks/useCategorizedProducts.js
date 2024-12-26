import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategorizedProducts } from "../api/endpoints/products";

export default function useCategorizedProducts(categoryId) {
  const [searchParams] = useSearchParams();

  // Extracting the "sortBy" parameter
  const sortBy = searchParams.get("sortBy") || "date-desc";

  // Extracting and decoding the "filter" parameter
  const filter = searchParams.get("filter") || "";

  // Concatenate all filter values into a single string

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products", categoryId, sortBy, filter],
    queryFn: () =>
      getCategorizedProducts({ categoryId, sortBy, filter: filter }),
  });

  return { data, isLoading, isError, isSuccess };
}
