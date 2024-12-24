import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormInput from "../../UI/FormInput";
import useCategories from "../categories/useCategories";
import createProductValidationSchema from "./createProductValidationSchema";
import BeatLoader from "react-spinners/BeatLoader";
import { ClipLoader } from "react-spinners";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import SelectInput from "../../UI/SelectInput";
import useProduct from "./useProduct";
import useUpdateProduct from "./useUpdateProduct";

function EditProduct({ productId, setActiveTab }) {
  const { product, isLoading: isProductLoading } = useProduct(productId);

  const { mutate: updateProduct, isLoading: isUpdatingProduct } =
    useUpdateProduct(productId);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, isLoading: categoriesAreLoading } = useCategories();
  const [images, setImages] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      brand: product?.category.brand || "",
      category: product?.category.categoryRef || "",
      properties: product?.properties || {},
      description: product?.description || "",
      price: product?.price || "",
    },
    enableReinitialize: true,
    validationSchema: createProductValidationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      updateProduct(
        { ...values, images },
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
    formik.setFieldValue("properties", {});
    formik.setFieldValue("brand", "");
  };

  // const handlePropertyChange = (propertyName, value) => {
  //   formik.setFieldValue(`properties.${propertyName}`, value);
  // };

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length + selectedFiles.length + existingImages.length > 5) {
  //     toast.error("You can upload a maximum of 5 images.");
  //     return;
  //   }
  //   setSelectedFiles((prevFiles) => [...prevFiles, ...files].slice(0, 5));
  // };

  // const handleRemoveImage = (index, isExisting = false) => {
  //   if (isExisting) {
  //     setExistingImages((prevImages) =>
  //       prevImages.filter((_, imgIndex) => imgIndex !== index)
  //     );
  //   } else {
  //     setSelectedFiles((prevFiles) =>
  //       prevFiles.filter((_, fileIndex) => fileIndex !== index)
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (product) {
  //     setExistingImages(product?.images);
  //   }
  // }, [product]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      isNew: true,
    }));
    if (files.length + images.filter((img) => !img.isNew).length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }
    setImages((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (product) {
      setImages(product?.images.map((img) => ({ src: img, isNew: false })));
      if (categories) {
        const categoryId = product.category.categoryRef;
        const selected = categories.find(
          (category) => category._id === categoryId
        );
        setSelectedCategory(selected);
      }
    }
  }, [product, categories]);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Edit Product</h2>

      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <FormInput
          label="Product name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          disabled={isUpdatingProduct || isProductLoading}
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
              disabled={isProductLoading || isUpdatingProduct}
            />
            {selectedCategory?.brands?.length > 0 && (
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
                  disabled={isUpdatingProduct}
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
        {isProductLoading ? (
          <div className="my-5">
            <ClipLoader />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img} // URL for existing image
                  alt={`Existing ${index}`}
                  className="w-28 h-28 object-cover rounded shadow-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                  onClick={() => handleRemoveImage(index, true)}
                >
                  <HiX color="white" size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-5 mt-4">
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
              disabled={isProductLoading || isUpdatingProduct}
              className="hidden"
            />
          </label>
        </div>

        {/* Other form inputs */}
        <FormInput
          as="textarea"
          label="Description"
          name="description"
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          disabled={isProductLoading || isUpdatingProduct}
        />
        <FormInput
          label="Price"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price}
          disabled={isProductLoading || isUpdatingProduct}
        />

        <div className="flex gap-5 mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded text-lg font-semibold flex justify-center items-center w-20"
            disabled={isProductLoading || isUpdatingProduct}
          >
            {isUpdatingProduct ? (
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

export default EditProduct;
