import React,{useEffect,useState} from "react";
import { Package, Boxes, AlertTriangle, Layers } from "lucide-react";
import { getInventorySummary } from "../../services/productService";

const CustomerManagementOverview = () => {
  


const cardData = [
  {
    title: "Total Customers",
    value: "120",
    subtitle: "All registered customers",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    subtitleColor: "text-blue-500",
  },
  {
    title: "Total Due Amount",
    value: "Rs. 45,000.00",
    subtitle: "Pending receivables",
    icon: <Wallet className="w-6 h-6 text-yellow-600" />,
    subtitleColor: "text-yellow-500",
  },
  {
    title: "Customers with Dues",
    value: "43",
    subtitle: "Require payment follow-up",
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    subtitleColor: "text-red-500",
  },
  {
    title: "Inactive Customers",
    value: "12",
    subtitle: "No recent purchases",
    icon: <UserX className="w-6 h-6 text-purple-600" />,
    subtitleColor: "text-purple-500",
  },
];


  return (
    <div className="flex-1 w-full px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-full"
          >
            <div className="rounded-lg bg-white border shadow-md p-5 w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-base">{card.title}</p>
                  <p className="font-bold text-3xl">{card.value}</p>
                </div>
                {card.icon}
              </div>
              <span className={`text-xs ${card.subtitleColor}`}>
                {card.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagementOverview;
