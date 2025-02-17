import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-scroll p-5">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
