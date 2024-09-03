import {
  HiOutlineClipboard,
  HiOutlineHome,
  HiOutlineViewList,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import useLogout from "../../../hooks/useLogout";

function Sidebar() {
  const { logout } = useLogout();
  return (
    <aside className="w-60">
      <ul>
        <SidebarItem
          to="/admin/dashboard"
          icon={HiOutlineHome}
          label="Dashboard"
        />
        <SidebarItem
          to="/admin/products"
          icon={HiOutlineShoppingBag}
          label="Products"
        />
        <SidebarItem
          to="/admin/categories"
          icon={HiOutlineViewList}
          label="Categories"
        />
        <SidebarItem
          to="/admin/orders"
          icon={HiOutlineClipboard}
          label="Orders"
        />
        <SidebarItem
          to="/admin/users"
          icon={HiOutlineUserGroup}
          label="Admins"
        />
        <SidebarItem
          to="/admin/settings"
          icon={HiOutlineCog}
          label="Settings"
        />
        <button
          className="flex w-full items-center gap-3 text-gray-600 text-lg font-medium py-3 px-6 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 "
          onClick={logout}
        >
          <HiOutlineLogout className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </ul>
    </aside>
  );
}

export default Sidebar;
