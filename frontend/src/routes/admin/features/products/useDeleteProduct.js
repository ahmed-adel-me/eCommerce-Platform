import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../../../api/endpoints/products";
import toast from "react-hot-toast";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProduct,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (productId) => deleteProductApi(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product deleted successfully");
    },
  });

  return { deleteProduct, isLoading, isSuccess };
}
