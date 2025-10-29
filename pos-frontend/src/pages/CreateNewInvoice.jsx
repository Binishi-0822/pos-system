import React, { useEffect, useState, useMemo } from "react";
import SectionTitle from "../components/SectionTitle";
import {
  ArrowLeft,
  PackageSearch,
  Search,
  Package,
  Save,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import AddProductModal from "../components/inventoryManagement/AddProductModal";
import AddProductBatchModal from "../components/inventoryManagement/AddProductBatchModal";
import { getProducts } from "../services/productService";
import AlertBox from "../components/inventoryManagement/AlertBox";
import DataGridTable from "../components/DataGridTable";
import { addInvoice, updateInvoice } from "../services/invoiceService";
import Alert from "@mui/material/Alert";
import { addInvoiceValidationSchema } from "../validation/addInvoiceValidation";

const CreateNewInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingInvoice = location.state?.invoice || null;
  console.log("existingInvoice : ",existingInvoice)

  const initialValues = {
    supplier_name: existingInvoice?.supplier_name || "",
    invoice_number: existingInvoice?.invoice_number ||  "",
    invoice_date: existingInvoice?.invoice_date
      ? (() => {
          const parts = existingInvoice.invoice_date.split("/");
          if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`; // Convert to yyyy-MM-dd
          }
          // fallback for ISO date
          return new Date(existingInvoice.invoice_date)
            .toISOString()
            .split("T")[0];
        })()
      : new Date().toISOString().split("T")[0],


  };

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchData, setSearchData] = useState({ name: "" });
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [invoiceProductList, setInvoiceProductList] = useState([]);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });
  const isEditing = Boolean(existingInvoice?._id);

  const columns = [
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => (
        <div className="truncate max-w-[200px]" title={params.value}>
          {params.value}
        </div>
      ),
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "purchase_price", headerName: "Purchase Price", flex: 1 },
    { field: "selling_price", headerName: "Selling Price", flex: 1 },
    { field: "expire_date", headerName: "Expire Date", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 0.5 },
    { field: "subtotal", headerName: "Subtotal", flex: 1 },
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
    if (existingInvoice?.items?.length > 0) {
      console.log("item ",existingInvoice?.items);

      const formattedItems = existingInvoice.items.map((item, index) => ({
        id: index + 1,
        _id: item.batch_id?.product_id?._id,
        product: item.batch_id?.product_id?.name || "N/A",
        category: item.batch_id?.product_id?.categoryId?.name || "N/A",
        purchase_price: item.batch_id?.purchase_price || 0,
        selling_price: item.batch_id?.selling_price || 0,
        quantity: item.batch_id?.quantity || 0,
        expire_date: item.batch_id?.expire_date
          ? new Date(item.batch_id.expire_date).toLocaleDateString("en-GB")
          : "N/A",
        subtotal:
          (item.batch_id?.purchase_price || 0) *
          (item.batch_id?.quantity || 0),
      }));


      setInvoiceProductList(formattedItems);
    }
  }, [existingInvoice]);


  const handleDelete = (row) => {
    setInvoiceProductList((prevList) =>
      prevList.filter((item) => item.id !== row.id)
    );
  };

  const handleViewBatches = (row) => {
    setSelectedProduct(row);
    setShowAddBatchModal(true);
    setIsViewMode(true);
  };

  const handleEdit = (row) => {
    setSelectedProduct(row);
    setShowAddBatchModal(true);
    setIsViewMode(false);
    setIsEditMode(true);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (invoiceProductList.length === 0) {
      setAlert({
        show: true,
        message: "Please add at least one product before saving the invoice.",
        severity: "error",
      });
      return;
    }

    try {
      const invoiceData = {
        supplier_name: values.supplier_name,
        invoice_number: values.invoice_number,
        invoice_date: values.invoice_date,
        products: invoiceProductList.map((item) => ({
          product_id: item._id,
          purchase_price: item.purchase_price,
          selling_price: item.selling_price,
          quantity: item.quantity,
          expire_date: item.expire_date,
        })),
        total_amount: totalAmount,
        total_items: totalItems,
      };

      console.log("Invoice Data:", invoiceData);

      const result = isEditing
        ? await updateInvoice(existingInvoice._id, invoiceData)
        : await addInvoice(invoiceData);


      if (result?.success) {
        setAlert({
          show: true,
          message: "Invoice details saved successfully!",
          severity: "success",
        });

        resetForm();
        setInvoiceProductList([]);
        setSearchTerm("");
        setSelectedProduct(null);
        handleReload();

        setTimeout(() => {
          setAlert({ show: false, message: "", severity: "" });
          navigate("/admin-dashboard/manage-supplier-invoices");
        }, 3000);
      } else {
        setAlert({
          show: true,
          message: "Something went wrong! Failed to save invoice details.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        show: true,
        message: "Error saving invoice. Please try again later.",
        severity: "error",
      });
    }
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
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
            price: item.price || 0,
          }));
          setProducts(formattedData);
        } else setProducts([]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [reload]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSearchData({ name: value });
  };

  const handleCreateProductClick = () => {
    if (searchTerm.trim() === "") return;

    const matchedProduct = products.find(
      (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (matchedProduct) {
      setSelectedProduct(matchedProduct);
      setShowAddBatchModal(true);
    } else {
      setSearchData({ name: searchTerm });
      setShowAddProductModal(true);
    }
  };

  const handleReload = () => setReload((prev) => !prev);

  const totalAmount = invoiceProductList.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0
  );
  const totalItems = invoiceProductList.length;
  const isModalOpen = showAddProductModal || showAddBatchModal;

  return (
    <div className="flex-1 w-full px-0">
      <div className="px-6 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Invoices
        </button>
      </div>

      <SectionTitle title="Create New Invoice" icon="🧾" />

      <div className="px-6 mt-6">
        {alert.show && (
          <Alert severity={alert.severity} className="mb-3">
            {alert.message}
          </Alert>
        )}
      </div>

      <div className="px-6 mt-6">
        <Formik
          initialValues={{ ...initialValues, products: invoiceProductList }}
          onSubmit={handleSubmit}
          // validationSchema={addInvoiceValidationSchema}
        >
          {() => (
            <Form>
              {/* Invoice Information */}
              <div className="rounded-lg bg-white border shadow-md p-5 w-full">
                <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-800">
                  <span className="text-blue-500 text-xl">👤</span>
                  Invoice Information
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Supplier Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Supplier Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="supplier_name"
                      placeholder="Enter supplier name"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                    />
                    <ErrorMessage
                      name="supplier_name"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Invoice Number
                    </label>
                    <Field
                      type="text"
                      name="invoice_number"
                      placeholder="Optional"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                    />
                  </div>

                  {/* Invoice Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Invoice Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="date"
                      name="invoice_date"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-100 focus:outline-none"
                    />
                    <ErrorMessage
                      name="invoice_date"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Add Products */}
              <div className="rounded-lg bg-white border shadow-md p-5 w-full mt-6">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-base font-semibold text-slate-800">
                    <PackageSearch className="text-blue-500 w-5 h-5" />
                    Add Products
                  </div>
                </div>

                <div className="mb-3 -ml-6">
                  <AlertBox
                    type="info"
                    title="Important"
                    message="Same product can be added multiple times with different purchase prices and expiry dates. Each row creates a separate batch."
                    compact
                  />
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search products to add..."
                    className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
                    disabled={isModalOpen}
                  />
                </div>

                {!isModalOpen && (
                  <>
                    {searchTerm.trim() === "" &&
                    invoiceProductList.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center py-10 text-gray-400">
                        <Package className="w-10 h-10 mb-2" />
                        <p className="font-medium text-gray-500">
                          No products added yet
                        </p>
                        <p className="text-sm">
                          Search and add products using the search bar above
                        </p>
                      </div>
                    ) : (
                      <>
                        {searchTerm.trim() !== "" &&
                          filteredProducts.length > 0 && (
                            <div className="space-y-2">
                              {filteredProducts.map((p) => (
                                <div
                                  key={p._id}
                                  className="flex justify-between items-center border rounded-md p-3 hover:bg-gray-50 transition cursor-pointer"
                                  onClick={() => {
                                    setSelectedProduct(p);
                                    setShowAddBatchModal(true);
                                  }}
                                >
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {p.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Brand: {p.brand} • Min Stock: {p.minStock}
                                    </p>
                                  </div>
                                  <span className="font-semibold text-blue-600">
                                    Rs. {p.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                        {searchTerm.trim() !== "" && (
                          <div
                            className="border border-green-200 bg-green-50 p-3 rounded-md flex justify-between items-center mt-2 hover:bg-green-100 transition cursor-pointer"
                            onClick={handleCreateProductClick}
                          >
                            <div>
                              <p className="font-medium text-green-800 flex items-center gap-1">
                                <Plus className="w-4 h-4" />
                                Create New Product
                              </p>
                              <p className="text-sm text-green-700">
                                Add "{searchTerm}" to inventory
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Product Table */}
              {invoiceProductList.length > 0 && (
                <div className="mt-6 rounded-lg bg-white border shadow-md p-5 w-full">
                  <h3 className="text-lg font-semibold mb-3">
                    Invoice Products
                  </h3>
                  <DataGridTable
                    rows={invoiceProductList}
                    columns={columns}
                    isSearch={searchTerm.trim() !== ""}
                  />
                </div>
              )}

              {/* Summary */}
              <div className="rounded-lg bg-white border shadow-md p-5 w-full mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Total Items: {totalItems}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Total Amount:{" "}
                    <span className="text-blue-600">Rs. {totalAmount}</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Invoice
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => {
          setShowAddProductModal(false);
          setSearchTerm("");
        }}
        data={searchData}
        isEditMode={false}
        onReload={handleReload}
      />

      {selectedProduct && showAddBatchModal && (
        <AddProductBatchModal
          product={selectedProduct}
          isViewMode={isViewMode}
          isEditMode={isEditMode}
          onClose={() => {
            setShowAddBatchModal(false);
            setSelectedProduct(null);
            setSearchTerm("");
          }}
          onAddBatch={(product, batchData) => {
            const updatedItem = {
              id: product.id || Date.now(),
              _id: product._id,
              product: product.name,
              category: product.category,
              purchase_price: batchData.purchasePrice,
              selling_price: batchData.sellingPrice,
              quantity: batchData.quantity,
              expire_date: batchData.expiryDate,
              subtotal: batchData.purchasePrice * batchData.quantity,
            };

            setInvoiceProductList((prev) => {
              const existingIndex = prev.findIndex(
                (item) => item.id === product.id
              );
              if (existingIndex !== -1) {
                const updatedList = [...prev];
                updatedList[existingIndex] = updatedItem;
                return updatedList;
              }
              return [...prev, updatedItem];
            });

            setShowAddBatchModal(false);
            setSelectedProduct(null);
            setSearchTerm("");
            handleReload();
          }}
        />
      )}
    </div>
  );
};

export default CreateNewInvoice;
