import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../../../api/endpoints/categories";
import toast from "react-hot-toast";

export default function useUpdateCategory(categoryId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => updateCategory({ categoryId, values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully!");
    },
  });
}
