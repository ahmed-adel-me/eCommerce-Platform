import { useMutation } from "@tanstack/react-query";
import { createAdmin as createAdminApi } from "../../../../api/endpoints/auth";
import toast from "react-hot-toast";

export default function useCreateAdmin() {
  const { mutate: createAdmin, isLoading } = useMutation({
    mutationFn: (userData) => createAdminApi(userData),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createAdmin, isLoading };
}
