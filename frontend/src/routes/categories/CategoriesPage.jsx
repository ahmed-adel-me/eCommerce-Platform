import React from "react";
import { useQuery } from "react-query";
import { getCategorizedProducts } from "../../api/endpoints/products";
import CategorizedProducts from "./CategorizedProducts";
import Spinner from "../../components/Spinner";

export default function CategoriesPage() {
  const { data, isLoading, isError } = useQuery("categorized products", () =>
    getCategorizedProducts(3)
  );
  if (isLoading)
    return (
      <div className="py-10 flex justify-center items-center h-screen">
        <div className="w-20">
          <Spinner />
        </div>
      </div>
    );
  return (
    <section>
      <div className="max-w-7xl mx-auto p-7 space-y-20">
        {data.map((category) => (
          <CategorizedProducts key={category.categoryId} data={category} />
        ))}
      </div>
    </section>
  );
}
