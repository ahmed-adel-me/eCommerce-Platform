import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  addWishlistProduct,
  deleteWishlistProduct,
} from "../api/endpoints/wishlist";
export default function ProductCard({ data }) {
  const { price, name, images, _id, wished } = data;
  const queryClient = useQueryClient();

  const toggleWishMutation = useMutation(
    () => {
      if (wished) {
        return deleteWishlistProduct(_id);
      } else {
        return addWishlistProduct(_id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");

      },
    }
  );

  const handleToggleWish = (event) => {
    event.preventDefault(); // Prevent the default link navigation behavior
    toggleWishMutation.mutate();
  };
  console.log(toggleWishMutation.data);
  return (
    <Link className=" " to={`/products/${_id}`}>
      <div className="bg-white flex  rounded-xl flex-col p-3 items-center h-3/4">
        <div className="flex justify-end w-full">
          <button
            disabled={toggleWishMutation.isLoading}
            onClick={handleToggleWish}
          >
            {wished ? (
              <AiFillHeart size={20} color="red" />
            ) : (
              <AiOutlineHeart size={20} />
            )}
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
