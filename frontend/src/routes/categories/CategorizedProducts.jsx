import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function CategorizedProducts({
  products,
  categoryName,
  categoryId,
}) {
  return (
    <div>
      <div className="flex items-end justify-start mb-5 gap-5">
        <h2 className="text-3xl font-bold capitalize">{categoryName}</h2>
        <Link
          to={`/categories/${categoryId}`}
          className="text-md font-semibold text-gray-600 underline hover:text-gray-500"
        >
          Show All
        </Link>
      </div>
      <div className="md:grid grid-cols-4 gap-10 hidden md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
        <Link
          to={`/categories/${categoryId}`}
          className="bg-gray-300 rounded-xl grid place-items-center hover:bg-gray-400 group md:hidden xl:grid"
        >
          <div className="flex gap-3 items-center">
            <span className="text-lg text-gray-500  group-hover:text-gray-200">
              Show All
            </span>
            <AiOutlineArrowRight size={20} color="gray" />
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10  md:hidden">
        <ProductCard key={products?.[0].id} data={products?.[0]} />
        <Link
          to={`/categories/${categoryId}`}
          className="bg-gray-300 rounded-xl sm:grid place-items-center hover:bg-gray-400 group hidden"
        >
          <div className="flex gap-3 items-center">
            <span className="text-lg text-gray-500  group-hover:text-gray-200">
              Show All
            </span>
            <AiOutlineArrowRight size={20} color="gray" />
          </div>
        </Link>
      </div>
    </div>
  );
}
