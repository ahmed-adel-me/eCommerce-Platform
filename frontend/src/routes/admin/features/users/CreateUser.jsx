import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../UI/FormInput";
import useCreateAdmin from "./useCreateAdmin";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

function CreateUser() {
  const { createAdmin, isLoading } = useCreateAdmin();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: (values) => {
      createAdmin(values, {
        onSuccess: () => {
          formik.resetForm();
          toast.success("Email created successfully");
        },
      });
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Create Admin User</h2>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <FormInput
          name={"name"}
          label={"Name"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          disabled={isLoading}
          error={formik.errors.name}
        />
        <FormInput
          name={"email"}
          label={"Email"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          disabled={isLoading}
          error={formik.errors.email}
        />
        <FormInput
          name={"password"}
          label={"Password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
          disabled={isLoading}
          error={formik.errors.password}
        />
        <FormInput
          name={"confirmPassword"}
          label={"Confirm Password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          type="password"
          disabled={isLoading}
          error={formik.errors.confirmPassword}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded text-lg font-semibold flex justify-center items-center w-20 mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="white" size={20} />
          ) : (
            <span>Create</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
