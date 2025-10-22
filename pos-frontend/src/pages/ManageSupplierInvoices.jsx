import React,{useState} from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";


const ManageSupplierInvoices = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
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
            <div className="flex gap-4 px-6 mt-6 justify-between">
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
        </div>
    );
};

export default ManageSupplierInvoices;
