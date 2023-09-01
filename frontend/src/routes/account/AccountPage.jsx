import React from "react";
import AccountDetails from "./AccountDetails";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyProfile } from "../../api/endpoints/user";
export default function AccountPage() {
  const { data: user, isSuccess } = useQuery("user", getMyProfile);
  if (isSuccess)
    return (
      <section>
        <div className="max-w-7xl mx-auto py-10 flex flex-col">
          <AccountDetails
            userData={{
              name: user.name,
              email: user.email,
            }}
          />
          <div className="bg-white rounded-xl p-7 mt-10">
            <div className="mb-5 space-x-10">
              <NavLink
                className={({ isActive }) =>
                  `text-2xl font-semibold py-1 ${
                    isActive ? "border-b-[3px] border-black" : ""
                  }`
                }
                to={"/account"}
              >
                Wishlist
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-2xl font-semibold py-1 ${
                    isActive ? "border-b-[3px] border-black" : ""
                  }`
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
