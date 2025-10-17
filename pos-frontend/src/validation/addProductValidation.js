import * as Yup from "yup";

export const addProductValidationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),

  category: Yup.string()
    .required("Please select a category")
    .notOneOf([""], "Please select a category"),

  unit: Yup.string()
    .required("Please select a unit of measure")
    .notOneOf([""], "Please select a unit of measure"),

  minStock: Yup.number()
    .typeError("Minimum Quantity must be a number")
    .required("Minimum quantity is required")
    .min(1, "Minimum quantity must be at least 1"),
});
