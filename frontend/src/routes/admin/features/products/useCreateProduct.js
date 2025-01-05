import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../../../api/endpoints/products";
import toast from "react-hot-toast";
import uploadImages from "../../../../utils/uploadImages";

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: async (props) => {
      const { images, ...productData } = props;
      let imageUrls = [];
      if (images.length > 0) {
        imageUrls = await uploadImages(images);
      }
      await createProductApi({
        ...productData,
        images: imageUrls,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(
        `Error creating product: ${error.message || "Unknown error"}`
      );
    },
  });

  return { createProduct, isLoading: isPending };
}
