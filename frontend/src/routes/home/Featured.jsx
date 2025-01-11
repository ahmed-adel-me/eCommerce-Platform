import { Link } from "react-router-dom";
import ImageSkeleton from "../../../assets/icons/ImageSkeleton";
import { useCart } from "../../context/Cart";
import useFeaturedProduct from "../../hooks/useFeaturedProduct";

export default function Featured() {
  const { product, isLoading, isSuccess } = useFeaturedProduct();
  const { dispatch } = useCart();
  const addToCart = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD", product });
  };

  if (!isLoading && !product)
    return <div className="text-center text-3xl py-20">No product yet!</div>;
  return (
    <div className="bg-[#201F20] text-white h-[500px] flex justify-center">
      <div className="flex justify-between max-w-3xl mx-auto basis-full md:items-center lg:max-w-5xl xl:max-w-7xl">
        <div className="flex-[1.4] xl:flex-1 mx-5">
          {isLoading ? (
            <div
              role="status"
              className="max-w-sm animate-pulse space-y-7 hidden"
            >
              <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="text-center md:text-start">
              <div className="flex justify-center md:hidden">
                {isSuccess && (
                  <img
                    className="rounded-xl shadow-white max-h-[200px] mb-5"
                    src={product?.images?.[0]}
                    alt="no image"
                  />
                )}
              </div>
              <h1 className="text-4xl font-semibold capitalize mb-7 lg:text-5xl">
                {product?.name}
              </h1>
              <p className="text-gray-200 mb-5 font-semibold lg:text-lg">
                {product?.description}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link
                  to={`/products/${product?.id}`}
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
            </div>
          )}
        </div>
        <div className="flex-1 md:flex justify-center hidden">
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full xl:h-80 bg-gray-300 rounded  dark:bg-gray-700">
              <ImageSkeleton />
            </div>
          )}
          {isSuccess && (
            <img
              className="rounded-xl shadow-white max-h-[400px]"
              src={product?.images?.[0]}
              alt="no image"
            />
          )}
        </div>
      </div>
    </div>
  );
}
