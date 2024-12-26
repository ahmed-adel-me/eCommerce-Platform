import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../../../api/endpoints/products";
import toast from "react-hot-toast";

export default function useUpdateProduct(productId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (update) => {
      update.images = update.images.map((img) => img.src);
      editProduct(productId, update);
    },
    onSuccess: () => {
      toast.success("Product edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
  });
}
