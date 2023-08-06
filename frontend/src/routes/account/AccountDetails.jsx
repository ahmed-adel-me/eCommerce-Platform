import React, { useState } from "react";
import SubmitBtn from "../../components/SubmitBtn";

export default function AccountDetails({ userData }) {
  const [user, setUser] = useState(userData);
  function handleChange({ target }) {
    setUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  }
  return (
    <div className="bg-white w-[300px] rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-semibold mb-5">Account details</h2>
      <form className="flex flex-col gap-3 border-b-2 mb-5 pb-3">
        <input
          className="input-style"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          className="input-style"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <SubmitBtn text={"Save"} />
      </form>
        <button className="text-white font-semibold bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700 ">
          Logout
        </button>
    </div>
  );
}
