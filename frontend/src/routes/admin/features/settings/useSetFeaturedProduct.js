import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setFeaturedProduct as setFeaturedProductApi } from "../../../../api/endpoints/featuredProduct";
import toast from "react-hot-toast";

export default function useSetFeaturedProduct() {
  const queryClient = useQueryClient();
  const { mutate: setFeaturedProduct, isPending } = useMutation({
    mutationFn: (productId) => setFeaturedProductApi(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["featuredProduct"],
      });
      toast.success("Featured product changed successfully");
    },
  });

  return { setFeaturedProduct, isLoading: isPending };
}
