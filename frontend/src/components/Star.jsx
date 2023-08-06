import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function Star({ filled, onClick }) {
  return filled ? (
    <AiFillStar size={25} onClick={onClick} />
  ) : (
    <AiOutlineStar size={25} onClick={onClick} />
  );
}
