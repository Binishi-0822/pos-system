import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import CustomerManagementOverview from "../components/customer/CustomerManagementOverview";
import DataGridTable from "../components/DataGridTable";
import AddNewCustomerModal from "../components/customer/AddNewCustomerModal";
import { Eye, Edit, Trash2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@mui/material/Alert";
import { getCustomers, deleteCustomer } from "../services/customerService";

const CustomerManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [reload, setReload] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Customer Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.status;
        let bgColor = "";
        let textColor = "";
        let borderColor = "";

        switch (status) {
          case "active":
            bgColor = "bg-green-50";
            textColor = "text-green-700";
            borderColor = "border-green-400";
            break;
          case "inactive":
            bgColor = "bg-red-50";
            textColor = "text-red-700";
            borderColor = "border-red-400";
            break;
          default:
            bgColor = "bg-gray-50";
            textColor = "text-gray-700";
            borderColor = "border-gray-300";
        }
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${bgColor} ${textColor} ${borderColor}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-1 h-full">
          <button
            className="text-blue-600 p-1 hover:text-blue-700 transition duration-200"
            title="View Customer Details"
            onClick={() => handleView(params.row)}
          >
            <Eye size={18} />
          </button>
          <button
            className="text-green-600  p-1 hover:text-green-700 transition duration-200"
            title="Edit Customer"
            onClick={() => handleEdit(params.row)}
          >
            <Edit size={18} />
          </button>
          <button
            className="text-red-600 p-1 hover:text-red-700 transition duration-200"
            title="Delete Customer"
            onClick={() => handleDelete(params.row)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setSelectedRowData(row);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleView = (row) => {
    alert(`Viewing details for: ${row.name}`);
  };

  const handleDelete = (row) => {
    setCustomerToDelete(row);
    setShowConfirm(true);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        if (response.success) {
          const formattedData = response.data.map((item, index) => ({
            id: index + 1,
            _id: item._id,
            name: item.name,
            phone: item.phone,
            address: item.address,
            status: item.status,
            lastActiveAt: item.lastActiveAt,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));
          setRowData(formattedData);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setRowData([]);
      }
    };
    fetchCustomers();
  }, [reload]);

  const handleReload = () => setReload((prev) => !prev);

  const filteredRows =
    searchTerm.trim() === ""
      ? rowData
      : rowData.filter((row) => {
          const lowerSearch = searchTerm.toLowerCase();
          return (
            row.name.toLowerCase().includes(lowerSearch) ||
            row.address.toLowerCase().includes(lowerSearch) ||
            row.phone.toLowerCase().includes(lowerSearch) ||
            row.status.toLowerCase().includes(lowerSearch)
          );
        });

  const confirmDelete = async () => {
    try {
      const result = await deleteCustomer(customerToDelete._id);
      if (result?.success) {
        setAlert({ show: true, message: "Customer deleted successfully!", severity: "success" });
        handleReload();
      } else {
        setAlert({ show: true, message: "Failed to delete customer.", severity: "error" });
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      setAlert({ show: true, message: "Something went wrong!", severity: "error" });
    } finally {
      setShowConfirm(false);
      setCustomerToDelete(null);
      setTimeout(() => setAlert({ show: false, message: "", severity: "" }), 5000);
    }
  };

  return (
    <div className="flex-1 w-full px-0">
      <SectionTitle title="Customer Management" icon="👥" />

      <div className="px-6 mt-6">
        {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </div>

      <CustomerManagementOverview />

      <div className="flex gap-4 px-6 mt-6 justify-between">
        <input
          type="text"
          placeholder="Search by name, address, phone, or status..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="w-1/3 bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
            setSelectedRowData({ name: "", phone: "", address: "", status: "active" });
          }}
        >
          + Add New Customer
        </button>
      </div>

      <div className="px-6 mt-6">
        <DataGridTable rows={filteredRows} columns={columns} isSearch={searchTerm.trim() !== ""} />
      </div>

      <AddNewCustomerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={selectedRowData}
        isEditMode={isEditMode}
        onReload={handleReload}
      />

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default CustomerManagement;
