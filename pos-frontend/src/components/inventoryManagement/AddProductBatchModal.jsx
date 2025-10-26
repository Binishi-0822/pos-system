import React from "react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProductBatchModal = ({
  product,
  onClose,
  onAddBatch,
  isViewMode = false,
  isEditMode = false,
}) => {
  console.log("product : ",product)
  const initialValues = {
    productName: product.name ? product.name : product.product,
    purchasePrice: product.purchase_price || "",
    sellingPrice: product.selling_price || "",
    quantity: product.quantity || "",
    expiryDate: product.expire_date || "",
  };

  const validationSchema = Yup.object({
    purchasePrice: Yup.number()
      .required("Purchase price is required")
      .min(0, "Must be at least 0"),
    sellingPrice: Yup.number()
      .required("Selling price is required")
      .min(0, "Must be at least 0"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    expiryDate: Yup.date().required("Expiry date is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    try {
      onAddBatch(product, values);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isViewMode ? "View Batch" : "Add Batch"} for{" "}
          <span className="text-blue-600">{product.name ? product.name : product.product}</span>
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={isViewMode ? null : validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Purchase Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Purchase Price
                  </label>
                  <Field
                    type="number"
                    name="purchasePrice"
                    placeholder="Enter purchase price"
                    disabled={isViewMode}
                    className={`w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none ${
                      isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {!isViewMode && (
                    <ErrorMessage
                      name="purchasePrice"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  )}
                </div>

                {/* Selling Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selling Price
                  </label>
                  <Field
                    type="number"
                    name="sellingPrice"
                    placeholder="Enter selling price"
                    disabled={isViewMode}
                    className={`w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none ${
                      isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {!isViewMode && (
                    <ErrorMessage
                      name="sellingPrice"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <Field
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    min="1"
                    disabled={isViewMode}
                    className={`w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none ${
                      isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {!isViewMode && (
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <Field
                    type="date"
                    name="expiryDate"
                    disabled={isViewMode}
                    className={`w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none ${
                      isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {!isViewMode && (
                    <ErrorMessage
                      name="expiryDate"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {isViewMode ? "Close" : "Cancel"}
                </button>

                {!isViewMode && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    {isEditMode ? "Save Changes" : "Add Batch"} 
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductBatchModal;
