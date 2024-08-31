import { useMutation, useQueryClient } from "react-query";
import {
  addWishlistProduct,
  deleteWishlistProduct,
} from "../api/endpoints/wishlist";

export default function useToggleLike() {
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isLoading } = useMutation(
    ({ id, isLiked }) => {
      if (isLiked) {
        return deleteWishlistProduct(id);
      } else {
        return addWishlistProduct(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.invalidateQueries({
          queryKey: ["categorizedProducts"],
        });
      },
    }
  );

  return { toggleLike, isLoading };
}
