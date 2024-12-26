import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/endpoints/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
