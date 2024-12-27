import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesWithProducts } from "../../api/endpoints/products";
import CategorizedProducts from "./CategorizedProducts";
import Spinner from "../../components/Spinner";

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["categorizedProducts"],
    queryFn: () => getAllCategoriesWithProducts(3),
  });
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
        {Object.keys(data).map((category) => (
          <CategorizedProducts
            key={data[category]?.id}
            categoryName={category}
            products={data[category]?.products}
            categoryId={data[category]?.id}
          />
        ))}
      </div>
    </section>
  );
}
