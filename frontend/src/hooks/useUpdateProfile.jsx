import { useMutation, useQueryClient } from "react-query";
import { updateMyProfile } from "../api/endpoints/auth";
import toast from "react-hot-toast";

export default () => {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isLoading } = useMutation(
    (userData) => updateMyProfile(userData),
    {
      onSuccess: () => {
        toast.success("Account updated successfully");
        queryClient.invalidateQueries("user");
      },
    }
  );
  return { updateProfile, isLoading };
};
