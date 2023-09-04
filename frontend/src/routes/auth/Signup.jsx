import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import SubmitBtn from "../../components/SubmitBtn";
import { useFormik } from "formik";

export default function Signup() {
  const signupMutation = useSignup();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      country: "",
      postalCode: "",
      streetAddress: "",
    },
    onSubmit: (values) => {
      signupMutation.mutate(values);
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen py-10">
      <div className="bg-white p-10 rounded-xl shadow-lg basis-full max-w-xl">
        <h6 className="font-semibold mb-5">SIGN UP</h6>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="border rounded-md text-md outline-none px-2 py-1"
              type="text"
              placeholder="Name"
              name="name"
              id="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border rounded-md text-md outline-none px-2 py-1"
              type="text"
              placeholder="Email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className="border rounded-md text-md outline-none px-2 py-1"
                type="text"
                placeholder="Country"
                name="country"
                id="country"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="border rounded-md text-md outline-none px-2 py-1"
                type="text"
                placeholder="City"
                name="city"
                id="city"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-grow-[3]">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetAddress}
                className="border rounded-md text-md outline-none px-2 py-1"
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                id="streetAddress"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
                className="border rounded-md text-md outline-none px-2 py-1"
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                id="postalCode"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="border rounded-md text-md outline-none px-2 py-1"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="border rounded-md text-md outline-none px-2 py-1"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <SubmitBtn text="LOGIN" isLoading={signupMutation.isLoading} />
        </form>

        <div className="text-sm flex gap-1 mt-5 justify-center">
          <p>Already a user?</p>
          <Link to={"/login"} className="underline">
            LOGIN
          </Link>
        </div>
      </div>
    </section>
  );
}
