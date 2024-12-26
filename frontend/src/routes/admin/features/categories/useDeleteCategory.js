import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../../../api/endpoints/categories";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCategory,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (categoryId) => deleteCategoryApi(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category deleted successfully");
    },
  });

  return { deleteCategory, isLoading, isSuccess };
}
