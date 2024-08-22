import { useMutation, useQueryClient } from "react-query";
import { createProduct as createProductApi } from "../../../../api/endpoints/products";
import toast from "react-hot-toast";

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: async (props) => createProductApi(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product created successfully");
    },
  });

  return { createProduct, isLoading };
}
