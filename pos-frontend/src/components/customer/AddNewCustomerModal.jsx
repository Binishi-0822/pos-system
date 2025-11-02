import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Alert from "@mui/material/Alert";
import * as Yup from "yup";
import { createCustomer, updateCustomer } from "../../services/customerService";

const AddNewCustomerModal = ({ isOpen, onClose, data, isEditMode, onReload }) => {
  const [alert, setAlert] = useState({ show: false, message: "", severity: "" });

  // ✅ Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Customer name is required")
      .min(2, "Name must be at least 2 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters"),
  });

  const initialValues = {
    name: data?.name || "",
    phone: data?.phone || "",
    address: data?.address || "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      let result;
      if (isEditMode) {
        result = await updateCustomer({ ...values, _id: data._id });
      } else {
        result = await createCustomer(values);
      }

      if (result?.success) {
        setAlert({
          show: true,
          message: isEditMode
            ? "Customer updated successfully!"
            : "Customer added successfully!",
          severity: "success",
        });
        onReload();
        resetForm();
        setTimeout(() => {
          setAlert({ show: false, message: "", severity: "" });
          onClose();
        }, 2000);
      } else {
        setAlert({
          show: true,
          message: "Failed to save customer.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        message: "Something went wrong!",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

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
          {isEditMode ? "Edit Customer" : "Add Customer"}
        </h2>
        <hr className="border-gray-300 mt-1 mb-3 w-full shadow-sm" />

        {alert.show && (
          <Alert severity={alert.severity} className="mb-3">
            {alert.message}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <Field
                  as="textarea"
                  name="address"
                  rows="3"
                  placeholder="Enter address"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage
                  name="address"
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
                  {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewCustomerModal;
