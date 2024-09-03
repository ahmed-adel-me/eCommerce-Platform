import FeaturedProduct from "../features/settings/FeaturedProduct";
import ShippingPrice from "../features/settings/ShippingPrice";
function Settings() {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-5">Settings</h2>
      <div className="space-y-10">
        <FeaturedProduct />
          <ShippingPrice />
      </div>
    </div>
  );
}

export default Settings;
