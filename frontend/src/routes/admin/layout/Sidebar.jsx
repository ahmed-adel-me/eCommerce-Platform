import {
  HiOutlineClipboard,
  HiOutlineHome,
  HiOutlineViewList,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
  HiOutlineCog,
} from "react-icons/hi";
import SidebarItem from "./SidebarItem";

function Sidebar() {
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
      </ul>
    </aside>
  );
}

export default Sidebar;
