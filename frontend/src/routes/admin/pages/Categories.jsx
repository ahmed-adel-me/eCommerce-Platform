import { useState } from "react";
import CategoriesTable from "../features/categories/CategoriesTable";
import CreateCategory from "../features/categories/CreateCategory";
import EditCategory from "../features/categories/EditCategory";

function Categories() {
  const [editedCategory, setEditedCategory] = useState("");
  if (editedCategory)
    return (
      <EditCategory
        categoryId={editedCategory}
        setEditedCategory={setEditedCategory}
      />
    );
  else
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-5">Categories</h2>
        <CreateCategory />
        <CategoriesTable setEditedCategory={setEditedCategory} />
      </div>
    );
}

export default Categories;
