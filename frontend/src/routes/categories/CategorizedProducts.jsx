import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function CategorizedProducts({ data }) {
  const { products, category, categoryId, numberOfProducts } = data;
  console.log(data);
  return (
    <div>
      <div className="flex items-end justify-start mb-5 gap-5">
        <h2 className="text-3xl font-bold capitalize">{category}</h2>
        {numberOfProducts > 3 && (
          <Link
            to={`/category/${categoryId}`}
            className="text-md font-semibold text-gray-600 underline"
          >
            Show all
          </Link>
        )}
      </div>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
        {numberOfProducts > 3 && (
          <Link
            to={`/categories/${categoryId}`}
            className="bg-gray-300 rounded-xl grid place-items-center"
          >
            <div className="flex gap-3 items-center">
              <span className="text-lg text-gray-500">Show all</span>
              <AiOutlineArrowRight  size={20} color="gray"/>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
