import { useFormik } from "formik";
import { HiOutlineTrash } from "react-icons/hi";
import * as Yup from "yup";
import useCreateCategory from "./useCreateCategory";
import { ClipLoader } from "react-spinners";
import InputError from "../../UI/InputError";

function CreateCategory() {
  const { createCategory, isLoading: isCreatingCategory } = useCreateCategory();

  const formik = useFormik({
    initialValues: {
      name: "",
      brands: "", // Changed from parentCategory to brands
      properties: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(40, "Name must be 40 characters or less")
        .required("Category name is required"),
      brands: Yup.string().nullable(), // Validation for brands input
    }),
    onSubmit: (values) => {
      createCategory(values);
      formik.resetForm()
    },
  });

  // Handle property deletion
  const handleDeleteProperty = (index) => {
    const updatedProperties = formik.values.properties.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("properties", updatedProperties);
  };

  // Handle adding a new property
  const handleAddProperty = () => {
    const lastProperty =
      formik.values.properties[formik.values.properties.length - 1];

    if (lastProperty && (!lastProperty.name || !lastProperty.values)) {
      alert(
        "Please fill in both the property name and values before adding a new one."
      );
      return;
    }

    formik.setFieldValue("properties", [
      ...formik.values.properties,
      { name: "", values: "" },
    ]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="max-w-4xl">
        <div className="flex gap-5 mb-4 mt-1">
          <div className="flex-1 relative flex flex-col gap-1">
            <label className="text-gray-600 font-semibold " htmlFor="category">
              Create new category
            </label>
            <input
              className="w-full bg-white self-end text-lg py-1 px-3 rounded border border-gray-400 outline-none text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
              type="text"
              name="name"
              id="name"
              placeholder="Category name"
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={isCreatingCategory}
            />
            <InputError error={formik.errors.name} />
          </div>

          <div className="flex-1 relative flex flex-col gap-1">
            <label className="text-gray-600 font-semibold" htmlFor="category">
              Add brands
            </label>
            <input
              className="w-full bg-white text-lg py-1 px-3 rounded border border-gray-400 outline-none text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
              type="text"
              name="brands"
              id="brands"
              placeholder="Comma-separated brands (e.g., Apple, Samsung, We)"
              onChange={formik.handleChange}
              value={formik.values.brands}
              disabled={isCreatingCategory}
            />
            <InputError error={formik.errors.brands} />
          </div>
        </div>

        <div className="pt-3">
          <h5 className="text-gray-600 font-semibold pb-1">Properties</h5>
          <button
            type="button"
            className="border border-gray-400 py-1 px-4 rounded bg-gray-50 hover:bg-gray-200 font-semibold text-gray-700 disabled:bg-gray-300 disabled:text-gray-500"
            onClick={handleAddProperty}
            disabled={isCreatingCategory}
          >
            Add new property
          </button>
        </div>

        {/* Display the properties fields */}
        {formik.values.properties.map((property, index) => (
          <div key={index} className="pt-2 flex gap-3">
            <input
              className="flex-1 bg-white text-lg py-1 px-3 rounded border border-gray-400 outline-none text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
              type="text"
              placeholder={`Property ${index + 1} name`}
              value={property.name}
              onChange={(e) =>
                formik.setFieldValue(
                  `properties[${index}].name`,
                  e.target.value
                )
              }
              disabled={isCreatingCategory}
            />
            <input
              className="flex-1 bg-white text-lg py-1 px-3 rounded border border-gray-400 outline-none text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
              type="text"
              placeholder="Comma-separated values"
              value={property.values}
              onChange={(e) =>
                formik.setFieldValue(
                  `properties[${index}].values`,
                  e.target.value
                )
              }
              disabled={isCreatingCategory}
            />

            <button
              onClick={() => handleDeleteProperty(index)}
              className="flex justify-center items-center gap-1 bg-red-300 text-red-600 py-1 px-3 rounded-sm hover:bg-red-400 font-semibold"
            >
              <HiOutlineTrash />
              <span>Delete</span>
            </button>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded text-lg font-semibold flex justify-center items-center w-20 mt-4"
          disabled={isCreatingCategory}
        >
          {isCreatingCategory ? (
            <ClipLoader color="white" size={20} />
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateCategory;
