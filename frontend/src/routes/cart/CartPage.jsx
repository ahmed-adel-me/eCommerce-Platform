import React, { useEffect } from "react";
import { useCart } from "../../context/Cart";
import CartInfo from "./CartInfo";
import OrderInfo from "./OrderInfo";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  return (
    <section className="">
      <div className="max-w-7xl mx-auto py-10 flex gap-10">
        <div className="flex-1">
          <CartInfo cart={cart} />
        </div>
        <div className="basis-1/4">
          {cart.products.length > 0 && <OrderInfo />}
        </div>
      </div>
    </section>
  );
}
