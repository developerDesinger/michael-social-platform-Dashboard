import React, { useState, useEffect } from "react";
import { X, Edit2, Save, Trash2 } from "lucide-react";

export default function UserModal({
  user,
  isOpen,
  onClose,
  onSuspend,
  onUpdate,
  onDelete,
  initialEditMode = false,
}) {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [editedData, setEditedData] = useState({
    fullName: "",
    shortNote: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setEditedData({
        fullName: user.fullName || "",
        shortNote: user.shortNote || "",
        status: user.status || "ACTIVE",
      });
    }
  }, [user]);

  useEffect(() => {
    setIsEditing(initialEditMode);
  }, [initialEditMode, isOpen]);

  if (!isOpen || !user) return null;

  const handleSave = async () => {
    const success = await onUpdate(user.id, editedData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.fullName}? This action cannot be undone.`,
      )
    ) {
      onDelete(user.id);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h2
            className="text-text-primary"
            style={{ fontSize: "20px", fontWeight: 700 }}
          >
            User Details
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-6">
          {/* User Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {user.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "U"}
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedData.fullName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, fullName: e.target.value })
                  }
                  className="text-center w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary text-lg font-bold"
                  placeholder="Full Name"
                />
              </div>
            ) : (
              <h3
                className="text-text-primary mb-1"
                style={{ fontSize: "20px", fontWeight: 700 }}
              >
                {user.fullName}
              </h3>
            )}
            <p
              className="text-text-secondary mt-2"
              style={{ fontSize: "14px", fontWeight: 400 }}
            >
              {user.email}
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="badge bg-teal-100 text-teal-primary">
                {user.role}
              </span>
              <span
                className={`badge ${
                  user.status === "ACTIVE"
                    ? "bg-green-100 text-green-600"
                    : user.status === "INACTIVE"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* Bio / Short Note */}
          <div>
            <h4
              className="text-text-primary mb-2"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Bio
            </h4>
            {isEditing ? (
              <textarea
                value={editedData.shortNote}
                onChange={(e) =>
                  setEditedData({ ...editedData, shortNote: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary text-sm"
                placeholder="Short bio or note"
                rows="3"
              />
            ) : (
              <p className="text-text-secondary text-sm">
                {user.shortNote || "No bio available"}
              </p>
            )}
          </div>

          {/* Stats Grid - Hide when editing */}
          {!isEditing && (
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-xl font-bold text-teal-primary">
                  {user.phoneNumber || "N/A"}
                </p>
                <p className="text-xs text-text-secondary mt-1">Phone</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-teal-primary">
                  {user.loginType || "EMAIL"}
                </p>
                <p className="text-xs text-text-secondary mt-1">Login Type</p>
              </div>
            </div>
          )}

          {/* Account Info */}
          <div className="space-y-3">
            <h4
              className="text-text-primary"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Account Info
            </h4>
            <div className="space-y-2" style={{ fontSize: "14px" }}>
              <div className="flex justify-between">
                <span
                  className="text-text-secondary"
                  style={{ fontWeight: 400 }}
                >
                  User ID:
                </span>
                <span
                  className="text-text-primary font-mono text-xs"
                  style={{ fontWeight: 600 }}
                >
                  {user.id?.slice(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className="text-text-secondary"
                  style={{ fontWeight: 400 }}
                >
                  Joined:
                </span>
                <span className="text-text-primary" style={{ fontWeight: 600 }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className="text-text-secondary"
                  style={{ fontWeight: 400 }}
                >
                  Last Updated:
                </span>
                <span className="text-text-primary" style={{ fontWeight: 600 }}>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className="text-text-secondary"
                  style={{ fontWeight: 400 }}
                >
                  Onboarding:
                </span>
                <span className="text-text-primary" style={{ fontWeight: 600 }}>
                  {user.onboardingCompleted ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Account Status Toggle */}
          <div className="border-t border-gray-200 pt-4">
            <h4
              className="text-text-primary mb-3"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Account Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => onSuspend(user.id, user.status !== "INACTIVE")}
                className={`w-full px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm text-white ${
                  user.status === "INACTIVE" ? "bg-success" : "bg-warning"
                }`}
              >
                {user.status === "INACTIVE"
                  ? "Activate Account"
                  : "Suspend Account"}
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-50 text-danger border border-danger rounded-lg hover:bg-red-100 transition font-medium text-sm flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
