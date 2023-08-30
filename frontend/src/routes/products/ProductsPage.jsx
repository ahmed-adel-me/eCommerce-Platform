import React from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api/endpoints/products";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

export default function ProductsPage() {
  const { data, isLoading, isSuccess } = useQuery("products", getAllProducts);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="basis-20">
          <Spinner />
        </div>
      </div>
    );
  return (
    <section>
      <div className="max-w-7xl  mx-auto py-10">
        <h2 className="text-2xl font-bold mb-5">All Products</h2>
        {isSuccess && (
          <div className="grid grid-cols-4 gap-10 ">
            {data.map((prod) => (
              <ProductCard key={prod.id} data={prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
