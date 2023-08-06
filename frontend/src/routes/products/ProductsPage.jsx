import React from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api/endpoints/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const { data, isLoading } = useQuery("products", getAllProducts);
  if (isLoading) return;
  console.log(data);
  return (
    <section>
      <div className="max-w-7xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-5">All Products</h2>
        <div className="flex gap-5 flex-wrap">
          {data.map((prod) => (
            <ProductCard key={prod.id} data={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
