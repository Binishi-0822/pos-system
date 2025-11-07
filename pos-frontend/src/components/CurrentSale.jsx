import React from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

const CurrentSale = ({ cart, onUpdateQuantity, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md h-[75vh] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-2xl shadow-sm p-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Current Sale</h2>
        </div>
        <button className="text-sm border border-white border-dashed px-3 py-1 rounded-md hover:bg-white hover:text-blue-700 transition-all">
          + Select Customer
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 h-full">
            <p className="text-sm">No items added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border border-gray-100 rounded-xl shadow-sm p-3 hover:shadow-md transition-all"
              >
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item._id, Math.max(item.quantity - 1, 1))
                    }
                    className="p-1 border rounded-md hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity + 1)
                    }
                    className="p-1 border rounded-md hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemove(item._id)}
                    className="p-1 border border-red-200 text-red-500 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentSale;
