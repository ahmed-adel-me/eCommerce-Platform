import ProductCard from "../../components/ProductCard";
import { useQuery } from "react-query";
import { getWishlist } from "../../api/endpoints/wishlist";
import Spinner from "../../components/Spinner";

export default function WishList() {
  const { data: wishList, isLoading } = useQuery(
    ["products", "wishlist"],
    getWishlist
  );
  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner className={"w-10"} />
      </div>
    );
  return (
    <div>
      {wishList.length > 0 ? (
        <div className="grid grid-cols-4 gap-10">
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
