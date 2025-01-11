import { useState } from "react";
import AccountDetails from "./AccountDetails";
import WishList from "./WishList";
import OrderList from "./OrderList";

export default function AccountPage() {
  const [tap, setTap] = useState(0);
  return (
    <section>
      <div className="max-w-2xl mx-auto py-10 flex flex-col md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        <AccountDetails />
        <div className="bg-white rounded-xl p-7 mt-10 mx-5">
          <div className="mb-5 space-x-10">
            <button
              onClick={() => setTap(0)}
              className={`text-2xl font-semibold py-1 ${
                tap === 0
                  ? "border-b-[3px] border-black"
                  : "hover:text-gray-600"
              }`}
              to={"/account"}
            >
              Wishlist
            </button>
            <button
              onClick={() => setTap(1)}
              className={`text-2xl font-semibold py-1 ${
                tap === 1
                  ? "border-b-[3px] border-black"
                  : "hover:text-gray-600"
              }`}
              to={"/account/orders"}
            >
              Orders
            </button>
          </div>
          {tap === 0 ? <WishList /> : <OrderList />}
        </div>
      </div>
    </section>
  );
}
