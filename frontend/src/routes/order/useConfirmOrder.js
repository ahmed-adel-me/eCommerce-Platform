import { useMutation } from "react-query";
import { confirmOrder as confirmOrderApi } from "../../api/endpoints/orders";
export default function useConfirmOrder() {
  const {
    mutate: confirmOrder,
    data,
    isLoading,
    isError,
    error,
    isSuccess
  } = useMutation({
    mutationFn: confirmOrderApi,

  });

  return { confirmOrder, data, isLoading, isError, error ,isSuccess};
}
