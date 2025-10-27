import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { getAllInvoices } from "../services/invoiceService";
import DataGridTable from "../components/DataGridTable";
import { Eye, Edit, Trash2 } from "lucide-react";

const ManageSupplierInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  // ----------------------------
  // Columns definition
  // ----------------------------
  const columns = [
    { field: "invoice_number", headerName: "Invoice No", flex: 1, minWidth: 130 },
    { field: "supplier_name", headerName: "Supplier", flex: 1.2, minWidth: 150 },
    { field: "invoice_date", headerName: "Date", flex: 1, minWidth: 120 },
    { field: "total_items", headerName: "Items", flex: 0.8, minWidth: 100, type: "number" },
    { field: "total_amount", headerName: "Total Amount", flex: 1, minWidth: 130, type: "number" },
    {
      field: "action",
      headerName: "Action",
      flex: 0.8,
      minWidth: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full gap-2">
            <button
                className="text-blue-600 hover:text-blue-700 transition"
                title="View Batches"
                onClick={() =>
                    navigate("/admin-dashboard/view-invoice", {
                        state: { invoice: params.row },
                    })
                }

            >
            <Eye size={18} />
            </button>
            <button
                className="text-green-600 hover:text-green-700 transition"
                title="Edit Invoice"
                onClick={() => handleEdit(params.row)}
            >
            <Edit size={18} />
            </button>
            <button
                className="text-red-600 hover:text-red-700 transition"
                title="Delete Invoice"
                onClick={() => handleDelete(params.row)}
            >
            <Trash2 size={18} />
            </button>
        </div>
        ),

    },
  ];

  // ----------------------------
  // Fetch data
  // ----------------------------
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const result = await getAllInvoices();
        if (result.success) {
          setInvoices(result.data);
        } else {
          console.error("Failed to fetch invoices:", result.message);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  // ----------------------------
  // Format rows
  // ----------------------------
  const rowData = invoices.map((invoice) => ({
    ...invoice,
    id: invoice._id,
    invoice_date: new Date(invoice.invoice_date).toLocaleDateString("en-GB"), // DD/MM/YYYY
  }));

  // ----------------------------
  // Action handlers (dummy for now)
  // ----------------------------
  const handleViewBatches = (invoice) => {
    console.log("View Batches:", invoice);
  };

  const handleEdit = (invoice) => {
    console.log("Edit Invoice:", invoice);
  };

  const handleDelete = (invoice) => {
    console.log("Delete Invoice:", invoice);
  };

  const filteredRows =
    searchTerm.trim() === ""
      ? rowData
      : rowData.filter((row) => {
          const lowerSearch = searchTerm.toLowerCase();
          return (
            row.supplier_name.toLowerCase().includes(lowerSearch) ||
            row.invoice_date.toLowerCase().includes(lowerSearch)
          );
        });

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="flex-1 w-full px-6 py-4 bg-gray-50 min-h-screen">
      <SectionTitle title="Supplier Invoices" icon="🧾" />

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-between">
        <input
          type="text"
          placeholder="Search invoices by supplier name or invoice number..."
          className="flex-1 w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 
                     transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
                     transition duration-200 w-full sm:w-auto"
          onClick={() => navigate("/admin-dashboard/create-new-invoice")}
        >
          + Add Invoice
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg bg-white border shadow-md p-5 w-full mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-600">Invoice Details</h3>
        <div className="w-full h-[500px]"> {/* Ensures full alignment */}
          <DataGridTable
            rows={filteredRows}
            columns={columns}
            isSearch={searchTerm.trim() !== ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSupplierInvoices;
