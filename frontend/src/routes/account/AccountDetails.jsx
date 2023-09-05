import React, { useState } from "react";
import SubmitBtn from "../../components/SubmitBtn";
import { useAuth } from "../../context/Auth";
import { useQuery } from "react-query";
import { getMyProfile } from "../../api/endpoints/user";
import { useFormik } from "formik";
import useUpdateProfile from "../../hooks/useUpdateProfile";

export default function AccountDetails() {
  const { data: user, isSuccess } = useQuery("user", getMyProfile);
  const { logout } = useAuth();

  return (
    <div className="bg-white  rounded-lg overflow-hidden p-6 place-self-center">
      <h2 className="text-2xl font-semibold mb-5">Account details</h2>
      {isSuccess && <Form user={user} />}
      <button
        onClick={logout}
        className="text-white font-semibold bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700 "
      >
        Logout
      </button>
    </div>
  );
}

function Form({ user }) {
  console.log(user);
  const userMutation = useUpdateProfile();
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      streetAddress: user.streetAddress,
    },
    onSubmit: (values) => {
      userMutation.mutate(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-3 border-b-2 mb-5 pb-3"
    >
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
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <input
          className="input-style"
          type="text"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex gap-3">
        <input
          className="input-style"
          type="text"
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
        />
        <input
          className="input-style"
          type="text"
          name="streetAddress"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
        />
      </div>
      <SubmitBtn text={"Save"} />
    </form>
  );
}
