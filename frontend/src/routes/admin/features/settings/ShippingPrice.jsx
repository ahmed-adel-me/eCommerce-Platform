import { useState, useEffect } from "react";
import FormInput from "../../UI/FormInput";
import useUpdateShippingPrice from "./useUpdateShippingPrice";
import useShippingPrice from "../../../../hooks/useShippingPrice";

function ShippingPrice() {
  const { shippingPrice, isLoading, isSuccess } = useShippingPrice();
  const { updatePrice, isLoading: isUpdating } = useUpdateShippingPrice();
  const [inputValue, setInputValue] = useState("");

  // Sync inputValue with shippingPrice when shippingPrice changes
  useEffect(() => {
    if (isSuccess) {
      setInputValue(shippingPrice ?? "");
    }
  }, [shippingPrice, isSuccess]);

  const handleBlur = () => {
    if (inputValue !== shippingPrice) {
      updatePrice(inputValue);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <FormInput
      label={"Shipping price"}
      name={"shippingPrice"}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isLoading || isUpdating}
    />
  );
}

export default ShippingPrice;
