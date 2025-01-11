import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import useProducts from "../../hooks/useProducts";

export default function NewArrival() {
  const { products, isLoading } = useProducts();
  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spinner className={"basis-16"} />
      </div>
    );
  if (!products || products.length === 0) return null;
  return (
    <div>
      <div className="max-w-xs mx-auto py-10 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h2 className="text-3xl font-semibold mb-10 text-center">New Arrivals</h2>
        <div className="grid grid-cols-1 gap-5 lg:gap-10 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-3">
          {products.map((prod) => (
            <ProductCard key={prod.id} data={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
