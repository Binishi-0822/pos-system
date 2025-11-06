import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import { IoCameraSharp } from "react-icons/io5";
import { CiBarcode } from "react-icons/ci";
import { getCategories } from "../services/metaService";
import { getProducts, getProductsByCategory } from "../services/productService";
import AlertBox from "../components/inventoryManagement/AlertBox";

const NewSale = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);

  // ✅ Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.data?.length) {
          const categoryList = [
            { id: "all", name: "All" },
            ...response.data.map((cat) => ({
              id: cat._id,
              name: cat.name,
            })),
          ];
          setCategories(categoryList);
        } else {
          setCategories([{ id: "all", name: "All" }]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Load products
  const loadProducts = async (categoryId = "all") => {
    try {
      let response;
      if (categoryId === "all") {
        response = await getProducts();
      } else {
        response = await getProductsByCategory(categoryId);
      }

      if (response.status === 404 || !response.data?.length) {
        setProducts([]);
      } else {
        setProducts(response.data || []);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts("all");
  }, []);

  useEffect(() => {
    loadProducts(activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex-1 w-full px-0">
      <SectionTitle title="New Sale" icon="🛒" />

      <div className="grid grid-cols-3 gap-6 px-6 mt-6">
        {/* Left Section */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Scan QR/Barcode */}
            <div
              onClick={() => console.log("Open camera modal")}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 
                         text-white rounded-2xl shadow-md hover:shadow-xl 
                         p-8 flex flex-col items-center justify-center 
                         transition-all duration-200"
            >
              <IoCameraSharp className="text-5xl mb-3" />
              <h3 className="text-xl font-semibold">Scan QR/Barcode</h3>
              <p className="text-sm opacity-90">Use Camera</p>
            </div>

            {/* Type Barcode or Product */}
            <div
              className="bg-white border border-gray-200 rounded-2xl shadow-sm 
                          hover:shadow-md transition-all duration-200 p-8 
                          flex flex-col justify-center"
            >
              <label className="text-gray-700 font-medium mb-3 flex items-center gap-2">
                <CiBarcode className="text-2xl text-gray-500" />
                Type Barcode or Product
              </label>
              <input
                type="text"
                placeholder="Enter barcode or product name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 
                           focus:border-blue-400 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-2 text-right">
                Press Enter ↵
              </p>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex overflow-x-auto gap-3 py-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200
                  ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* ✅ Product List or Alert */}
          {products.length > 0 ? (
            <div
              className="h-[65vh] overflow-y-auto pr-2 
                         scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                           gap-6 mt-4"
              >
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-white border border-gray-100 rounded-2xl 
                               shadow-sm hover:shadow-lg hover:border-blue-200 
                               transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="p-4 flex flex-col justify-between h-full">
                      <h4 className="text-md font-semibold text-gray-800 truncate">
                        {product.name}
                      </h4>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-sm font-medium text-blue-700">
                          Rs. {product.price ? product.price.toFixed(2) : "123.00"}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            product.totalStock > 0
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {product.totalStock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Min Stock: {product.minStock} | Total: {product.totalStock}
                      </div>
                      <button
                        onClick={() => console.log("Add to Cart:", product.name)}
                        className="mt-4 w-full py-2 rounded-lg text-sm font-medium 
                                   bg-blue-50 text-blue-700 border border-blue-100 
                                   hover:bg-blue-600 hover:text-white 
                                   hover:shadow-md transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AlertBox
              type="info"
              title="No Products Found"
              message="There are currently no products available in this category."
            />
          )}
        </div>

        {/* Right Section - Current Sale */}
        <div className="flex flex-col justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 h-[75vh]">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Current Sale
            </h2>
            <p className="text-sm text-gray-500">No items added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSale;
