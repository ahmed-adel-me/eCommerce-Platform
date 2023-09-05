import { useMutation, useQueryClient } from "react-query";
import { updateMyProfile } from "../api/endpoints/user";

export default () => {
  const queryClient = useQueryClient();
  return useMutation((userData) => updateMyProfile(userData), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};
