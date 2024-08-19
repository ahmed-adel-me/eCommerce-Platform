import * as Yup from "yup";

export default Yup.object({
  email: Yup.string()
    .email("Invalid email address") // Ensure email format
    .required("Email is required"), // Make email field required
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Minimum length for password
    .required("Password is required"), // Make password field required
});
