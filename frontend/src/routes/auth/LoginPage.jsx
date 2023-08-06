import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/endpoints/auth";
import { useAuth } from "../../context/Auth";
import Cookies from "js-cookie";
import SubmitBtn from "../../components/SubmitBtn";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useMutation(({ email, password }) =>
    loginUser(email, password)
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };
  // if (loginMutation.isLoading) return;
  if (loginMutation.isSuccess) {
    login(loginMutation.data.token, loginMutation.data.data.user);
    navigate("/home");
  }
  return (
    <section className="grid place-items-center h-screen">
      <div className=" bg-white p-10 rounded-xl shadow-lg w-[400px]">
        <h6 className="font-semibold mb-5">LOGIN</h6>
        <form onSubmit={handleSubmit} className=" space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="border rounded-md text-md outline-none px-2 py-1"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              className="border rounded-md text-md outline-none px-2 py-1"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
       
          <SubmitBtn text={"LOGIN"} isLoading={loginMutation.isLoading}/>
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
