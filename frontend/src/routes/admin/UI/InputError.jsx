import React from "react";

function InputError({ error }) {
  if (error) return <div className="text-red-500 text-sm">{error}</div>;
}

export default InputError;
