import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 text-gray-600 text-lg font-medium py-3 px-6 transition-all duration-300 ${
            isActive
              ? "text-gray-800 bg-gray-50 rounded-sm"
              : "hover:text-gray-800 hover:bg-gray-50 active:bg-gray-50"
          }`
        }
        to={to}
      >
        <Icon className="w-6 h-6" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
