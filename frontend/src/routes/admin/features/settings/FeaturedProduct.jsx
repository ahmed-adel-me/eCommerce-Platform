import useFeaturedProduct from "../../../../hooks/useFeaturedProduct";
import useProducts from "../../../../hooks/useProducts";
import useSetFeaturedProduct from "./useSetFeaturedProduct";
import { BeatLoader } from "react-spinners";

function FeaturedProduct() {
  const { product: featuredProduct, isLoading: isLoadingFeatured } =
    useFeaturedProduct();
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { setFeaturedProduct, isLoading } = useSetFeaturedProduct();

  if (isLoadingFeatured || isLoadingProducts)
    return (
      <div className="mt-10">
        <BeatLoader />
      </div>
    );

  const filteredProducts = products.filter(
    (product) => product._id !== featuredProduct._id
  );
  
  return (
    <div>
      <div>
        <label className="text-gray-600 font-semibold" htmlFor={"featured"}>
          Featured Product
        </label>
        <select
          className={`text-lg py-2 px-3 rounded border-2 border-gray-400 outline-none text-gray-900 w-full bg-white mt-1 disabled:bg-gray-300 disabled:text-gray-500`}
          id={"featured"}
          name={"featured"}
          value={featuredProduct._id}
          onChange={(e) => setFeaturedProduct(e.target.value)}
          disabled={isLoading}
        >
          <option value={featuredProduct._id}>{featuredProduct.name}</option>
          {filteredProducts.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FeaturedProduct;
