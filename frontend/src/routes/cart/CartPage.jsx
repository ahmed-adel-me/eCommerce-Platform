import React, { useEffect } from "react";
import { useCart } from "../../context/Cart";
import CartInfo from "./CartInfo";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  return (
    <section className="">
      <div className="max-w-7xl mx-auto py-10 flex">
        <CartInfo cart={cart} />
        <div className="basis-[400px]"></div>
      </div>
    </section>
  );
}
