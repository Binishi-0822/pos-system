// src/validation/addProductValidation.js
import * as Yup from "yup";

export const addProductValidationSchema = Yup.object({
  productName: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  
  category: Yup.string()
    .required("Category is required")
    .min(2, "Enter a valid category"),

  minQuantity: Yup.number()
    .typeError("Minimum Quantity must be a number")
    .required("Minimum quantity is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
});
