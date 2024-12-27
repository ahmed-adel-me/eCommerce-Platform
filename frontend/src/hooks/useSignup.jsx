import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/endpoints/auth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (props) => signupUser(props),
    onSuccess: () => {
      toast.success("Signed up successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signup, isLoading: isPending };
}
