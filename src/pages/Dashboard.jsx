import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Toast from "../components/Toast";

export default function Dashboard() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pt-16">
          <div className="p-8">
            <Outlet context={{ showToast }} />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
