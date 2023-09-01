import { useMutation } from "react-query";
import { loginUser } from "../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation(({ email, password }) => loginUser(email, password), {
    onSuccess: (data) => {
      login(data.token);
      navigate("/");
    },
  });
};
