import React from "react";
import { AlertTriangle, Info, OctagonAlert } from "lucide-react";

const AlertBox = ({ type = "info", title, message }) => {
  const styles = {
    info: {
      bg: "bg-blue-50",
      border: "border-l-4 border-blue-500",
      textTitle: "text-blue-900",
      textMsg: "text-blue-700",
      icon: <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />,
    },
    warning: {
      bg: "bg-orange-50",
      border: "border-l-4 border-orange-500",
      textTitle: "text-orange-900",
      textMsg: "text-orange-700",
      icon: <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />,
    },
    danger: {
      bg: "bg-red-50",
      border: "border-l-4 border-red-500",
      textTitle: "text-red-900",
      textMsg: "text-red-700",
      icon: <OctagonAlert className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div className={`mx-6 mt-4 rounded-md ${current.bg} ${current.border} shadow-sm p-4`}>
      <div className="flex items-start gap-3">
        {current.icon}
        <div>
          <p className={`font-semibold text-sm ${current.textTitle}`}>{title}</p>
          <p className={`text-xs mt-1 ${current.textMsg}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
