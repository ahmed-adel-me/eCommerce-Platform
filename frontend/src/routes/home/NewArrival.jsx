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
  return (
    <div>
      <div className="max-w-7xl mx-auto py-10">
        <h2 className="text-3xl font-semibold mb-10">New Arrivals</h2>
        <div className="grid grid-cols-4  gap-10">
          {products.map((prod) => (
            <ProductCard key={prod.id} data={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
