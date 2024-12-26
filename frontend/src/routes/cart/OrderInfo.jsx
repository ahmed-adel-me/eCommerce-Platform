import { useMutation } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { useFormik } from "formik";
import SubmitBtn from "../../components/SubmitBtn";
import { useCart } from "../../context/Cart";
import { createOrder } from "../../api/endpoints/orders";
import useUser from "../../hooks/useUser";
import FormInput from "../../components/FormInput";

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
  const orderMutation = useMutation({
    mutationFn: (products) => createOrder(products),
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
        <FormInput
          className="input-style"
          type="text"
          label={"name"}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <FormInput
          className="input-style"
          type="email"
          label={"email"}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <div className="flex gap-3">
          <FormInput
            className="input-style"
            type="text"
            label={"city"}
            name="city"
            id="city"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
          <FormInput
            className="input-style"
            type="text"
            label={"postal code"}
            name="postalCode"
            id="postalCode"
            placeholder="Postal Code"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
          />
        </div>
        <FormInput
          className="input-style"
          type="text"
          label={"street address"}
          name="streetAddress"
          placeholder="Street Address"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
        />
        <FormInput
          className="input-style"
          type="text"
          name="country"
          id="country"
          label={"country"}
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
