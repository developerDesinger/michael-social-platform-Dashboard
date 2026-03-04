import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, Download, Filter } from "lucide-react";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import { mockUsers } from "../data/mockData";

export default function Users() {
  const { showToast } = useOutletContext();
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
      showToast("User deleted successfully", "success");
    }
  };

  const handleSuspendUser = (userId, suspend) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: suspend ? "Suspended" : "Active" }
          : u
      )
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
      "success"
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-primary mb-1" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            User Management
          </h1>
          <p className="text-text-secondary" style={{ fontSize: '14px', fontWeight: 400 }}>
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
          <select className="input-field">
            <option>All Roles</option>
            <option>Creator</option>
            <option>Director</option>
            <option>Member</option>
          </select>

          <select className="input-field">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <select className="input-field">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Name</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-primary rounded-lg transition font-medium">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
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
