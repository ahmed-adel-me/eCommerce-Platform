import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAllProducts } from "../../api/endpoints/products";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationFn: (search) => getAllProducts({ search }),
    onSuccess: () => {
      setHasSearched(true); // Mark that a search has been performed
    },
  });

  function handleChange(event) {
    const { value } = event.target;
    setSearch(value);

    if (value) {
      mutate(value);
      setHasSearched(false); // Reset to prevent showing the message prematurely
    } else {
      setHasSearched(false); // Reset when search input is cleared
    }
  }

  return (
    <section className="mx-5">
      <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto py-10 space-y-10">
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
        {isPending && (
          <div className="py-10 flex justify-center">
            <div className="basis-20">
              <Spinner />
            </div>
          </div>
        )}
        {isSuccess && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ">
            {data.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        ) : (
          hasSearched &&
          data?.length === 0 && (
            <p className="text-xl font-semibold">
              No products found matching your search criteria.
            </p>
          )
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
