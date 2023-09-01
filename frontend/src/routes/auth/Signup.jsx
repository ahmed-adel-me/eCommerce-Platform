import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../api/endpoints/auth";
import { useAuth } from "../../context/Auth";
import useSignup from "../../hooks/useSignup";
import SubmitBtn from "../../components/SubmitBtn";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const signupMutation = useSignup();
  const handleSubmit = (event) => {
    event.preventDefault();
    signupMutation.mutate(form);
  };

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
          <SubmitBtn text={"LOGIN"} isLoading={signupMutation.isLoading} />

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
