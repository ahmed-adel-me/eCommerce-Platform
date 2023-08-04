import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-4 sticky w-full bg-[#201F20]">
      <div className="flex justify-between max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold text-[#ffffffd4]">Ecommerce</h2>
        <ul className="flex font-semibold gap-4 text-lg text-[#ffffffb6]">
          <li>
            <NavLink
              to={"/home"}
              className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/products"}
              className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"categories"}
              className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"account"}
              className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
            >
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/cart"}
              className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
            >
              Cart
            </NavLink>
          </li>
        </ul>
        <button>
          <AiOutlineSearch color="gray" size={25} />
        </button>
      </div>
    </nav>
  );
}
