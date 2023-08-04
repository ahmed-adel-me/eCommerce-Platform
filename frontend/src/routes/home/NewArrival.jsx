import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api/endpoints/products";
import axios from "axios";

export default function NewArrival() {
  const { data, isLoading, isError } = useQuery("products", getAllProducts);
  if (isLoading) return;
  return (
    <div>
      <div className="max-w-7xl mx-auto py-10">
        <h2 className="text-3xl font-semibold mb-10">New Arrivals</h2>
        <div className="flex gap-6">
          {data.products.map((prod) => (
            <ProductCard key={prod.id} data={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
