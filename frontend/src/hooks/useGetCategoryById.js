import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCategoryById } from "../api/endpoints/categories";

export default function useGetCategoryById(categoryId) {
  const [searchParams] = useSearchParams();

  // Extracting the "sortBy" parameter
  const sortBy = searchParams.get("sortBy") || "date-desc";

  // Extracting and decoding the "filter" parameter
  const filter = searchParams.get("filter") || "";

  // Concatenate all filter values into a single string

  console.log(filter);

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["products", categoryId, sortBy, filter],
    () => getCategoryById({ categoryId, sortBy, filter: filter })
  );

  return { data, isLoading, isError, isSuccess };
}
