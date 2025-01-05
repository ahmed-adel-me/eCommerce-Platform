import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useUser from "../hooks/useUser";

export default function Protect({ children, onlyAdmin }) {
  const { data: user, isSuccess, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <ClipLoader size={50} />
      </div>
    );
  }

  if (isError) {
    return <Navigate replace to="/login" />;
  }

  if (onlyAdmin && isSuccess && user.role !== "admin") {
    return <Navigate replace to="/" />;
  }

  if (isSuccess) {
    return children;
  }

  return null;
}
