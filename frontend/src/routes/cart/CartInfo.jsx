import CartItem from "./CartItem";

export default function CartInfo({ cart }) {
  const { products, productsTotal, totalCost, productsCost, shippingCost } =
    cart;
  return (
    <div className="bg-white p-7 pb-14 rounded-xl flex-1">
      <h2 className="text-2xl font-bold mb-7">Cart</h2>
      {productsTotal ? (
        <div>
          <ul className="flex mb-3">
            <li className="text-sm text-gray-400 font-semibold grow-[2] basis-0 ">
              PRODUCT
            </li>
            <li className="text-sm text-gray-400 font-semibold grow-[1] basis-0 text-center">
              QUANTITY
            </li>
            <li className="text-sm text-gray-400 font-semibold grow-[1] basis-0 text-center">
              PRICE
            </li>
          </ul>
          <div className="space-y-5">
            {products.map((data) => (
              <CartItem key={data.product.id} data={data} />
            ))}
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className=" text-xl">Products</span>
            <span className="text-2xl font-semibold">${productsCost}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className=" text-xl">Shipping</span>
            <span className="text-2xl font-semibold">${shippingCost}</span>
          </div>
          <div className="flex justify-between py-3 ">
            <span className="font-bold text-xl">Total</span>
            <span className="text-2xl font-extrabold">${totalCost}</span>
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center">Cart is empty!</p>
      )}
    </div>
  );
}
