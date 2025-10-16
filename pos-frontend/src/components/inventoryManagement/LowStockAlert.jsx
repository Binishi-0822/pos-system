import React from "react";
import { AlertTriangle } from "lucide-react";

const LowStockAlert = () => {
  return (
    <div className="mx-6 mt-4 rounded-md bg-red-50 border-l-4 border-red-500 shadow-sm p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-900 font-semibold text-sm">Low Stock Alert</p>
          <p className="text-xs text-red-600 mt-1">
            1 product(s) are at or below minimum quantity. Consider restocking soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlert;
