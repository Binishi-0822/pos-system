import React from "react";
import { Users, Wallet, AlertTriangle, UserX } from "lucide-react";

const CustomerManagementOverview = () => {
  const cardData = [
    {
      title: "Total Customers",
      value: "120",
      subtitle: "All registered customers",
      icon: <Users className="w-7 h-7 text-blue-600" />,
      subtitleColor: "text-blue-500",
    },
    {
      title: "Total Due Amount",
      value: "Rs. 45,000.00",
      subtitle: "Pending receivables",
      icon: <Wallet className="w-7 h-7 text-yellow-600" />,
      subtitleColor: "text-yellow-500",
    },
    {
      title: "Customers with Dues",
      value: "43",
      subtitle: "Require payment follow-up",
      icon: <AlertTriangle className="w-7 h-7 text-red-600" />,
      subtitleColor: "text-red-500",
    },
    {
      title: "Inactive Customers",
      value: "12",
      subtitle: "No recent purchases",
      icon: <UserX className="w-7 h-7 text-purple-600" />,
      subtitleColor: "text-purple-500",
    },
  ];

  return (
    <div className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-4">
      {/* Responsive grid for summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 p-4 sm:p-6 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium leading-tight">
                  {card.title}
                </p>
                <p className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 mt-1">
                  {card.value}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">{card.icon}</div>
            </div>
            <p
              className={`text-xs sm:text-sm md:text-base font-medium ${card.subtitleColor}`}
            >
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerManagementOverview;
