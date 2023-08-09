import React from "react";
import AccountDetails from "./AccountDetails";
import { useAuth } from "../../context/Auth";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function AccountPage() {
    const { user } = useAuth();
  
  return (
    <section>
      <div className="max-w-7xl mx-auto py-10 flex flex-col">
        <AccountDetails userData={{ name: user.name, email: user.email }} />
        <div className="bg-white rounded-xl p-7 mt-10">
          <div className="mb-5 space-x-10">
            <NavLink
              className={({ isActive }) =>
                `text-2xl font-semibold py-1 ${isActive ? "border-b-[3px] border-black" : ""}`
              }
              to={"/account"}
            >
              Wishlist
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-2xl font-semibold py-1 ${isActive ? "border-b-[3px] border-black" : ""}`
              }
              to={"/account/orders"}
            >
              Orders
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
