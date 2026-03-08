import React, { useState, useEffect } from "react";
import { Search, Download, Filter } from "lucide-react";
import { useUI } from "../context/UIContext";
import { usersAPI } from "../utils/api";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";

export default function Users() {
  const { showToast, showLoader, hideLoader } = useUI();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    sort: "newest",
  });

  // Fetch users on mount and when filters change
  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (filters.role) params.role = filters.role;
      if (filters.status) params.status = filters.status;
      if (filters.sort) params.sort = filters.sort;

      const response = await usersAPI.getAll(params);

      if (response.success && response.data) {
        setUsers(Array.isArray(response.data) ? response.data : []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      showToast("Failed to load users. Please try again.", "error");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleViewUser = async (user) => {
    try {
      showLoader("Loading user details...");
      const response = await usersAPI.getById(user.id);

      if (response.success && response.data) {
        setSelectedUser(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      showToast("Failed to load user details.", "error");
    } finally {
      hideLoader();
    }
  };

  const handleDeleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        showLoader("Deleting user...");
        const response = await usersAPI.delete(userId);

        if (response.success) {
          setUsers(users.filter((u) => u.id !== userId));
          showToast("User deleted successfully", "success");
        } else {
          showToast(response.message || "Failed to delete user", "error");
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
        showToast("Failed to delete user. Please try again.", "error");
      } finally {
        hideLoader();
      }
    }
  };

  const handleSuspendUser = async (userId, suspend) => {
    try {
      showLoader(suspend ? "Suspending user..." : "Activating user...");
      const response = await usersAPI.update(userId, {
        status: suspend ? "Suspended" : "Active",
      });

      if (response.success) {
        setUsers(
          users.map((u) =>
            u.id === userId
              ? { ...u, status: suspend ? "Suspended" : "Active" }
              : u,
          ),
        );
        const updatedUser = users.find((u) => u.id === userId);
        if (updatedUser) {
          setSelectedUser({
            ...updatedUser,
            status: suspend ? "Suspended" : "Active",
          });
        }
        showToast(
          `User ${suspend ? "suspended" : "activated"} successfully`,
          "success",
        );
      } else {
        showToast(response.message || "Failed to update user status", "error");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      showToast("Failed to update user status. Please try again.", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-text-primary mb-1"
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            User Management
          </h1>
          <p
            className="text-text-secondary"
            style={{ fontSize: "14px", fontWeight: 400 }}
          >
            Manage and monitor all platform users
          </p>
        </div>
        <button className="btn-primary">+ Add User</button>
      </div>

      {/* Filters Section */}
      <div className="card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>

          {/* Filter Dropdowns */}
          <select
            className="input-field"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            <option value="Creator">Creator</option>
            <option value="Director">Director</option>
            <option value="Member">Member</option>
          </select>

          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <select
            className="input-field"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
            <option value="name">Sort by: Name</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-primary rounded-lg transition font-medium">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="card text-center py-16">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4 animate-pulse">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Loading users...
          </h3>
        </div>
      ) : filteredUsers.length > 0 ? (
        <UserTable
          users={filteredUsers}
          onViewUser={handleViewUser}
          onDeleteUser={handleDeleteUser}
          onSuspendUser={handleSuspendUser}
        />
      ) : (
        <div className="card text-center py-16">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No users found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onSuspend={handleSuspendUser}
      />
    </div>
  );
}
