import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addProductValidationSchema } from "../../validation/addProductValidation";
import { getCategories, getMeasurements } from "../../services/metaService";
import { addProduct } from "../../services/productService";

const AddProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide modal when not open

  const initialValues = {
    name: "",
    category: "",
    unit: "",
    minStock: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
    console.log("handle submit",values)
      const result = await addProduct(values);
      if (result?.product._id) {
        alert("Product added successfully!");
      } else {
        alert("Failed to add product!");
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add product!");
    } finally {
      setSubmitting(false); // <--- Tell Formik we're done
    }
  };

  const [categories, setCategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    };

    const fetchMeasurements = async () => {
      const response = await getMeasurements();
      if (response.success) {
        setMeasurements(response.data);
      } else {
        setMeasurements([]);
      }
    };
    fetchCategories();
    fetchMeasurements();
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add Product
        </h2>
        <hr className="border-gray-300 mt-1 mb-3 w-full shadow-sm" />

        <Formik
          initialValues={initialValues}
          validationSchema={addProductValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Category
                </label>
                <Field
                  name="category"
                  as="select"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Minimum Stock Quantity
                </label>
                <Field
                  type="number"
                  name="minStock"
                  min="1"
                  placeholder="Enter minimum stock quantity"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage
                  name="minStock"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Unit of Measure */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Unit of Measure
                </label>
                <Field
                  name="unit"
                  as="select"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select unit of measure</option>
                  {measurements.map((measurement) => (
                    <option key={measurement._id} value={measurement._id}>
                      {measurement.name} ({measurement.symbol})
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="unit"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductModal;
