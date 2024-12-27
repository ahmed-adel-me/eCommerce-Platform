import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../../../api/endpoints/products";
import toast from "react-hot-toast";
import removeImages from "../../../../utils/removeImages";
import uploadImages from "../../../../utils/uploadImages";

export default function useUpdateProduct(productId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await removeImages(data.removedImages);
      const newImages = await uploadImages(data.newImages);

      data.values.images = [...data.oldImages, ...newImages];
      await editProduct(productId, data.values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
      toast.success("Product edited successfully!");
    },
  });
}
