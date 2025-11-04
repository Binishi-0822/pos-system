import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import { IoCameraSharp } from "react-icons/io5";
import { CiBarcode } from "react-icons/ci";
import { getCategories } from "../services/metaService";

const NewSale = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.success) {
        const categoryNames = response.data.map((category) => category.name);
        setCategories(["All", ...categoryNames]);
      } else {
        setCategories(["All"]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex-1 w-full px-0">
      <SectionTitle title="New Sale" icon="🛒" />

      <div className="grid grid-cols-3 gap-6 px-6 mt-6">
        {/* Left Section - Scan & Search */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          {/* Horizontally Scrollable Categories */}
          <div className="col-span-2 mt-6">
            <div
              className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1"
              style={{ scrollBehavior: "smooth" }}
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Current Sale */}
        <div className="flex flex-col justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Current Sale
            </h2>
            <p className="text-sm text-gray-500">No items added yet.</p>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar (Tailwind Custom) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default NewSale;
