import { useMutation } from "@tanstack/react-query";
import { confirmOrder as confirmOrderApi } from "../../api/endpoints/orders";
export default function useConfirmOrder() {
  const {
    mutate: confirmOrder,
    data,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: confirmOrderApi,
  });

  return {
    confirmOrder,
    data,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
  };
}
