import React,{useState, useEffect} from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { getAllInvoices } from "../services/invoiceService";
import DataGridTable from "../components/DataGridTable";
import {Eye,Edit,Trash2} from "lucide-react";



const ManageSupplierInvoices = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([])

    const columns = [
        { field: "invoice_number", headerName: "Invoice No", flex: 1 },
        { field: "supplier_name", headerName: "Supplier", flex: 1 },
        { field: "invoice_date", headerName: "Date", flex: 1 },
        { field: "total_items", headerName: "Items", flex: 1 },
        { field: "total_amount", headerName: "Total Amount", flex: 1},
        {
        field: "action",
        headerName: "Action",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => (
            <div className="flex justify-center items-center gap-1 h-full">
            <button
                className="text-blue-600 p-1 hover:text-blue-700"
                title="View Batches"
                onClick={() => handleViewBatches(params.row)}
            >
                <Eye size={18} />
            </button>
            <button
                className="text-green-600 p-1 hover:text-green-700"
                title="Edit Product"
                onClick={() => handleEdit(params.row)}
            >
                <Edit size={18} />
            </button>
            <button
                className="text-red-600 p-1 hover:text-red-700"
                title="Delete Product"
                onClick={() => handleDelete(params.row)}
            >
                <Trash2 size={18} />
            </button>
            </div>
        ),
        },
    ];
    
    useEffect(() => {
        const fetchInvoices = async () => {
        try {
            const result = await getAllInvoices();
            console.log(result)
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

    const rows = invoices.map((invoice) => ({
        ...invoice,
        id: invoice._id, 
        invoice_date: new Date(invoice.invoice_date).toLocaleDateString(),
    }));


    return (
        <div className="flex-1 w-full px-0">
            <SectionTitle title="Supplier Invoices" icon="🧾" />
            <div className="px-6 mt-6">
                {/* {alert.show && (
                <Alert severity={alert.severity} className="mb-3">
                    {alert.message}
                </Alert>
                )} */}
            </div>
            <div className="flex gap-4 px-4 mt-6 justify-between">
                <input
                type="text"
                placeholder="Search invoices by supplier name or invoice number..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                className="w-1/3 bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                onClick={() => {
                    navigate("/admin-dashboard/create-new-invoice")
                    // setShowModal(true);
                    // setIsEditMode(false);
                    // setSelectedRowData({
                    // name: "",
                    // category: "",
                    // unit: "",
                    // minStock: "",
                    // });
                }}
                >
                + Add Invoice
                </button>
            </div>

            {invoices.length > 0 && (
                <div className="mt-6 rounded-lg bg-white border shadow-md p-5 w-full">
                  <h3 className="text-lg font-semibold mb-3 text-gray-500">
                    Invoice Details
                  </h3>
                  <DataGridTable
                    rows={rows}
                    columns={columns}
                    isSearch={searchTerm.trim() !== ""}
                  />
                </div>
            )}

        </div>
    );
};

export default ManageSupplierInvoices;
