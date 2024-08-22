import CategoriesTable from "../features/categories/CategoriesTable";
import CreateCategory from "../features/categories/CreateCategory";

function Categories() {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">Categories</h2>
      <CreateCategory />
      <CategoriesTable />
    </div>
  );
}

export default Categories;
