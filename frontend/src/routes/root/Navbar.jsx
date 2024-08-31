import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/Cart";
import { HiOutlineLogout } from "react-icons/hi";
import useLogout from "../../hooks/useLogout";

export default function Navbar() {
  const {logout,isPending} = useLogout()
  const { cart } = useCart();

  return (
    <nav className="py-4 sticky top-0 z-50 w-full bg-[#201F20]">
      <div className="flex justify-between max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold text-[#ffffffd4]">Ecommerce</h2>
        <ul className="flex font-semibold gap-4 text-lg text-[#ffffffb6]">
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
        <div className="flex justify-center items-center gap-5">
          <NavLink
            to={"/search"}
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-gray-400"}`
            }
          >
            <AiOutlineSearch color="inhirt" size={25} />
          </NavLink>
          <button className="p-1 rounded-md text-gray-400 hover:text-white absolute right-10  disabled:cursor-wait" disabled={isPending} onClick={logout}>
            <HiOutlineLogout color="inhirt" size={25} />
          </button>
        </div>
      </div>
    </nav>
  );
}
