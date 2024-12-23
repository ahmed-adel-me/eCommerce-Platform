import { ClipLoader } from "react-spinners";
import useCategories from "./useCategories";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import Table from "../../UI/Table";
import useDeleteCategory from "./useDeleteCategory";

function CategoriesTable({ setEditedCategory }) {
  const { categories, isLoading, isSuccess } = useCategories();
  const { deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  return (
    <Table columns={"grid-cols-3"}>
      <Table.Header>
        <h4 className="uppercase text-gray-600 font-bold">Category Name</h4>
        <h4 className="uppercase text-gray-600 font-bold">Brands</h4>
        <h4 className="uppercase text-gray-600 font-bold"></h4>
      </Table.Header>
      <Table.Body>
        {isLoading && (
          <div className="flex justify-center">
            <ClipLoader />
          </div>
        )}
        {isSuccess &&
          (categories.length > 0 ? (
            categories.map((category) => (
              <Table.Row key={category._id}>
                <p className="text-lg font-bold">{category.name}</p>
                <p>{category?.brands ? category.brands.join(", ") : "-"}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditedCategory(category._id)}
                    className="flex justify-center gap-1 items-center py-1 px-3 border rounded-sm bg-gray-100 hover:bg-gray-300"
                  >
                    <HiOutlinePencilAlt />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="flex justify-center items-center gap-1 bg-red-200 text-red-600 py-1 px-3 rounded-sm hover:bg-red-300 disabled:bg-red-100 disabled:text-red-400 disabled:hover:bg-red-100"
                    disabled={isDeleting}
                  >
                    <HiOutlineTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </Table.Row>
            ))
          ) : (
            <p>There are no categories</p>
          ))}
      </Table.Body>
    </Table>
  );
}

export default CategoriesTable;
