import { useQuery } from "react-query";
import { getUser } from "../api/endpoints/auth";

export default function () {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return query;
}
