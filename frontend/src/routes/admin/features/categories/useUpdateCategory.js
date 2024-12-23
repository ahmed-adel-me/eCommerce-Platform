import { useMutation, useQueryClient } from "react-query";
import { updateCategory } from "../../../../api/endpoints/categories";
import toast from "react-hot-toast";

export default function useUpdateCategory(categoryId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => updateCategory({ categoryId, values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
      toast.success("Category updated successfully!");
    },
  });
}
