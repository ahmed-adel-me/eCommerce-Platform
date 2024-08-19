import { useQuery } from "react-query";
import { getMyOrders } from "../../api/endpoints/orders";
import Spinner from "../../components/Spinner";
import formatDate from "../../utils/formatDate";

export default function OrderList() {
  const ordersQuery = useQuery("orders", getMyOrders);
  if (ordersQuery.isLoading)
    return (
      <div className="flex justify-center">
        <Spinner className={"w-10"} />
      </div>
    );

  if (ordersQuery.isSuccess) {
    if (ordersQuery.data.length === 0) return <p>There is no orders yet!</p>;
    return (
      <div className="flex gap-5 flex-wrap">
        {ordersQuery.data.map((order) => (
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
  console.log(products);
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
              <span className="text-xl font-semibold">
                {product.product.name}
              </span>
            </h5>
          </div>
        ))}
      </ul>
    </div>
  );
}
