import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../api/endpoints/orders";
import Spinner from "../../components/Spinner";
import formatDate from "../../utils/formatDate";

export default function OrderList() {
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: "orders", queryFn: getMyOrders });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner className={"w-10"} />
      </div>
    );

  if (isSuccess) {
    if (orders.length === 0) return <p>There is no orders yet!</p>;
    return (
      <div className="flex gap-5 flex-wrap">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    );
  }
}

function OrderCard({ order }) {
  const {
    name,
    email,
    streetAddress,
    postalCode,
    city,
    country,
    products,
    date,
  } = order;
  return (
    <div className="border border-gray-600 p-3 rounded-lg flex gap-3">
      <ul className="text-gray-500 font-semibold">
        <li className="text-xl text-gray-600">{formatDate(date)}</li>
        <li>{name}</li>
        <li>{email}</li>
        <li>{streetAddress}</li>
        <li>
          <p>
            {postalCode} {city}, {country}
          </p>
        </li>
      </ul>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <h5 className="space-x-1">
              <span className="text-lg font-semibold text-gray-500">
                {product.quantity}
              </span>
              <span className="text-gray-500">x</span>
              <span className="text-xl font-semibold">{product.product}</span>
            </h5>
          </div>
        ))}
      </ul>
    </div>
  );
}
