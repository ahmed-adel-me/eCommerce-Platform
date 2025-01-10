import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/endpoints/products";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CreateReview from "./CreateReview";
import ProductReviews from "./ProductsReviews";
import { useCart } from "../../context/Cart";
import Spinner from "../../components/Spinner";

export default function ProductInfo() {
  const { productId } = useParams();
  const { dispatch } = useCart();
  const { isLoading, data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });
  function addToCart() {
    dispatch({ type: "ADD", product });
  }
  if (isLoading)
    return (
      <div className="py-10 flex justify-center items-center h-screen ">
        <Spinner className={"basis-20"} />
      </div>
    );
  return (
    <section>
      <div className="max-w-7xl mx-auto py-10 space-y-12">
        <div className="flex gap-10">
          <ImageDisplayer
            className={" shrink-0 basis-[37%] h-[350px]"}
            images={product.images}
          />
          <div className="flex-1 shrink-0 grow overflow-x-hidden">
            <h2 className="capitalize font-bold text-3xl mb-5">
              {product.name}
            </h2>

            <p className="text-lg mb-4 h-2/4 break-words overflow-y-scroll  pr-2">
              {product.description
                ? product.description
                : "This product does not have a description"}
            </p>

            <div className="flex gap-5">
              <span className="font-semibold text-3xl">${product.price}</span>
              <button
                onClick={addToCart}
                className="input-style bg-green-800 text-white flex justify-center items-center gap-2 text-lg px-4 rounded-lg border-none"
              >
                <AiOutlineShoppingCart />
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-5">Reviews</h3>
          <div className="flex gap-10">
            <CreateReview className="flex-1" />
            <ProductReviews reviews={product.reviews} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageDisplayer({ className, images }) {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  if (!images.length) {
    return (
      <div className={"flex justify-center " + className}>
        <img
          className="h-full "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
          alt=""
        />
      </div>
    );
  }
  return (
    <div
      className={
        "bg-white rounded-xl overflow-hidden p-7 flex flex-col " + className
      }
    >
      <div className=" pb-5 w-[60%] h-[80%]  m-auto">
        <img
          className=" object-contain m-auto h-full"
          src={selectedImg}
          alt=""
        />
      </div>
      <div className="flex  gap-2">
        {images.map((url, index) => (
          <div key={url + index} className="p-2 border rounded-lg hover:bg-slate-100 cursor-pointer h-20 w-20 flex justify-center items-center">
            <img
              onClick={() => setSelectedImg(url)}
              className=" object-contain h-full flex-1 "
              src={url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
