import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar - Fixed */}
      <SideBar />

      {/* Main content - shifted right by sidebar width */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
