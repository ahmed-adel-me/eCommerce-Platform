import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function ProductCard({data}) {
  const {price,name} = data
  return (
    <div className="w-[200px] ">
      <div className="bg-white flex  rounded-xl flex-col p-3 items-center h-3/4">
        <div className="flex justify-end w-full">
          <AiOutlineHeart size={20} />
        </div>
        <div className=" h-full grid place-items-center">
          <img
            className="w-5/6 h-5/6 object-contain"
            src="https://btech.com/cdn-cgi/image/quality=50,format=auto/media/catalog/product/cache/22b1bed05f04d71c4a848d770186c3c4/a/p/apple-iphone-13-starlight_3.jpg"
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
    </div>
  );
}
