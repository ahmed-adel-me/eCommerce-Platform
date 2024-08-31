import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import useProducts from "../../hooks/useProducts";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="basis-20">
          <Spinner />
        </div>
      </div>
    );

  return (
    <section>
      <div className="max-w-7xl  mx-auto py-10">
        {products.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold capitalize">All Products</h2>
            <div className="grid grid-cols-4 gap-10 my-10">
              {products.map((prod) => (
                <ProductCard key={prod.id} data={prod} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-3xl text-center">There are no products yet!</p>
        )}
      </div>
    </section>
  );
}
