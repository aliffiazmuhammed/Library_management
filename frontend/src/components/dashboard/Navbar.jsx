// src/components/dashboard/Navbar.js
import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ user, onLogout, onToggleSidebar }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow p-4">
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle button on mobile */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
