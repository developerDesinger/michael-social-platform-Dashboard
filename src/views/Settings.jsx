import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { showToast } = useOutletContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      showToast("Please fill in all fields", "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setPassword("");
    setConfirmPassword("");
    showToast("Password changed successfully", "success");
  };

  const handleSaveSettings = () => {
    showToast("Settings saved successfully", "success");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-text-primary mb-1" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p className="text-text-secondary" style={{ fontSize: '14px', fontWeight: 400 }}>
          Manage your profile and platform settings
        </p>
      </div>

      {/* Admin Profile Section */}
      <div className="card">
        <h2 className="text-text-primary mb-6" style={{ fontSize: '15px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Admin Profile
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-text-primary mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Full Name
            </label>
            <input
              type="text"
              value={user?.name || "Super Admin"}
              disabled
              className="input-field bg-gray-50 disabled:opacity-75"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-text-primary mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || "admin@social.com"}
              disabled
              className="input-field bg-gray-50 disabled:opacity-75"
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-text-primary mb-4" style={{ fontSize: '15px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-primary mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  New Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-primary mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Platform Settings */}
      <div className="card">
        <h2 className="text-text-primary mb-6" style={{ fontSize: '15px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform Settings
        </h2>

        <div className="space-y-6">
          {/* Allow New Registrations */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-text-primary" style={{ fontSize: '13px', fontWeight: 600 }}>
                Allow New Registrations
              </h3>
              <p className="text-text-secondary" style={{ fontSize: '13px', fontWeight: 400 }}>
                Allow users to create new accounts
              </p>
            </div>
            <button
              onClick={() => setAllowRegistrations(!allowRegistrations)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                allowRegistrations ? "bg-teal-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  allowRegistrations ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-text-primary" style={{ fontSize: '13px', fontWeight: 600 }}>
                Maintenance Mode
              </h3>
              <p className="text-text-secondary" style={{ fontSize: '13px', fontWeight: 400 }}>
                Temporarily disable access to the platform
              </p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                maintenanceMode ? "bg-danger" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  maintenanceMode ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-text-primary" style={{ fontSize: '13px', fontWeight: 600 }}>
                Email Notifications
              </h3>
              <p className="text-text-secondary" style={{ fontSize: '13px', fontWeight: 400 }}>
                Receive notifications for system events
              </p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                emailNotifications ? "bg-teal-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handleSaveSettings}
            className="btn-primary"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
