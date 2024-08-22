import { useQuery } from "react-query";
import { getAllCategories } from "../../../../api/endpoints/categories";

export default function useCategories() {
  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return {
    categories,
    isLoading,
    isSuccess: isSuccess,
  };
}
