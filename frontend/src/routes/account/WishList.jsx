import React from "react";
import { useAuth } from "../../context/Auth";
import ProductCard from "../../components/ProductCard";
import { useQuery } from "react-query";
import { getWishlist } from "../../api/endpoints/wishlist";

export default function WishList() {
  const { user } = useAuth();
  // const { wishList } = user;
  const { data: wishList, isLoading } = useQuery("wishlist", getWishlist);
  if (isLoading) return;
  console.log(wishList);
  return (
    <div>
      {wishList.length > 0 ? (
        <div className="grid grid-cols-4 gap-10">
          {wishList.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <p> No products added yet.</p>
      )}
    </div>
  );
}
