import React from "react";
import { useQuery } from "react-query";
import { getFeaturedProduct } from "../../api/endpoints/products";
import { Link } from "react-router-dom";

export default function Featured() {
  const { data:product, isLoading } = useQuery("featured", getFeaturedProduct);
  if (isLoading) return;
  console.log(product);
  return (
    <div className="bg-[#201F20] text-white h-[500px] grid place-items-center">
      <div className="flex justify-between max-w-7xl mx-auto">
        <div className="flex-1">
          <h1 className="text-5xl font-semibold capitalize mb-7">
           {product.name}
          </h1>
          <p className="text-gray-200 mb-5 font-semibold">
           {product.description}
          </p>
          <div className="flex gap-4">
            <Link to={`/products/${product._id}`} className="py-1 px-3 border-2 rounded-md text-lg">
              Read more
            </Link>
            <button className="py-1 px-3 border-2 rounded-md text-lg bg-white text-[#201F20]">
              Add to cart
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={product.images[0]}
            alt="no image"
          />
        </div>
      </div>
    </div>
  );
}
