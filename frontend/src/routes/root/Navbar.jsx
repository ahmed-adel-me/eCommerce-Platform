import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineLogout, HiOutlineMenu } from "react-icons/hi";
import { useCart } from "../../context/Cart";
import useLogout from "../../hooks/useLogout";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { cart } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <nav className="py-4 sticky top-0 z-50 w-full bg-[#201F20]">
      <div className="flex justify-between max-w-7xl mx-auto px-4 md:px-8">
        <Link to={"/"} className="text-xl font-semibold text-[#ffffffd4]">
          Ecommerce
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex font-semibold gap-4 text-lg text-[#ffffffb6]">
          <li>
            <NavLink
              to={"/"}
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
              {cart.productsTotal > 0 && (
                <span className=" mx-1">({cart.productsTotal})</span>
              )}
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-5">
          {/* Search Icon */}
          <NavLink
            to={"/search"}
            className={({ isActive }) =>
              `md:flex justify-between items-center gap-2 hidden  ${
                isActive ? "text-white" : "text-gray-400"
              }`
            }
          >
            <AiOutlineSearch color="inherit" size={25} />
            <span>Search</span>
          </NavLink>

          {/* Logout Button */}
          <button
            className="p-1 rounded-md text-gray-400 hover:text-white disabled:cursor-wait hidden md:block"
            disabled={isPending}
            onClick={logout}
          >
            <HiOutlineLogout color="inherit" size={25} />
          </button>

          {/* Drawer Toggle Button */}
          <button
            className="md:hidden p-1 rounded-md text-gray-400 hover:text-white"
            onClick={toggleDrawer}
          >
            <HiOutlineMenu size={25} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{
          backgroundColor: "#201F20",
        }}
      >
        <div className="p-4 text-[#ffffffb6] font-semibold text-lg">
          <ul className="space-y-6">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
                onClick={toggleDrawer}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/products"}
                className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
                onClick={toggleDrawer}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"categories"}
                className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
                onClick={toggleDrawer}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"account"}
                className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
                onClick={toggleDrawer}
              >
                Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"search"}
                className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
                onClick={toggleDrawer}
              >
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/cart"}
                className={({ isActive }) => ` ${isActive ? "text-white" : ""}`}
                onClick={toggleDrawer}
              >
                Cart
                {cart.productsTotal > 0 && (
                  <span className=" mx-1">({cart.productsTotal})</span>
                )}
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </Drawer>
    </nav>
  );
}
