import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ProductCard({ data }) {
  const { price, name, images, id, wished } = data;
  return (
    <Link className=" " to={`/products/${id}`}>
      <div className="bg-white flex  rounded-xl flex-col p-3 items-center h-3/4">
        <div className="flex justify-end w-full">
          <button>
            {wished ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20} />}
          </button>
        </div>
        <div className=" h-full grid place-items-center">
          <img
            className="w-5/6 h-5/6 object-contain"
            src={
              images.length > 0
                ? images[0]
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
            }
            alt=""
          />
        </div>
      </div>
      <div>
        <h5 className="mt-1 capitalize text-lg font-semibold">{name}</h5>
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-xl">${price}</span>
          <button className="py-1 px-3 border-2 rounded-md text-lg border-gray-700">
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
