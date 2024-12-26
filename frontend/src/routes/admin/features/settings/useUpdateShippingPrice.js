import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShippingPrice } from "../../../../api/endpoints/settings";
import toast from "react-hot-toast";

export default function useUpdateShippingPrice() {
  const queryClient = useQueryClient();
  const { mutate: updatePrice, isLoading } = useMutation({
    mutationFn: updateShippingPrice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingPrice"] });
      toast.success("Shipping price updated successfully");
    },
  });

  return { updatePrice, isLoading };
}
