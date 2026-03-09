import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 bg-teal-primary text-white rounded-full font-semibold flex items-center justify-center hover:bg-teal-accent transition cursor-pointer focus:outline-none">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "SA"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">
                  {user?.fullName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => navigate("/dashboard/settings")}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => navigate("/dashboard/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
