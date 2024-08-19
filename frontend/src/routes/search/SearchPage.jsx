import  { useState } from "react";
import { useMutation } from "react-query";
import { getAllProducts } from "../../api/endpoints/products";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

export default function SearchPage() {
  const [search, setSearch] = useState();
  const { mutate, isLoading, data, isSuccess, isError } = useMutation(
    (search) => getAllProducts({ search })
  );

  function handleChange(event) {
    const { value } = event.target;
    setSearch(value);
    if (value) mutate(value);
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto py-10 space-y-10">
        <form className="max-w-xl mx-auto">
          <input
            onChange={handleChange}
            value={search}
            className="input-style w-full text-2xl py-1"
            type="text"
            name="search"
            placeholder="Search for products..."
          />
        </form>
        {isLoading && (
          <div className="py-10 flex justify-center">
            <div className="basis-20">
              <Spinner />
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="grid grid-cols-4 gap-10">
            {data.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-xl font-semibold py-10">
            Something went wrong
          </p>
        )}
      </div>
    </section>
  );
}
