import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
