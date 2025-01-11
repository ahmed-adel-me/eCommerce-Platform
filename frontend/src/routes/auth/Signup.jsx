import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import SubmitBtn from "../../components/SubmitBtn";
import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import signupValidationSchema from "../../validation/signupValidationSchema";

export default function Signup() {
  const { signup, isLoading } = useSignup();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      country: "",
      postalCode: "",
      streetAddress: "",
    },
    validateOnChange: false,
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      signup(values);
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen py-10 mx-5">
      <div className="bg-white p-10 rounded-xl shadow-lg basis-full max-w-xl">
        <h6 className="font-semibold mb-5 text-center text-3xl">SIGN UP</h6>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            label={"Name"}
            id={"name"}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
            disabled={isLoading}
          />
          <FormInput
            label={"Email"}
            type="email"
            id={"email"}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            disabled={isLoading}
          />
          <FormInput
            label={"Password"}
            type="password"
            id={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            disabled={isLoading}
          />
          <FormInput
            label={"Confirm Password"}
            type="password"
            id={"confirmPassword"}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
            disabled={isLoading}
          />
          <FormInput
            label={"Country"}
            id={"country"}
            onChange={formik.handleChange}
            value={formik.values.country}
            error={formik.errors.country}
            disabled={isLoading}
          />
          <FormInput
            label={"City"}
            id={"city"}
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.errors.city}
            disabled={isLoading}
          />
          <FormInput
            label={"Street Address"}
            id={"streetAddress"}
            onChange={formik.handleChange}
            value={formik.values.streetAddress}
            error={formik.errors.streetAddress}
            disabled={isLoading}
          />
          <FormInput
            label={"Postal Code"}
            id={"postalCode"}
            onChange={formik.handleChange}
            value={formik.values.postalCode}
            error={formik.errors.postalCode}
            disabled={isLoading}
          />

          <SubmitBtn text="LOGIN" isLoading={isLoading} />
        </form>

        <div className="text-sm flex gap-1 mt-5 justify-center">
          <p>Already a user?</p>
          <Link to={"/login"} className="underline">
            LOGIN
          </Link>
        </div>
      </div>
    </section>
  );
}
