import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../api/endpoints/products";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["products", "category"],
    () => getCategoryById(categoryId)
  );

  return (
    <section>
      {isLoading && (
        <div className="py-10 flex justify-center items-center h-screen">
          <div className="w-20">
            <Spinner />
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="max-w-7xl mx-auto py-10 space-y-10">
          <div className="flex justify-between">
            <h2 className="text-4xl font-bold capitalize">
              {data.category.name}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-10">
            {data.products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        </div>
      )}
      {isError && (
        <div className="flex justify-center ">
          <p className="text-3xl font-semibold py-20">Something went wrong!</p>
        </div>
      )}
    </section>
  );
}
