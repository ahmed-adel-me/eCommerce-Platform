import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCategorizedProducts } from "../api/endpoints/products";

export default function useCategorizedProducts(categoryId) {
  const [searchParams] = useSearchParams();

  // Extracting the "sortBy" parameter
  const sortBy = searchParams.get("sortBy") || "date-desc";

  // Extracting and decoding the "filter" parameter
  const filter = searchParams.get("filter") || "";

  // Concatenate all filter values into a single string

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["products", categoryId, sortBy, filter],
    () => getCategorizedProducts({ categoryId, sortBy, filter: filter })
  );

  return { data, isLoading, isError, isSuccess };
}
