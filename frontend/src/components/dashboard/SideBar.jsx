// components/Sidebar.jsx
import React from "react";
import { X } from "lucide-react";
import { sidebarConfig } from "@/config/sidebarconfig";
import { AuthContext } from "@/context/AuthContext";

const SideBar = ({ active, setActiveTab, isOpen, onClose }) => {
  const { user } = React.useContext(AuthContext);

  if (!user) return null;

  const menuItems = sidebarConfig[user.role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-slate-100 shadow-md transform transition-transform duration-300 z-50 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar links */}
        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  setActiveTab(item.key);
                  if (onClose) onClose();
                }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  active === item.key
                    ? "bg-blue-500 text-white"
                    : "hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
