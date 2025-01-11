import { useCart } from "../../context/Cart";
import CartInfo from "./CartInfo";
import OrderInfo from "./OrderInfo";

export default function CartPage() {
  const { cart } = useCart();
  return (
    <section className="mx-5">
      <div className="sm:max-w-xl lg:max-w-5xl xl:max-w-7xl mx-auto py-10 flex gap-10 flex-col lg:flex-row ">
        <div className="flex-1">
          <CartInfo cart={cart} />
        </div>
        <div className="basis-2/5">
          {cart.products.length > 0 && <OrderInfo />}
        </div>
      </div>
    </section>
  );
}
