import { useQuery } from "react-query";
import { getFeaturedProduct } from "../../api/endpoints/products";
import { Link } from "react-router-dom";
import ImageSkeleton from "../../../assets/icons/ImageSkeleton";
import { useCart } from "../../context/Cart";

export default function Featured() {
  const {
    data: product,
    isLoading,
    isSuccess,
  } = useQuery("featured", getFeaturedProduct);
  const { dispatch } = useCart();
  const addToCart = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD", product });
  };
  return (
    <div className="bg-[#201F20] text-white h-[500px] flex justify-center items-center">
      <div className="flex justify-between max-w-7xl mx-auto basis-full">
        <div className="flex-1">
          {isLoading ? (
            <div role="status" className="max-w-sm animate-pulse space-y-7">
              <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <h1 className="text-5xl font-semibold capitalize mb-7">
                {product.name}
              </h1>
              <p className="text-gray-200 mb-5 font-semibold">
                {product.description}
              </p>
              <div className="flex gap-4">
                <Link
                  to={`/products/${product.id}`}
                  className="py-1 px-3 border-2 rounded-md text-lg"
                >
                  Read more
                </Link>
                <button
                  onClick={addToCart}
                  className="py-1 px-3 border-2 rounded-md text-lg bg-white text-[#201F20]"
                >
                  Add to cart
                </button>
              </div>
            </>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full xl:h-80 bg-gray-300 rounded  dark:bg-gray-700">
              <ImageSkeleton />
            </div>
          )}
          {isSuccess && <img src={product.images[0]} alt="no image" />}
        </div>
      </div>
    </div>
  );
}
