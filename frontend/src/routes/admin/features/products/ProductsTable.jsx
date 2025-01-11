import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import useProducts from "../../../../hooks/useProducts";
import Table from "../../UI/Table";
import useDeleteProduct from "./useDeleteProduct";

function ProductsTable({ setActiveTab, setEditedProduct }) {
  const { products, isLoading, isSuccess } = useProducts();
  const { deleteProduct, isLoading: isDeleting } = useDeleteProduct();
  return (
    <div className="h-screen">
      <h2 className="text-2xl font-semibold mb-5">Products</h2>
      <Table columns={"grid-cols-2"}>
        <Table.Header>
          <h4 className="uppercase text-gray-600 font-bold">Product Name</h4>
        </Table.Header>
        <Table.Body>
          {isLoading && (
            <div className="flex justify-center">
              <ClipLoader />
            </div>
          )}
          {isSuccess &&
            (products.length > 0 ? (
              products.map((product) => (
                <Table.Row border key={product._id}>
                  <p className="text-lg font-bold">{product.name}</p>

                  <div className="flex gap-3 justify-center">
                    <button
                      className="flex justify-center gap-1 items-center py-1 px-3 border rounded-sm bg-gray-100 hover:bg-gray-300"
                      onClick={() => {
                        setEditedProduct(product._id)
                        setActiveTab("editProduct");
                      }}
                    >
                      <HiOutlinePencilAlt />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        deleteProduct(product);
                      }}
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
              <p className="text-center">There are no products</p>
            ))}
        </Table.Body>
      </Table>
      <button
        onClick={() => setActiveTab("createProduct")}
        className="bg-blue-500 font-semibold text-white text-lg py-2 px-4 rounded mt-3 z-50 hover:bg-blue-600"
      >
        Add new product
      </button>
    </div>
  );
}

export default ProductsTable;
