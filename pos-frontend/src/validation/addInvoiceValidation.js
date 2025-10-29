import * as Yup from "yup";

export const addInvoiceValidationSchema = Yup.object({
  supplier_name: Yup.string()
    .required("Supplier name is required")
    .min(2, "Supplier name must be at least 2 characters"),
  invoice_number: Yup.string().max(
    20,
    "Invoice number cannot exceed 20 characters"
  ),
  invoice_date: Yup.date()
    .transform((value, originalValue) => {
      if (!originalValue) return null;
      return new Date(originalValue);
    })
    .required("Invoice date is required")
    .max(new Date(), "Invoice date cannot be in the future"),

  products: Yup.array()
    .min(1, "Please add at least one product to the invoice")
    .required("Please add at least one product to the invoice"),
});
