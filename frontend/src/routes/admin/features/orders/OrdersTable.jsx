import { ClipLoader } from "react-spinners";
import useOrders from "./useOrders";
import Table from "../../UI/Table";
import formatDate from "../../../../utils/formatDate";

function OrdersTable() {
  const { orders, isLoading, isSuccess } = useOrders();

  return (
    <div>
      <h2 className="text-2xl font-semibold">Orders</h2>

      <Table columns={"grid-cols-[1fr_2fr_2fr_1fr]"}>
        <Table.Header>
          <h4 className="uppercase text-gray-600 font-bold">DATE</h4>
          {/* <h4 className="uppercase text-gray-600 font-bold">PAID</h4> */}
          <h4 className="uppercase text-gray-600 font-bold">RECIPIENT</h4>
          <h4 className="uppercase text-gray-600 font-bold">PRODUCTS</h4>
          <h4 className="uppercase text-gray-600 font-bold">PRICE</h4>
        </Table.Header>
        <Table.Body>
          {isLoading && (
            <div className="flex justify-center">
              <ClipLoader />
            </div>
          )}

          {isSuccess &&
            (orders.length > 0 ? (
              orders.map((order) => (
                <Table.Row border key={order._id}>
                  <span className="text-lg">{formatDate(order.date)}</span>
                  <ul>
                    <li>{order.name}</li>
                    <li>{order.email}</li>
                    <div className="flex">
                      <li>{order.country}</li>
                      <li className="mx-1">-</li>
                      <li>{order.city}</li>
                    </div>
                  </ul>
                  <ul>
                    {order.products.map((product) => (
                      <li className="space-x-2" key={product._id}>
                        <span>{product.product}</span>
                        <span className="font-bold bg-gray-200  px-2 rounded">
                          x{product.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-lg">
                    ${Math.round(order?.totalPrice)}
                  </span>
                </Table.Row>
              ))
            ) : (
              <p className="text-center">No Orders Yet!</p>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default OrdersTable;
