import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import useToggleLike from "../hooks/useToggleLike";
export default function ProductCard({ data }) {
  const { dispatch } = useCart();
  const { price, name, images, id, wished } = data;
  const { toggleLike, isLoading } = useToggleLike();

  const handleToggleWish = (event) => {
    event.preventDefault();
    toggleLike({ id, isLiked: wished });
  };
  const addToCart = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD", product: data });
    toast.success("Product added", {
      duration: 1000,
    });
  };
  return (
    <Link className=" " to={`/products/${id}`}>
      <div className="bg-white flex  rounded-xl flex-col p-3 items-center h-3/4">
        <div className="flex justify-end w-full">
          <button disabled={isLoading} onClick={handleToggleWish}>
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
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop if the fallback image fails
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"; // Fallback image URL
            }}
          />
        </div>
      </div>
      <div>
        <h5 className="my-1 capitalize text-lg font-semibold">{name}</h5>
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-xl">${price}</span>
          <button
            onClick={addToCart}
            className="py-1 px-3 border-2 rounded-md text-lg border-gray-700 hover:bg-gray-300 "
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
