import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addWishlistProduct,
  deleteWishlistProduct,
} from "../api/endpoints/wishlist";

export default function useToggleLike() {
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: ({ id, isLiked }) => {
      if (isLiked) {
        return deleteWishlistProduct(id);
      } else {
        return addWishlistProduct(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categorizedProducts"],
      });
    },
  });

  return { toggleLike, isLoading:isPending };
}
