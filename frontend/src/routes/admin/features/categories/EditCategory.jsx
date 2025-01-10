import { useFormik } from "formik";
import { HiOutlineTrash } from "react-icons/hi";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import InputError from "../../UI/InputError";
import useCategory from "./useCategory";
import { useEffect } from "react";
import useUpdateCategory from "./useUpdateCategory";

function EditCategory({ categoryId, setEditedCategory }) {
  const { data: category, isLoading: isFetching } = useCategory(categoryId);
  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateCategory(categoryId);

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      brands: category?.brands.join(", ") || "",
      properties: [],
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(40, "Name must be 40 characters or less")
        .required("Category name is required"),
      brands: Yup.string().nullable(),
      properties: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Property name is required"),
          values: Yup.string().required("Property values are required"),
        })
      ),
    }),
    onSubmit: (values) => {
      const brands = values.brands
        ? values.brands.split(",").map((item) => item.trim())
        : null;

      const properties = values.properties.map((prop) => {
        return {
          ...prop,
          values: prop.values.split(",").map((val) => val.trim()),
        };
      });
      updateCategory(
        { ...values, brands, properties },
        {
          onSuccess: () => {
            setEditedCategory("");
          },
        }
      );
    },
  });
  console.log("category:", category);
  console.log("formik:", formik.values);

  const handleDeleteProperty = (index) => {
    const updatedProperties = formik.values.properties.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("properties", updatedProperties);
  };

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

  useEffect(() => {
    if (category && category?.properties) {
      formik.setFieldValue(
        "properties",
        category?.properties.map((prop) => {
          return { ...prop, values: prop.values.join(", ") };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Edit Category</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-4xl">
          <div className="flex gap-5 mb-4 mt-1">
            <div className="flex-1 relative flex flex-col gap-1">
              <label className="text-gray-600 font-semibold" htmlFor="category">
                Name
              </label>
              <input
                className="w-full bg-white self-end text-lg py-1 px-3 rounded border border-gray-400 outline-none text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
                type="text"
                name="name"
                id="name"
                placeholder="Category name"
                onChange={formik.handleChange}
                value={formik.values.name}
                disabled={isFetching || isUpdating}
              />
              <InputError error={formik.errors.name} />
            </div>

            <div className="flex-1 relative flex flex-col gap-1">
              <label className="text-gray-600 font-semibold" htmlFor="category">
                brands
              </label>
              <input
                className="w-full bg-white text-lg py-1 px-3 rounded border border-gray-400 outline-none text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
                type="text"
                name="brands"
                id="brands"
                placeholder="Comma-separated brands (e.g., Apple, Samsung, We)"
                onChange={formik.handleChange}
                value={formik.values.brands}
                disabled={isFetching || isUpdating}
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
              disabled={isFetching || isUpdating}
            >
              Add new property
            </button>
          </div>
          {isFetching ? (
            <div className="flex justify-center">
              <ClipLoader />
            </div>
          ) : (
            formik.values?.properties.map((property, index) => (
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
                  disabled={isFetching || isUpdating}
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
                  disabled={isFetching || isUpdating}
                />

                <button
                  onClick={() => handleDeleteProperty(index)}
                  className="flex justify-center items-center gap-1 bg-red-300 text-red-600 py-1 px-3 rounded-sm hover:bg-red-400 font-semibold"
                >
                  <HiOutlineTrash />
                  <span>Delete</span>
                </button>
              </div>
            ))
          )}
          <div className="flex gap-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded text-lg font-semibold flex justify-center items-center w-20 mt-4"
              disabled={isFetching || isUpdating}
            >
              {isUpdating ? (
                <ClipLoader color="white" size={20} />
              ) : (
                <span>Update</span>
              )}
            </button>
            <button
              onClick={() => setEditedCategory("")}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-5 rounded text-lg font-semibold flex justify-center items-center w-20 mt-4"
            >
              Cancle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
