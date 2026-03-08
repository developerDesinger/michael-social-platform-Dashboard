import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get title from route
  const getTitleFromRoute = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard Overview";
      case "/dashboard/users":
        return "User Management";
      case "/dashboard/analytics":
        return "Analytics";
      case "/dashboard/reports":
        return "Flagged Reports";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 left-60 right-0 z-40">
      {/* Title */}
      <h1
        className="text-text-primary"
        style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {getTitleFromRoute()}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search users, posts..."
            className="bg-transparent ml-2 w-full outline-none text-sm text-text-primary placeholder-gray-400"
          />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell size={20} className="text-text-primary" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full"></span>
          </button>
          <span className="absolute top-0 right-0 bg-danger text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Admin Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 bg-teal-primary text-white rounded-full font-semibold flex items-center justify-center hover:bg-teal-accent transition cursor-pointer"
          >
            {user?.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "SA"}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold text-text-primary">
                  {user?.fullName}
                </p>
                <p className="text-sm text-text-secondary">{user?.email}</p>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm text-text-primary">
                <User size={16} />
                Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm text-text-primary">
                <Settings size={16} />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition text-sm text-danger border-t border-gray-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
