// src/pages/Dashboard.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "@/components/dashboard/Navbar";
import SideBar from "@/components/dashboard/SideBar";
import ContentArea from "@/components/dashboard/ContentArea";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("search"); // default tab
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar
        user={user}
        onLogout={logout}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <SideBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <ContentArea activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
