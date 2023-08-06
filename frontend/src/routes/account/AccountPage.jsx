import React from "react";
import AccountDetails from "./AccountDetails";
import { useAuth } from "../../context/Auth";

export default function AccountPage() {
  //   const { user } = useAuth();
  //   console.log(user);
  const user = {
    wishList: [],
    _id: "64c8be11b741cf3f39ae2526",
    name: "ahmed",
    email: "ahmed@gmail.com",
    role: "admin",
  };
  return (
    <section>
      <AccountDetails userData={{ name: user.name, email: user.email }} />
    </section>
  );
}
