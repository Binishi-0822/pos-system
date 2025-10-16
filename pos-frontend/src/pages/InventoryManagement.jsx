import React from "react";
import SectionTitle from "../components/SectionTitle";
import InventoryManagementOverview from "../components/InventoryManagementOverview";
import LowStockAlert from "../components/LowStockAlert";
import DataGridTable from "../components/DataGridTable";

const InventoryManagement = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "minStock", headerName: "Min Stock", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "action", headerName: "Action", flex: 0.8 },
  ];

  const rows = [
    { id: 1, productName: "Soap", category: "Personal Care", minStock: 10, status: "Low", action: "Edit" },
    { id: 2, productName: "Rice", category: "Food", minStock: 30, status: "OK", action: "Edit" },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="flex-1 w-full px-0">
      <SectionTitle title="Inventory Management" icon="📦" />
      <InventoryManagementOverview />
      <LowStockAlert />

      <div className="flex gap-4 px-6 mt-6 justify-between">
        <input
          type="text"
          placeholder="Search products by name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition duration-200"
        />

        <button
          className="w-1/3 bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          + Add Product
        </button>
      </div>

      <div className="px-6 mt-6">
        <DataGridTable rows={rows} columns={columns}/>
      </div>
    </div>
  );
};

export default InventoryManagement;
