import React from "react";

export default function OrderList() {
  function getJwtTokenFromCookie() {
    const name = "jwt";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
console.log(getJwtTokenFromCookie())
  return <div>OrderList</div>;
}
