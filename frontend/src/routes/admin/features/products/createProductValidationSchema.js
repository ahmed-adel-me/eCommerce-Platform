import * as Yup from "yup";

const createProductValidationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: Yup.string().optional(),
  properties: Yup.object().optional(),
});

export default createProductValidationSchema;
