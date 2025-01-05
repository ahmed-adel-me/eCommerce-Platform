import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../../../api/endpoints/products";
import toast from "react-hot-toast";
import removeImages from "../../../../utils/removeImages";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProduct,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (product) => {
      await removeImages(product.images);
      return deleteProductApi(product._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product deleted successfully");
    },
  });

  return { deleteProduct, isLoading: isPending, isSuccess };
}
