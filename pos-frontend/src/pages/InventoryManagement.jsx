import React from "react";
import SectionTitle from "../components/SectionTitle";
import { ShoppingCart } from "lucide-react";
import InventoryManagementOverview from "../components/InventoryManagementOverview";
import LowStockAlert from "../components/LowStockAlert";


const InventoryManagement = () => {
  return (
    <div div className="flex-1 w-full px-0">
      <SectionTitle title="Inventory Management" icon="📦" />
      <InventoryManagementOverview/>
      <LowStockAlert/>
    </div>
  );
};

export default InventoryManagement;
