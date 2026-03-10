import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./Logo";
import { Home, Users, BarChart3, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Users", icon: Users, path: "/dashboard/users" },
    { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-60 bg-teal-dark h-screen flex flex-col fixed left-0 top-0 border-r border-teal-primary/20">
      {/* Logo Section */}
      <div className="p-6 border-b border-teal-primary/10">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <Logo size={40} />
          <h1
            className="text-white"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            SocialAdmin
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-teal-primary text-white border-l-4 border-teal-accent"
                      : "text-teal-light hover:text-white hover:bg-white/6"
                  }`}
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-teal-primary/10">
        <div className="bg-teal-primary/30 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-teal-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "SA"}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">
                {user?.fullName || "Super Admin"}
              </p>
              <p className="text-teal-light text-xs">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-teal-primary hover:bg-teal-accent text-white rounded-lg py-2 px-3 transition-all duration-200 text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
