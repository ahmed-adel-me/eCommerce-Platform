import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../../api/endpoints/auth";

export default function useAdmins(role) {
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(role),
  });
  return { users, isLoading, isSuccess };
}
