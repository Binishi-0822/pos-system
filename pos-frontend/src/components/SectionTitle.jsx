import React from "react";

const SectionTitle = ({ title, icon }) => {
  return (
    <div className="mb-6 w-full flex-1 p-6 rounded-md">
      <h2 className="flex items-center gap-2 text-[1.5rem] font-semibold text-slate-800 pb-2 tracking-wide">
        {icon && <span className="text-blue-500 text-2xl">{icon}</span>}
        {title}
      </h2>
      <hr className="border-gray-300 mt-2 w-full shadow-sm" />
    </div>
  );
};

export default SectionTitle;
