import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../context/Cart";

export default function CartItem({ data }) {
  const { dispatch } = useCart();
  const { product, quantity } = data;
  return (
    <ul className="flex pb-5 justify-center items-center border-b">
      <li className="grow-[2] basis-0 flex-1 flex flex-col justify-center">
        <div className="w-[170px]">
          <div className=" border-2 rounded-2xl overflow-hidden p-5">
            <img
              className="w-full h-full"
              src={product.images[0]}
              alt="product image"
            />
          </div>
          <h4 className="text-center capitalize font-semibold text-lg mt-3">
            {product.name}
          </h4>
        </div>
      </li>
      <li className="grow-[1] basis-0 shrink-0">
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => dispatch({ type: "DELETE", productId: product.id })}
            className="bg-gray-300 rounded-md px-3 py-2"
          >
            <AiOutlineMinus size={20} />
          </button>
          <span className="text-2xl font-semibold">{quantity}</span>
          <button
            onClick={() => dispatch({ type: "ADD", product })}
            className="bg-gray-300 rounded-md px-3 py-2"
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
      </li>
      <li className="grow-[1] basis-0 shrink-0 flex justify-center">
        <span className="text-xl font-semibold">${product.price}</span>
      </li>
    </ul>
  );
}
