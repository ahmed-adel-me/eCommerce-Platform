import { Suspense } from "react";
import User from "../features/dashboard/User";
import { ClipLoader } from "react-spinners";
import Orders from "../features/dashboard/Orders";
import Revenue from "../features/dashboard/Revenue";

function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <ClipLoader />
        </div>
      }
    >
      <User />
      <Orders />
      <Revenue />
    </Suspense>
  );
}
export default AdminDashboard;
