import { Link, useSearchParams } from "react-router-dom";
import useConfirmOrder from "./useConfirmOrder";
let x = true;
export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("success");
  const sessionId = searchParams.get("session_id");
  const { confirmOrder, isLoading, isError, error } = useConfirmOrder();

  if (isSuccess === "true" && x) {
    x = false;
    confirmOrder(sessionId);
  }

  return (
    <section className="flex justify-center items-center">
      <div className="pt-16 flex flex-col justify-center items-center">
        {isLoading && <p>Processing your order...</p>}
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
              Your order could not be processed. Please try again.
            </p>
          </div>
        )}

        {isError && (
          <div className="text-red-600">
            <p>Error: {error.message}</p>
          </div>
        )}

        <Link
          to="/"
          className="bg-gray-800 text-white rounded-lg py-2 px-5 text-lg font-semibold mt-7"
        >
          Go To Home
        </Link>
      </div>
    </section>
  );
}
