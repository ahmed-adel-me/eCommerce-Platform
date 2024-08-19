import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmitBtn from "../../components/SubmitBtn";
import useLogin from "../../hooks/useLogin";
import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import loginValidationSchema from "../../validation/loginValidationSchema";

export default function LoginPage() {
  const { login, isLoading } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    onSubmit: ({ email, password }) => {
      login({ email, password });
    },
  });
  return (
    <section className="grid place-items-center h-screen">
      <div className=" bg-white p-10 rounded-xl shadow-lg w-[400px]">
        <h6 className="font-semibold mb-5">LOGIN</h6>
        <form onSubmit={formik.handleSubmit} className=" space-y-4">
          <FormInput
            type="text"
            name="email"
            label={"Email"}
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            disabled={isLoading}
          />
          <FormInput
            type="password"
            name="password"
            label={"Password"}
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            disabled={isLoading}
          />
          <SubmitBtn text={"LOGIN"} isLoading={isLoading} />
        </form>
        <Link className="capitalize text-sm text-end w-full block my-2 text-gray-600">
          forgot password?
        </Link>
        <div className="text-sm flex gap-1 mt-5 justify-center">
          <p>Don't have an account?</p>
          <Link to={"/signup"} className="underline">
            SIGN UP
          </Link>
        </div>
      </div>
    </section>
  );
}
