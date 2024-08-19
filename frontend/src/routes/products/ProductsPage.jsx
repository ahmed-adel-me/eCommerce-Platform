import { useQuery } from "react-query";
import { getAllProducts } from "../../api/endpoints/products";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
  } = useQuery("products", getAllProducts);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="basis-20">
          <Spinner />
        </div>
      </div>
    );
  console.log(products);

  return (
    <section>
      <div className="max-w-7xl  mx-auto py-10">
        {products.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-5">All Products</h2>
            <div className="grid grid-cols-4 gap-10 ">
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
