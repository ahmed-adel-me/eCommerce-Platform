import ProductCard from "../../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../../api/endpoints/wishlist";
import Spinner from "../../components/Spinner";

export default function WishList() {
  const { data: wishList, isLoading } = useQuery({
    queryKey: ["products", "wishlist"],
    queryFn: getWishlist,
  });
  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner className={"w-10"} />
      </div>
    );
  return (
    <div>
      {wishList.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishList.map((product) => (
            <div className="border p-3 rounded-xl" key={product.id}>
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      ) : (
        <p> No products added yet.</p>
      )}
    </div>
  );
}
