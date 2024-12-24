import { useState } from "react";
import CreateProduct from "../features/products/CreateProduct";
import EditProduct from "../features/products/EditProduct";
import ProductsTable from "../features/products/ProductsTable";

function Products() {
  const [activeTab, setActiveTab] = useState("products");
  const [editedProduct, setEditedProduct] = useState("");

  if (activeTab === "createProduct")
    return <CreateProduct setActiveTab={setActiveTab} />;
  else if (activeTab === "editProduct" && editedProduct)
    return (
      <EditProduct productId={editedProduct} setActiveTab={setActiveTab} />
    );
  else
    return (
      <ProductsTable
        setActiveTab={setActiveTab}
        setEditedProduct={setEditedProduct}
      />
    );
}

export default Products;
