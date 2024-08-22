import { useState } from "react";
import { useFormik } from "formik";
import FormInput from "../../UI/FormInput";
import useCategories from "../categories/useCategories";
import createProductValidationSchema from "./createProductValidationSchema";
import InputError from "../../UI/InputError";
import BeatLoader from "react-spinners/BeatLoader";
import useCreateProduct from "./useCreateProduct";
import { ClipLoader } from "react-spinners";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import SelectInput from "../../UI/SelectInput";

function CreateProduct({ setActiveTab }) {
  const { createProduct, isLoading: isCreatingProduct } = useCreateProduct();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, isLoading: categoriesAreLoading } = useCategories();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: undefined,
      category: "",
      properties: {},
      description: "",
      price: "",
      images: [], // Add images field
    },
    validationSchema: createProductValidationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      createProduct(
        { ...values, images: selectedFiles },
        {
          onSuccess: () => {
            setActiveTab("products");
          },
        }
      );
    },
  });

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selected = categories.find((category) => category._id === categoryId);
    setSelectedCategory(selected);
    formik.setFieldValue("category", categoryId);
    formik.setFieldValue("properties", {}); // Reset properties when category changes
    formik.setFieldValue("brand", undefined); // Reset brand when category changes
  };

  const handlePropertyChange = (propertyName, value) => {
    formik.setFieldValue(`properties.${propertyName}`, value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...files].slice(0, 5));
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Create Product</h2>

      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <FormInput
          label={"Product name"}
          name={"name"}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          disabled={isCreatingProduct}
        />
        {!categoriesAreLoading ? (
          <>
            <SelectInput
              id="category"
              name="category"
              label="Category"
              options={categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
              value={formik.values.category}
              onChange={handleCategoryChange}
              error={formik.errors.category}
              disabled={isCreatingProduct}
            />
            {selectedCategory && selectedCategory.brands.length > 0 && (
              <div>
                <label className="text-gray-600 font-semibold" htmlFor="brand">
                  Brand
                </label>
                <select
                  className={`text-lg py-2 px-3 rounded border-2 ${
                    formik.errors.brand ? "border-red-500" : "border-gray-400"
                  } outline-none text-gray-900 w-full bg-white mt-1 disabled:bg-gray-300 disabled:text-gray-500`}
                  name="brand"
                  id="brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  disabled={isCreatingProduct}
                >
                  <option value="">Select Brand</option>
                  {selectedCategory.brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <BeatLoader />
        )}
        {selectedCategory && selectedCategory.properties.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Properties</h3>
            {selectedCategory.properties.map((property) => (
              <div key={property._id} className="mb-3">
                <label
                  className="text-gray-600 font-semibold"
                  htmlFor={property.name}
                >
                  {property.name}
                </label>
                <select
                  className="text-lg py-2 px-3 rounded border border-gray-400 outline-none text-gray-900 w-full bg-white mt-1"
                  name={`properties.${property.name}`}
                  id={property.name}
                  value={formik.values.properties[property.name] || ""}
                  onChange={(e) =>
                    handlePropertyChange(property.name, e.target.value)
                  }
                >
                  <option value="">Select {property.name}</option>
                  {property.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-5">
          <div className="">
            <label
              htmlFor="images"
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
            >
              <HiOutlineUpload />
              <span className="font-semibold"> Upload Images</span>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleFileChange}
                disabled={isCreatingProduct}
                className="hidden"
              />
            </label>
          </div>
          {selectedFiles.length > 0 && (
            <div className="mt-2 flex gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="w-28 h-28 object-cover rounded shadow-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <HiX color="white" size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <FormInput
          as="textarea"
          label={"Description"}
          name="description"
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          disabled={isCreatingProduct}
        />
        <FormInput
          label={"Price"}
          name={"price"}
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price}
          disabled={isCreatingProduct}
        />
        <div className="flex gap-5 mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded text-lg font-semibold flex justify-center items-center w-20"
            disabled={isCreatingProduct}
          >
            {isCreatingProduct ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <span>Save</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-5 rounded text-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
