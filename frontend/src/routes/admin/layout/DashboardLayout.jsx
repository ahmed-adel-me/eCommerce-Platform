import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
