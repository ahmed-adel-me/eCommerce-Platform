import SubmitBtn from "../../components/SubmitBtn";
import { useFormik } from "formik";
import useLogout from "../../hooks/useLogout";
import useUser from "../../hooks/useUser";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import FormInput from "../../components/FormInput";

export default function AccountDetails() {
  const { data: user, isSuccess } = useUser();
  const { logout } = useLogout();

  return (
    <div className="bg-white rounded-lg  p-6 mx-5 place-self-center">
      <h2 className="text-2xl font-semibold mb-5">Account details</h2>
      {isSuccess && <Form user={user} />}
      <button
        onClick={logout}
        className="text-white font-semibold bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700 "
      >
        Logout
      </button>
    </div>
  );
}

function Form({ user }) {
  const { updateProfile, isLoading } = useUpdateProfile();
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      streetAddress: user.streetAddress,
    },
    onSubmit: (values) => {
      updateProfile(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-3 border-b-2 mb-5 pb-3"
    >
      <FormInput
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        disabled={isLoading}
        label={"name"}
      />
      <FormInput
        type="email"
        label={"email"}
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        disabled={isLoading}
      />
      <div className="flex gap-3 flex-col sm:flex-row">
        <FormInput
          label={"city"}
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        <FormInput
          label={"country"}
          type="text"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-3 flex-col sm:flex-row">
        <FormInput
          label={"postal code"}
          type="text"
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        <FormInput
          label={"street address"}
          type="text"
          name="streetAddress"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
      </div>
      <SubmitBtn text={"Save"} isLoading={isLoading} />
    </form>
  );
}
