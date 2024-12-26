import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../api/endpoints/auth";
import toast from "react-hot-toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (userData) => updateMyProfile(userData),
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.invalidateQueries("user");
    },
  });
  return { updateProfile, isLoading };
}
