import { useParams } from "react-router-dom";
import Filter from "../../components/Filter";
import ProductCard from "../../components/ProductCard";
import SortBy from "../../components/SortBy";
import { ClipLoader } from "react-spinners";
import useCategoryWithAllProducts from "../../hooks/useCategoryWithAllProducts";
export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const { data, isPending, isError, isSuccess } =
    useCategoryWithAllProducts(categoryId);
  return (
    <section>
      {isPending && (
        <div className="py-10 flex justify-center items-center h-screen">
          <div className="w-20">
            <ClipLoader size={50} />
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="max-w-7xl mx-auto py-10 space-y-10">
          <div className="flex justify-between">
            <h2 className="text-4xl font-bold capitalize">
              {data.category.name}
            </h2>
            <div className="flex gap-5 items-center">
              <Filter filterField="brand" options={data.category.brands} />
              {data.category?.properties.map((prop) => (
                <Filter
                  key={prop._id}
                  filterField={prop.name}
                  options={prop.values}
                />
              ))}
              <SortBy
                options={[
                  { label: "Sort: newest first", value: "date-desc" },
                  { label: "Sort: oldest first", value: "date-asc" },
                  { label: "Sort: price: low to high", value: "price-asc" },
                  { label: "Sort: price: high to low", value: "price-desc" },
                ]}
              />
            </div>
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
