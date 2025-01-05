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

  const { mutate: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct(productId);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, isLoading: categoriesAreLoading } = useCategories();
  const [images, setImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

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
      const { newImages, oldImages } = images.reduce(
        (acc, img) => {
          img.isNew
            ? acc.newImages.push(img.file)
            : acc.oldImages.push(img.src);
          return acc;
        },
        { newImages: [], oldImages: [] }
      );

      updateProduct(
        { values, newImages, oldImages, removedImages },
        {
          onSuccess: () => {
            setActiveTab("products");
          },
        }
      );
    },
  });
  const handleRemoveImage = (index) => {
    const removedImage = images[index];
    if (!removedImage.isNew) {
      setRemovedImages((prevRemoved) => {
        return [...prevRemoved, removedImage.src];
      });
    }
    setImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
    });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selected = categories.find((category) => category._id === categoryId);
    setSelectedCategory(selected);
    formik.setFieldValue("category", categoryId);
    formik.setFieldValue("properties", {});
    formik.setFieldValue("brand", "");
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
      .filter((file) => file.type.startsWith("image/")) // Accept only image files
      .map((file) => ({
        file,
        isNew: true,
      }));

    if (files.length + images.filter((img) => !img.isNew).length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    if (files.length !== e.target.files.length) {
      toast.error("Only image files are allowed.");
    }

    setImages((prev) => [...prev, ...files].slice(0, 5));
  };

  useEffect(() => {
    if (product) {
      setImages(product?.images.map((img) => ({ src: img, isNew: false })));
      setRemovedImages([]); // Reset removed images when a product is loaded
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
                  src={
                    img?.file instanceof File
                      ? URL.createObjectURL(img.file)
                      : img.src
                  } // Generate URL for File or use img.src
                  alt={`Image ${index}`}
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
              accept="image/*"
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
