import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../api/endpoints/products";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard from "../../components/ProductCard";
export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const { data, isLoading, isError } = useQuery("products", () =>
    getCategoryById(categoryId)
  );
  if (isLoading || isError) return;
  const { category, products } = data;

  console.log(data);
  return (
    <section>
      <div className="max-w-7xl mx-auto py-10 space-y-10">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold capitalize">{category.name}</h2>
        </div>
        <div className="grid grid-cols-4 gap-10">
{products.map(product=><ProductCard key={product.id} data={product} />)}
        </div>
      </div>
    </section>
  );
}
