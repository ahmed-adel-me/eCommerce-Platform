import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/endpoints/auth";

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
}
