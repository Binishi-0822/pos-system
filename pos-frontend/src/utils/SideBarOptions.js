import { MdInventory } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineTransaction } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";


export const sideBarOptions = {
    owner : [
        {
            icon: MdDashboardCustomize,
            title: "Dashboard",
            path: "/admin-dashboard"
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




        
    ],

    cashier : [
        {
            icon: MdDashboardCustomize,
            title: "Inventory Management",
            path: "/admin-dashboard"
        },

        

    ],
}