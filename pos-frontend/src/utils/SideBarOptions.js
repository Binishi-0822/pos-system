import { MdInventory } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineTransaction } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5"
import { IoReceiptSharp } from "react-icons/io5";

export const sideBarOptions = {
    owner : [
        {
            icon: MdDashboardCustomize,
            title: "Dashboard",
            path: "/admin-dashboard"
        },
        {
            icon: IoReceiptSharp,
            title: "New Sale",
            path: "/admin-dashboard/billing"
        },
        {
            icon: MdInventory,
            title: "Inventory Management",
            path: "/admin-dashboard/inventory-management"
        },

        {
            icon: FaFileInvoiceDollar,
            title: "Supplier Invoices",
            path: "/admin-dashboard/manage-supplier-invoices"
        },

        {
            icon: IoPersonAddSharp,
            title: "Cashier Management",
            path: "/admin-dashboard/cashier-management"
        },

        {
            icon: BiSolidReport,
            title: "Sales Reports",
            path: "/admin-dashboard"
        },

        {
            icon: IoPeopleSharp,
            title: "Customer Management",
            path: "/admin-dashboard/customer-management"
        },
      
    ],

    cashier : [
        {
            icon: MdDashboardCustomize,
            title: "Inventory Management",
            path: "/admin-dashboard"
        },

        

    ],
}