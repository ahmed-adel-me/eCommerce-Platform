import React from "react";
import { useMutation } from "react-query";
import Spinner from "../../components/Spinner";
import { useFormik } from "formik";
import SubmitBtn from "../../components/SubmitBtn";
import { useCart } from "../../context/Cart";
import { createOrder } from "../../api/endpoints/orders";
import useUser from "../../hooks/useUser";

export default function OrderInfo() {
  const { isLoading, isSuccess, data: user } = useUser();

  return (
    <div className="bg-white rounded-xl p-7">
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner className={"w-16 "} />
        </div>
      )}
      {isSuccess && <OrderDetails user={user} />}
    </div>
  );
}

function OrderDetails({ user }) {
  const orderMutation = useMutation((products) => createOrder(products), {
    onSuccess: (url) => {
      window.location = url;
    },
  });
  const { cart } = useCart();
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      streetAddress: user.streetAddress,
    },
    onSubmit: (orderInfo) => {
      const products = cart.products.map((el) => ({
        productId: el.product.id,
        quantity: el.quantity,
      }));
      orderMutation.mutate({ products, orderInfo });
    },
  });

  return (
    <>
      <h3 className="font-bold text-3xl mb-5 ">Order information</h3>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <input
          className="input-style"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <input
          className="input-style"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <div className="flex gap-3">
          <input
            className="input-style"
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
          <input
            className="input-style"
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="Postal Code"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
          />
        </div>
        <input
          className="input-style"
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
        />
        <input
          className="input-style"
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
        />
        <SubmitBtn
          text={"Save"}
          isLoading={orderMutation.isLoading}
          className={"text-xl font-semibold"}
        />
      </form>
    </>
  );
}
