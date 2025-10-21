import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import InventoryManagementOverview from "../components/inventoryManagement/InventoryManagementOverview";
import LowStockAlert from "../components/inventoryManagement/LowStockAlert";
import DataGridTable from "../components/DataGridTable";
import AddProductModal from "../components/inventoryManagement/AddProductModal";
import { getProducts } from "../services/productService";
import { Eye, Edit, Trash2 } from "lucide-react";
import { formHelperTextClasses } from "@mui/material/FormHelperText";

const InventoryManagement = () => {
  const paginationModel = { page: 0, pageSize: 5 };
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isEditMode, setIsEditMode] = useState(formHelperTextClasses)
  const [reload, setReload] = useState(false);


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "brand", headerName: "Brand Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "minStock", headerName: "Min Stock", flex: 1 },
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
          case "In Stock":
            bgColor = "bg-green-50";
            textColor = "text-green-700";
            borderColor = "border-green-400";
            break;
          case "Low Stock":
            bgColor = "bg-yellow-50";
            textColor = "text-yellow-700";
            borderColor = "border-yellow-400";
            break;
          case "Out of Stock":
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
            {status}
          </span>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-1 h-full">
          <button
            className="text-blue-600 p-1 hover:text-blue-700 transition duration-200"
            title="View Batches"
            onClick={() => handleViewBatches(params.row)}
          >
            <Eye size={18} />
          </button>
          <button
            className="text-green-600  p-1 hover:text-green-700 transition duration-200"
            title="Edit Product"
            onClick={() => handleEdit(params.row)}
          >
            <Edit size={18} />
          </button>
          <button
            className="text-red-600 p-1 hover:text-red-700 transition duration-200"
            title="Delete Product"
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
    setIsEditMode(true)
    setShowModal(true);
  };

  useEffect(() => {
    const getRowData = async () => {
      try {
        const response = await getProducts();

        if (response.success) {
          const formattedData = response.data.map((item, index) => ({
            id: index + 1,
            _id: item._id,
            name: item.name,
            brand: item.brand,
            category: item.categoryId?.name || "N/A",
            categoryId: item.categoryId?._id || "",
            unit: item.unitId?.name || "",
            unitId: item.unitId?._id || "",
            minimumStock: item.minStock,
            unitSymbol: item.unitId?.symbol || "",
            minStock: `${item.minStock} ${item.unitId?.symbol || ""}`,
            status:
              item.status === "out_of_stock"
                ? "Out of Stock"
                : item.status === "low_stock"
                ? "Low Stock"
                : "In Stock",
          }));

          setRowData(formattedData);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setRowData([]);
      }
    };

    getRowData();
  }, [reload]);

  const handleReload = () => {
    setReload(prev => !prev);
  };

  const filteredRows =
    searchTerm.trim() === ""
      ? rowData
      : rowData.filter((row) => {
          const lowerSearch = searchTerm.toLowerCase();
          return (
            row.name.toLowerCase().includes(lowerSearch) ||
            row.category.toLowerCase().includes(lowerSearch)
          );
        });

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="w-1/3 bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          onClick={() => {
            setShowModal(true)
            setIsEditMode(false)
            setSelectedRowData({
              name: "",
              category: "",
              unit: "",
              minStock: "",
            })
          }}
        >
          + Add Product
        </button>
      </div>

      <div className="px-6 mt-6">
        <DataGridTable
          rows={filteredRows}
          columns={columns}
          isSearch={searchTerm.trim() !== ""}
        />
      </div>

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={selectedRowData}
        isEditMode={isEditMode}
        onReload={handleReload}
      />
    </div>
  );
};

export default InventoryManagement;
