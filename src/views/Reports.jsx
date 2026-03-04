import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Flag, Check, X, AlertTriangle } from "lucide-react";
import { mockReports } from "../data/mockData";

export default function Reports() {
  const { showToast } = useOutletContext();
  const [reports, setReports] = useState(mockReports);

  const handleResolve = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id ? { ...r, status: "Resolved" } : r
      )
    );
    showToast("Report resolved successfully", "success");
  };

  const handleDismiss = (id) => {
    setReports(reports.filter((r) => r.id !== id));
    showToast("Report dismissed", "success");
  };

  const getStatusBadge = (status) => {
    return status === "Pending"
      ? "bg-amber-100 text-warning"
      : "bg-green-100 text-success";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-text-primary mb-1" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Flagged Reports
        </h1>
        <p className="text-text-secondary" style={{ fontSize: '14px', fontWeight: 400 }}>
          Review and manage user reports and flagged content
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="card border-l-4 border-amber-400 p-6 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1 p-3 bg-warning/10 rounded-lg">
                  <Flag size={20} className="text-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {report.reason}
                  </h3>
                  <p className="text-text-secondary mb-3">
                    <span className="font-medium">{report.reporter}</span> reported{" "}
                    <span className="font-medium">{report.reported}</span>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>Report ID: {report.id}</span>
                    <span>Date: {report.date}</span>
                  </div>
                </div>
              </div>
              <span className={`badge ${getStatusBadge(report.status)}`}>
                {report.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleResolve(report.id)}
                disabled={report.status === "Resolved"}
                className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={16} />
                Resolve
              </button>
              <button
                onClick={() => handleDismiss(report.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-text-primary rounded-lg hover:bg-gray-300 transition font-medium text-sm"
              >
                <X size={16} />
                Dismiss
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-danger/10 text-danger rounded-lg hover:bg-danger/20 transition font-medium text-sm">
                <AlertTriangle size={16} />
                Escalate
              </button>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="card text-center py-16">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Flag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No reports found
            </h3>
            <p className="text-text-secondary">
              All reports have been resolved or dismissed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
