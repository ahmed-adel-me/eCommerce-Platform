import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isLoading: isPending };
}
