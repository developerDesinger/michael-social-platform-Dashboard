import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export default function Toast({ message, type = "success", duration = 4000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const borderColor = type === "success" ? "border-green-200" : "border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md ${bgColor} border ${borderColor} rounded-lg shadow-lg p-4 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300`}
    >
      <Icon size={20} className={type === "success" ? "text-success" : "text-danger"} />
      <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`${textColor} hover:opacity-70 transition`}
      >
        <X size={18} />
      </button>
    </div>
  );
}
