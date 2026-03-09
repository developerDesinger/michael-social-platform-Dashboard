import React, { useState } from "react";
import { Eye, Pencil, Trash2, Lock, Unlock } from "lucide-react";

export default function UserTable({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onSuspendUser,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-success";
      case "INACTIVE":
        return "bg-red-100 text-danger";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-600";
      case "CLIENT":
        return "bg-teal-100 text-teal-primary";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getAvatarColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-500";
      case "CLIENT":
        return "bg-teal-primary";
      default:
        return "bg-gray-400";
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatId = (id) => {
    if (!id) return "N/A";
    return id.length > 10 ? `${id.slice(0, 8)}...` : id;
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                #
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                User ID
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Email
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Role
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Status
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Joined
              </th>
              <th
                className="px-6 py-3 text-left text-text-primary"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 ${getAvatarColor(
                        user.role,
                      )} rounded-full flex items-center justify-center text-white font-semibold text-xs`}
                    >
                      {getInitials(user.fullName)}
                    </div>
                    <span className="font-medium text-text-primary">
                      {user.fullName || "N/A"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                  {formatId(user.id)}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`badge ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`badge ${getStatusBadgeColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewUser(user)}
                      className="p-1.5 hover:bg-gray-200 rounded transition"
                      title="View"
                    >
                      <Eye size={16} className="text-teal-primary" />
                    </button>
                    {/* <button
                      onClick={() => onEditUser(user)}
                      className="p-1.5 hover:bg-gray-200 rounded transition"
                      title="Edit"
                    >
                      <Pencil size={16} className="text-blue-500" />
                    </button> */}
                    <button
                      onClick={() =>
                        onSuspendUser(user.id, user.status !== "INACTIVE")
                      }
                      className="p-1.5 hover:bg-gray-200 rounded transition"
                      title={
                        user.status === "INACTIVE" ? "Activate" : "Suspend"
                      }
                    >
                      {user.status === "INACTIVE" ? (
                        <Unlock size={16} className="text-success" />
                      ) : (
                        <Lock size={16} className="text-warning" />
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-danger" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-text-secondary">
          Showing 1–{users.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm font-medium text-text-primary disabled:opacity-50 transition"
          >
            Prev
          </button>
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm font-medium text-text-primary disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
