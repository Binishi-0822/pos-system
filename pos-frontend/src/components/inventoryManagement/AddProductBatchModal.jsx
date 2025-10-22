import React from "react";
import { X } from "lucide-react";
import { Formik, Form, Field } from "formik";

const AddProductBatchModal = ({ product, onClose }) => {
  const initialValues = {
    purchasePrice: "",
    sellingPrice: "",
    quantity: "",
    expiryDate: "",
  };

  const handleSubmit = (values) => {
    console.log("✅ New batch added for:", product.name, values);
    alert(`Batch added for ${product.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add Batch for <span className="text-blue-600">{product.name}</span>
        </h2>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Purchase Price
                  </label>
                  <Field
                    type="number"
                    name="purchasePrice"
                    placeholder="Enter purchase price"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selling Price
                  </label>
                  <Field
                    type="number"
                    name="sellingPrice"
                    placeholder="Enter selling price"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <Field
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    min="1"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <Field
                    type="date"
                    name="expiryDate"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Add Batch
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductBatchModal;
