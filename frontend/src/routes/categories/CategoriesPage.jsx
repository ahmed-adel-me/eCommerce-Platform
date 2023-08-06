import React from "react";
import { useQuery } from "react-query";
import { getProductsByCategory } from "../../api/endpoints/products";
import CategorizedProducts from "./CategorizedProducts";

export default function CategoriesPage() {
  const { data, isLoading } = useQuery("categorized products", () =>
    getProductsByCategory(3)
  );
  if (isLoading) return;
  return (
    <section>
      
      <div className="max-w-7xl mx-auto p-7 space-y-20">
        {data.map((category) => (
          <CategorizedProducts key={category.categoryId} data={category}/>
        ))}
      </div>
    </section>
  );
}
