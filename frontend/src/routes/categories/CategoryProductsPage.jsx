import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../api/endpoints/products";
import {RiArrowDropDownLine}from "react-icons/ri"
export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const { data, isLoading, isError } = useQuery("products", () =>
    getCategoryById(categoryId)
  );
  if (isLoading || isError) return;
  const { categoryInfo, products } = data;

  console.log(data);
  return (
    <section>
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold capitalize">{categoryInfo.name}</h2>
          {/* {categoryInfo.properties.length > 0 && (
            
          )} */}
        </div>
      </div>
    </section>
  );
}
