import { useState } from "react";
import ListItem from "../UI/ListItem";
import CreateProduct from "../features/products/CreateProduct";
import EditProduct from "../features/products/EditProduct";
import ProductsTable from "../features/products/ProductsTable";

function Products() {
  const [activeTab, setActiveTab] = useState("products");

  if (activeTab === "products")
    return <ProductsTable setActiveTab={setActiveTab} />;
  else if (activeTab === "createProduct")
    return <CreateProduct setActiveTab={setActiveTab} />;
  else return <EditProduct />;
}

export default Products;
