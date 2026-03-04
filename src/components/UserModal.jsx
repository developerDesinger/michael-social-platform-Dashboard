import React from "react";
import { X } from "lucide-react";

export default function UserModal({ user, isOpen, onClose, onSuspend }) {
  if (!isOpen || !user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-text-primary" style={{ fontSize: '20px', fontWeight: 700 }}>User Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {user.avatar}
            </div>
            <h3 className="text-text-primary mb-1" style={{ fontSize: '20px', fontWeight: 700 }}>
              {user.name}
            </h3>
            <p className="text-text-secondary" style={{ fontSize: '14px', fontWeight: 400 }}>{user.email}</p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="badge bg-teal-100 text-teal-primary">
                {user.role}
              </span>
              <span
                className={`badge ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : user.status === "Suspended"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-primary">
                {user.posts}
              </p>
              <p className="text-xs text-text-secondary mt-1">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-primary">
                {user.connections}
              </p>
              <p className="text-xs text-text-secondary mt-1">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-teal-primary">
                {Math.floor(Math.random() * 15) + 1}
              </p>
              <p className="text-xs text-text-secondary mt-1">Reports</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-3">
            <h4 className="text-text-primary" style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Account Info</h4>
            <div className="space-y-2" style={{ fontSize: '14px' }}>
              <div className="flex justify-between">
                <span className="text-text-secondary" style={{ fontWeight: 400 }}>User ID:</span>
                <span className="text-text-primary" style={{ fontWeight: 600 }}>{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary" style={{ fontWeight: 400 }}>Joined:</span>
                <span className="text-text-primary" style={{ fontWeight: 600 }}>
                  {user.joined}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary" style={{ fontWeight: 400 }}>Last Active:</span>
                <span className="text-text-primary" style={{ fontWeight: 600 }}>
                  {user.lastActive}
                </span>
              </div>
            </div>
          </div>

          {/* Account Status Toggle */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-text-primary mb-3" style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Account Status
            </h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-orange-50 text-warning border border-warning rounded-lg hover:bg-orange-100 transition font-medium text-sm">
                Send Warning
              </button>
              <button
                onClick={() => onSuspend(user.id, user.status !== "Suspended")}
                className={`w-full px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm text-white ${
                  user.status === "Suspended"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {user.status === "Suspended"
                  ? "Activate Account"
                  : "Suspend Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
