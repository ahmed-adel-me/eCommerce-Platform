import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import ClipLoader from "react-spinners/ClipLoader";

export default function Protect({ children }) {
  const { isSuccess, isLoading, isError } = useUser();
  if (isLoading)
    return (
      <div className="h-screen grid place-items-center">
        <ClipLoader size={50} />
      </div>
    );
  if (isError) return <Navigate replace to={"/login"} />;
  else if (isSuccess) return children;
}
