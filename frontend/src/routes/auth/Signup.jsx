import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../api/endpoints/auth";
import { useAuth } from "../../context/Auth";

export default function Signup() {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate,isSuccess ,data} = useMutation((props) => signupUser(props));
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(form);
  };
  if (isSuccess) {
    console.log(data);
    login(data.token, data.data.user);
    navigate("/home");
  }
  return (
    <section className="grid place-items-center h-screen">
      <div className=" bg-white p-10 rounded-xl shadow-lg w-[400px]">
        <h6 className="font-semibold mb-5">SIGN UP</h6>
        <form onSubmit={handleSubmit} className=" space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Name</label>
            <input
              onChange={({ target }) =>
                setForm((pre) => {
                  return { ...pre, name: target.value };
                })
              }
              className="border rounded-md text-md outline-none px-2 py-1"
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              onChange={({ target }) =>
                setForm((pre) => {
                  return { ...pre, email: target.value };
                })
              }
              className="border rounded-md text-md outline-none px-2 py-1"
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              onChange={({ target }) =>
                setForm((pre) => {
                  return { ...pre, password: target.value };
                })
              }
              className="border rounded-md text-md outline-none px-2 py-1"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Confirm Password</label>
            <input
              onChange={({ target }) =>
                setForm((pre) => {
                  return { ...pre, confirmPassword: target.value };
                })
              }
              className="border rounded-md text-md outline-none px-2 py-1"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
          >
            SIGN UP
          </button>
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
