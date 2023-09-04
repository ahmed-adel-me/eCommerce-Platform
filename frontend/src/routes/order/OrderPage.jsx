import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function OrderPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isSuccess = searchParams.get("success") === "true";
  return (
    <section className=" flex justify-center items-center">
      <div className=" pt-16 flex flex-col justify-center items-center">
        {isSuccess ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-3">Order Successful!</h2>
            <p className="text-lg text-gray-600">
              Your order has been placed successfully. Thank you for your
              purchase!
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-3">Order Canceled!</h2>
            <p className="text-lg text-gray-600">
              Your order has been placed successfully. Thank you for your
              purchase!
            </p>
          </div>
        )}

        <Link
          to={"/"}
          className="bg-gray-800 text-white rounded-lg py-2 px-5 text-lg font-semibold mt-7"
        >
          Go To Home
        </Link>
      </div>
    </section>
  );
}
