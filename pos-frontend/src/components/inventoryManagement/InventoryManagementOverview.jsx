import React,{useEffect,useState} from "react";
import { Package, Boxes, AlertTriangle, Layers } from "lucide-react";
import { getInventorySummary } from "../../services/productService";

const InventoryManagementOverview = () => {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockCount: 0,
    inStockCount: 0,
    outOfStockCount: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getInventorySummary()
        console.log(response)
        if (response.success) {
          console.log("succ")
          const { totalStock, totalProducts, lowStockCount, inStockCount, outOfStockCount, totalBatches } = response.data;
          console.log(totalProducts,totalStock)
          setSummary({
            totalStock,
            totalProducts,
            lowStockCount,
            inStockCount,
            outOfStockCount,
            totalBatches
          });
        }
      } catch (error) {
        console.error("Failed to fetch inventory summary", error);
      }
    };

    fetchSummary();
  }, []);

  const cardData = [
    {
      title: "Total Product",
      value: summary.totalProducts,
      subtitle: "Active items",
      icon: <Package className="w-6 h-6 text-blue-600" />,
      subtitleColor: "text-green-600",
    },
    {
      title: "Total Stock",
      value: summary.totalStock,
      subtitle: "Unit available",
      icon: <Boxes className="w-6 h-6 text-yellow-600" />,
      subtitleColor: "text-gray-400",
    },
    {
      title: "Low Stock Items",
      value: summary.lowStockCount,
      subtitle: "Needs attention",
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      subtitleColor: "text-red-400",
    },
    {
      title: "Total Batches",
      value: summary.totalBatches,
      subtitle: "Active batches",
      icon: <Layers className="w-6 h-6 text-purple-600" />,
      subtitleColor: "text-gray-400",
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
