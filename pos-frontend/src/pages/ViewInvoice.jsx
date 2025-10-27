import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Building2,
  Package,
  DollarSign,
} from "lucide-react";
import Alert from "@mui/material/Alert";
import DataGridTable from "../components/DataGridTable";

const ViewInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoice } = location.state || {};

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <div className="text-center">
          <p className="mb-2 text-lg">No invoice data found.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Columns for the DataGridTable
  const columns = [
    { field: "product", headerName: "Product Name", flex: 1, minWidth: 150 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    { field: "batch_id", headerName: "Batch ID", flex: 1, minWidth: 120 },
    { field: "quantity", headerName: "Quantity", flex: 0.8, minWidth: 100 },
    { field: "purchase_price", headerName: "Purchase Price", flex: 1, minWidth: 130 },
    { field: "selling_price", headerName: "Selling Price", flex: 1, minWidth: 130 },
    { field: "expire_date", headerName: "Expiry Date", flex: 1, minWidth: 120 },
    { field: "subtotal", headerName: "Subtotal", flex: 1, minWidth: 130 },
  ];

  // Prepare row data for table
  const rowData = invoice.items.map((item, index) => ({
    id: item._id || index,
    product: item.batch_id?.product_id?.name || "N/A",
    category: item.batch_id?.product_id?.categoryId?.name || "N/A",
    batch_id: item.batch_id?._id || "N/A",
    quantity: item.batch_id?.quantity || 0,
    purchase_price: item.batch_id?.purchase_price || 0,
    selling_price: item.batch_id?.selling_price || 0,
    expire_date: item.batch_id?.expire_date
      ? new Date(item.batch_id.expire_date).toLocaleDateString("en-GB")
      : "N/A",
    subtotal: ((item.batch_id?.purchase_price || 0) * (item.batch_id?.quantity || 0)).toFixed(2),
  }));

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Invoices
        </button>
      </div>

      {/* Invoice Summary */}
      <div className="bg-white mx-6 rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-blue-500">🧾</span>
            Invoice No: {invoice.invoice_number}
          </h2>
          <span className="text-gray-500 text-sm mt-2 sm:mt-0">
            Created on:{" "}
            {invoice.createdAt
              ? new Date(invoice.createdAt).toLocaleDateString("en-GB")
              : "N/A"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
          {/* Supplier */}
          <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-md">
              <Building2 className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Supplier</p>
              <p className="font-medium">{invoice.supplier_name || "N/A"}</p>
            </div>
          </div>

          {/* Invoice Date */}
          <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
            <div className="bg-green-100 p-2 rounded-md">
              <CalendarDays className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Invoice Date</p>
              <p className="font-medium">
                {invoice.invoice_date
                  ? new Date(invoice.invoice_date).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Total Items */}
          <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-lg">
            <div className="bg-yellow-100 p-2 rounded-md">
              <Package className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="font-medium">{invoice.total_items || 0}</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-md">
              <DollarSign className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-semibold text-gray-900 text-lg">
                {invoice.total_amount
                  ? invoice.total_amount.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })
                  : "$0.00"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert.show && (
        <div className="px-6 mb-4">
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </div>
      )}

      {/* Invoice Items Table */}
      <div className="bg-white mx-6 rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Invoice Items
        </h3>
        <div className="w-full h-[500px]">
          <DataGridTable rows={rowData} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
