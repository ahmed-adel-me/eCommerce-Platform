import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useMutation } from "react-query";
import { signupUser } from "../api/endpoints/auth";

export default () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation((props) => signupUser(props), {
    onSuccess: (data) => {
      login(data.token);
      navigate("/");
    },
  });
};
