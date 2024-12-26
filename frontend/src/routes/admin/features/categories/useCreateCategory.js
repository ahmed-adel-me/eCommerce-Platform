import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "../../../../api/endpoints/categories";
import toast from "react-hot-toast";
export default function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: (props) => createCategoryApi(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Category created successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  return { createCategory, isLoading };
}
